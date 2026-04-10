import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createId, findPlanConflicts } from '../lib/domain'
import { CURRENT_USER, CURRENT_USER_ROLE, useAdminStore } from '../lib/store'
import type { AbTestGroup, Plan, PlanStatus, AudienceScopeType } from '../lib/types'
import {
  Alert,
  Button,
  Card,
  DatePicker,
  Flex,
  Input,
  type InputRef,
  Modal,
  Radio,
  Result,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const { Title, Text } = Typography

const SLOT_OPTIONS = [
  { value: 'slot-home-top', label: '首页顶部资源位' },
  { value: 'slot-home-middle', label: '首页中部资源位' },
  { value: 'slot-order-confirm', label: '订单确认页资源位' },
  { value: 'slot-detail-bottom', label: '商品详情页底部资源位' },
]

const STORE_GROUP_OPTIONS = [
  { value: 'group-chengdu', label: '成都区域组' },
  { value: 'group-chongqing', label: '重庆区域组' },
]

export function PlanEditPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { state, updatePlan } = useAdminStore()
  const plan = state.plans.find((item) => item.id === id)
  const [draft, setDraft] = useState<Plan | null>(plan ?? null)
  const [expandedAb, setExpandedAb] = useState(Boolean(plan?.abTest.enabled))
  const [pendingSave, setPendingSave] = useState<Plan | null>(null)
  const [slotError, setSlotError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [storeError, setStoreError] = useState(false)
  const [audienceError, setAudienceError] = useState(false)
  const nameInputRef = useRef<InputRef>(null)

  const isOwner = plan?.createdBy === CURRENT_USER
  const isAdmin = CURRENT_USER_ROLE === 'ADMIN'
  const canEdit = isOwner || (isAdmin && plan?.status === 'DRAFT')
  const [isEditing, setIsEditing] = useState(canEdit)
  const readonly = !isEditing

  useEffect(() => {
    setDraft(plan ?? null)
    setExpandedAb(Boolean(plan?.abTest.enabled))
    if (plan && !plan.name) {
      setTimeout(() => nameInputRef.current?.focus(), 100)
    }
  }, [plan])

  if (!plan || !draft) {
    return (
      <Result
        status="404"
        title="投放计划不存在"
        subTitle="请返回计划列表重试。"
        extra={
          <Button type="primary" onClick={() => navigate('/plans')}>
            返回列表
          </Button>
        }
      />
    )
  }

  const currentDraft = draft
  const conflicts = pendingSave ? findPlanConflicts(state, pendingSave) : []

  function updateStoreScope(type: 'ALL' | 'GROUP') {
    setDraft({
      ...currentDraft,
      storeScope: {
        type: type === 'ALL' ? 'ALL' : 'STORE',
        regionIds: type === 'GROUP' ? currentDraft.storeScope.regionIds : [],
        storeIds: [],
      },
    })
  }

  function resolveStoreGroupIds(groupIds: string[]): string[] {
    return groupIds
      .map((groupId) => state.storeGroups[groupId] ?? [])
      .flat()
  }

  function updateAudienceScope(type: AudienceScopeType) {
    setDraft({
      ...currentDraft,
      audienceScope: {
        type,
        segmentIds: type === 'SEGMENT' ? currentDraft.audienceScope.segmentIds : [],
      },
    })
  }

  function saveWithStatus(status: PlanStatus) {
    // Reset all errors
    setNameError(false)
    setSlotError(false)
    setStoreError(false)
    setAudienceError(false)

    // Validate plan name
    if (!currentDraft.name.trim()) {
      setNameError(true)
      nameInputRef.current?.focus()
      return
    }

    // Validate resource slots
    const slotIds = currentDraft.slotIds ?? []
    if (slotIds.length === 0) {
      setSlotError(true)
      return
    }

    // Validate store groups when GROUP mode selected
    if (currentDraft.storeScope.type === 'STORE' && currentDraft.storeScope.storeIds.length === 0) {
      setStoreError(true)
      return
    }

    // Validate audience segments when SEGMENT mode selected
    if (currentDraft.audienceScope.type === 'SEGMENT' && currentDraft.audienceScope.segmentIds.length === 0) {
      setAudienceError(true)
      return
    }

    const next: Plan = {
      ...currentDraft,
      status,
      version: status === 'PUBLISHED' ? currentDraft.version + 1 : currentDraft.version,
    }
    const nextConflicts = findPlanConflicts(state, next)
    if (nextConflicts.length) {
      setPendingSave(next)
      return
    }
    updatePlan(next.id, next)
    navigate('/plans')
  }

  function finalizePending() {
    if (!pendingSave) return
    updatePlan(pendingSave.id, pendingSave)
    setPendingSave(null)
    navigate('/plans')
  }

  function updateGroup(groupId: string, patch: Partial<AbTestGroup>) {
    setDraft({
      ...currentDraft,
      abTest: {
        ...currentDraft.abTest,
        groups: currentDraft.abTest.groups.map((group) =>
          group.id === groupId ? { ...group, ...patch } : group,
        ),
      },
    })
  }

  const abTestColumns: ColumnsType<AbTestGroup> = [
    {
      title: '分组名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: AbTestGroup) => (
        <Input
          value={name}
          onChange={(e) => updateGroup(record.id, { name: e.target.value })}
        />
      ),
    },
    {
      title: 'VID',
      dataIndex: 'vid',
      key: 'vid',
      render: (vid: string, record: AbTestGroup) => (
        <Input
          value={vid}
          onChange={(e) => updateGroup(record.id, { vid: e.target.value })}
        />
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 80,
      align: 'center',
      render: (_: unknown, record: AbTestGroup) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          disabled={currentDraft.abTest.groups.length === 1}
          onClick={() =>
            setDraft({
              ...currentDraft,
              abTest: {
                ...currentDraft.abTest,
                groups: currentDraft.abTest.groups.filter((item) => item.id !== record.id),
              },
            })
          }
        />
      ),
    },
  ]

  return (
    <Flex vertical gap="large">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="middle">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/plans')}
          />
          <Title level={4} style={{ margin: 0 }}>
            {readonly ? `查看计划 - ${plan.name}` : plan.name ? `编辑计划 - ${plan.name}` : '编辑投放计划'}
          </Title>
        </Flex>
        {!isEditing && (
          canEdit ? (
            <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
              进入编辑
            </Button>
          ) : (
            <Tooltip title="仅创建人或管理员（草稿）可编辑">
              <Button icon={<EditOutlined />} disabled>
                进入编辑
              </Button>
            </Tooltip>
          )
        )}
      </Flex>

      {/* 基础信息 */}
      <fieldset disabled={readonly} style={{ border: 'none', padding: 0, margin: 0 }}>
      <Card title="基础信息">
        <Flex gap="large">
          <Flex vertical gap="small" style={{ flex: 1 }}>
            <Text><span style={{color: '#ff4d4f', marginRight: 4}}>*</span>计划名称</Text>
            <Input
              ref={nameInputRef}
              value={currentDraft.name}
              placeholder="请输入计划名称"
              onChange={(e) => { setNameError(false); setDraft({ ...currentDraft, name: e.target.value }) }}
              status={nameError ? 'error' : undefined}
            />
            {nameError && <Text type="danger" style={{ fontSize: 12 }}>请输入计划名称</Text>}
          </Flex>
          <Flex vertical gap="small" style={{ flex: 1 }}>
            <Text>投放场景</Text>
            <Select
              value={currentDraft.scene}
              disabled
              options={[{ value: 'ORDER_RECOMMEND', label: '点单页推荐位' }]}
            />
          </Flex>
        </Flex>
      </Card>

      {/* 策略配置 */}
      <Card title="策略配置">
        <Flex gap="large">
          <Flex vertical gap="small" style={{ flex: 1 }}>
            <Text>绑定策略组合</Text>
            <Select
              value={currentDraft.combinationId ?? undefined}
              placeholder="请选择策略组合"
              allowClear
              onChange={(value) => setDraft({ ...currentDraft, combinationId: value ?? null })}
              options={state.combinations.map((combination) => ({
                value: combination.id,
                label: `${combination.name} · ${combination.slots.length} 个坑位`,
              }))}
            />
          </Flex>
        </Flex>
      </Card>

      {/* 投放范围 */}
      <Card title="投放范围">
        <Flex vertical gap="large">
          <Flex gap="large">
            <Flex vertical gap="small" style={{ flex: 1 }}>
              <Text>优先级</Text>
              <Text type="secondary">—</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>由列表页管理员统一配置</Text>
            </Flex>
            <Flex vertical gap="small" style={{ flex: 1 }}>
              <Text><span style={{color: '#ff4d4f', marginRight: 4}}>*</span>投放资源位ID</Text>
              <Select
                mode="multiple"
                value={currentDraft.slotIds ?? []}
                placeholder="请选择资源位"
                allowClear
                onChange={(value) => { setDraft({ ...currentDraft, slotIds: value as string[] }); setSlotError(false) }}
                options={SLOT_OPTIONS}
                status={slotError ? 'error' : undefined}
              />
              {slotError && <Text type="danger" style={{ fontSize: 12 }}>请选择投放资源位</Text>}
            </Flex>
            <Flex vertical gap="small" style={{ flex: 1 }}>
              <Text>开始时间</Text>
              <DatePicker
                showTime
                value={currentDraft.startAt ? dayjs(currentDraft.startAt) : null}
                onChange={(date) =>
                  setDraft({
                    ...currentDraft,
                    startAt: date ? date.format('YYYY-MM-DDTHH:mm') : '',
                  })
                }
                style={{ width: '100%' }}
              />
            </Flex>
            <Flex vertical gap="small" style={{ flex: 1 }}>
              <Text>结束时间</Text>
              <DatePicker
                showTime
                value={currentDraft.endAt ? dayjs(currentDraft.endAt) : null}
                onChange={(date) =>
                  setDraft({
                    ...currentDraft,
                    endAt: date ? date.format('YYYY-MM-DDTHH:mm') : '',
                  })
                }
                style={{ width: '100%' }}
              />
            </Flex>
          </Flex>

          {/* 门店范围 */}
          <Flex vertical gap="small">
            <Text strong>门店范围</Text>
            <Radio.Group
              value={currentDraft.storeScope.type === 'ALL' ? 'ALL' : 'GROUP'}
              onChange={(e) => updateStoreScope(e.target.value)}
            >
              <Radio.Button value="ALL">全部门店</Radio.Button>
              <Radio.Button value="GROUP">指定门店组</Radio.Button>
            </Radio.Group>

            {currentDraft.storeScope.type !== 'ALL' && (
              <>
              <Select
                mode="multiple"
                value={currentDraft.storeScope.regionIds}
                placeholder="请选择门店组"
                allowClear
                onChange={(value) => {
                  setStoreError(false)
                  setDraft({
                    ...currentDraft,
                    storeScope: {
                      ...currentDraft.storeScope,
                      regionIds: value as string[],
                      storeIds: resolveStoreGroupIds(value as string[]),
                    },
                  })
                }}
                options={STORE_GROUP_OPTIONS}
                style={{ width: '100%' }}
                status={storeError ? 'error' : undefined}
              />
              {storeError && <Text type="danger" style={{ fontSize: 12 }}>请选择门店组</Text>}
              </>
            )}
          </Flex>

          {/* 人群范围 */}
          <Flex vertical gap="small">
            <Text strong>人群范围</Text>
            <Radio.Group
              value={currentDraft.audienceScope.type}
              onChange={(e) => updateAudienceScope(e.target.value)}
            >
              <Radio.Button value="ALL">全部用户</Radio.Button>
              <Radio.Button value="SEGMENT">指定人群包</Radio.Button>
            </Radio.Group>

            {currentDraft.audienceScope.type === 'SEGMENT' && (
              <>
              <Select
                mode="multiple"
                value={currentDraft.audienceScope.segmentIds}
                placeholder="请选择人群包"
                allowClear
                onChange={(value) => {
                  setAudienceError(false)
                  setDraft({
                    ...currentDraft,
                    audienceScope: {
                      ...currentDraft.audienceScope,
                      segmentIds: value as string[],
                    },
                  })
                }}
                options={state.segments.map((segment) => ({
                  label: segment.name,
                  value: segment.id,
                }))}
                style={{ width: '100%' }}
                status={audienceError ? 'error' : undefined}
              />
              {audienceError && <Text type="danger" style={{ fontSize: 12 }}>请选择人群包</Text>}
              </>
            )}
          </Flex>
        </Flex>
      </Card>

      {/* ABTest 配置 */}
      <Card
        title="ABTest 配置"
        extra={
          <Switch
            disabled={readonly}
            checked={expandedAb}
            onChange={(checked) => {
              setExpandedAb(checked)
              setDraft({ ...currentDraft, abTest: { ...currentDraft.abTest, enabled: checked } })
            }}
          />
        }
      >
        {expandedAb ? (
          <Flex vertical gap="middle">
            <Flex vertical gap="small">
              <Text>实验 Key</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>火山引擎实验标识</Text>
              <Input
                value={currentDraft.abTest.experimentKey}
                placeholder="请输入实验 Key"
                onChange={(e) =>
                  setDraft({
                    ...currentDraft,
                    abTest: { ...currentDraft.abTest, experimentKey: e.target.value, enabled: true },
                  })
                }
              />
            </Flex>

            <Table
              rowKey="id"
              columns={abTestColumns}
              dataSource={currentDraft.abTest.groups}
              pagination={false}
              size="small"
            />

            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() =>
                setDraft({
                  ...currentDraft,
                  abTest: {
                    ...currentDraft.abTest,
                    groups: [
                      ...currentDraft.abTest.groups,
                      {
                        id: createId('ab'),
                        name: `实验组 ${currentDraft.abTest.groups.length}`,
                        vid: `VID${3000 + currentDraft.abTest.groups.length}`,
                        traffic: 10,
                      },
                    ],
                  },
                })
              }
            >
              添加分组
            </Button>

            <Alert
              type="info"
              showIcon
              message="分流由火山引擎执行，系统仅存储配置信息并在运行时透传。分流粒度为用户级（user_id），同一门店内不同用户可能看到不同内容。"
            />
          </Flex>
        ) : (
          <Text type="secondary">当前未启用 ABTest。</Text>
        )}
      </Card>

      </fieldset>

      {/* 底部操作 */}
      {!readonly && plan && (
        <Flex
          justify="end"
          gap="small"
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            padding: '12px 0',
            borderTop: '1px solid #f0f0f0',
            marginTop: 24,
          }}
        >
          <Button onClick={() => navigate('/plans')}>取消</Button>
          {plan.status === 'DRAFT' && (
            <Button onClick={() => saveWithStatus('DRAFT')}>保存草稿</Button>
          )}
          {plan.status === 'PUBLISHED' ? (
            <Button danger onClick={() => saveWithStatus('PAUSED')}>
              暂停
            </Button>
          ) : (
            <Button type="primary" onClick={() => saveWithStatus('PUBLISHED')}>
              发布
            </Button>
          )}
        </Flex>
      )}

      {/* 冲突弹窗 */}
      <Modal
        open={Boolean(pendingSave)}
        title="检测到投放冲突"
        onCancel={() => setPendingSave(null)}
        footer={
          <Space>
            <Button onClick={() => setPendingSave(null)}>返回修改</Button>
            <Button type="primary" onClick={finalizePending}>仍然保存</Button>
          </Space>
        }
      >
        <Flex vertical gap="middle">
          <Tag color="warning">同优先级 + 同门店 + 同时间段</Tag>
          {conflicts.map((conflict) => (
            <Flex key={conflict.id} justify="space-between" align="center">
              <Text strong>{conflict.name}</Text>
              <Text type="secondary">
                {conflict.startAt.replace('T', ' ')} - {conflict.endAt.replace('T', ' ')}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Modal>
    </Flex>
  )
}
