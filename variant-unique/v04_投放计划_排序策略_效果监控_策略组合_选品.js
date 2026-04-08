import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
    '--shadow-float': '0 8px 24px rgba(0,0,0,0.06)',
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FAFAFA',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: '13px',
    lineHeight: '1.5',
    WebkitFontSmoothing: 'antialiased',
    color: '#111827',
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
    border: 'none',
    background: 'transparent',
    fontSize: '13px',
  },
  navLinkActive: {
    color: '#111827',
    backgroundColor: '#FAFAFA',
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
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  h1: {
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
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
  },
  editorLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '24px',
    alignItems: 'start',
  },
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    overflow: 'hidden',
  },
  panelHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: '80px 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'radial-gradient(circle at top, #fafafa 0%, #ffffff 100%)',
  },
  emptyIconBox: {
    width: '64px',
    height: '64px',
    background: '#FAFAFA',
    border: '2px dashed #F0F0F0',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    color: '#9CA3AF',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#111827',
  },
  emptyDesc: {
    fontSize: '14px',
    color: '#6B7280',
    maxWidth: '400px',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    width: '100%',
    maxWidth: '720px',
    marginTop: '24px',
  },
  templateCard: {
    padding: '16px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: '#FFFFFF',
  },
  templateTitle: {
    fontWeight: 600,
    fontSize: '13px',
    marginBottom: '4px',
    display: 'block',
  },
  templateTags: {
    display: 'flex',
    gap: '4px',
    marginTop: '12px',
  },
  miniTag: {
    fontSize: '10px',
    padding: '2px 6px',
    background: '#FAFAFA',
    borderRadius: '4px',
    color: '#6B7280',
  },
  previewPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  previewPlaceholder: {
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FAFAFA',
    borderRadius: '0 0 12px 12px',
    height: '500px',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  dependencyList: {
    padding: '16px 24px',
    borderTop: '1px solid #F0F0F0',
    background: '#FFFFFF',
  },
  depItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #FAFAFA',
    fontSize: '12px',
  },
  depStatus: {
    color: '#E57373',
    fontWeight: 500,
  },
};

const TemplateCard = ({ title, desc, tags, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...customStyles.templateCard,
        ...(hovered ? { borderColor: '#111827', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', transform: 'translateY(-2px)' } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      <span style={customStyles.templateTitle}>{title}</span>
      <span style={{ fontSize: '11px', color: '#6B7280' }}>{desc}</span>
      <div style={customStyles.templateTags}>
        {tags.map((tag, i) => (
          <span key={i} style={customStyles.miniTag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [activeNav, setActiveNav] = useState('策略组合');
  const [slots, setSlots] = useState([]);
  const [hoveredSecondary, setHoveredSecondary] = useState(false);
  const [hoveredPrimaryAdd, setHoveredPrimaryAdd] = useState(false);

  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控'];

  const templates = [
    {
      title: '标准热销混合型',
      desc: '2个置顶人工位 + 8个算法推荐位',
      tags: ['电商通用', '高转化'],
    },
    {
      title: '新品首发驱动型',
      desc: '4个新品强制位 + 瀑布流补足',
      tags: ['冷启动', '曝光优先'],
    },
    {
      title: '全域千人千面',
      desc: '完全由个性化排序算法驱动',
      tags: ['AI 驱动', '实验组'],
    },
  ];

  const handleAddSlot = () => {
    setSlots(prev => [...prev, { id: Date.now(), name: `坑位规则 ${prev.length + 1}` }]);
  };

  const handleTemplateSelect = (template) => {
    setSlots([{ id: Date.now(), name: template.title }]);
  };

  const canSave = slots.length > 0;

  return (
    <div style={customStyles.appContainer}>
      <header style={customStyles.topNav}>
        <div style={customStyles.logo}>
          <div style={customStyles.logoMark}></div>
          策略后台
        </div>
        <nav style={customStyles.navLinks}>
          {navItems.map(item => (
            <button
              key={item}
              style={{
                ...customStyles.navLink,
                ...(activeNav === item ? customStyles.navLinkActive : {}),
              }}
              onClick={() => setActiveNav(item)}
              onMouseEnter={e => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = '#111827';
                  e.currentTarget.style.backgroundColor = '#FAFAFA';
                }
              }}
              onMouseLeave={e => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = '#6B7280';
                  e.currentTarget.style.backgroundColor = 'transparent';
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
            <div style={customStyles.breadcrumb}>
              <span>策略组合</span>
              <span>/</span>
              <span style={{ color: '#111827' }}>新建组合</span>
            </div>
            <h1 style={customStyles.h1}>
              未命名策略组合{' '}
              <span style={{ color: '#9CA3AF', fontWeight: 'normal' }}>(Draft)</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                ...customStyles.btn,
                ...customStyles.btnSecondary,
                ...(hoveredSecondary ? { borderColor: '#6B7280' } : {}),
              }}
              onMouseEnter={() => setHoveredSecondary(true)}
              onMouseLeave={() => setHoveredSecondary(false)}
            >
              取消
            </button>
            <button
              style={{
                ...customStyles.btn,
                ...customStyles.btnPrimary,
                opacity: canSave ? 1 : 0.5,
                cursor: canSave ? 'pointer' : 'not-allowed',
              }}
              disabled={!canSave}
            >
              保存配置
            </button>
          </div>
        </div>

        <div style={customStyles.editorLayout}>
          <div style={customStyles.panel}>
            <div style={customStyles.panelHeader}>
              <h2 style={customStyles.h2}>坑位编排 (Slots)</h2>
            </div>

            {slots.length === 0 ? (
              <div style={customStyles.emptyContainer}>
                <div style={customStyles.emptyIconBox}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <h3 style={customStyles.emptyTitle}>开始配置您的坑位组合</h3>
                <p style={customStyles.emptyDesc}>
                  当前组合尚未添加任何坑位规则。您可以从零开始添加，或选择下方常用模板快速初始化。
                </p>

                <button
                  style={{
                    ...customStyles.btn,
                    ...customStyles.btnPrimary,
                    padding: '12px 24px',
                    ...(hoveredPrimaryAdd ? { background: '#000000' } : {}),
                  }}
                  onMouseEnter={() => setHoveredPrimaryAdd(true)}
                  onMouseLeave={() => setHoveredPrimaryAdd(false)}
                  onClick={handleAddSlot}
                >
                  + 添加首个坑位规则
                </button>

                <div style={{ marginTop: '64px', width: '100%' }}>
                  <div style={{ ...customStyles.labelCaps, marginBottom: '16px' }}>推荐配置模板</div>
                  <div style={customStyles.templateGrid}>
                    {templates.map((tmpl, i) => (
                      <TemplateCard
                        key={i}
                        title={tmpl.title}
                        desc={tmpl.desc}
                        tags={tmpl.tags}
                        onSelect={() => handleTemplateSelect(tmpl)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px' }}>
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#FAFAFA',
                    }}
                  >
                    <span style={{ fontWeight: 500, fontSize: '13px' }}>{slot.name}</span>
                    <button
                      style={{
                        ...customStyles.btn,
                        ...customStyles.btnSecondary,
                        padding: '4px 10px',
                        fontSize: '12px',
                      }}
                      onClick={() => setSlots(prev => prev.filter(s => s.id !== slot.id))}
                    >
                      移除
                    </button>
                  </div>
                ))}
                <button
                  style={{
                    ...customStyles.btn,
                    ...customStyles.btnSecondary,
                    marginTop: '8px',
                  }}
                  onClick={handleAddSlot}
                >
                  + 添加坑位规则
                </button>
              </div>
            )}
          </div>

          <div style={{ ...customStyles.panel, ...customStyles.previewPanel }}>
            <div style={{ ...customStyles.panelHeader, borderBottom: 'none' }}>
              <h2 style={customStyles.h2}>预览</h2>
            </div>
            <div style={customStyles.previewPlaceholder}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.3 }}>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>
                {slots.length === 0 ? '暂无数据预览' : `已配置 ${slots.length} 个坑位`}
              </div>
              <div style={{ fontSize: '11px', marginTop: '4px' }}>
                {slots.length === 0 ? '配置至少一个坑位以查看模拟视图' : '坑位配置已就绪'}
              </div>
            </div>

            <div style={customStyles.dependencyList}>
              <div style={{ ...customStyles.labelCaps, marginBottom: '8px' }}>架构引用状态</div>
              <div style={customStyles.depItem}>
                <span style={{ color: '#6B7280' }}>选品池</span>
                <span style={customStyles.depStatus}>未关联</span>
              </div>
              <div style={customStyles.depItem}>
                <span style={{ color: '#6B7280' }}>排序策略</span>
                <span style={customStyles.depStatus}>未关联</span>
              </div>
              <div style={{ ...customStyles.depItem, borderBottom: 'none' }}>
                <span style={{ color: '#6B7280' }}>投放计划</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>无下游引用</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { margin: 0; padding: 0; }
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