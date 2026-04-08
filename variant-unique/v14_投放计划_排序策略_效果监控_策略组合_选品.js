import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
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
    '--btn-primary': '#1A1A1A',
    '--btn-primary-hover': '#000000',
    '--radius-panel': '12px',
    '--radius-element': '8px',
    '--radius-pill': '9999px',
    '--shadow-sm': '0 1px 2px rgba(0,0,0,0.02)',
    '--shadow-md': '0 4px 12px rgba(0,0,0,0.04)',
  },
  body: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#FAFAFA',
    color: '#111827',
    fontSize: '13px',
    lineHeight: '1.5',
    WebkitFontSmoothing: 'antialiased',
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  topNav: {
    background: '#FFFFFF',
    borderBottom: '1px solid #F0F0F0',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: 600,
    fontSize: '15px',
    marginRight: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoMark: {
    width: '16px',
    height: '16px',
    background: '#111827',
    borderRadius: '4px',
  },
  navLinks: {
    display: 'flex',
    gap: '8px',
  },
  navLink: {
    padding: '6px 12px',
    color: '#6B7280',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    fontSize: '13px',
  },
  navLinkActive: {
    color: '#111827',
    background: '#FAFAFA',
  },
  navActions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  mainContent: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h1: {
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  btn: {
    padding: '8px 16px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  btnPrimary: {
    background: '#1A1A1A',
    color: 'white',
    border: '1px solid transparent',
  },
  btnSecondary: {
    background: '#FFFFFF',
    borderColor: '#F0F0F0',
    color: '#111827',
    border: '1px solid #F0F0F0',
  },
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    overflow: 'hidden',
  },
  filtersBar: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px 12px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    width: '240px',
    fontSize: '13px',
    outline: 'none',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  selectInput: {
    borderRadius: '8px',
    height: '34px',
    background: '#FFFFFF',
    border: '1px solid #F0F0F0',
    color: '#111827',
    fontSize: '13px',
    fontWeight: 500,
    padding: '0 12px',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  tableContainer: {
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '12px 24px',
    background: '#FAFAFA',
    borderBottom: '1px solid #F0F0F0',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  td: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    verticalAlign: 'middle',
  },
  idBadge: {
    fontFamily: 'monospace',
    color: '#9CA3AF',
    background: '#FAFAFA',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
  },
  statusActive: {
    color: '#52A068',
    background: '#EDF7F0',
  },
  statusDraft: {
    color: '#6B7280',
    background: '#FAFAFA',
  },
  slotCounter: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 500,
    fontVariantNumeric: 'tabular-nums',
  },
  planLink: {
    color: '#3B82F6',
    textDecoration: 'none',
    display: 'block',
    fontSize: '12px',
    marginTop: '2px',
  },
  pagination: {
    padding: '16px 24px',
    borderTop: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#FAFAFA',
  },
  actionLink: {
    color: '#111827',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '13px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
};

const initialData = [
  {
    id: 'CMP-892',
    name: '首页点单推荐Tab组合',
    slots: 6,
    maxSlots: 10,
    plan: '周末促销Plan A',
    experiments: 2,
    status: 'active',
    updatedAt: '2023-10-24 14:20',
  },
  {
    id: 'CMP-905',
    name: '深夜食堂宵夜推荐',
    slots: 4,
    maxSlots: 8,
    plan: '宵夜专项补贴',
    experiments: 1,
    status: 'active',
    updatedAt: '2023-10-23 09:15',
  },
  {
    id: 'CMP-841',
    name: '会员频道专属折扣位',
    slots: 3,
    maxSlots: 5,
    plan: null,
    experiments: null,
    status: 'draft',
    updatedAt: '2023-10-22 18:44',
  },
  {
    id: 'CMP-722',
    name: '新用户首单转化组合',
    slots: 8,
    maxSlots: 12,
    plan: '新人礼包Plan B',
    experiments: 4,
    status: 'active',
    updatedAt: '2023-10-20 11:30',
  },
];

const StatusDot = ({ status }) => (
  <span
    style={{
      display: 'inline-block',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: status === 'active' ? '#52A068' : '#9CA3AF',
      marginRight: '4px',
    }}
  />
);

const StatusTag = ({ status }) => {
  const isActive = status === 'active';
  return (
    <span
      style={{
        ...customStyles.tag,
        ...(isActive ? customStyles.statusActive : customStyles.statusDraft),
      }}
    >
      <StatusDot status={status} />
      {isActive ? '投放中' : '草稿'}
    </span>
  );
};

const TableRow = ({ row, onEdit, onDeactivate, onDelete, isLast }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td
        style={{
          ...customStyles.td,
          ...(isLast ? { borderBottom: 'none' } : {}),
          background: hovered ? '#fafafa' : 'transparent',
        }}
      >
        <div style={{ fontWeight: 600 }}>{row.name}</div>
        <span style={customStyles.idBadge}>{row.id}</span>
      </td>
      <td
        style={{
          ...customStyles.td,
          ...(isLast ? { borderBottom: 'none' } : {}),
          background: hovered ? '#fafafa' : 'transparent',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <div style={customStyles.slotCounter}>
          {row.slots}
          <span style={{ color: '#9CA3AF', fontWeight: 'normal' }}>/ {row.maxSlots}</span>
        </div>
      </td>
      <td
        style={{
          ...customStyles.td,
          ...(isLast ? { borderBottom: 'none' } : {}),
          background: hovered ? '#fafafa' : 'transparent',
        }}
      >
        {row.plan ? (
          <>
            <div>{row.plan}</div>
            <a href="#" style={customStyles.planLink} onClick={(e) => e.preventDefault()}>
              关联 {row.experiments} 个实验组
            </a>
          </>
        ) : (
          <span style={{ color: '#9CA3AF' }}>未关联计划</span>
        )}
      </td>
      <td
        style={{
          ...customStyles.td,
          ...(isLast ? { borderBottom: 'none' } : {}),
          background: hovered ? '#fafafa' : 'transparent',
        }}
      >
        <StatusTag status={row.status} />
      </td>
      <td
        style={{
          ...customStyles.td,
          ...(isLast ? { borderBottom: 'none' } : {}),
          background: hovered ? '#fafafa' : 'transparent',
          color: '#6B7280',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {row.updatedAt}
      </td>
      <td
        style={{
          ...customStyles.td,
          ...(isLast ? { borderBottom: 'none' } : {}),
          background: hovered ? '#fafafa' : 'transparent',
          textAlign: 'right',
        }}
      >
        <button
          style={{ ...customStyles.actionLink, marginRight: '16px' }}
          onClick={() => onEdit(row.id)}
        >
          编辑
        </button>
        {row.status === 'active' ? (
          <button
            style={{ ...customStyles.actionLink, color: '#E57373' }}
            onClick={() => onDeactivate(row.id)}
          >
            停用
          </button>
        ) : (
          <button
            style={{ ...customStyles.actionLink }}
            onClick={() => onDelete(row.id)}
          >
            删除
          </button>
        )}
      </td>
    </tr>
  );
};

const NewComboModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [maxSlots, setMaxSlots] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: `CMP-${Math.floor(Math.random() * 900) + 100}`,
      name: name.trim(),
      slots: 0,
      maxSlots: parseInt(maxSlots) || 10,
      plan: null,
      experiments: null,
      status: 'draft',
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #F0F0F0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          padding: '28px',
          width: '420px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div style={{ ...customStyles.h1, fontSize: '16px' }}>新建策略组合</div>
          <div style={{ color: '#6B7280', marginTop: '4px', fontSize: '13px' }}>
            创建新的策略组合并配置坑位规则
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              组合名称 *
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入组合名称..."
              style={{
                ...customStyles.searchInput,
                width: '100%',
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
              最大坑位数
            </div>
            <input
              type="number"
              value={maxSlots}
              onChange={(e) => setMaxSlots(e.target.value)}
              placeholder="默认 10"
              style={{
                ...customStyles.searchInput,
                width: '100%',
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            style={{ ...customStyles.btn, ...customStyles.btnSecondary }}
            onClick={onClose}
          >
            取消
          </button>
          <button
            style={{ ...customStyles.btn, ...customStyles.btnPrimary }}
            onClick={handleSave}
          >
            创建
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeNav, setActiveNav] = useState('策略组合');
  const itemsPerPage = 4;

  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控'];

  const filteredData = data.filter((row) => {
    const matchSearch =
      !searchTerm ||
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && row.status === 'active') ||
      (statusFilter === 'draft' && row.status === 'draft');
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const pagedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id) => {
    alert(`编辑策略组合: ${id}`);
  };

  const handleDeactivate = (id) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: 'draft' } : row))
    );
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleNewSave = (newRow) => {
    setData((prev) => [newRow, ...prev]);
  };

  return (
    <div style={{ ...customStyles.body, ...customStyles.appContainer }}>
      {showModal && (
        <NewComboModal onClose={() => setShowModal(false)} onSave={handleNewSave} />
      )}
      <header style={customStyles.topNav}>
        <div style={customStyles.logo}>
          <div style={customStyles.logoMark} />
          策略后台
        </div>
        <nav style={customStyles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item}
              style={{
                ...customStyles.navLink,
                ...(activeNav === item ? customStyles.navLinkActive : {}),
              }}
              onClick={() => setActiveNav(item)}
              onMouseEnter={(e) => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = '#111827';
                  e.currentTarget.style.background = '#FAFAFA';
                }
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = '#6B7280';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {item}
            </button>
          ))}
        </nav>
        <div style={customStyles.navActions}>
          <span style={customStyles.labelCaps}>操作人: 运营 admin</span>
        </div>
      </header>

      <main style={customStyles.mainContent}>
        <div style={customStyles.pageHeader}>
          <div>
            <h1 style={customStyles.h1}>策略组合管理</h1>
            <p style={{ color: '#6B7280', marginTop: '4px' }}>
              编排坑位规则，组合不同选品池与排序策略
            </p>
          </div>
          <button
            style={{ ...customStyles.btn, ...customStyles.btnPrimary }}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1A1A1A';
            }}
          >
            + 新建策略组合
          </button>
        </div>

        <div style={customStyles.panel}>
          <div style={customStyles.filtersBar}>
            <input
              type="text"
              style={customStyles.searchInput}
              placeholder="搜索组合名称或 ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              style={customStyles.selectInput}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">所有状态</option>
              <option value="active">投放中</option>
              <option value="draft">草稿</option>
            </select>
          </div>

          <div style={customStyles.tableContainer}>
            <table style={customStyles.table}>
              <thead>
                <tr>
                  <th style={customStyles.th}>策略组合名称 / ID</th>
                  <th style={customStyles.th}>配置坑位</th>
                  <th style={customStyles.th}>投放计划关联</th>
                  <th style={customStyles.th}>状态</th>
                  <th style={customStyles.th}>最后修改时间</th>
                  <th style={{ ...customStyles.th, textAlign: 'right' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {pagedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        ...customStyles.td,
                        textAlign: 'center',
                        color: '#9CA3AF',
                        padding: '40px',
                        borderBottom: 'none',
                      }}
                    >
                      暂无匹配记录
                    </td>
                  </tr>
                ) : (
                  pagedData.map((row, idx) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      onEdit={handleEdit}
                      onDeactivate={handleDeactivate}
                      onDelete={handleDelete}
                      isLast={idx === pagedData.length - 1}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={customStyles.pagination}>
            <span style={{ color: '#6B7280' }}>
              显示 {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} 到{' '}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} 条，共{' '}
              {filteredData.length} 条记录
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  ...customStyles.btn,
                  ...customStyles.btnSecondary,
                  padding: '4px 12px',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  style={{
                    ...customStyles.btn,
                    ...customStyles.btnSecondary,
                    padding: '4px 12px',
                    ...(currentPage === page
                      ? {
                          background: '#111827',
                          color: 'white',
                          borderColor: '#111827',
                        }
                      : {}),
                  }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                style={{
                  ...customStyles.btn,
                  ...customStyles.btnSecondary,
                  padding: '4px 12px',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;