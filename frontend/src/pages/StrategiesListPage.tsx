import { CopyOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Space, Table, Tag, Tooltip, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatDate, getStrategyReferences, poolMap } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Strategy } from '../lib/types'

const modeTag: Record<Strategy['mode'], { color: string; label: string }> = {
  HOT: { color: 'orange', label: '热销模型 Hot' },
  NEW: { color: 'blue', label: '新品曝光 New' },
  MANUAL: { color: 'purple', label: '人工定序 Manual' },
}

export function StrategiesListPage() {
  const navigate = useNavigate()
  const { state, createStrategy, copyStrategy, updateStrategy, deleteStrategy } = useAdminStore()
  const pools = poolMap(state)
  const [search, setSearch] = useState('')

  const dataSource = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    const filtered = state.strategies
      .filter((s) => !keyword || s.name.toLowerCase().includes(keyword))
      .map((strategy) => ({
        ...strategy,
        key: strategy.id,
        references: getStrategyReferences(state, strategy.id),
        poolName: pools[strategy.poolId]?.name ?? '-',
        fallbackName:
          state.strategies.find((item) => item.id === strategy.fallbackStrategyId)?.name ?? '无',
      }))
    // 系统策略置顶
    return filtered.sort((a, b) => {
      if (a.kind === 'SYSTEM' && b.kind !== 'SYSTEM') return -1
      if (a.kind !== 'SYSTEM' && b.kind === 'SYSTEM') return 1
      return 0
    })
  }, [state, pools, search])

  function handleToggleStatus(id: string) {
    const s = state.strategies.find((item) => item.id === id)
    if (!s) return
    updateStrategy(id, { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
  }

  function handleCopyAndNavigate(id: string) {
    const newId = copyStrategy(id)
    if (newId) navigate(`/strategies/${newId}/edit`)
  }

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record) => (
        <Space>
          <Typography.Text strong>{text}</Typography.Text>
          {record.kind === 'SYSTEM' && <Tag color="blue">系统</Tag>}
        </Space>
      ),
    },
    {
      title: '排序方式',
      dataIndex: 'mode',
      key: 'mode',
      render: (mode: Strategy['mode']) => (
        <Tag color={modeTag[mode].color}>{modeTag[mode].label}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Strategy['status']) => (
        <Tag color={status === 'ACTIVE' ? 'success' : 'default'}>
          {status === 'ACTIVE' ? '启用' : '停用'}
        </Tag>
      ),
    },
    {
      title: '引用选品池',
      key: 'pool',
      render: (_, record) => <Link to={`/pools/${record.poolId}`}>{record.poolName}</Link>,
    },
    {
      title: '被引用次数',
      key: 'references',
      render: (_, record) => (
        <Tooltip title={record.references.length ? record.references.join('、') : '暂无引用'}>
          {record.references.length}
        </Tooltip>
      ),
    },
    {
      title: '兜底策略',
      dataIndex: 'fallbackName',
      key: 'fallback',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => formatDate(text),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => {
        if (record.kind === 'SYSTEM') {
          return (
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/strategies/${record.id}/edit`)}
            >
              查看
            </Button>
          )
        }

        const canOperate = record.createdBy === CURRENT_USER
        const isActive = record.status === 'ACTIVE'
        const hasRefs = record.references.length > 0

        return (
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/strategies/${record.id}/edit`)}
            >
              查看
            </Button>
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => handleCopyAndNavigate(record.id)}
            >
              复制
            </Button>
            <Tooltip title={!canOperate ? '仅创建人可操作' : undefined}>
              <Button
                type="text"
                size="small"
                disabled={!canOperate}
                onClick={() => handleToggleStatus(record.id)}
              >
                {isActive ? '停用' : '启用'}
              </Button>
            </Tooltip>
            <Tooltip
              title={
                !canOperate
                  ? '仅创建人可操作'
                  : hasRefs
                    ? '该策略已被组合引用，无法删除'
                    : undefined
              }
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                disabled={!canOperate || hasRefs}
                onClick={() => {
                  Modal.confirm({
                    title: '确认删除',
                    content: `确认删除策略「${record.name}」吗？`,
                    okText: '删除',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => deleteStrategy(record.id),
                  })
                }}
              >
                删除
              </Button>
            </Tooltip>
          </Space>
        )
      },
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space direction="vertical" size={4}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          排序策略
        </Typography.Title>
        <Typography.Text type="secondary">
          管理排序策略，配置排序模式与关联选品池
        </Typography.Text>
      </Space>

      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="搜索策略名称"
          prefix={<SearchOutlined />}
          allowClear
          style={{ width: 280 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            const id = createStrategy()
            navigate(`/strategies/${id}/edit`)
          }}
        >
          新建策略
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
      />
    </Space>
  )
}
