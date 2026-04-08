import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createId, findPlanConflicts } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { AbTestGroup, Plan, PlanStatus, StoreScopeType, AudienceScopeType } from '../lib/types'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Flex,
  Input,
  InputNumber,
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

export function PlanEditPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { state, updatePlan } = useAdminStore()
  const plan = state.plans.find((item) => item.id === id)
  const [draft, setDraft] = useState<Plan | null>(plan ?? null)
  const [expandedAb, setExpandedAb] = useState(Boolean(plan?.abTest.enabled))
  const [pendingSave, setPendingSave] = useState<Plan | null>(null)
  const isOwner = plan?.createdBy === CURRENT_USER
  const [isEditing, setIsEditing] = useState(isOwner)
  const readonly = !isEditing

  useEffect(() => {
    setDraft(plan ?? null)
    setExpandedAb(Boolean(plan?.abTest.enabled))
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

  function updateStoreScope(type: StoreScopeType) {
    setDraft({
      ...currentDraft,
      storeScope: {
        type,
        regionIds: type === 'REGION' ? currentDraft.storeScope.regionIds : [],
        storeIds: type === 'STORE' ? currentDraft.storeScope.storeIds : [],
      },
    })
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

  const regions = [...new Set(state.stores.map((store) => store.region))]

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
      title: '流量比例 (%)',
      dataIndex: 'traffic',
      key: 'traffic',
      width: 140,
      render: (traffic: number, record: AbTestGroup) => (
        <InputNumber
          value={traffic}
          min={0}
          max={100}
          style={{ width: '100%' }}
          onChange={(value) => updateGroup(record.id, { traffic: value ?? 0 })}
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
          isOwner ? (
            <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
              进入编辑
            </Button>
          ) : (
            <Tooltip title="仅创建人可编辑">
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
            <Text>计划名称</Text>
            <Input
              value={currentDraft.name}
              placeholder="请输入计划名称"
              onChange={(e) => setDraft({ ...currentDraft, name: e.target.value })}
            />
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
          <Flex vertical gap="small" style={{ flex: 1 }}>
            <Text>版本号</Text>
            <Input value={`v${currentDraft.version}`} disabled />
          </Flex>
        </Flex>
      </Card>

      {/* 投放范围 */}
      <Card title="投放范围">
        <Flex vertical gap="large">
          <Flex gap="large">
            <Flex vertical gap="small" style={{ flex: 1 }}>
              <Text>优先级</Text>
              <Tooltip title="数字越大优先级越高">
                <InputNumber
                  value={currentDraft.priority}
                  min={1}
                  max={99}
                  style={{ width: '100%' }}
                  onChange={(value) => setDraft({ ...currentDraft, priority: value ?? 1 })}
                />
              </Tooltip>
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
              value={currentDraft.storeScope.type}
              onChange={(e) => updateStoreScope(e.target.value)}
            >
              <Radio.Button value="ALL">全部门店</Radio.Button>
              <Radio.Button value="REGION">指定区域</Radio.Button>
              <Radio.Button value="STORE">指定门店</Radio.Button>
            </Radio.Group>

            {currentDraft.storeScope.type === 'REGION' && (
              <Checkbox.Group
                value={currentDraft.storeScope.regionIds}
                onChange={(checkedValues) =>
                  setDraft({
                    ...currentDraft,
                    storeScope: {
                      ...currentDraft.storeScope,
                      regionIds: checkedValues as string[],
                    },
                  })
                }
                options={regions.map((region) => ({ label: region, value: region }))}
              />
            )}

            {currentDraft.storeScope.type === 'STORE' && (
              <Checkbox.Group
                value={currentDraft.storeScope.storeIds}
                onChange={(checkedValues) =>
                  setDraft({
                    ...currentDraft,
                    storeScope: {
                      ...currentDraft.storeScope,
                      storeIds: checkedValues as string[],
                    },
                  })
                }
                options={state.stores.map((store) => ({ label: store.name, value: store.id }))}
              />
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
              <Checkbox.Group
                value={currentDraft.audienceScope.segmentIds}
                onChange={(checkedValues) =>
                  setDraft({
                    ...currentDraft,
                    audienceScope: {
                      ...currentDraft.audienceScope,
                      segmentIds: checkedValues as string[],
                    },
                  })
                }
                options={state.segments.map((segment) => ({
                  label: segment.name,
                  value: segment.id,
                }))}
              />
            )}
          </Flex>
        </Flex>
      </Card>

      {/* ABTest 配置 */}
      <Card
        title="ABTest 配置"
        extra={
          <Switch
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
      {!readonly && (
        <Flex justify="end" gap="small">
          <Button onClick={() => navigate('/plans')}>取消</Button>
          <Button onClick={() => saveWithStatus('DRAFT')}>保存草稿</Button>
          <Button type="primary" onClick={() => saveWithStatus('PUBLISHED')}>
            发布
          </Button>
          {draft.status !== 'DRAFT' && (
            <Button danger onClick={() => saveWithStatus('PAUSED')}>
              暂停
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
