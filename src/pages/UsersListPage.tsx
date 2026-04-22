import { DeleteOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import {
  Button,
  Drawer,
  Empty,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMemo, useState } from 'react'
import { formatDate } from '../lib/domain'
import { CURRENT_USER, useAdminStore } from '../lib/store'
import type { Role, RoleCode, User, UserStatus } from '../lib/types'

const { Title, Text } = Typography

export function UsersListPage() {
  const { state, createUser, updateUser, deleteUser } = useAdminStore()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  const dataSource = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return state.users
      .filter((u) => !keyword || u.username.toLowerCase().includes(keyword) || u.displayName.toLowerCase().includes(keyword) || u.phone.includes(keyword))
      .filter((u) => !roleFilter || u.roleId === roleFilter)
      .filter((u) => !statusFilter || u.status === statusFilter)
      .map((user) => ({
        ...user,
        key: user.id,
        roleName: state.roles.find((r) => r.id === user.roleId)?.name ?? user.roleCode,
      }))
  }, [state.users, state.roles, search, roleFilter, statusFilter])

  function handleCreate() {
    setEditingUser(null)
    form.resetFields()
    form.setFieldsValue({ status: 'ACTIVE' })
    setDrawerOpen(true)
  }

  function handleEdit(user: User) {
    setEditingUser(user)
    form.setFieldsValue({
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      phone: user.phone,
      roleId: user.roleId,
      status: user.status,
      password: '',
    })
    setDrawerOpen(true)
  }

  function handleToggleStatus(user: User) {
    const nextStatus: UserStatus = user.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE'
    updateUser(user.id, { ...user, status: nextStatus })
  }

  function handleDelete(user: User) {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除用户「${user.displayName}」吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => deleteUser(user.id),
    })
  }

  function handleSave() {
    form.validateFields().then((values) => {
      const selectedRole = state.roles.find((r) => r.id === values.roleId)
      if (editingUser) {
        const patch: Partial<User> = {
          username: values.username,
          displayName: values.displayName,
          email: values.email,
          phone: values.phone,
          roleId: values.roleId,
          roleCode: (selectedRole?.code ?? 'OPERATOR') as RoleCode,
          status: values.status,
        }
        if (values.password) {
          // password would be handled by backend
        }
        updateUser(editingUser.id, { ...editingUser, ...patch })
      } else {
        const id = createUser()
        const draft = state.users.find((u) => u.id === id)
        if (draft) {
          updateUser(id, {
            ...draft,
            username: values.username,
            displayName: values.displayName,
            email: values.email,
            phone: values.phone,
            roleId: values.roleId,
            roleCode: (selectedRole?.code ?? 'OPERATOR') as RoleCode,
            status: values.status,
          })
        }
      }
      setDrawerOpen(false)
      form.resetFields()
    })
  }

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record) => (
        <Space>
          <UserOutlined style={{ color: 'var(--ant-color-text-quaternary)' }} />
          <Button type="link" style={{ padding: 0 }} onClick={() => handleEdit(record)}>
            {text}
          </Button>
        </Space>
      ),
    },
    {
      title: '显示名称',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 120,
    },
    {
      title: '角色',
      key: 'role',
      width: 140,
      render: (_, record) => (
        <Tag color="blue">{record.roleName}</Tag>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: UserStatus) => (
        <Tag color={status === 'ACTIVE' ? 'success' : 'default'}>
          {status === 'ACTIVE' ? '正常' : '已禁用'}
        </Tag>
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      width: 160,
      render: (text: string | null) => text ? formatDate(text) : '—',
    },
    {
      title: '操作',
      key: 'actions',
      width: 180,
      render: (_, record) => {
        const isOwner = record.createdBy === CURRENT_USER
        return (
          <Space>
            <Button type="link" size="small" style={{ padding: 0 }} onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="link" size="small" style={{ padding: 0 }} onClick={() => handleToggleStatus(record)}>
              {record.status === 'ACTIVE' ? '禁用' : '启用'}
            </Button>
            <Button
              type="link"
              size="small"
              style={{ padding: 0 }}
              danger
              icon={<DeleteOutlined />}
              disabled={!isOwner}
              onClick={() => handleDelete(record)}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]

  const roleOptions = state.roles.map((r: Role) => ({ label: r.name, value: r.id }))

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space direction="vertical" size={4}>
        <Title level={4} style={{ margin: 0 }}>用户管理</Title>
        <Text type="secondary">管理用户账号、角色分配与账号状态</Text>
      </Space>

      <Row justify="space-between" align="middle">
        <Space>
          <Input
            placeholder="搜索用户名/姓名/手机号"
            prefix={<SearchOutlined />}
            allowClear
            style={{ width: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="角色"
            allowClear
            style={{ width: 120 }}
            value={roleFilter || undefined}
            onChange={setRoleFilter}
            options={roleOptions}
          />
          <Select
            placeholder="状态"
            allowClear
            style={{ width: 100 }}
            value={statusFilter || undefined}
            onChange={setStatusFilter}
            options={[
              { label: '正常', value: 'ACTIVE' },
              { label: '已禁用', value: 'DISABLED' },
            ]}
          />
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新建用户
        </Button>
      </Row>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
        locale={{ emptyText: <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
      />

      <Drawer
        title={editingUser ? `编辑用户 - ${editingUser.displayName}` : '新建用户'}
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); form.resetFields() }}
        width={520}
        footer={
          <Flex justify="end" gap={8}>
            <Button onClick={() => { setDrawerOpen(false); form.resetFields() }}>取消</Button>
            <Button type="primary" onClick={handleSave}>保存</Button>
          </Flex>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="登录账号" />
          </Form.Item>

          <Form.Item
            name="displayName"
            label="显示名称"
            rules={[{ required: true, message: '请输入显示名称' }]}
          >
            <Input placeholder="如：张运营" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效邮箱' },
            ]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="138xxxxxxxx" />
          </Form.Item>

          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="选择角色" options={roleOptions} />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: !editingUser, message: '请输入密码' }]}
            >
              <Input.Password placeholder="设置登录密码" />
            </Form.Item>
          )}
          {editingUser && (
            <Form.Item name="password" label="密码" help="留空表示不修改">
              <Input.Password placeholder="留空表示不修改" />
            </Form.Item>
          )}

          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
            getValueFromEvent={(checked) => (checked ? 'ACTIVE' : 'DISABLED')}
            getValueProps={(value) => ({ checked: value === 'ACTIVE' })}
          >
            <Switch checkedChildren="正常" unCheckedChildren="已禁用" />
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  )
}
