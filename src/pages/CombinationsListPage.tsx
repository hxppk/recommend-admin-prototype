import {
  CopyOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Input, Modal, Popover, Row, Select, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  estimateCombinationCoverage,
  formatDate,
  getPlanReferences,
  getPoolProducts,
  strategyMap,
} from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Combination } from '../lib/types'

function deriveBusinessUnit(
  state: ReturnType<typeof useAdminStore>['state'],
  combinationId: string,
) {
  const combination = state.combinations.find((item) => item.id === combinationId)
  if (!combination) return '未分类'

  const strategiesById = strategyMap(state)
  const categories = new Set<string>()

  combination.slots.forEach((slot) => {
    if (!slot.strategyId) return
    const strategy = strategiesById[slot.strategyId]
    if (!strategy) return
    getPoolProducts(state, strategy.poolId).forEach((product) => categories.add(product.category))
  })

  if (!categories.size) return '未分类'
  if (categories.size === 1) return Array.from(categories)[0]
  return '综合'
}

interface CombinationRow {
  key: string
  name: string
  id: string
  status: Combination['status']
  slotCount: number
  coverage: number
  linkedPlans: { id: string; name: string }[]
  createdAt: string
  businessUnit: string
}

export function CombinationsListPage() {
  const navigate = useNavigate()
  const { state, createCombination, updateCombination, copyCombination, deleteCombination } = useAdminStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [businessFilter, setBusinessFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const combinations = state.combinations.map((combination) => {
    const linkedPlans = getPlanReferences(state, combination.id)
    const businessUnit = deriveBusinessUnit(state, combination.id)

    return {
      combination,
      businessUnit,
      linkedPlans,
      coverage: estimateCombinationCoverage(state, combination),
    }
  })

  const businessOptions = Array.from(new Set(combinations.map((item) => item.businessUnit))).sort((left, right) =>
    left.localeCompare(right, 'zh-CN'),
  )

  const filteredCombinations = combinations.filter(({ combination, businessUnit }) => {
    const keyword = search.trim().toLowerCase()
    const matchesSearch =
      keyword.length === 0 ||
      combination.name.toLowerCase().includes(keyword) ||
      combination.id.toLowerCase().includes(keyword)
    const matchesStatus = statusFilter === 'ALL' || combination.status === statusFilter
    const matchesBusiness = businessFilter === 'ALL' || businessUnit === businessFilter
    return matchesSearch && matchesStatus && matchesBusiness
  })

  const dataSource: CombinationRow[] = useMemo(() => {
    return filteredCombinations.map(({ combination, linkedPlans, coverage, businessUnit }) => ({
      key: combination.id,
      name: combination.name,
      id: combination.id,
      status: combination.status,
      slotCount: combination.slots.length,
      coverage,
      linkedPlans: linkedPlans.map((p) => ({ id: p.id, name: p.name })),
      createdAt: combination.createdAt,
      businessUnit,
    }))
  }, [filteredCombinations])

  function handleToggleStatus(record: CombinationRow) {
    const combination = state.combinations.find((item) => item.id === record.id)
    if (!combination) return
    updateCombination(record.id, { ...combination, status: combination.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
  }

  function handleCopyAndNavigate(id: string) {
    const newId = copyCombination(id)
    if (newId) navigate(`/combinations/${newId}`)
  }

  function handleDelete(record: CombinationRow) {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除策略组合「${record.name}」吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => deleteCombination(record.id),
    })
  }

  const columns: ColumnsType<CombinationRow> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{record.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{record.id}</Typography.Text>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: Combination['status']) => (
        <Tag color={status === 'ACTIVE' ? 'success' : 'default'}>
          {status === 'ACTIVE' ? '启用' : '停用'}
        </Tag>
      ),
    },
    {
      title: '资源位/覆盖商品数',
      key: 'slots',
      width: 160,
      render: (_, record) => (
        <Typography.Text>
          {String(record.slotCount).padStart(2, '0')}/{String(record.coverage).padStart(2, '0')}
        </Typography.Text>
      ),
    },
    {
      title: '关联计划',
      key: 'linkedPlan',
      width: 160,
      render: (_, record) => {
        const plans = record.linkedPlans
        if (plans.length === 0) return <Typography.Text type="secondary">—</Typography.Text>
        if (plans.length === 1) {
          return (
            <Button type="link" size="small" style={{ padding: 0 }} onClick={() => navigate(`/plans/${plans[0].id}/edit`)}>
              {plans[0].name}
            </Button>
          )
        }
        return (
          <Popover
            content={
              <Space direction="vertical" size={4}>
                {plans.map((plan) => (
                  <Button key={plan.id} type="link" size="small" style={{ padding: 0 }} onClick={() => navigate(`/plans/${plan.id}/edit`)}>
                    {plan.name}
                  </Button>
                ))}
              </Space>
            }
            trigger="click"
          >
            <Button type="link" size="small" style={{ padding: 0 }}>
              {plans[0].name} 等{plans.length}个 ▾
            </Button>
          </Popover>
        )
      },
    },
    {
      title: '更新时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (value: string) => formatDate(value),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => {
        const canOperate = record.id // all combinations are user-created in this mock
        return (
          <Space>
            <Button
              type="link"
              size="small"
              style={{ padding: 0 }}
              onClick={() => navigate(`/combinations/${record.id}`)}
            >
              查看
            </Button>
            <Button
              type="link"
              size="small"
              style={{ padding: 0 }}
              onClick={() => handleToggleStatus(record)}
            >
              {record.status === 'ACTIVE' ? '停用' : '启用'}
            </Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'copy',
                    label: '复制',
                    icon: <CopyOutlined />,
                    onClick: () => handleCopyAndNavigate(record.id),
                  },
                  {
                    key: 'delete',
                    label: <span style={{ color: '#ff4d4f' }}>删除</span>,
                    icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
                    onClick: () => handleDelete(record),
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button type="text" size="small" icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        )
      },
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space direction="vertical" size={4}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          资源位策略编排
        </Typography.Title>
        <Typography.Text type="secondary">
          管理资源位编排与选品逻辑，覆盖全平台推荐场景。
        </Typography.Text>
      </Space>

      <Row justify="space-between" align="middle">
        <Space>
          <Input
            placeholder="搜索名称或编号"
            prefix={<SearchOutlined />}
            allowClear
            style={{ width: 200 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="状态"
            allowClear
            style={{ width: 100 }}
            value={statusFilter === 'ALL' ? undefined : statusFilter}
            onChange={(v) => setStatusFilter(v || 'ALL')}
            options={[
              { label: '启用', value: 'ACTIVE' },
              { label: '停用', value: 'INACTIVE' },
            ]}
          />
          <Select
            placeholder="业务线"
            allowClear
            style={{ width: 140 }}
            value={businessFilter === 'ALL' ? undefined : businessFilter}
            onChange={(v) => setBusinessFilter(v || 'ALL')}
            options={businessOptions.map((option) => ({ value: option, label: option }))}
          />
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            const id = createCombination()
            navigate(`/combinations/${id}`)
          }}
        >
          新建策略组合
        </Button>
      </Row>

      <Table<CombinationRow>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          pageSize: 12,
          total: filteredCombinations.length,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `共 ${total} 条`,
        }}
        locale={{ emptyText: '暂无匹配的策略组合' }}
      />
    </Space>
  )
}
