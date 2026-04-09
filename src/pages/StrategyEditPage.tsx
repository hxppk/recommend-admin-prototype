import {
  ArrowLeftOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FireOutlined,
  HolderOutlined,
  PlusOutlined,
  RocketOutlined,
  SearchOutlined,
  ToolOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Form,
  Input,
  List,
  Modal,
  Result,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
  Radio,
  message,
} from 'antd'
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { detectStrategyCycle, getPoolProducts, productMap } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Product, Strategy } from '../lib/types'

const modeMeta: Record<Strategy['mode'], { title: string; desc: string; icon: React.ReactNode; tag: string; color?: string }> = {
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

// 表单数据类型
interface StrategyFormValues {
  name: string
  description: string
  poolId: string
  mode: Strategy['mode']
  sortDimension?: 'SALES_COUNT' | 'SALES_AMOUNT'
  timeWindow?: '7D' | '14D' | '30D'
  fallbackStrategyId?: string
  status: 'ACTIVE' | 'INACTIVE'
}

export function StrategyEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id = '' } = useParams()
  const { state, updateStrategy, deleteStrategy } = useAdminStore()
  const strategy = state.strategies.find((item) => item.id === id)
  const isSystem = strategy?.kind === 'SYSTEM'
  const isOwner = strategy?.createdBy === CURRENT_USER
  const isNew = (location.state as { isNew?: boolean })?.isNew ?? false
  const [isEditing, setIsEditing] = useState(isNew)

  // 使用 Ant Design Form hook
  const [form] = Form.useForm<StrategyFormValues>()
  const readonly = !isEditing

  // 追踪表单字段变化（用于条件渲染和依赖逻辑）
  const [mode, setMode] = useState<Strategy['mode'] | null>(strategy?.mode ?? null)
  const [selectedPoolId, setSelectedPoolId] = useState(strategy?.poolId ?? '')
  const [fallbackId, setFallbackId] = useState<string | undefined>(strategy?.fallbackStrategyId || undefined)

  // 构建表单初始值
  const formInitialValues: StrategyFormValues = useMemo(() => {
    if (!strategy) return {
      name: '',
      description: '',
      poolId: '',
      mode: 'HOT' as const,
      status: 'ACTIVE' as const,
    }
    return {
      name: strategy.name,
      description: strategy.description || '',
      poolId: strategy.poolId,
      mode: strategy.mode,
      sortDimension: strategy.sortDimension,
      timeWindow: strategy.timeWindow,
      fallbackStrategyId: strategy.fallbackStrategyId || undefined,
      status: strategy.status,
    }
  }, [strategy?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // 初始化模式和选品池
  useEffect(() => {
    if (strategy) {
      setMode(strategy.mode)
      setSelectedPoolId(strategy.poolId)
      setFallbackId(strategy.fallbackStrategyId || undefined)
    }
  }, [strategy?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // 表单挂载后填充值（useLayoutEffect 确保在 paint 前完成）
  useEffect(() => {
    if (strategy) {
      form.setFieldsValue({
        name: strategy.name,
        description: strategy.description || '',
        poolId: strategy.poolId,
        mode: strategy.mode,
        sortDimension: strategy.sortDimension,
        timeWindow: strategy.timeWindow,
        fallbackStrategyId: strategy.fallbackStrategyId || undefined,
        status: strategy.status,
      })
    }
  }, [form, formInitialValues]) // 依赖 formInitialValues 确保策略切换时重新填充

  // 实时检测循环引用
  const cycleError = useMemo(() => {
    if (!strategy || !fallbackId) return null
    const tempDraft: Strategy = {
      ...strategy,
      fallbackStrategyId: fallbackId,
    }
    const tempState = {
      ...state,
      strategies: state.strategies.map((item) =>
        item.id === strategy.id ? tempDraft : item,
      ),
    }
    return detectStrategyCycle(tempState, strategy.id, tempDraft.fallbackStrategyId)
  }, [state, strategy, fallbackId])

  // 获取选品池商品（用于 MANUAL 模式）
  const productsById = productMap(state)
  const poolProducts = getPoolProducts(state, selectedPoolId)
  const [query, setQuery] = useState('')

  // MANUAL 模式：已选商品列表（使用本地 state 管理）
  const [manualProductIds, setManualProductIds] = useState<string[]>(strategy?.manualProductIds || [])
  useEffect(() => {
    if (strategy) {
      setManualProductIds(strategy.manualProductIds)
    }
  }, [strategy?.id]) // 仅在策略 ID 变化时重置

  const availableProducts = poolProducts.filter(
    (product) =>
      !manualProductIds.includes(product.id) &&
      (product.name.includes(query) || product.spuId.includes(query)),
  )

  const selectedProducts = manualProductIds
    .map((productId) => productsById[productId])
    .filter((product): product is typeof productsById[string] => Boolean(product))

  if (!strategy) {
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

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        const updated: Strategy = {
          ...strategy!,
          name: values.name,
          description: values.description || '',
          poolId: values.poolId,
          mode: values.mode,
          sortDimension: values.sortDimension || 'SALES_COUNT',
          timeWindow: values.timeWindow || '7D',
          fallbackStrategyId: values.fallbackStrategyId || null,
          manualProductIds: manualProductIds,
          filterUnavailable: true,
        }
        updateStrategy(strategy!.id, updated)
        message.success('保存成功')
        navigate('/strategies')
      })
      .catch((info) => {
        console.log('验证失败:', info)
      })
  }

  function handleCancel() {
    if (isNew) {
      deleteStrategy(strategy!.id)
      navigate('/strategies')
      return
    }
    form.resetFields()
    setManualProductIds(strategy?.manualProductIds || [])
    setIsEditing(false)
  }

  function handleToggleStatus() {
    if (!strategy) return
    updateStrategy(strategy.id, {
      ...strategy!,
      status: strategy!.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setManualProductIds((prev) => {
      const oldIndex = prev.indexOf(active.id as string)
      const newIndex = prev.indexOf(over.id as string)
      const newArr = [...prev]
      newArr.splice(oldIndex, 1)
      newArr.splice(newIndex, 0, active.id as string)
      return newArr
    })
  }

  // MANUAL 模式：添加商品
  function handleAddProduct(productId: string) {
    setManualProductIds((prev) => [...prev, productId])
  }

  // MANUAL 模式：移除商品
  function handleRemoveProduct(productId: string) {
    setManualProductIds((prev) => prev.filter((id) => id !== productId))
  }

  // MANUAL 模式：上移商品
  function handleMoveUp(index: number) {
    if (index === 0) return
    setManualProductIds((prev) => {
      const newArr = [...prev]
      ;[newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]]
      return newArr
    })
  }

  // MANUAL 模式：下移商品
  function handleMoveDown(index: number) {
    if (index === manualProductIds.length - 1) return
    setManualProductIds((prev) => {
      const newArr = [...prev]
      ;[newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]]
      return newArr
    })
  }

  return (
    <Flex vertical gap={24}>
      {/* 页面头部 */}
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={12}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/strategies')}
          />
          <Typography.Title level={4} style={{ margin: 0 }}>
            {isEditing ? '编辑排序策略' : strategy.name}
          </Typography.Title>
          {isSystem && <Tag color="blue">系统内置</Tag>}
        </Flex>
        <Space size={8}>
          {isEditing
            ? (
                <>
                  <Button onClick={handleCancel}>取消</Button>
                  <Button type="primary" disabled={Boolean(cycleError)} onClick={handleSave}>保存</Button>
                </>
              )
            : (
                <>
                  {isOwner ? (
                    <>
                      <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>编辑</Button>
                      <Button onClick={handleToggleStatus}>{isActive ? '停用' : '启用'}</Button>
                      <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>删除</Button>
                    </>
                  ) : (
                    <>
                      <Tooltip title="仅创建人可操作"><Button icon={<EditOutlined />} disabled>编辑</Button></Tooltip>
                      <Tooltip title="仅创建人可操作"><Button disabled>{isActive ? '停用' : '启用'}</Button></Tooltip>
                      <Tooltip title="仅创建人可操作"><Button danger icon={<DeleteOutlined />} disabled>删除</Button></Tooltip>
                    </>
                  )}
                </>
              )
          }
        </Space>
      </Flex>

      <Form
        form={form}
        layout="vertical"
        disabled={readonly}
        labelCol={{ span: 24 }}
        style={{ border: 'none', padding: 0, margin: 0 }}
      >
        {/* 区域一：基础信息 */}
        <Card title="基础信息" bordered style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="策略名称"
                name="name"
                rules={[
                  { required: true, message: '请输入策略名称' },
                  { min: 1, max: 30, message: '策略名称长度为 1-30 字' },
                ]}
              >
                <Input placeholder="请输入策略名称，1-30 字" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="选择选品池"
                name="poolId"
                rules={[{ required: true, message: '请选择选品池' }]}
              >
                <Select
                  placeholder="请选择选品池"
                  onChange={setSelectedPoolId}
                  options={state.pools.map((pool) => ({
                    label: `${pool.name} · ${pool.productIds.length} 件商品`,
                    value: pool.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="描述"
                name="description"
                rules={[{ max: 200, message: '描述最多 200 字' }]}
              >
                <Input.TextArea
                  placeholder="选填，描述该策略的用途和适用场景"
                  rows={2}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 区域二：排序模式 */}
        <Card title="排序模式" bordered style={{ marginBottom: 24 }}>
          <Form.Item
            label="排序方式"
            name="mode"
            rules={[{ required: true, message: '请选择排序方式' }]}
          >
            <Radio.Group
              onChange={(e) => setMode(e.target.value)}
              value={mode}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
            >
              {(['HOT', 'NEW', 'MANUAL'] as const).map((m) => {
                const meta = modeMeta[m]
                const isSelected = mode === m
                return (
                  <div
                    key={m}
                    style={{
                      flex: 1,
                      minWidth: 220,
                      padding: 16,
                      borderRadius: 8,
                      border: `1px solid ${isSelected ? '#1677ff' : '#d9d9d9'}`,
                      background: isSelected ? '#e6f4ff' : '#ffffff',
                      cursor: readonly ? 'default' : 'pointer',
                      position: 'relative',
                      transition: 'border-color 0.2s',
                    }}
                    onClick={() => {
                      if (readonly) return
                      setMode(m)
                      form.setFieldValue('mode', m)
                    }}
                    onMouseEnter={(e) => {
                      if (readonly || isSelected) return
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#1677ff'
                    }}
                    onMouseLeave={(e) => {
                      if (readonly || isSelected) return
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#d9d9d9'
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 20,
                          height: 20,
                          background: '#1677ff',
                          borderRadius: '0 8px 0 8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CheckOutlined style={{ color: '#fff', fontSize: 12 }} />
                      </div>
                    )}
                    <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
                      <Space>
                        {meta.icon}
                        <Typography.Text
                          strong
                          style={{ color: isSelected ? '#1677ff' : undefined }}
                        >
                          {meta.title}
                        </Typography.Text>
                      </Space>
                      {meta.tag === 'MANUAL' ? (
                        <Tag>{meta.tag}</Tag>
                      ) : (
                        <Tag color={meta.color}>{meta.tag}</Tag>
                      )}
                    </Flex>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {meta.desc}
                    </Typography.Text>
                  </div>
                )
              })}
            </Radio.Group>
          </Form.Item>

          {/* HOT 模式参数 */}
          <Form.Item noStyle shouldUpdate>
            {() =>
              mode === 'HOT' && (
                <Row gutter={24} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Form.Item
                      label="排序维度"
                      name="sortDimension"
                      rules={[{ required: true, message: '请选择排序维度' }]}
                    >
                      <Select options={sortDimensionOptions} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="时间窗口"
                      name="timeWindow"
                      rules={[{ required: true, message: '请选择时间窗口' }]}
                    >
                      <Select options={timeWindowOptions} />
                    </Form.Item>
                  </Col>
                </Row>
              )
            }
          </Form.Item>

          {/* NEW 模式参数 */}
          <Form.Item noStyle shouldUpdate>
            {() =>
              mode === 'NEW' && (
                <Row gutter={24} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Form.Item
                      label="时间窗口"
                      name="timeWindow"
                      rules={[{ required: true, message: '请选择时间窗口' }]}
                      help="上新时间在该窗口内的商品参与排序"
                    >
                      <Select options={timeWindowOptions} />
                    </Form.Item>
                  </Col>
                </Row>
              )
            }
          </Form.Item>

          {/* MANUAL 模式：商品排序 */}
          <Form.Item noStyle shouldUpdate>
            {() =>
              mode === 'MANUAL' && (
                <Row gutter={24} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Card
                      title="选品池商品"
                      style={{ height: 480 }}
                      bodyStyle={{ height: 'calc(100% - 48px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}
                    >
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                        <Input.Search
                          placeholder="搜索商品"
                          allowClear
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          prefix={<SearchOutlined />}
                        />
                      </div>
                      <div style={{ flex: 1, overflowY: 'auto' }}>
                        <List
                          dataSource={availableProducts}
                          split
                          locale={{ emptyText: <Empty description="无可用商品" /> }}
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
                                        onClick={() => handleAddProduct(product.id)}
                                      >
                                        添加
                                      </Button>,
                                    ]
                              }
                            >
                              <List.Item.Meta
                                title={product.name}
                                description={
                                  <Typography.Text type="secondary">{product.spuId}</Typography.Text>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title={`已选排序列表（${manualProductIds.length} 个商品）`}
                      style={{ height: 480 }}
                      bodyStyle={{ height: 'calc(100% - 48px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}
                    >
                      <div style={{ flex: 1, overflowY: 'auto' }}>
                        {selectedProducts.length === 0 ? (
                          <Flex align="center" justify="center" style={{ height: '100%' }}>
                            <Empty description="请从左侧添加商品" />
                          </Flex>
                        ) : (
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                          >
                            <SortableContext
                              items={manualProductIds}
                              strategy={verticalListSortingStrategy}
                            >
                              {selectedProducts.map((product, index) => (
                                <ManualSortRow
                                  key={product.id}
                                  product={product}
                                  index={index}
                                  total={selectedProducts.length}
                                  readonly={readonly}
                                  onMoveUp={() => handleMoveUp(index)}
                                  onMoveDown={() => handleMoveDown(index)}
                                  onRemove={() => handleRemoveProduct(product.id)}
                                />
                              ))}
                            </SortableContext>
                          </DndContext>
                        )}
                      </div>
                    </Card>
                  </Col>
                </Row>
              )
            }
          </Form.Item>
        </Card>

        {/* 区域三：高级配置 */}
        <Card title="高级配置" bordered style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={12}>
              {strategy.kind === 'SYSTEM' ? (
                <Form.Item label="兜底策略">
                  <Input value="系统终极兜底，无需配置" disabled />
                </Form.Item>
              ) : (
                <>
                  <Form.Item
                    label="兜底策略"
                    name="fallbackStrategyId"
                    help={cycleError ?? '默认使用全量热销榜兜底，可更换为其他排序策略。'}
                    validateStatus={cycleError ? 'error' : undefined}
                  >
                    <Select
                      placeholder="请选择兜底策略（可选）"
                      allowClear
                      onChange={setFallbackId}
                      options={state.strategies
                        .filter((item) => item.id !== strategy.id)
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
                <Flex align="center" gap={8}>
                  <Tag color="success">已开启</Tag>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    不可取消
                  </Typography.Text>
                </Flex>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Flex>
  )
}

function ManualSortRow({
  product,
  index,
  total,
  readonly,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  product: Product
  index: number
  total: number
  readonly: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id })

  const style: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    background: isDragging ? '#e6f4ff' : '#fff',
    opacity: isDragging ? 0.5 : 1,
    transition,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Flex align="center" gap={8}>
        {/* 拖拽手柄 */}
        {!readonly && (
          <span
            {...attributes}
            {...listeners}
            style={{ cursor: 'grab', color: '#bfbfbf', fontSize: 16, flexShrink: 0 }}
          >
            <HolderOutlined />
          </span>
        )}
        {/* 序号 */}
        <Avatar size="small" style={{ background: '#f0f0f0', color: '#666', flexShrink: 0 }}>
          {index + 1}
        </Avatar>
        {/* 商品信息 */}
        <Flex vertical gap={2} style={{ minWidth: 0, flex: 1 }}>
          <Typography.Text strong ellipsis style={{ fontSize: 14 }}>
            {product.name}
          </Typography.Text>
          <Flex gap={8} align="center" style={{ fontSize: 12 }}>
            <Typography.Text type="secondary">{product.spuId}</Typography.Text>
            <Tag style={{ margin: 0 }}>{product.category}</Tag>
            <Typography.Text type="secondary">¥{product.price}</Typography.Text>
          </Flex>
        </Flex>
        {/* 操作按钮 */}
        {!readonly && (
          <Space size="small">
            <Tooltip title="上移">
              <Button
                type="text"
                size="small"
                icon={<UpOutlined />}
                disabled={index === 0}
                onClick={onMoveUp}
              />
            </Tooltip>
            <Tooltip title="下移">
              <Button
                type="text"
                size="small"
                icon={<DownOutlined />}
                disabled={index === total - 1}
                onClick={onMoveDown}
              />
            </Tooltip>
            <Tooltip title="移除">
              <Button
                type="link"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={onRemove}
              >
                移除
              </Button>
            </Tooltip>
          </Space>
        )}
      </Flex>
    </div>
  )
}
