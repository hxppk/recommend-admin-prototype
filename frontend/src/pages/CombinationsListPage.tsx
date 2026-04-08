import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  estimateCombinationCoverage,
  getPlanReferences,
  getPoolProducts,
  strategyMap,
} from '../lib/domain'
import { useAdminStore } from '../lib/store'
import { Button, Input, Select, Space, Table, Tag, Typography } from 'antd'
import { PlusOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text, Paragraph } = Typography

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
  status: 'ACTIVE' | 'INACTIVE'
  slotCount: number
  coverage: number
  linkedPlan: { id: string; name: string } | null
  createdAt: string
  businessUnit: string
}

export function CombinationsListPage() {
  const navigate = useNavigate()
  const { state, createCombination } = useAdminStore()
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

  useEffect(() => {
    setCurrentPage(1)
  }, [businessFilter, search, statusFilter])

  const dataSource: CombinationRow[] = filteredCombinations.map(({ combination, linkedPlans, coverage, businessUnit }) => {
    const linkedPlan = linkedPlans[0] ?? null
    return {
      key: combination.id,
      name: combination.name,
      id: combination.id,
      status: combination.status,
      slotCount: combination.slots.length,
      coverage,
      linkedPlan: linkedPlan ? { id: linkedPlan.id, name: linkedPlan.name } : null,
      createdAt: combination.createdAt,
      businessUnit,
    }
  })

  const columns: ColumnsType<CombinationRow> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.name}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.id}</Text>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'default'}>
          {status === 'ACTIVE' ? '生效中' : '已暂停'}
        </Tag>
      ),
    },
    {
      title: '资源位/覆盖商品数',
      key: 'slots',
      width: 160,
      render: (_, record) => (
        <Text>
          {String(record.slotCount).padStart(2, '0')}/{String(record.coverage).padStart(2, '0')}
        </Text>
      ),
    },
    {
      title: '关联计划',
      key: 'linkedPlan',
      width: 160,
      render: (_, record) =>
        record.linkedPlan ? (
          <Button
            type="link"
            size="small"
            style={{ padding: 0 }}
            onClick={() => navigate(`/plans/${record.linkedPlan!.id}/edit`)}
          >
            {record.linkedPlan.name}
          </Button>
        ) : (
          <Text type="secondary">未关联</Text>
        ),
    },
    {
      title: '更新时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (value: string) => {
        const date = new Date(value.replace(' ', 'T'))
        if (Number.isNaN(date.getTime())) return value
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}.${month}.${day}`
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => navigate(`/combinations/${record.id}`)}
        >
          编辑
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space direction="vertical" size="small">
        <Title level={4} style={{ margin: 0 }}>资源位策略编排</Title>
        <Paragraph type="secondary" style={{ margin: 0 }}>
          管理资源位编排与选品逻辑，覆盖全平台推荐场景。
        </Paragraph>
      </Space>

      <Space wrap>
        <Input
          placeholder="输入名称或编号搜索..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          allowClear
          style={{ width: 240 }}
        />
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 140 }}
          options={[
            { value: 'ALL', label: '全部状态' },
            { value: 'ACTIVE', label: '生效中' },
            { value: 'INACTIVE', label: '已暂停' },
          ]}
        />
        <Select
          value={businessFilter}
          onChange={(value) => setBusinessFilter(value)}
          style={{ width: 140 }}
          options={[
            { value: 'ALL', label: '全部业务线' },
            ...businessOptions.map((option) => ({ value: option, label: option })),
          ]}
        />
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
      </Space>

      <Table<CombinationRow>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          pageSize: 12,
          total: filteredCombinations.length,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        locale={{ emptyText: '暂无匹配的策略组合' }}
      />
    </Space>
  )
}
