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
  HolderOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Breadcrumb,
  Card,
  Col,
  Dropdown,
  Empty,
  Flex,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createId, estimateCombinationCoverage, getPlanReferences } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Combination, CombinationSlot } from '../lib/types'

const GROUP_COLORS = ['#1677ff', '#fa8c16', '#52c41a', '#722ed1', '#eb2f96', '#13c2c2']

export function CombinationEditPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { state, updateCombination, deleteCombination } = useAdminStore()
  const combination = state.combinations.find((item) => item.id === id)
  const [draft, setDraft] = useState<Combination | null>(combination ?? null)
  const isOwner = combination?.createdBy === CURRENT_USER
  const [isEditing, setIsEditing] = useState(isOwner)
  const readonly = !isEditing

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )


  // 策略分组：统计每个策略被哪些 slot 使用
  const strategyGroups = useMemo(() => {
    if (!draft) return { indexes: new Map(), colors: new Map() }
    const groups = new Map<string | null, number[]>()
    draft.slots.forEach((slot, index) => {
      const key = slot.strategyId
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(index)
    })
    // 只为出现 2 次以上的策略分配颜色
    const colorMap = new Map<string, string>()
    let ci = 0
    for (const [strategyId, indexes] of groups) {
      if (!strategyId || indexes.length < 2) continue
      colorMap.set(strategyId, GROUP_COLORS[ci % GROUP_COLORS.length])
      ci += 1
    }
    return { indexes: groups, colors: colorMap }
  }, [draft?.slots])

  useEffect(() => {
    setDraft(combination ?? null)
  }, [combination])

  if (!combination || !draft) {
    return (
      <Empty description="组合不存在，请返回组合列表重新选择。">
        <Button type="primary" onClick={() => navigate('/combinations')}>返回列表</Button>
      </Empty>
    )
  }

  const planRefs = getPlanReferences(state, draft.id)
  const coverage = estimateCombinationCoverage(state, draft)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = draft!.slots.findIndex((slot) => slot.id === active.id)
    const newIndex = draft!.slots.findIndex((slot) => slot.id === over.id)
    setDraft({ ...draft!, slots: arrayMove(draft!.slots, oldIndex, newIndex) })
  }

  function handleSlotChange(slotId: string, patch: Partial<CombinationSlot>) {
    setDraft((current) => current
      ? { ...current, slots: current.slots.map((slot) => (slot.id === slotId ? { ...slot, ...patch } : slot)) }
      : current)
  }

  function handleRemoveSlot(slotId: string) {
    if (draft!.slots.length <= 1) return
    setDraft({ ...draft!, slots: draft!.slots.filter((s) => s.id !== slotId) })
  }

  function handleSave() {
    if (!draft) return
    if (!draft.name.trim()) {
      Modal.warning({
        title: '保存失败',
        content: '策略组合名称不能为空',
        okText: '知道了',
      })
      return
    }
    updateCombination(draft.id, { ...draft, name: draft.name.trim() })
    navigate('/combinations')
  }

  function handleCancel() {
    setDraft(combination ?? null)
    setIsEditing(false)
  }

  function handleDelete() {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除策略组合「${draft!.name}」吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        deleteCombination(draft!.id)
        navigate('/combinations')
      },
    })
  }

  function handleToggleStatus() {
    updateCombination(draft!.id, {
      ...draft!,
      status: draft!.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
    })
  }

  return (
    <Flex vertical style={{ gap: 24 }}>
      <Breadcrumb
        items={[
          { title: '推荐系统' },
          { title: <a onClick={() => navigate('/combinations')}>策略组合</a> },
          { title: '编辑' },
        ]}
        style={{ marginBottom: 8 }}
      />
      {/* 页面头部 */}
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={12}>
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/combinations')} />
          <Typography.Title level={4} style={{ margin: 0 }}>
            {isEditing ? draft.name : combination.name}
          </Typography.Title>
        </Flex>
        <Space size={8}>
          {isEditing
            ? (
                <>
                  <Button onClick={handleCancel}>取消</Button>
                  <Button type="primary" onClick={handleSave}>保存</Button>
                </>
              )
            : (
                <>
                  {isOwner ? (
                    <>
                      <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>编辑</Button>
                      <Button onClick={handleToggleStatus}>{draft.status === 'ACTIVE' ? '停用' : '启用'}</Button>
                      <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>删除</Button>
                    </>
                  ) : (
                    <>
                      <Button icon={<EditOutlined />} disabled>编辑</Button>
                      <Button disabled>{draft.status === 'ACTIVE' ? '停用' : '启用'}</Button>
                    </>
                  )}
                </>
              )
          }
        </Space>
      </Flex>

      <Row gutter={24}>
        {/* 左侧：坑位配置 + 全局策略 */}
        <Col span={16}>
          <Flex vertical gap={24}>
            {/* 坑位配置区 */}
            <Card
              title={
                <Flex align="center" gap={12}>
                  <span>坑位配置（{draft.slots.length}/10）</span>
                  <Typography.Text type="secondary">覆盖 {coverage} 件商品</Typography.Text>
                </Flex>
              }
            >
              <Flex vertical gap={16}>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={draft.slots.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                    {draft.slots.map((slot, index) => {
                      const groupColor = slot.strategyId
                        ? strategyGroups.colors.get(slot.strategyId)
                        : undefined
                      const sameStrategySlots = slot.strategyId
                        ? strategyGroups.indexes.get(slot.strategyId) ?? []
                        : []
                      const isFirst = sameStrategySlots[0] === index
                      const posInGroup = sameStrategySlots.findIndex((i: number) => i === index)
                      const prevIndex = posInGroup > 0 ? sameStrategySlots[posInGroup - 1] : undefined
                      return (
                        <div key={slot.id}>
                          <SlotCard
                            index={index}
                            slot={slot}
                            readonly={readonly}
                            groupColor={groupColor}
                            continuation={(!isFirst && sameStrategySlots.length > 1 && prevIndex !== undefined)
                              ? {
                                  prevIndex,
                                  displayRank: posInGroup + 1,
                                  color: groupColor ?? 'var(--ant-color-primary)',
                                }
                              : undefined}
                            onChange={(patch) => handleSlotChange(slot.id, patch)}
                            onRemove={() => handleRemoveSlot(slot.id)}
                            disabledRemove={draft.slots.length <= 1}
                          />
                        </div>
                      )
                    })}
                  </SortableContext>
                </DndContext>
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  disabled={draft.slots.length >= 10 || readonly}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      slots: [...draft.slots, { id: createId('slot'), strategyId: null }],
                    })
                  }
                >
                  添加坑位
                </Button>
              </Flex>
            </Card>

            {/* 全局策略区 */}
            <Card title="全局策略">
              <Flex vertical gap={16}>
                <Flex align="center" gap={8}>
                  <Typography.Text>Session 内去重</Typography.Text>
                  <Tag color="success">已开启</Tag>
                  <Typography.Text type="secondary">（系统默认开启，不可关闭）</Typography.Text>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Col>

        {/* 右侧：关联投放计划 */}
        <Col span={8}>
          <Card title={`关联投放计划（${planRefs.length}）`}>
            {planRefs.length === 0 ? (
              <Empty description="暂无关联投放计划">
                <Typography.Text type="secondary">先保存组合，再在投放计划中绑定。</Typography.Text>
              </Empty>
            ) : (
              <Flex vertical gap={12}>
                {planRefs.map((plan) => (
                  <Card key={plan.id} size="small">
                    <Flex justify="space-between" align="start">
                      <Flex vertical gap={4}>
                        <Typography.Text strong>{plan.name}</Typography.Text>
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                          {formatDateRange(plan.startAt, plan.endAt)}
                        </Typography.Text>
                      </Flex>
                      <Tag color={plan.status === 'PUBLISHED' ? 'success' : 'default'}>
                        {plan.status === 'PUBLISHED' ? '已发布' : plan.status === 'ENDED' ? '已结束' : plan.status === 'PAUSED' ? '已暂停' : plan.status === 'DRAFT' ? '草稿' : plan.status}
                      </Tag>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            )}
          </Card>
        </Col>
      </Row>
    </Flex>
  )
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start.replace(' ', 'T'))
  const e = new Date(end.replace(' ', 'T'))
  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return Number.isNaN(s.getTime()) ? `${start} - ${end}` : `${fmt(s)} ~ ${fmt(e)}`
}

function SlotCard({
  index,
  slot,
  readonly,
  groupColor,
  continuation,
  onChange,
  onRemove,
  disabledRemove,
}: {
  index: number
  slot: CombinationSlot
  readonly: boolean
  groupColor?: string
  continuation?: { prevIndex: number; displayRank: number; color: string }
  onChange: (patch: Partial<CombinationSlot>) => void
  onRemove: () => void
  disabledRemove: boolean
}) {
  const { state } = useAdminStore()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: slot.id })
  const strategy = state.strategies.find((item) => item.id === slot.strategyId)
  const pool = state.pools.find((item) => item.id === strategy?.poolId)

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: isDragging ? 'var(--ant-color-fill-quaternary)' : undefined,
        position: 'relative',
      }}
    >
      {/* 左侧色条分组 */}
      {groupColor && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 8,
          bottom: 8,
          width: 4,
          borderRadius: 2,
          background: groupColor,
        }} />
      )}
      <Card size="small" bodyStyle={{ padding: '12px 16px' }}>
        <Flex align="center" gap={12}>
          {/* 拖拽手柄 */}
          {!readonly && (
            <span
              {...attributes}
              {...listeners}
              style={{ cursor: 'grab', color: 'var(--ant-color-text-quaternary)', fontSize: 16, flexShrink: 0 }}
            >
              <HolderOutlined />
            </span>
          )}
          {/* 序号 */}
          <Tag style={{ fontSize: 14, fontWeight: 600, minWidth: 48, textAlign: 'center', margin: 0 }}>
            POS {index + 1}
          </Tag>
          {/* 策略选择 + 选品来源 + 接续说明 */}
          <Flex vertical gap={4} style={{ flex: 1, minWidth: 0 }}>
            <Select
              value={slot.strategyId ?? undefined}
              placeholder="请选择策略"
              onChange={(value) => onChange({ strategyId: value || null })}
              allowClear
              disabled={readonly}
              style={{ width: '100%' }}
              options={state.strategies.map((item) => ({
                value: item.id,
                label: `${item.name} · ${item.mode}`,
              }))}
            />
            {pool && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                选品来源：{pool.name}
              </Typography.Text>
            )}
            {/* 接续说明（非起始位） */}
            {continuation && (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                <span style={{ color: continuation.color, marginRight: 4 }}>●</span>
                接续 POS {continuation.prevIndex + 1}，展示第 {continuation.displayRank} 名
              </Typography.Text>
            )}
          </Flex>
          {/* 更多菜单 */}
          {!readonly && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'delete',
                    label: <span style={{ color: 'var(--ant-color-error)' }}>删除坑位</span>,
                    icon: <DeleteOutlined style={{ color: 'var(--ant-color-error)' }} />,
                    disabled: disabledRemove,
                    onClick: onRemove,
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button type="text" size="small" icon={<MoreOutlined />} />
            </Dropdown>
          )}
        </Flex>
      </Card>
    </div>
  )
}
