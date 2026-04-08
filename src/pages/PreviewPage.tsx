import { useState } from 'react'
import { simulatePreview } from '../lib/domain'
import { useAdminStore } from '../lib/store'
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export function PreviewPage() {
  const { state } = useAdminStore()
  const [storeId, setStoreId] = useState(state.stores[0]?.id ?? '')
  const [userId, setUserId] = useState('coffee-user-808')
  const [result, setResult] = useState(() => simulatePreview(state, storeId, userId))

  const storeOptions = state.stores.map((store) => ({
    label: store.name,
    value: store.id,
  }))

  return (
    <div>
      <Title level={3}>全链路预览</Title>
      <Paragraph type="secondary">模拟推荐请求，查看命中计划、推荐结果和排序 Trace</Paragraph>

      <Card title="模拟请求" style={{ marginBottom: 16 }}>
        <Flex gap={16} align="end">
          <div style={{ flex: 1 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>门店选择</Text>
            <Select
              value={storeId}
              onChange={(value) => setStoreId(value)}
              options={storeOptions}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>用户 ID</Text>
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => setResult(simulatePreview(state, storeId, userId))}
            >
              模拟请求
            </Button>
          </div>
        </Flex>
      </Card>

      {!result.plan ? (
        <Alert
          type="warning"
          showIcon
          message="本次请求未命中投放计划"
          description={result.missReason ?? '请检查门店、人群和时间窗口。'}
        />
      ) : (
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Card title="推荐结果">
            <Descriptions bordered column={3} size="middle" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="命中计划">{result.plan.name}</Descriptions.Item>
              <Descriptions.Item label="ABTest 分组">
                {result.groupName ?? '未开启'}
              </Descriptions.Item>
              <Descriptions.Item label="识别人群">
                {result.inferredSegments.length > 0 ? (
                  <Space size={4} wrap>
                    {result.inferredSegments.map((segment) => (
                      <Tag key={segment.id} color="blue">{segment.name}</Tag>
                    ))}
                  </Space>
                ) : (
                  <Tag>暂无画像</Tag>
                )}
              </Descriptions.Item>
            </Descriptions>

            <Row gutter={[16, 16]}>
              {result.slots.map((slot) => (
                <Col key={slot.slotId} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    size="small"
                    title={
                      <Space>
                        <Tag color="processing">#{slot.slotIndex}</Tag>
                        <Text strong>{slot.strategyName}</Text>
                      </Space>
                    }
                  >
                    {slot.product ? (
                      <Flex vertical gap={4}>
                        <Text strong>{slot.product.name}</Text>
                        <Text type="secondary">{slot.product.category}</Text>
                        <Text type="danger">{`\uFFE5${slot.product.price}`}</Text>
                        <Tag color={slot.product.status === 'ACTIVE' ? 'green' : 'default'}>
                          {slot.product.status === 'ACTIVE' ? '在售' : '下架'}
                        </Tag>
                      </Flex>
                    ) : (
                      <Text type="secondary">空置</Text>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          <Card title="Trace 信息">
            <Tabs
              defaultActiveKey="ops"
              items={[
                {
                  key: 'ops',
                  label: '运营视角',
                  children: (
                    <Timeline
                      items={result.slots.map((slot) => ({
                        color: slot.product ? 'green' : 'red',
                        children: (
                          <div>
                            <Text strong>
                              坑位 {slot.slotIndex}{' '}
                              {slot.product
                                ? `\u2192 \u63A8\u8350\u4E86\u300C${slot.product.name}\u300D`
                                : '\u2192 \u672A\u63A8\u8350\u5546\u54C1'}
                            </Text>
                            <br />
                            <Text type="secondary">原因：{slot.reason}</Text>
                            {slot.skipReasons.length > 0 && (
                              <div style={{ marginTop: 4 }}>
                                <Space size={4} wrap>
                                  {slot.skipReasons.map((reason) => (
                                    <Tag key={reason} color="orange">{reason}</Tag>
                                  ))}
                                </Space>
                              </div>
                            )}
                          </div>
                        ),
                      }))}
                    />
                  ),
                },
                {
                  key: 'tech',
                  label: '技术视角',
                  children: (
                    <pre
                      style={{
                        background: '#f5f5f5',
                        padding: 16,
                        borderRadius: 6,
                        overflow: 'auto',
                        maxHeight: 480,
                        fontSize: 13,
                        lineHeight: 1.6,
                      }}
                    >
                      {JSON.stringify(result.technicalTrace, null, 2)}
                    </pre>
                  ),
                },
              ]}
            />
          </Card>
        </Space>
      )}
    </div>
  )
}
