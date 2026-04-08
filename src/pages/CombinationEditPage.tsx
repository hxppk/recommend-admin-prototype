import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createId, estimateCombinationCoverage, getPlanReferences, getStrategyProducts } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Combination, CombinationSlot } from '../lib/types'
import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Image,
  Input,
  InputNumber,
  Result,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  HolderOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons'

const { Text } = Typography

export function CombinationEditPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { state, updateCombination } = useAdminStore()
  const combination = state.combinations.find((item) => item.id === id)
  const [draft, setDraft] = useState<Combination | null>(combination ?? null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
  const isOwner = combination?.createdBy === CURRENT_USER
  const [isEditing, setIsEditing] = useState(isOwner)
  const readonly = !isEditing

  useEffect(() => {
    setDraft(combination ?? null)
  }, [combination])

  if (!combination || !draft) {
    return (
      <Result
        status="404"
        title="组合不存在"
        subTitle="请返回组合列表重新选择。"
        extra={
          <Button type="primary" onClick={() => navigate('/combinations')}>
            返回列表
          </Button>
        }
      />
    )
  }

  const currentDraft = draft

  const planRefs = getPlanReferences(state, currentDraft.id)
  const assignedCount = currentDraft.slots.filter((slot) => slot.strategyId).length
  const coverage = estimateCombinationCoverage(state, currentDraft)
  const previewProducts = currentDraft.slots
    .map((slot) => state.strategies.find((item) => item.id === slot.strategyId))
    .flatMap((strategy) => (strategy ? getStrategyProducts(state, strategy).slice(0, 1) : []))

  function handleSlotChange(slotId: string, patch: Partial<CombinationSlot>) {
    setDraft((current) => current
      ? {
          ...current,
          slots: current.slots.map((slot) => (slot.id === slotId ? { ...slot, ...patch } : slot)),
        }
      : current)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = currentDraft.slots.findIndex((slot) => slot.id === active.id)
    const newIndex = currentDraft.slots.findIndex((slot) => slot.id === over.id)
    setDraft({ ...currentDraft, slots: arrayMove(currentDraft.slots, oldIndex, newIndex) })
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {!isEditing && (
        <Flex justify="flex-end">
          {isOwner ? (
            <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
              进入编辑
            </Button>
          ) : (
            <Tooltip title="仅创建人可编辑">
              <Button icon={<EditOutlined />} disabled>
                进入编辑
              </Button>
            </Tooltip>
          )}
        </Flex>
      )}

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="总坑位数" value={currentDraft.slots.length} suffix="/ 10" />
            <Text type="secondary" style={{ fontSize: 12 }}>最多支持 10 个坑位</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="已绑策略数" value={assignedCount} />
            <Text type="secondary" style={{ fontSize: 12 }}>{currentDraft.slots.length - assignedCount} 个待配置</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="关联投放计划数" value={planRefs.length} />
            <Text type="secondary" style={{ fontSize: 12 }}>计划变更将同步生效</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="预计覆盖商品数" value={coverage} />
            <Text type="secondary" style={{ fontSize: 12 }}>按选品池去重估算</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={17}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Card
              title={
                <Flex align="center" gap={12}>
                  <Input
                    value={currentDraft.name}
                    disabled={readonly}
                    onChange={(event) => setDraft({ ...currentDraft, name: event.target.value })}
                    style={{ width: 300 }}
                  />
                  <Tag color={currentDraft.status === 'ACTIVE' ? 'green' : 'default'}>
                    {currentDraft.status === 'ACTIVE' ? '启用中' : '已停用'}
                  </Tag>
                </Flex>
              }
              extra={<Text type="secondary">拖拽调整坑位顺序，右侧联动预览。</Text>}
            >
              <Flex
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f0f0',
                  marginBottom: 8,
                }}
                gap={12}
                align="center"
              >
                <div style={{ width: 32 }} />
                <Text strong style={{ width: 60 }}>坑位序号</Text>
                <Text strong style={{ flex: 1 }}>绑定策略</Text>
                <Text strong style={{ width: 120 }}>选品池来源</Text>
                <Text strong style={{ width: 140 }}>预览商品</Text>
                <Text strong style={{ width: 60, textAlign: 'center' }}>操作</Text>
              </Flex>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={currentDraft.slots.map((slot) => slot.id)} strategy={verticalListSortingStrategy}>
                  <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    {currentDraft.slots.map((slot, index) => (
                      <SlotRow
                        key={slot.id}
                        index={index}
                        slot={slot}
                        onChange={handleSlotChange}
                        onRemove={() =>
                          setDraft({
                            ...currentDraft,
                            slots: currentDraft.slots.filter((item) => item.id !== slot.id),
                          })
                        }
                        disabledRemove={currentDraft.slots.length === 1}
                      />
                    ))}
                  </Space>
                </SortableContext>
              </DndContext>

              <Flex justify="center" style={{ marginTop: 16 }}>
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  disabled={currentDraft.slots.length >= 10}
                  onClick={() =>
                    setDraft({
                      ...currentDraft,
                      slots: [...currentDraft.slots, { id: createId('slot'), strategyId: null }],
                    })
                  }
                >
                  添加坑位
                </Button>
              </Flex>
            </Card>

            <Card title="推荐效果预览">
              <Flex gap={24} wrap>
                <Space>
                  <Text>同品类最多连续展示数：</Text>
                  <InputNumber
                    value={currentDraft.categoryLimit}
                    placeholder="不限制"
                    min={1}
                    max={10}
                    onChange={(value) =>
                      setDraft({
                        ...currentDraft,
                        categoryLimit: value ?? null,
                      })
                    }
                    style={{ width: 120 }}
                  />
                </Space>
                <Space>
                  <Text>Session 内去重：</Text>
                  <Switch checked={currentDraft.sessionDedup} disabled />
                  <Text type="secondary">默认开启，不可关闭</Text>
                </Space>
              </Flex>

              <Card
                style={{
                  maxWidth: 375,
                  margin: '24px auto 0',
                  background: '#fafafa',
                }}
              >
                <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                  <Text type="secondary">点单页推荐位</Text>
                  <Text strong>{currentDraft.name}</Text>
                </Flex>
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  {previewProducts.length === 0 ? (
                    <Empty description="暂无预览商品" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  ) : (
                    previewProducts.map((product, index) => (
                      <Card key={`${product.id}-${index}`} size="small">
                        <Flex gap={12} align="center">
                          <Tag color="blue">#{index + 1}</Tag>
                          <Image
                            src={`https://placehold.co/40x40/${product.accent.replace('#', '')}/white?text=${encodeURIComponent(product.name.charAt(0))}`}
                            width={40}
                            height={40}
                            preview={false}
                            fallback="https://placehold.co/40x40/eeeeee/999999?text=IMG"
                            style={{ borderRadius: 4, flexShrink: 0 }}
                          />
                          <Space direction="vertical" size={0} style={{ flex: 1, minWidth: 0 }}>
                            <Text ellipsis strong>{product.name}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              ¥{product.price}
                            </Text>
                          </Space>
                        </Flex>
                      </Card>
                    ))
                  )}
                </Space>
              </Card>
            </Card>
          </Space>
        </Col>

        <Col span={7}>
          <Card title="关联投放计划">
            {planRefs.length ? (
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                {planRefs.map((plan) => (
                  <Card key={plan.id} size="small">
                    <Flex justify="space-between" align="start">
                      <Space direction="vertical" size={0}>
                        <Text strong>{plan.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {plan.startAt.replace('T', ' ')} - {plan.endAt.replace('T', ' ')}
                        </Text>
                      </Space>
                      <Tag
                        color={
                          plan.status === 'PUBLISHED'
                            ? 'green'
                            : plan.status === 'PAUSED'
                              ? 'orange'
                              : 'default'
                        }
                      >
                        {plan.status}
                      </Tag>
                    </Flex>
                  </Card>
                ))}
              </Space>
            ) : (
              <Empty description="暂无关联投放计划">
                <Text type="secondary">先保存组合，再在投放计划中绑定。</Text>
              </Empty>
            )}
          </Card>
        </Col>
      </Row>

      {!readonly && (
        <Flex justify="flex-end" gap={12}>
          <Button onClick={() => navigate('/combinations')}>取消</Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => {
              updateCombination(currentDraft.id, currentDraft)
              navigate('/combinations')
            }}
          >
            保存
          </Button>
        </Flex>
      )}

    </Space>
  )
}

function SlotRow({
  slot,
  index,
  onChange,
  onRemove,
  disabledRemove,
}: {
  slot: CombinationSlot
  index: number
  onChange: (slotId: string, patch: Partial<CombinationSlot>) => void
  onRemove: () => void
  disabledRemove: boolean
}) {
  const { state } = useAdminStore()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: slot.id,
  })
  const strategy = state.strategies.find((item) => item.id === slot.strategyId)
  const pool = state.pools.find((item) => item.id === strategy?.poolId)
  const preview = strategy ? getStrategyProducts(state, strategy)[0] : null

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: isDragging ? '#fafafa' : undefined,
        borderRadius: 4,
      }}
    >
      <Flex gap={12} align="center" style={{ padding: '8px 0' }}>
        <Button
          type="text"
          icon={<HolderOutlined />}
          size="small"
          style={{ cursor: 'grab' }}
          {...attributes}
          {...listeners}
        />
        <Text strong style={{ width: 60 }}>#{index + 1}</Text>
        <Select
          value={slot.strategyId ?? undefined}
          placeholder="请选择策略"
          onChange={(value) => onChange(slot.id, { strategyId: value || null })}
          allowClear
          style={{ flex: 1 }}
          options={state.strategies.map((item) => ({
            value: item.id,
            label: `${item.name} · ${item.mode}`,
          }))}
        />
        <Text type="secondary" style={{ width: 120 }} ellipsis>
          {pool?.name ?? '—'}
        </Text>
        <div style={{ width: 140 }}>
          {preview ? (
            <Flex gap={8} align="center">
              <Image
                src={`https://placehold.co/32x32/${preview.accent.replace('#', '')}/white?text=${encodeURIComponent(preview.name.charAt(0))}`}
                width={32}
                height={32}
                preview={false}
                fallback="https://placehold.co/32x32/eeeeee/999999?text=IMG"
                style={{ borderRadius: 4, flexShrink: 0 }}
              />
              <Space direction="vertical" size={0} style={{ minWidth: 0 }}>
                <Text ellipsis style={{ fontSize: 12 }}>{preview.name}</Text>
                <Text type="secondary" style={{ fontSize: 11 }}>{preview.spuId}</Text>
              </Space>
            </Flex>
          ) : (
            <Text type="secondary">暂无预览</Text>
          )}
        </div>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          disabled={disabledRemove}
          onClick={onRemove}
          style={{ width: 60, textAlign: 'center' }}
        />
      </Flex>
    </div>
  )
}
