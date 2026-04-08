import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  root: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#FAFAFA',
    color: '#111827',
    fontSize: '13px',
    lineHeight: '1.5',
    WebkitFontSmoothing: 'antialiased',
  },
  h1: { fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' },
  h2: { fontSize: '14px', fontWeight: 600, color: '#111827' },
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
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
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  navLinkActive: {
    padding: '6px 12px',
    color: '#111827',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    background: '#FAFAFA',
    cursor: 'pointer',
  },
  navActions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
    color: '#111827',
    fontVariantNumeric: 'tabular-nums',
  },
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    overflow: 'hidden',
  },
  tabs: {
    display: 'flex',
    gap: '24px',
    padding: '0 24px',
    borderBottom: '1px solid #F0F0F0',
  },
  tab: {
    padding: '12px 0',
    color: '#6B7280',
    fontWeight: 500,
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    padding: '12px 0',
    color: '#111827',
    fontWeight: 500,
    cursor: 'pointer',
    borderBottom: '2px solid #111827',
  },
  tagGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 600,
    gap: '4px',
    background: '#52A068',
    color: 'white',
    letterSpacing: '0.5px',
  },
  traceContainer: {
    padding: '40px',
    background: '#fdfdfd',
    minHeight: '540px',
    position: 'relative',
    overflowX: 'auto',
  },
  pipelineWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '60px',
    minWidth: '1000px',
    position: 'relative',
  },
  traceColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    zIndex: 2,
  },
  node: {
    background: '#FFFFFF',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    position: 'relative',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },
  nodeHighlighted: {
    background: '#EFF6FF',
    border: '1px solid #3B82F6',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    position: 'relative',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },
  nodeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    alignItems: 'center',
  },
  nodeTitle: {
    fontWeight: 600,
    fontSize: '12px',
    color: '#111827',
  },
  nodeStats: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid #FAFAFA',
  },
  statMini: {
    fontSize: '11px',
    color: '#6B7280',
  },
  columnLabel: {
    marginBottom: '16px',
    textAlign: 'center',
    background: '#FAFAFA',
    padding: '4px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  traceSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  tagSmall: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1px 6px',
    borderRadius: '9999px',
    fontSize: '9px',
    fontWeight: 500,
    gap: '4px',
    background: '#EDF7F0',
    color: '#52A068',
  },
  tagSmallGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1px 6px',
    borderRadius: '9999px',
    fontSize: '9px',
    fontWeight: 600,
    gap: '4px',
    background: '#52A068',
    color: 'white',
    letterSpacing: '0.5px',
  },
};

const Header = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { label: '选品池', id: 'selection' },
    { label: '排序策略', id: 'ranking' },
    { label: '策略组合', id: 'combo' },
    { label: '投放计划', id: 'delivery' },
    { label: '效果监控', id: 'monitor' },
  ];

  return (
    <header style={customStyles.topNav}>
      <div style={customStyles.logo}>
        <div style={customStyles.logoMark}></div>
        策略后台
      </div>
      <nav style={customStyles.navLinks}>
        {navItems.map((item) => (
          <span
            key={item.id}
            style={activeNav === item.id ? customStyles.navLinkActive : customStyles.navLink}
            onClick={() => setActiveNav(item.id)}
          >
            {item.label}
          </span>
        ))}
      </nav>
      <div style={customStyles.navActions}>
        <span style={customStyles.labelCaps}>操作人: 运营 admin</span>
      </div>
    </header>
  );
};

const SummaryStrip = () => (
  <div style={customStyles.summaryStrip}>
    <div style={customStyles.metricGroup}>
      <span style={customStyles.labelCaps}>当前链路状态</span>
      <span style={{ marginTop: '4px', ...customStyles.tagGreen }}>Healthy</span>
    </div>
    <div style={customStyles.metricGroup}>
      <span style={customStyles.labelCaps}>端到端延迟</span>
      <span style={customStyles.metricVal}>42ms</span>
    </div>
    <div style={customStyles.metricGroup}>
      <span style={customStyles.labelCaps}>缓存命中率</span>
      <span style={customStyles.metricVal}>94.2%</span>
    </div>
  </div>
);

const Node = ({ title, children, highlighted, hoveredNode, setHoveredNode, nodeId }) => {
  const isHovered = hoveredNode === nodeId;
  const baseStyle = highlighted ? customStyles.nodeHighlighted : customStyles.node;
  const hoverStyle = isHovered
    ? { ...baseStyle, borderColor: '#9CA3AF', transform: 'translateY(-2px)' }
    : baseStyle;

  return (
    <div
      style={hoverStyle}
      onMouseEnter={() => setHoveredNode(nodeId)}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {children}
    </div>
  );
};

const TraceView = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div style={customStyles.traceContainer}>
      <svg style={customStyles.traceSvg}>
        <defs>
          <style>{`
            @keyframes flow {
              from { stroke-dashoffset: 100; }
              to { stroke-dashoffset: 0; }
            }
            .connector-path {
              stroke: #E5E7EB;
              stroke-width: 2;
              fill: none;
              stroke-dasharray: 4;
              animation: flow 20s linear infinite;
            }
            .connector-path.active {
              stroke: #3B82F6;
              stroke-width: 2;
              stroke-dasharray: none;
              opacity: 0.4;
            }
          `}</style>
        </defs>
        <path d="M 230 140 C 300 140, 300 140, 370 140" className="connector-path active" />
        <path d="M 230 260 C 300 260, 300 260, 370 260" className="connector-path" />
        <path d="M 230 380 C 300 380, 300 260, 370 260" className="connector-path" />
        <path d="M 600 140 C 670 140, 670 260, 740 260" className="connector-path active" />
        <path d="M 600 260 C 670 260, 670 260, 740 260" className="connector-path active" />
        <path d="M 970 260 C 1040 260, 1040 260, 1110 260" className="connector-path active" />
      </svg>

      <div style={customStyles.pipelineWrapper}>
        {/* Column 1 */}
        <div style={customStyles.traceColumn}>
          <div style={customStyles.columnLabel}>01 选品池 (Selection)</div>

          <Node nodeId="pool_breakfast" hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>POOL_BREAKFAST</span>
              <span style={customStyles.tagSmall}>活跃</span>
            </div>
            <div style={customStyles.nodeStats}>
              <span style={customStyles.statMini}>SKU: <b style={{ color: '#111827', fontWeight: 600 }}>128</b></span>
              <span style={customStyles.statMini}>更新: <b style={{ color: '#111827', fontWeight: 600 }}>2m ago</b></span>
            </div>
          </Node>

          <Node nodeId="pool_hot_all" hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>POOL_HOT_ALL</span>
            </div>
            <div style={customStyles.nodeStats}>
              <span style={customStyles.statMini}>SKU: <b style={{ color: '#111827', fontWeight: 600 }}>2,400</b></span>
            </div>
          </Node>

          <Node nodeId="pool_new_q3" hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>POOL_NEW_Q3</span>
            </div>
            <div style={customStyles.nodeStats}>
              <span style={customStyles.statMini}>SKU: <b style={{ color: '#111827', fontWeight: 600 }}>45</b></span>
            </div>
          </Node>
        </div>

        {/* Column 2 */}
        <div style={customStyles.traceColumn}>
          <div style={customStyles.columnLabel}>02 排序策略 (Ranking)</div>

          <Node nodeId="manual_order" hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>Manual_Order_01</span>
            </div>
            <div style={customStyles.statMini}>权重: 1.0 (强制)</div>
          </Node>

          <Node nodeId="deepfm_ctr" hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>DeepFM_CTR_Model</span>
            </div>
            <div style={customStyles.statMini}>版本: v2.4.1</div>
          </Node>
        </div>

        {/* Column 3 */}
        <div style={customStyles.traceColumn}>
          <div style={customStyles.columnLabel}>03 组合逻辑 (Combine)</div>

          <Node nodeId="cmp892" highlighted hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>CMP-892 (当前)</span>
              <span style={customStyles.tagSmallGreen}>运行中</span>
            </div>
            <div style={customStyles.statMini}>配置坑位: 6/10</div>
            <div style={customStyles.nodeStats}>
              <span style={customStyles.statMini}>QPS: <b style={{ color: '#111827', fontWeight: 600 }}>1.2k</b></span>
            </div>
          </Node>
        </div>

        {/* Column 4 */}
        <div style={customStyles.traceColumn}>
          <div style={customStyles.columnLabel}>04 投放计划 (Delivery)</div>

          <Node nodeId="plan_weekend" hoveredNode={hoveredNode} setHoveredNode={setHoveredNode}>
            <div style={customStyles.nodeHeader}>
              <span style={customStyles.nodeTitle}>PLAN_WEEKEND_PROMO</span>
            </div>
            <div style={customStyles.statMini}>目标: 转化率提升</div>
            <div style={customStyles.nodeStats}>
              <span style={customStyles.statMini}>实验组: <b style={{ color: '#111827', fontWeight: 600 }}>VID-102</b></span>
            </div>
          </Node>
        </div>
      </div>
    </div>
  );
};

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('trace');
  const [activeNav, setActiveNav] = useState('combo');

  const tabs = [
    { id: 'slots', label: '坑位编排 (Slots)' },
    { id: 'trace', label: '全链路 Trace' },
    { id: 'mock', label: '规则模拟 (Mock)' },
  ];

  return (
    <div style={customStyles.appContainer}>
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      <main style={customStyles.mainContent}>
        <div style={customStyles.pageHeader}>
          <div>
            <div style={customStyles.breadcrumb}>
              <span>策略组合</span>
              <span>/</span>
              <span style={{ color: '#111827' }}>CMP-892</span>
            </div>
            <h1 style={customStyles.h1}>全链路数据追踪 Trace View</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{ ...customStyles.btn, ...customStyles.btnSecondary }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              导出拓扑
            </button>
            <button
              style={{ ...customStyles.btn, ...customStyles.btnPrimary }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1A1A'; }}
            >
              刷新链路
            </button>
          </div>
        </div>

        <SummaryStrip />

        <div style={customStyles.panel}>
          <div style={customStyles.tabs}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                style={activeTab === tab.id ? customStyles.tabActive : customStyles.tab}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {activeTab === 'trace' && <TraceView />}
          {activeTab === 'slots' && (
            <div style={{ padding: '40px', minHeight: '540px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px' }}>
              坑位编排视图 — 暂无内容
            </div>
          )}
          {activeTab === 'mock' && (
            <div style={{ padding: '40px', minHeight: '540px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px' }}>
              规则模拟视图 — 暂无内容
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#FAFAFA';
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;