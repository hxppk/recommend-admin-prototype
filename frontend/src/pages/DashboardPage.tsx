import { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getAbTestTable, getDashboardSeries, getMetricSummary } from '../lib/domain'
import { useAdminStore } from '../lib/store'
import type { DashboardMetric } from '../lib/types'
import {
  Card,
  Checkbox,
  Col,
  Row,
  Segmented,
  Statistic,
  Table,
  Typography,
} from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Paragraph } = Typography

const metricOptions = [
  { label: 'CTR', value: 'ctr' },
  { label: '坑位空置率', value: 'vacancy' },
  { label: '曝光量', value: 'exposure' },
]

const abColumns: ColumnsType<{
  id: string
  planName: string
  name: string
  ctr: string
  vacancy: string
  exposure: number
  significance: string
}> = [
  { title: '计划', dataIndex: 'planName', key: 'planName' },
  {
    title: '分组名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <strong>{text}</strong>,
  },
  { title: 'CTR', dataIndex: 'ctr', key: 'ctr', render: (v: string) => `${v}%` },
  { title: '空置率', dataIndex: 'vacancy', key: 'vacancy', render: (v: string) => `${v}%` },
  { title: '曝光量', dataIndex: 'exposure', key: 'exposure' },
  { title: '显著性', dataIndex: 'significance', key: 'significance' },
]

export function DashboardPage() {
  const { state } = useAdminStore()
  const [metric, setMetric] = useState<DashboardMetric>('ctr')
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([])
  const [selectedStoreIds, setSelectedStoreIds] = useState<string[]>([])

  const chartSeries = getDashboardSeries(state, metric, selectedPlanIds, selectedStoreIds)
  const ctr = getMetricSummary(state, 'ctr', selectedPlanIds, selectedStoreIds)
  const vacancy = getMetricSummary(state, 'vacancy', selectedPlanIds, selectedStoreIds)
  const exposure = getMetricSummary(state, 'exposure', selectedPlanIds, selectedStoreIds)
  const abTable = getAbTestTable(state, selectedPlanIds)
  const lineKeys = chartSeries.flatMap((row) =>
    Object.keys(row).filter((key) => key !== 'date'),
  )
  const uniqueLineKeys = [...new Set(lineKeys)]
  const colors = ['#111827', '#3B82F6', '#F59E0B', '#8B5CF6']

  const planOptions = state.plans
    .filter((plan) => plan.status !== 'ENDED')
    .map((plan) => ({ label: plan.name, value: plan.id }))

  const storeOptions = state.stores.map((store) => ({
    label: store.name,
    value: store.id,
  }))

  return (
    <div>
      <Title level={3}>数据报告</Title>
      <Paragraph type="secondary">查看推荐位各维度的运营效果数据</Paragraph>

      <Card title="筛选器" style={{ marginBottom: 16 }}>
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <Typography.Text strong style={{ marginRight: 12 }}>投放计划</Typography.Text>
            <Checkbox.Group
              options={planOptions}
              value={selectedPlanIds}
              onChange={(values) => setSelectedPlanIds(values as string[])}
            />
          </Col>
          <Col span={24}>
            <Typography.Text strong style={{ marginRight: 12 }}>门店筛选</Typography.Text>
            <Checkbox.Group
              options={storeOptions}
              value={selectedStoreIds}
              onChange={(values) => setSelectedStoreIds(values as string[])}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="推荐位 CTR"
              value={ctr.value}
              precision={2}
              suffix="%"
              prefix={
                ctr.delta >= 0 ? (
                  <ArrowUpOutlined style={{ color: '#3f8600' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#cf1322' }} />
                )
              }
            />
            <Typography.Text type="secondary">
              {ctr.delta >= 0 ? '+' : ''}{ctr.delta.toFixed(2)} 环比
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="坑位空置率"
              value={vacancy.value}
              precision={2}
              suffix="%"
              prefix={
                vacancy.delta >= 0 ? (
                  <ArrowUpOutlined style={{ color: '#cf1322' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#3f8600' }} />
                )
              }
            />
            <Typography.Text type="secondary">
              {vacancy.delta >= 0 ? '+' : ''}{vacancy.delta.toFixed(2)} 环比
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="曝光量"
              value={Math.round(exposure.value)}
              prefix={
                exposure.delta >= 0 ? (
                  <ArrowUpOutlined style={{ color: '#3f8600' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#cf1322' }} />
                )
              }
            />
            <Typography.Text type="secondary">
              {exposure.delta >= 0 ? '+' : ''}{Math.abs(exposure.delta).toFixed(0)} 环比
            </Typography.Text>
          </Card>
        </Col>
      </Row>

      <Card
        title="趋势图"
        extra={
          <Segmented
            options={metricOptions}
            value={metric}
            onChange={(value) => setMetric(value as DashboardMetric)}
          />
        }
        style={{ marginBottom: 16 }}
      >
        <div style={{ width: '100%', height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              {uniqueLineKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {abTable.length > 0 && (
        <Card title="实验效果对比">
          <Table
            columns={abColumns}
            dataSource={abTable}
            rowKey="id"
            pagination={false}
            size="middle"
          />
        </Card>
      )}
    </div>
  )
}
