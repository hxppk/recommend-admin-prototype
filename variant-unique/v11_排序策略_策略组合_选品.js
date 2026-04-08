import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appContainerBlurred: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    filter: 'blur(2px)',
  },
  topNav: {
    background: '#FFFFFF',
    borderBottom: '1px solid #F0F0F0',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    height: '64px',
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
    background: '#1A1A1A',
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
    cursor: 'pointer',
    fontSize: '13px',
  },
  navLinkActive: {
    padding: '6px 12px',
    color: '#111827',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    background: '#FAFAFA',
    cursor: 'pointer',
    fontSize: '13px',
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
    color: '#111827',
  },
  summaryStrip: {
    display: 'flex',
    gap: '48px',
    paddingBottom: '24px',
    borderBottom: '1px solid #F0F0F0',
  },
  metricGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricVal: {
    fontSize: '20px',
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
  },
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  editorLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '24px',
  },
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  },
  panelHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h2: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
  },
  slotList: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  slotItem: {
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'grid',
    gridTemplateColumns: '24px 60px 2fr 1.5fr 1fr auto',
    alignItems: 'center',
    gap: '16px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  drawerPanel: {
    width: '520px',
    height: '100%',
    background: '#FFFFFF',
    boxShadow: '0 20px 48px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.3s ease-out',
  },
  drawerHeader: {
    padding: '24px 32px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 32px',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '24px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 36px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9CA3AF',
  },
  stratGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  stratCard: {
    padding: '16px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stratCardSelected: {
    padding: '16px',
    border: '1px solid #1A1A1A',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#F9FAFB',
    boxShadow: 'inset 0 0 0 1px #1A1A1A',
  },
  drawerFooter: {
    padding: '20px 32px',
    borderTop: '1px solid #F0F0F0',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    background: '#FFFFFF',
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
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  btnPrimary: {
    background: '#1A1A1A',
    color: 'white',
  },
  btnSecondary: {
    background: '#FFFFFF',
    borderColor: '#F0F0F0',
    color: '#111827',
  },
  btnClose: {
    padding: '4px',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '9999px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  configForm: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px dashed #F0F0F0',
  },
  formGroup: {
    marginBottom: '16px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 500,
    color: '#374151',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  formSelect: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    fontSize: '13px',
    background: 'white',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  formInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    fontSize: '13px',
    background: 'white',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  tagGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    background: '#52A068',
    color: 'white',
  },
  tagHot: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    color: '#F59E0B',
    background: '#FFFBEB',
  },
  tagNew: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    color: '#3B82F6',
    background: '#EFF6FF',
  },
  tagManual: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    color: '#8B5CF6',
    background: '#F5F3FF',
  },
};

const TagDot = ({ color }) => (
  <span style={{
    display: 'block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }} />
);

const Tag = ({ type, children }) => {
  const styles = {
    hot: { ...customStyles.tagHot },
    new: { ...customStyles.tagNew },
    manual: { ...customStyles.tagManual },
    green: { ...customStyles.tagGreen },
  };
  const dotColors = {
    hot: '#F59E0B',
    new: '#3B82F6',
    manual: '#8B5CF6',
  };
  return (
    <span style={styles[type] || customStyles.tagHot}>
      {type !== 'green' && <TagDot color={dotColors[type]} />}
      {children}
    </span>
  );
};

const strategies = [
  { id: 'STR-552', name: '高转化率算法排序 (v2.1)', tagType: 'hot', tagLabel: 'Hot 模型' },
  { id: 'STR-109', name: '冷启动新品加权', tagType: 'new', tagLabel: '新品曝光' },
  { id: 'STR-902', name: '下午茶限定人工池', tagType: 'manual', tagLabel: 'Manual' },
];

const pools = [
  '默认全量商品池 (POOL-001)',
  'Q3 季度上新池 (POOL-042)',
  '限时大促商品池 (POOL-999)',
];

const fallbacks = [
  '使用全局热销榜兜底',
  '展示空白占位',
  '随机推荐',
];

const Drawer = ({ onClose, onConfirm }) => {
  const [selectedStrategy, setSelectedStrategy] = useState('STR-552');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPool, setSelectedPool] = useState(pools[0]);
  const [selectedFallback, setSelectedFallback] = useState(fallbacks[0]);
  const [slotNumber, setSlotNumber] = useState(7);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredStrategies = strategies.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={customStyles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={customStyles.drawerPanel}>
        <div style={customStyles.drawerHeader}>
          <h2 style={customStyles.h1}>添加新坑位规则</h2>
          <button style={customStyles.btnClose} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={customStyles.drawerContent}>
          <div style={{ ...customStyles.labelCaps, marginBottom: '12px' }}>第一步：选择排序策略</div>

          <div style={customStyles.searchContainer}>
            <span style={customStyles.searchIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              style={customStyles.searchInput}
              placeholder="搜索策略名称或 ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={customStyles.stratGrid}>
            {filteredStrategies.map((s) => (
              <div
                key={s.id}
                style={selectedStrategy === s.id ? customStyles.stratCardSelected : {
                  ...customStyles.stratCard,
                  ...(hoveredCard === s.id ? { borderColor: '#1A1A1A', background: '#FAFAFA' } : {}),
                }}
                onClick={() => setSelectedStrategy(s.id)}
                onMouseEnter={() => setHoveredCard(s.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{s.name}</div>
                  <div style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginTop: '4px' }}>ID: {s.id}</div>
                </div>
                <Tag type={s.tagType}>{s.tagLabel}</Tag>
              </div>
            ))}
          </div>

          <div style={customStyles.configForm}>
            <div style={{ ...customStyles.labelCaps, marginBottom: '16px' }}>第二步：基础参数配置</div>

            <div style={customStyles.formGroup}>
              <label style={customStyles.formLabel}>关联选品池</label>
              <select
                style={customStyles.formSelect}
                value={selectedPool}
                onChange={(e) => setSelectedPool(e.target.value)}
              >
                {pools.map((p, i) => <option key={i}>{p}</option>)}
              </select>
            </div>

            <div style={customStyles.formGroup}>
              <label style={customStyles.formLabel}>兜底方案</label>
              <select
                style={customStyles.formSelect}
                value={selectedFallback}
                onChange={(e) => setSelectedFallback(e.target.value)}
              >
                {fallbacks.map((f, i) => <option key={i}>{f}</option>)}
              </select>
            </div>

            <div style={customStyles.formGroup}>
              <label style={customStyles.formLabel}>展示位置 (Slot Number)</label>
              <input
                type="number"
                style={customStyles.formInput}
                value={slotNumber}
                min={1}
                max={10}
                onChange={(e) => setSlotNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={customStyles.drawerFooter}>
          <button
            style={{ ...customStyles.btn, ...customStyles.btnSecondary }}
            onClick={onClose}
          >
            取消
          </button>
          <button
            style={{ ...customStyles.btn, ...customStyles.btnPrimary }}
            onClick={() => onConfirm({ strategy: selectedStrategy, pool: selectedPool, fallback: selectedFallback, slotNumber })}
          >
            确认添加至坑位 #{String(slotNumber).padStart(2, '0')}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('strategy');
  const [slots, setSlots] = useState([
    { id: '01', name: '早鸟必点定序', tag: 'manual', tagLabel: 'Manual', pool: '热销榜' },
  ]);

  const handleConfirm = ({ strategy, pool, fallback, slotNumber }) => {
    const strat = strategies.find(s => s.id === strategy);
    const newSlot = {
      id: String(slotNumber).padStart(2, '0'),
      name: strat ? strat.name : strategy,
      tag: strat ? strat.tagType : 'manual',
      tagLabel: strat ? strat.tagLabel : 'Manual',
      pool: pool.split(' ')[0],
    };
    setSlots(prev => {
      const filtered = prev.filter(s => s.id !== newSlot.id);
      return [...filtered, newSlot].sort((a, b) => a.id.localeCompare(b.id));
    });
    setDrawerOpen(false);
  };

  return (
    <>
      <div style={drawerOpen ? customStyles.appContainerBlurred : customStyles.appContainer}>
        <header style={customStyles.topNav}>
          <div style={customStyles.logo}>
            <div style={customStyles.logoMark}></div>
            策略后台
          </div>
          <nav style={customStyles.navLinks}>
            <span
              style={activeNav === 'pool' ? customStyles.navLinkActive : customStyles.navLink}
              onClick={() => setActiveNav('pool')}
            >
              选品池
            </span>
            <span
              style={activeNav === 'strategy' ? customStyles.navLinkActive : customStyles.navLink}
              onClick={() => setActiveNav('strategy')}
            >
              策略组合
            </span>
          </nav>
        </header>

        <main style={customStyles.mainContent}>
          <div style={customStyles.pageHeader}>
            <div>
              <div style={customStyles.breadcrumb}>
                <span>策略组合</span>
                <span>/</span>
                <span style={{ color: '#111827' }}>编辑组合</span>
              </div>
              <h1 style={customStyles.h1}>首页点单推荐Tab组合 (ID: CMP-892)</h1>
            </div>
            <button
              style={{ ...customStyles.btn, ...customStyles.btnPrimary }}
              onClick={() => setDrawerOpen(true)}
            >
              + 添加坑位
            </button>
          </div>

          <div style={customStyles.summaryStrip}>
            <div style={customStyles.metricGroup}>
              <span style={customStyles.labelCaps}>已配置坑位</span>
              <span style={customStyles.metricVal}>
                {slots.length}{' '}
                <span style={{ fontSize: '14px', color: '#9CA3AF' }}>/ 10</span>
              </span>
            </div>
            <div style={customStyles.metricGroup}>
              <span style={customStyles.labelCaps}>生效状态</span>
              <Tag type="green">投放中</Tag>
            </div>
          </div>

          <div style={customStyles.editorLayout}>
            <div style={customStyles.panel}>
              <div style={customStyles.panelHeader}>
                <h2 style={customStyles.h2}>坑位编排 (Slots)</h2>
              </div>
              <div style={customStyles.slotList}>
                {slots.map((slot) => (
                  <div key={slot.id} style={customStyles.slotItem}>
                    <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>#{slot.id}</div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{slot.name}</div>
                    <div><Tag type={slot.tag}>{slot.tagLabel}</Tag></div>
                    <div style={{ ...customStyles.labelCaps, fontSize: '11px' }}>{slot.pool}</div>
                    <div></div>
                    <button
                      style={{ ...customStyles.btnClose, color: '#9CA3AF' }}
                      onClick={() => setSlots(prev => prev.filter(s => s.id !== slot.id))}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {slots.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
                    暂无坑位，点击右上角"添加坑位"开始配置
                  </div>
                )}
              </div>
            </div>
            <div style={{ ...customStyles.panel, height: '400px', background: '#fdfdfd' }}></div>
          </div>
        </main>
      </div>

      {drawerOpen && (
        <Drawer
          onClose={() => setDrawerOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #FAFAFA;
        color: #111827;
        font-size: 13px;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;