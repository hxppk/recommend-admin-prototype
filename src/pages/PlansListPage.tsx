import {
  CopyOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findPlanConflicts, formatDate, getTimeStatus } from '../lib/domain'
import { CURRENT_USER_ROLE, useAdminStore } from '../lib/store'
import type { Plan, PlanStatus } from '../lib/types'

const { Title, Text } = Typography

const statusOptions: { label: string; value: PlanStatus }[] = [
  { label: '投放中', value: 'PUBLISHED' },
  { label: '草稿', value: 'DRAFT' },
  { label: '已暂停', value: 'PAUSED' },
  { label: '已结束', value: 'ENDED' },
]

interface PlanRow extends Plan {
  key: string
  conflicts: Plan[]
  combinationName: string | null
  isExpired: boolean
  isScheduled: boolean
}

export function PlansListPage() {
  const navigate = useNavigate()
  const { state, createPlan, copyPlan, deletePlan, updatePlan } = useAdminStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PlanStatus | ''>('')
  const [priorityModal, setPriorityModal] = useState<{ open: false } | { open: true; planId: string; value: number | null; conflict: string | null }>({ open: false })

  const isAdmin = CURRENT_USER_ROLE === 'ADMIN'

  const statusOrder: Record<PlanStatus, number> = { PUBLISHED: 0, PAUSED: 1, DRAFT: 2, ENDED: 3 }

  const dataSource: PlanRow[] = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return state.plans
      .filter((plan) => !keyword || plan.name.toLowerCase().includes(keyword))
      .filter((plan) => !statusFilter || plan.status === statusFilter)
      .map((plan) => {
        const now = Date.now()
        const isExpired = plan.status === 'PUBLISHED' && new Date(plan.endAt).getTime() < now
        const isScheduled = plan.status === 'PUBLISHED' && !isExpired && new Date(plan.startAt).getTime() > now
        return {
          ...plan,
          key: plan.id,
          isExpired,
          isScheduled,
          conflicts: !isExpired && plan.status === 'PUBLISHED' ? findPlanConflicts(state, plan) : [],
          combinationName: state.combinations.find((c) => c.id === plan.combinationId)?.name ?? null,
        }
      })
      .sort((a, b) => {
        const aStatus = a.isExpired ? 'ENDED' : a.status
        const bStatus = b.isExpired ? 'ENDED' : b.status
        const statusDiff = statusOrder[aStatus] - statusOrder[bStatus]
        if (statusDiff !== 0) return statusDiff
        const aPri = a.priority ?? -1
        const bPri = b.priority ?? -1
        return bPri - aPri
      })
  }, [state, search, statusFilter])

  function handleToggleStatus(record: Plan) {
    const nextStatus = record.status === 'PUBLISHED' ? 'PAUSED' : 'PUBLISHED'
    if (nextStatus === 'PUBLISHED') {
      const errors: string[] = []
      if (!record.name.trim()) errors.push('计划名称不能为空')
      if (!(record.slotIds ?? []).length) errors.push('请选择投放资源位')
      if (!record.startAt) errors.push('请设置开始时间')
      if (!record.endAt) errors.push('请设置结束时间')
      if (record.combinationId == null) errors.push('请绑定策略组合')
      if (errors.length) {
        Modal.warning({
          title: '无法发布计划',
          content: (
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {errors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          ),
          okText: '知道了',
        })
        return
      }
      const conflicts = findPlanConflicts(state, { ...record, status: 'PUBLISHED' })
      if (conflicts.length) {
        Modal.warning({
          title: '存在投放冲突',
          content: `与以下计划冲突：${conflicts.map((c) => c.name).join('、')}。请先到编辑页处理冲突后再发布。`,
          okText: '知道了',
        })
        return
      }
    }
    updatePlan(record.id, { ...record, status: nextStatus, version: record.version + 1 })
  }

  function handleCopyAndNavigate(id: string) {
    const newId = copyPlan(id)
    if (newId) navigate(`/plans/${newId}/edit`)
  }

  function handleDelete(record: Plan) {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除投放计划「${record.name}」吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => deletePlan(record.id),
    })
  }

  function findPriorityConflict(currentId: string, value: number) {
    const occupied = state.plans.find(
      (p) => p.id !== currentId && p.status === 'PUBLISHED' && p.priority === value,
    )
    return occupied ? occupied.name : null
  }

  function handlePrioritySave() {
    if (!priorityModal.open) return
    const { planId, value } = priorityModal
    if (value == null) {
      const plan = state.plans.find((p) => p.id === planId)
      if (plan) updatePlan(planId, { ...plan, priority: undefined, status: 'PAUSED' })
      setPriorityModal({ open: false })
      return
    }
    if (value < 1 || value > 100) return
    if (findPriorityConflict(planId, value)) return

    const plan = state.plans.find((p) => p.id === planId)
    if (plan) updatePlan(planId, { ...plan, priority: value })
    setPriorityModal({ open: false })
  }

  const columns: ColumnsType<PlanRow> = [
    {
      title: '计划名称',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      render: (text: string, record) => (
        <Space direction="vertical" size={0}>
          <Button type="link" style={{ padding: 0 }} onClick={() => navigate(`/plans/${record.id}/edit`)}>
            {text}
          </Button>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.id}</Text>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_: PlanStatus, record: PlanRow) => {
        if (record.isExpired) return <Tag color="default">已结束</Tag>
        if (record.isScheduled) return <Tag color="orange">待生效</Tag>
        const tagColor: Record<string, string> = {
          PUBLISHED: 'success',
          PAUSED: 'warning',
          DRAFT: 'blue',
          ENDED: 'default',
        }
        return (
          <Tag color={tagColor[record.status]}>
            {getTimeStatus(record)}
          </Tag>
        )
      },
    },
    {
      title: '创建人',
      key: 'createdBy',
      width: 100,
      render: (_: unknown, record: Plan) => <Text>{record.createdBy}</Text>,
    },
    {
      title: '生效时间',
      key: 'time',
      width: 220,
      render: (_: unknown, record: Plan) => (
        <Text type="secondary">
          {formatDate(record.startAt)} - {formatDate(record.endAt)}
        </Text>
      ),
    },
    {
      title: '绑定策略组合',
      key: 'combination',
      width: 160,
      render: (_: unknown, record: PlanRow) => (
        record.combinationName ? (
          <Button
            type="link"
            size="small"
            style={{ padding: 0 }}
            onClick={() => navigate(`/combinations/${record.combinationId}`)}
          >
            {record.combinationName}
          </Button>
        ) : (
          <Text type="secondary">—</Text>
        )
      ),
    },
    {
      title: 'ABTest',
      key: 'abTest',
      width: 90,
      align: 'center',
      render: (_: unknown, record: Plan) => (
        <Tag color={record.abTest.enabled ? 'blue' : 'default'}>
          {record.abTest.enabled ? '已开启' : '未开启'}
        </Tag>
      ),
    },
    {
      title: '优先级',
      key: 'priority',
      width: 120,
      align: 'center',
      render: (_: unknown, record: PlanRow) => {
        const isEndedOrExpired = record.status === 'ENDED' || record.isExpired
        return (
          <Space size={4}>
            <Text>{record.priority ?? '—'}</Text>
            {!isEndedOrExpired && isAdmin && (
              <Button
                type="text"
                size="small"
                icon={<SettingOutlined />}
                style={{ padding: 2 }}
                onClick={() => setPriorityModal({
                  open: true,
                  planId: record.id,
                  value: record.priority ?? null,
                  conflict: null,
                })}
              />
            )}
          </Space>
        )
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: 180,
      render: (_: unknown, record: PlanRow) => {
        const isEndedOrExpired = record.status === 'ENDED' || record.isExpired

        return (
          <Space>
            <Button
              type="link"
              size="small"
              style={{ padding: 0 }}
              onClick={() => navigate(`/plans/${record.id}/edit`)}
            >
              编辑
            </Button>
            {!isEndedOrExpired && isAdmin && (
              record.status === 'PUBLISHED' ? (
                <Button
                  type="link"
                  size="small"
                  style={{ padding: 0 }}
                  onClick={() => handleToggleStatus(record)}
                >
                  暂停
                </Button>
              ) : (
                <Button
                  type="link"
                  size="small"
                  style={{ padding: 0 }}
                  onClick={() => handleToggleStatus(record)}
                >
                  发布
                </Button>
              )
            )}
            {isAdmin && (
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
                      label: <span style={{ color: 'var(--ant-color-error)' }}>删除</span>,
                      icon: <DeleteOutlined style={{ color: 'var(--ant-color-error)' }} />,
                      onClick: () => handleDelete(record),
                    },
                  ],
                }}
                trigger={['click']}
              >
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            )}
          </Space>
        )
      },
    },
  ]

  const editingPlan = priorityModal.open
    ? state.plans.find((p) => p.id === priorityModal.planId)
    : null

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space direction="vertical" size={4}>
        <Title level={4} style={{ margin: 0 }}>投放计划</Title>
        <Text type="secondary">管理推荐位投放计划，配置投放范围、策略组合和 ABTest</Text>
      </Space>

      <Row justify="space-between" align="middle">
        <Space>
          <Input
            placeholder="搜索计划名称"
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
            value={statusFilter || undefined}
            onChange={(v) => setStatusFilter(v as PlanStatus | '')}
            options={statusOptions}
          />
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            const id = createPlan()
            navigate(`/plans/${id}/edit`)
          }}
        >
          新建计划
        </Button>
      </Row>

      <Table<PlanRow>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
        rowClassName={(record) => (record.conflicts.length ? 'ant-table-row-warning' : '')}
        onRow={(record) => {
          if (record.conflicts.length) {
            return {
              style: { backgroundColor: 'var(--ant-color-warning-bg)' },
              title: `冲突计划：${record.conflicts.map((item) => item.name).join('、')}`,
            }
          }
          return {}
        }}
      />

      {/* 优先级配置弹窗 */}
      <Modal
        title={`配置优先级 - ${editingPlan?.name}`}
        open={priorityModal.open}
        onCancel={() => setPriorityModal({ open: false })}
        onOk={handlePrioritySave}
        okText="保存"
        cancelText="取消"
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <InputNumber
            value={priorityModal.open ? priorityModal.value : null}
            min={1}
            max={100}
            precision={0}
            addonAfter={
              priorityModal.open && priorityModal.value != null ? (
                <Button
                  type="text"
                  size="small"
                  style={{ padding: '0 4px' }}
                  onClick={() => setPriorityModal({ ...priorityModal, value: null })}
                >
                  清空
                </Button>
              ) : null
            }
            style={{ width: '100%' }}
            placeholder="输入优先级（1-100）"
            onChange={(v) => {
              if (!priorityModal.open) return
              const conflict = v != null ? findPriorityConflict(priorityModal.planId, v) : null
              setPriorityModal({ ...priorityModal, value: v, conflict })
            }}
          />
          {priorityModal.open && priorityModal.conflict && (
            <Text type="danger">该优先级已被「{priorityModal.conflict}」使用</Text>
          )}
        </Space>
      </Modal>
    </Space>
  )
}
