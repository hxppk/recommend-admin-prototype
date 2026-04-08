import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  FireOutlined,
  HolderOutlined,
  PlusOutlined,
  RocketOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Form,
  Input,
  List,
  Modal,
  Radio,
  Result,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { detectStrategyCycle, getPoolProducts, productMap } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Product, Strategy } from '../lib/types'

const modeMeta: Record<Strategy['mode'], { title: string; desc: string; icon: React.ReactNode; tag: string; color: string }> = {
  HOT: {
    title: '热销排行',
    desc: '按销量 / 交易额自动排序',
    icon: <FireOutlined />,
    tag: 'HOT',
    color: 'orange',
  },
  NEW: {
    title: '新品排行',
    desc: '按上新时间排序',
    icon: <RocketOutlined />,
    tag: 'NEW',
    color: 'blue',
  },
  MANUAL: {
    title: '人工定序',
    desc: '人工拖拽确定顺序',
    icon: <ToolOutlined />,
    tag: 'MANUAL',
    color: 'purple',
  },
}

const sortDimensionOptions = [
  { label: '销量（杯数）', value: 'SALES_COUNT' },
  { label: '销售额（金额）', value: 'SALES_AMOUNT' },
]

const timeWindowOptions = [
  { label: '近 7 天', value: '7D' },
  { label: '近 14 天', value: '14D' },
  { label: '近 30 天', value: '30D' },
]

export function StrategyEditPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { state, updateStrategy, deleteStrategy } = useAdminStore()
  const strategy = state.strategies.find((item) => item.id === id)
  const [draft, setDraft] = useState<Strategy | null>(strategy ?? null)
  const [query, setQuery] = useState('')
  const isSystem = strategy?.kind === 'SYSTEM'
  const isOwner = strategy?.createdBy === CURRENT_USER
  const [isEditing, setIsEditing] = useState(false)
  const readonly = !isEditing

  useEffect(() => {
    setDraft(strategy ?? null)
  }, [strategy])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  if (!strategy || !draft) {
    return (
      <Result
        status="404"
        title="策略不存在"
        subTitle="请返回策略列表重新选择。"
        extra={
          <Button type="primary" onClick={() => navigate('/strategies')}>
            返回列表
          </Button>
        }
      />
    )
  }

  const currentDraft = draft

  const tempState = {
    ...state,
    strategies: state.strategies.map((item) => (item.id === currentDraft.id ? currentDraft : item)),
  }
  const cycleError = detectStrategyCycle(tempState, currentDraft.id, currentDraft.fallbackStrategyId)
  const productsById = productMap(state)
  const poolProducts = getPoolProducts(state, currentDraft.poolId)
  const availableProducts = poolProducts.filter(
    (product) =>
      !currentDraft.manualProductIds.includes(product.id) &&
      (product.name.includes(query) || product.spuId.includes(query)),
  )
  const selectedProducts = currentDraft.manualProductIds
    .map((productId) => productsById[productId])
    .filter((product): product is Product => Boolean(product))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = currentDraft.manualProductIds.indexOf(String(active.id))
    const newIndex = currentDraft.manualProductIds.indexOf(String(over.id))
    setDraft((current) =>
      current
        ? { ...current, manualProductIds: arrayMove(current.manualProductIds, oldIndex, newIndex) }
        : current,
    )
  }

  function handleSave() {
    updateStrategy(currentDraft.id, currentDraft)
    setIsEditing(false)
  }

  function handleCancel() {
    setDraft(strategy ?? null)
    setIsEditing(false)
  }

  function handleToggleStatus() {
    if (!strategy) return
    updateStrategy(strategy.id, {
      ...strategy,
      status: strategy.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
    })
  }

  function handleDelete() {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除策略「${strategy!.name}」吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        deleteStrategy(strategy!.id)
        navigate('/strategies')
      },
    })
  }

  const isActive = strategy.status === 'ACTIVE'

  function renderHeaderActions() {
    if (isSystem) return null

    if (isEditing) {
      return (
        <Space>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" disabled={Boolean(cycleError)} onClick={handleSave}>
            保存
          </Button>
        </Space>
      )
    }

    if (isOwner) {
      return (
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
            编辑
          </Button>
          <Button onClick={handleToggleStatus}>
            {isActive ? '停用' : '启用'}
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
            删除
          </Button>
        </Space>
      )
    }

    return (
      <Space>
        <Tooltip title="仅创建人可操作">
          <Button type="primary" icon={<EditOutlined />} disabled>
            编辑
          </Button>
        </Tooltip>
        <Tooltip title="仅创建人可操作">
          <Button disabled>
            {isActive ? '停用' : '启用'}
          </Button>
        </Tooltip>
        <Tooltip title="仅创建人可操作">
          <Button danger icon={<DeleteOutlined />} disabled>
            删除
          </Button>
        </Tooltip>
      </Space>
    )
  }

  return (
    <Flex vertical gap={16}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={12}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/strategies')}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            {isEditing ? '编辑排序策略' : '查看排序策略'}
          </Typography.Title>
          {isSystem && <Tag color="blue">系统内置</Tag>}
        </Flex>
        {renderHeaderActions()}
      </Flex>

      <fieldset disabled={readonly} style={{ border: 'none', padding: 0, margin: 0 }}>

      {/* 区域一：基础信息 */}
      <Card title="基础信息">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="策略名称">
                <Input
                  value={currentDraft.name}
                  onChange={(e) => setDraft({ ...currentDraft, name: e.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="选择选品池">
                <Select
                  value={currentDraft.poolId}
                  onChange={(value) =>
                    setDraft({
                      ...currentDraft,
                      poolId: value,
                      manualProductIds: [],
                    })
                  }
                  options={state.pools.map((pool) => ({
                    label: `${pool.name} · ${pool.productIds.length} 件商品`,
                    value: pool.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="描述">
            <Input.TextArea
              value={currentDraft.description}
              placeholder="选填，描述该策略的用途和适用场景"
              rows={2}
              maxLength={200}
              showCount
              onChange={(e) => setDraft({ ...currentDraft, description: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Card>

      {/* 区域二：排序模式 */}
      <Card title="排序模式" style={{ marginTop: 16 }}>
        <Form layout="vertical">
          <Radio.Group
            value={currentDraft.mode}
            onChange={(e) => setDraft({ ...currentDraft, mode: e.target.value })}
            style={{ width: '100%' }}
          >
            <Row gutter={16}>
              {(['HOT', 'NEW', 'MANUAL'] as const).map((mode) => {
                const meta = modeMeta[mode]
                return (
                  <Col span={8} key={mode}>
                    <Radio.Button
                      value={mode}
                      style={{
                        width: '100%',
                        height: 'auto',
                        padding: '16px',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                      }}
                    >
                      <Flex justify="space-between" align="center">
                        <Space>
                          {meta.icon}
                          <Typography.Text strong>{meta.title}</Typography.Text>
                        </Space>
                        <Tag color={meta.color}>{meta.tag}</Tag>
                      </Flex>
                      <Typography.Text
                        type="secondary"
                        style={{ display: 'block', marginTop: 8, fontSize: 12 }}
                      >
                        {meta.desc}
                      </Typography.Text>
                    </Radio.Button>
                  </Col>
                )
              })}
            </Row>
          </Radio.Group>

          {/* HOT 模式参数 */}
          {currentDraft.mode === 'HOT' && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Form.Item label="排序维度">
                  <Select
                    value={currentDraft.sortDimension}
                    options={sortDimensionOptions}
                    onChange={(value) => setDraft({ ...currentDraft, sortDimension: value })}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="时间窗口">
                  <Select
                    value={currentDraft.timeWindow}
                    options={timeWindowOptions}
                    onChange={(value) => setDraft({ ...currentDraft, timeWindow: value })}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* NEW 模式参数 */}
          {currentDraft.mode === 'NEW' && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Form.Item label="时间窗口" help="上新时间在该窗口内的商品参与排序">
                  <Select
                    value={currentDraft.timeWindow}
                    options={timeWindowOptions}
                    onChange={(value) => setDraft({ ...currentDraft, timeWindow: value })}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* MANUAL 模式：商品拖拽区 */}
          {currentDraft.mode === 'MANUAL' && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card
                  size="small"
                  title="选品池商品"
                  extra={
                    <Input
                      placeholder="搜索商品"
                      allowClear
                      style={{ width: 160 }}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  }
                >
                  <List
                    dataSource={availableProducts}
                    locale={{ emptyText: <Empty description="无匹配商品" /> }}
                    style={{ maxHeight: 400, overflow: 'auto' }}
                    renderItem={(product) => (
                      <List.Item
                        actions={
                          readonly
                            ? []
                            : [
                                <Button
                                  key="add"
                                  type="link"
                                  size="small"
                                  icon={<PlusOutlined />}
                                  onClick={() =>
                                    setDraft({
                                      ...currentDraft,
                                      manualProductIds: [...currentDraft.manualProductIds, product.id],
                                    })
                                  }
                                >
                                  添加
                                </Button>,
                              ]
                        }
                      >
                        <List.Item.Meta
                          title={product.name}
                          description={product.spuId}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="已选排序列表">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={currentDraft.manualProductIds} strategy={verticalListSortingStrategy}>
                      <Flex vertical gap={0} style={{ maxHeight: 400, overflow: 'auto' }}>
                        {selectedProducts.length === 0 ? (
                          <Empty description="请从左侧添加商品" />
                        ) : (
                          selectedProducts.map((product) => (
                            <ManualSortRow
                              key={product.id}
                              product={product}
                              readonly={readonly}
                              onRemove={() =>
                                setDraft({
                                  ...currentDraft,
                                  manualProductIds: currentDraft.manualProductIds.filter(
                                    (item) => item !== product.id,
                                  ),
                                })
                              }
                            />
                          ))
                        )}
                      </Flex>
                    </SortableContext>
                  </DndContext>
                </Card>
              </Col>
            </Row>
          )}
        </Form>
      </Card>

      {/* 区域三：高级配置 */}
      <Card title="高级配置" style={{ marginTop: 16 }}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              {currentDraft.kind === 'SYSTEM' ? (
                <Form.Item label="兜底策略">
                  <Input value="系统终极兜底，无需配置" disabled />
                </Form.Item>
              ) : (
                <>
                  <Form.Item
                    label="兜底策略"
                    help={cycleError ?? '默认使用全量热销榜兜底，可更换为其他排序策略。'}
                    validateStatus={cycleError ? 'error' : undefined}
                  >
                    <Select
                      value={currentDraft.fallbackStrategyId ?? 'strategy-hot-all'}
                      onChange={(value) =>
                        setDraft({
                          ...currentDraft,
                          fallbackStrategyId: value,
                        })
                      }
                      options={state.strategies
                        .filter((item) => item.id !== currentDraft.id)
                        .map((item) => ({
                          label: (
                            <Space>
                              <span>{item.name}</span>
                              {item.kind === 'SYSTEM' && <Tag color="default">系统默认</Tag>}
                            </Space>
                          ),
                          value: item.id,
                        }))}
                    />
                  </Form.Item>
                  {cycleError && (
                    <Alert type="warning" message={cycleError} showIcon style={{ marginBottom: 16 }} />
                  )}
                </>
              )}
            </Col>
            <Col span={12}>
              <Form.Item label="过滤规则" help="系统自动过滤下架 / 不可售商品">
                <Input value="已开启，且不可取消" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      </fieldset>
    </Flex>
  )
}

function ManualSortRow({
  product,
  readonly,
  onRemove,
}: {
  product: Product
  readonly: boolean
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        padding: '8px 12px',
        borderBottom: '1px solid #f0f0f0',
        background: isDragging ? '#fafafa' : '#fff',
        cursor: 'default',
      }}
    >
      <Flex align="center" gap={8}>
        {!readonly && (
          <HolderOutlined
            style={{ cursor: 'grab', color: '#999', fontSize: 16 }}
            {...attributes}
            {...listeners}
          />
        )}
        <Flex vertical style={{ flex: 1, minWidth: 0 }}>
          <Typography.Text ellipsis>{product.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {`\u00A5${product.price}`}
          </Typography.Text>
        </Flex>
        {!readonly && (
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={onRemove}
          >
            移除
          </Button>
        )}
      </Flex>
    </div>
  )
}
