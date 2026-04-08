import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findPlanConflicts, formatDate, getStoreScopeLabel, getTimeStatus } from '../lib/domain'
import { useAdminStore } from '../lib/store'
import type { PlanStatus } from '../lib/types'
import {
  Button,
  Flex,
  Popconfirm,
  Space,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { Plan } from '../lib/types'

const { Title, Text } = Typography

const statusTabItems = [
  { key: 'ALL', label: '全部' },
  { key: 'DRAFT', label: '草稿' },
  { key: 'PUBLISHED', label: '已发布' },
  { key: 'PAUSED', label: '已暂停' },
  { key: 'ENDED', label: '已结束' },
]

function getStatusTagColor(status: PlanStatus): string {
  switch (status) {
    case 'PUBLISHED':
      return 'success'
    case 'PAUSED':
      return 'warning'
    case 'ENDED':
      return 'default'
    case 'DRAFT':
    default:
      return 'processing'
  }
}

export function PlansListPage() {
  const navigate = useNavigate()
  const { state, createPlan, copyPlan, deletePlan, updatePlan } = useAdminStore()
  const [filter, setFilter] = useState<PlanStatus | 'ALL'>('ALL')

  const plans = state.plans.filter((plan) => (filter === 'ALL' ? true : plan.status === filter))

  const columns: ColumnsType<Plan> = [
    {
      title: '计划名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_: PlanStatus, record: Plan) => (
        <Tag color={getStatusTagColor(record.status)}>{getTimeStatus(record)}</Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      align: 'center',
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
      title: '门店范围',
      key: 'storeScope',
      width: 120,
      render: (_: unknown, record: Plan) => getStoreScopeLabel(record, state.stores),
    },
    {
      title: '绑定策略组合',
      key: 'combination',
      width: 140,
      render: (_: unknown, record: Plan) => {
        const combination = state.combinations.find((item) => item.id === record.combinationId)
        return combination?.name ?? <Text type="secondary">未绑定</Text>
      },
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
      title: '操作',
      key: 'actions',
      width: 200,
      render: (_: unknown, record: Plan) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/plans/${record.id}/edit`)}
            />
          </Tooltip>
          <Tooltip title={record.status === 'PUBLISHED' ? '暂停' : '发布'}>
            <Button
              type="text"
              size="small"
              icon={record.status === 'PUBLISHED' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              onClick={() =>
                updatePlan(record.id, {
                  ...record,
                  status: record.status === 'PUBLISHED' ? 'PAUSED' : 'PUBLISHED',
                  version: record.version + 1,
                })
              }
            />
          </Tooltip>
          <Tooltip title="复制">
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => copyPlan(record.id)}
            />
          </Tooltip>
          <Popconfirm
            title="确认删除"
            description="删除后不可恢复，确定要删除此计划吗？"
            onConfirm={() => deletePlan(record.id)}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="删除">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Flex vertical gap="large">
      <Flex justify="space-between" align="center">
        <div>
          <Title level={4} style={{ margin: 0 }}>投放计划</Title>
          <Text type="secondary">管理推荐位投放计划，配置投放范围、策略组合和 ABTest</Text>
        </div>
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
      </Flex>

      <Tabs
        activeKey={filter}
        items={statusTabItems}
        onChange={(key) => setFilter(key as PlanStatus | 'ALL')}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={plans}
        pagination={false}
        size="middle"
        rowClassName={(record) => {
          const conflicts = findPlanConflicts(state, record)
          return conflicts.length ? 'ant-table-row-warning' : ''
        }}
        onRow={(record) => {
          const conflicts = findPlanConflicts(state, record)
          if (conflicts.length) {
            return {
              style: { backgroundColor: '#fffbe6' },
              title: `冲突计划：${conflicts.map((item) => item.name).join('、')}`,
            }
          }
          return {}
        }}
      />
    </Flex>
  )
}
