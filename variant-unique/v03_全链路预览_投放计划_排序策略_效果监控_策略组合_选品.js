import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const styles = {
  root: {
    '--bg': '#FAFAFA',
    '--surface': '#FFFFFF',
    '--border': '#F0F0F0',
    '--border-hover': '#E5E5E5',
    '--text-main': '#111827',
    '--text-secondary': '#374151',
    '--text-muted': '#9CA3AF',
    '--text-label': '#6B7280',
    '--color-green': '#52A068',
    '--color-green-bg': '#EDF7F0',
    '--color-red': '#E57373',
    '--color-purple': '#8B5CF6',
    '--color-purple-bg': '#F5F3FF',
    '--color-orange': '#F59E0B',
    '--color-orange-bg': '#FFFBEB',
    '--color-blue': '#3B82F6',
    '--color-blue-bg': '#EFF6FF',
  },
};

const initialData = [
  {
    id: 'CMP-892',
    name: '首页点单推荐Tab组合',
    status: 'active',
    slots: '6 / 10',
    plan: '周末促销Plan A',
    planLink: true,
    lastModified: '2023-10-24 14:20',
  },
  {
    id: 'CMP-741',
    name: '晚间深夜食堂专题',
    status: 'paused',
    slots: '4 / 8',
    plan: null,
    planLink: false,
    lastModified: '2023-10-22 09:15',
  },
  {
    id: 'CMP-905',
    name: '新人专属首屏推荐',
    status: 'active',
    slots: '8 / 12',
    plan: '新人成长计划-Q4',
    planLink: true,
    lastModified: '2023-10-25 18:45',
  },
  {
    id: 'CMP-612',
    name: '下午茶轻食特惠',
    status: 'draft',
    slots: '3 / 6',
    plan: null,
    planLink: false,
    lastModified: '2023-10-26 11:30',
  },
];

const StatusTag = ({ status }) => {
  const configs = {
    active: {
      label: '投放中',
      color: '#52A068',
      bg: '#EDF7F0',
    },
    paused: {
      label: '已暂停',
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
    draft: {
      label: '草稿',
      color: '#6B7280',
      bg: '#FAFAFA',
    },
  };
  const cfg = configs[status] || configs.draft;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '11px',
        fontWeight: 500,
        gap: '4px',
        color: cfg.color,
        background: cfg.bg,
      }}
    >
      <span
        style={{
          display: 'block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: cfg.color,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          width: '520px',
          maxWidth: '90vw',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F0F0F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '15px', color: '#111827' }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9CA3AF',
              fontSize: '18px',
              lineHeight: 1,
              padding: '0 4px',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  );
};

const FormField = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <label
      style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: 500,
        color: '#6B7280',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid #F0F0F0',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  outline: 'none',
  color: '#111827',
  boxSizing: 'border-box',
};

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [businessFilter, setBusinessFilter] = useState('');
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newCombo, setNewCombo] = useState({ name: '', status: 'draft', slots: '', plan: '' });
  const [editForm, setEditForm] = useState({ name: '', status: 'draft', slots: '', plan: '' });

  const statusMap = { active: '投放中', paused: '已暂停', draft: '草稿' };

  const filtered = data.filter((item) => {
    const matchSearch =
      search === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === '' ||
      statusFilter === '所有状态' ||
      item.status === Object.keys(statusMap).find((k) => statusMap[k] === statusFilter);
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));

  const handleCreate = () => {
    if (!newCombo.name.trim()) return;
    const newId = 'CMP-' + Math.floor(Math.random() * 900 + 100);
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setData([
      ...data,
      {
        id: newId,
        name: newCombo.name,
        status: newCombo.status,
        slots: newCombo.slots || '0 / 0',
        plan: newCombo.plan || null,
        planLink: !!newCombo.plan,
        lastModified: dateStr,
      },
    ]);
    setNewCombo({ name: '', status: 'draft', slots: '', plan: '' });
    setIsCreateModalOpen(false);
  };

  const handleEditOpen = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      status: item.status,
      slots: item.slots,
      plan: item.plan || '',
    });
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!editForm.name.trim()) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setData(
      data.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: editForm.name,
              status: editForm.status,
              slots: editForm.slots,
              plan: editForm.plan || null,
              planLink: !!editForm.plan,
              lastModified: dateStr,
            }
          : item
      )
    );
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        background: '#FAFAFA',
        color: '#111827',
        fontSize: '13px',
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Nav */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          height: '64px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: '15px',
            marginRight: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              background: '#111827',
              borderRadius: '4px',
            }}
          />
          策略后台
        </div>

        <nav style={{ display: 'flex', gap: '8px' }}>
          {['选品池', '排序策略', '策略组合', '投放计划', '效果监控', '全链路预览'].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                padding: '6px 12px',
                color: item === '策略组合' ? '#111827' : '#6B7280',
                textDecoration: 'none',
                fontWeight: 500,
                borderRadius: '8px',
                background: item === '策略组合' ? '#FAFAFA' : 'transparent',
                transition: 'all 0.2s',
                fontSize: '13px',
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#6B7280',
            }}
          >
            操作人: 运营 admin
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          padding: '32px',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>策略组合管理</h1>
            <p style={{ color: '#6B7280', marginTop: '4px' }}>管理不同场景下的坑位编排与选品逻辑组合</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#1A1A1A',
              color: 'white',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#000000')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1A1A')}
          >
            + 新建策略组合
          </button>
        </div>

        {/* List Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="搜索组合名称或 ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            style={{
              flex: 1,
              background: '#FFFFFF',
              border: '1px solid #F0F0F0',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.2s',
              color: '#111827',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#9CA3AF')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#F0F0F0')}
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #F0F0F0',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">所有状态</option>
            <option>投放中</option>
            <option>已暂停</option>
            <option>草稿</option>
          </select>
          <select
            value={businessFilter}
            onChange={(e) => setBusinessFilter(e.target.value)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #F0F0F0',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="">所有业务线</option>
            <option>外卖首页</option>
            <option>点单页</option>
          </select>
        </div>

        {/* Data Panel */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #F0F0F0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            overflow: 'hidden',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr>
                {['策略组合名称 / ID', '生效状态', '配置坑位数', '关联投放计划', '最后修改时间', '操作'].map(
                  (col, i) => (
                    <th
                      key={col}
                      style={{
                        background: '#FAFAFA',
                        padding: '12px 24px',
                        borderBottom: '1px solid #F0F0F0',
                        whiteSpace: 'nowrap',
                        fontSize: '11px',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#6B7280',
                        textAlign: i === 5 ? 'right' : 'left',
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: '40px 24px',
                      textAlign: 'center',
                      color: '#9CA3AF',
                      fontSize: '13px',
                    }}
                  >
                    暂无匹配数据
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id} row={row} onEdit={handleEditOpen} />
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            style={{
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#FFFFFF',
              borderTop: '1px solid #F0F0F0',
            }}
          >
            <span style={{ color: '#6B7280' }}>共 {filtered.length} 个策略组合</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <PagBtn
                label="上一页"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PagBtn
                  key={p}
                  label={String(p)}
                  active={p === currentPage}
                  onClick={() => setCurrentPage(p)}
                />
              ))}
              <PagBtn
                label="下一页"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Create Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="新建策略组合">
        <FormField label="组合名称">
          <input
            style={inputStyle}
            placeholder="请输入组合名称"
            value={newCombo.name}
            onChange={(e) => setNewCombo({ ...newCombo, name: e.target.value })}
          />
        </FormField>
        <FormField label="生效状态">
          <select
            style={{ ...inputStyle, cursor: 'pointer' }}
            value={newCombo.status}
            onChange={(e) => setNewCombo({ ...newCombo, status: e.target.value })}
          >
            <option value="active">投放中</option>
            <option value="paused">已暂停</option>
            <option value="draft">草稿</option>
          </select>
        </FormField>
        <FormField label="配置坑位数">
          <input
            style={inputStyle}
            placeholder="例如: 6 / 10"
            value={newCombo.slots}
            onChange={(e) => setNewCombo({ ...newCombo, slots: e.target.value })}
          />
        </FormField>
        <FormField label="关联投放计划">
          <input
            style={inputStyle}
            placeholder="请输入投放计划名称（可选）"
            value={newCombo.plan}
            onChange={(e) => setNewCombo({ ...newCombo, plan: e.target.value })}
          />
        </FormField>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid #F0F0F0',
              background: '#FFFFFF',
              color: '#111827',
            }}
          >
            取消
          </button>
          <button
            onClick={handleCreate}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid transparent',
              background: '#1A1A1A',
              color: 'white',
            }}
          >
            创建
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`编辑策略组合 — ${editingItem?.id}`}>
        <FormField label="组合名称">
          <input
            style={inputStyle}
            placeholder="请输入组合名称"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
        </FormField>
        <FormField label="生效状态">
          <select
            style={{ ...inputStyle, cursor: 'pointer' }}
            value={editForm.status}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
          >
            <option value="active">投放中</option>
            <option value="paused">已暂停</option>
            <option value="draft">草稿</option>
          </select>
        </FormField>
        <FormField label="配置坑位数">
          <input
            style={inputStyle}
            placeholder="例如: 6 / 10"
            value={editForm.slots}
            onChange={(e) => setEditForm({ ...editForm, slots: e.target.value })}
          />
        </FormField>
        <FormField label="关联投放计划">
          <input
            style={inputStyle}
            placeholder="请输入投放计划名称（可选）"
            value={editForm.plan}
            onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
          />
        </FormField>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
          <button
            onClick={() => setIsEditModalOpen(false)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid #F0F0F0',
              background: '#FFFFFF',
              color: '#111827',
            }}
          >
            取消
          </button>
          <button
            onClick={handleEditSave}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid transparent',
              background: '#1A1A1A',
              color: 'white',
            }}
          >
            保存
          </button>
        </div>
      </Modal>
    </div>
  );
};

const TableRow = ({ row, onEdit }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? '#fdfdfd' : 'transparent', transition: 'background 0.15s' }}
    >
      <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', verticalAlign: 'middle' }}>
        <span
          style={{
            fontWeight: 500,
            color: '#111827',
            display: 'block',
            marginBottom: '2px',
          }}
        >
          {row.name}
        </span>
        <span
          style={{
            fontFamily: 'monospace',
            color: '#9CA3AF',
            background: '#FAFAFA',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '11px',
          }}
        >
          {row.id}
        </span>
      </td>
      <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', verticalAlign: 'middle' }}>
        <StatusTag status={row.status} />
      </td>
      <td
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #F0F0F0',
          verticalAlign: 'middle',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {row.slots}
      </td>
      <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', verticalAlign: 'middle' }}>
        {row.planLink && row.plan ? (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: '#3B82F6',
              textDecoration: 'none',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {row.plan}
          </a>
        ) : (
          <span style={{ color: '#9CA3AF' }}>-</span>
        )}
      </td>
      <td
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #F0F0F0',
          verticalAlign: 'middle',
          color: '#6B7280',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {row.lastModified}
      </td>
      <td
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #F0F0F0',
          verticalAlign: 'middle',
          textAlign: 'right',
        }}
      >
        <button
          onClick={() => onEdit(row)}
          style={{
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            border: '1px solid #F0F0F0',
            background: '#FFFFFF',
            color: '#111827',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6B7280')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#F0F0F0')}
        >
          编辑
        </button>
      </td>
    </tr>
  );
};

const PagBtn = ({ label, onClick, active, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '13px',
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1px solid ${active ? '#9CA3AF' : '#F0F0F0'}`,
      background: active ? '#FAFAFA' : '#FFFFFF',
      color: disabled ? '#D1D5DB' : '#111827',
      transition: 'all 0.2s',
      opacity: disabled ? 0.5 : 1,
    }}
  >
    {label}
  </button>
);

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background-color: #FAFAFA; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;