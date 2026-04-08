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
    padding: '6px 12px',
    color: '#111827',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    background: '#FAFAFA',
    cursor: 'pointer',
    border: 'none',
    fontSize: '13px',
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
  h1: {
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: '#111827',
  },
  h2: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
  },
  labelCaps: {
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
  btnSecondary: {
    background: '#FFFFFF',
    borderColor: '#F0F0F0',
    color: '#111827',
  },
  filterBar: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    background: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '8px',
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
  metricSub: {
    fontSize: '12px',
    color: '#52A068',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  metricSubNegative: {
    fontSize: '12px',
    color: '#E57373',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  monitoringGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
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
  chartContainer: {
    padding: '24px',
    height: '240px',
    position: 'relative',
  },
  chartSvg: {
    width: '100%',
    height: '100%',
  },
  legend: {
    display: 'flex',
    gap: '16px',
    padding: '12px 24px',
    borderTop: '1px solid #F0F0F0',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#6B7280',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '2px',
  },
  tableContainer: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 24px',
    borderBottom: '1px solid #F0F0F0',
    background: '#FAFAFA',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  td: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
  },
  progressBar: {
    height: '6px',
    background: '#FAFAFA',
    borderRadius: '3px',
    width: '100px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
  },
};

const NavLink = ({ children, active, onClick }) => (
  <button
    style={active ? customStyles.navLinkActive : customStyles.navLink}
    onClick={onClick}
  >
    {children}
  </button>
);

const Header = ({ activeNav, setActiveNav }) => {
  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控', '全链路预览'];
  return (
    <header style={customStyles.topNav}>
      <div style={customStyles.logo}>
        <div style={customStyles.logoMark}></div>
        策略后台
      </div>
      <nav style={customStyles.navLinks}>
        {navItems.map((item) => (
          <NavLink key={item} active={activeNav === item} onClick={() => setActiveNav(item)}>
            {item}
          </NavLink>
        ))}
      </nav>
      <div style={customStyles.navActions}>
        <span style={customStyles.labelCaps}>操作人: 运营 admin</span>
      </div>
    </header>
  );
};

const ChartPanel = ({ title, unit, paths }) => (
  <div style={customStyles.panel}>
    <div style={customStyles.panelHeader}>
      <h2 style={customStyles.h2}>{title}</h2>
      <span style={customStyles.labelCaps}>{unit}</span>
    </div>
    <div style={customStyles.chartContainer}>
      <svg style={customStyles.chartSvg} viewBox="0 0 400 200">
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth="2"
            opacity={p.opacity || 1}
          />
        ))}
      </svg>
    </div>
    <div style={customStyles.legend}>
      {[
        { color: '#8B5CF6', label: 'Slot #01' },
        { color: '#F59E0B', label: 'Slot #02' },
        { color: '#3B82F6', label: 'Slot #03' },
      ].map((item) => (
        <div key={item.label} style={customStyles.legendItem}>
          <div style={{ ...customStyles.legendDot, background: item.color }}></div>
          {item.label}
        </div>
      ))}
    </div>
  </div>
);

const FilterBar = ({ activePeriod, setActivePeriod, activeDimension, setActiveDimension }) => (
  <div style={customStyles.filterBar}>
    <span style={customStyles.labelCaps}>统计周期:</span>
    <button
      style={{
        ...customStyles.btn,
        ...customStyles.btnSecondary,
        padding: '4px 12px',
        background: activePeriod === '7days' ? '#FAFAFA' : '#FFFFFF',
      }}
      onClick={() => setActivePeriod('7days')}
    >
      过去 7 天
    </button>
    <button
      style={{
        ...customStyles.btn,
        ...customStyles.btnSecondary,
        padding: '4px 12px',
        background: activePeriod === '24h' ? '#FAFAFA' : '#FFFFFF',
      }}
      onClick={() => setActivePeriod('24h')}
    >
      过去 24 小时
    </button>
    <span style={{ color: '#F0F0F0', margin: '0 8px' }}>|</span>
    <span style={customStyles.labelCaps}>展示维度:</span>
    <button
      style={{
        ...customStyles.btn,
        ...customStyles.btnSecondary,
        padding: '4px 12px',
        background: activeDimension === 'slot' ? '#FAFAFA' : '#FFFFFF',
      }}
      onClick={() => setActiveDimension('slot')}
    >
      坑位(Slot)
    </button>
    <button
      style={{
        ...customStyles.btn,
        ...customStyles.btnSecondary,
        padding: '4px 12px',
        background: activeDimension === 'pool' ? '#FAFAFA' : '#FFFFFF',
      }}
      onClick={() => setActiveDimension('pool')}
    >
      选品池
    </button>
  </div>
);

const MonitoringPage = () => {
  const [activePeriod, setActivePeriod] = useState('7days');
  const [activeDimension, setActiveDimension] = useState('slot');

  const exposureChartPaths = [
    { d: 'M0,150 Q50,130 100,140 T200,80 T300,90 T400,40', color: '#8B5CF6' },
    { d: 'M0,160 Q50,155 100,158 T200,120 T300,130 T400,100', color: '#F59E0B', opacity: 0.6 },
    { d: 'M0,180 Q50,178 100,175 T200,160 T300,165 T400,150', color: '#3B82F6', opacity: 0.6 },
  ];
  const ctrChartPaths = [
    { d: 'M0,100 Q50,90 100,95 T200,60 T300,70 T400,50', color: '#8B5CF6' },
    { d: 'M0,120 Q50,115 100,110 T200,90 T300,95 T400,80', color: '#F59E0B', opacity: 0.6 },
    { d: 'M0,140 Q50,135 100,138 T200,120 T300,125 T400,110', color: '#3B82F6', opacity: 0.6 },
  ];
  const cvrChartPaths = [
    { d: 'M0,130 Q50,120 100,125 T200,100 T300,110 T400,90', color: '#8B5CF6' },
    { d: 'M0,150 Q50,145 100,148 T200,130 T300,135 T400,120', color: '#F59E0B', opacity: 0.6 },
    { d: 'M0,170 Q50,165 100,168 T200,150 T300,155 T400,140', color: '#3B82F6', opacity: 0.6 },
  ];

  const tableRows = [
    {
      slot: '#01',
      strategyName: '早鸟必点定序',
      strategyType: 'Manual',
      exposure: '524,102',
      ctr: '12.45%',
      progress: 85,
      progressColor: '#8B5CF6',
      cvr: '4.21%',
      gmv: '¥ 124,000',
    },
    {
      slot: '#02',
      strategyName: '全店热销Top10',
      strategyType: 'Hot Model',
      exposure: '412,093',
      ctr: '8.12%',
      progress: 60,
      progressColor: '#F59E0B',
      cvr: '2.84%',
      gmv: '¥ 98,210',
    },
    {
      slot: '#03',
      strategyName: '本周上新推荐',
      strategyType: 'New',
      exposure: '347,897',
      ctr: '4.68%',
      progress: 35,
      progressColor: '#3B82F6',
      cvr: '2.40%',
      gmv: '¥ 42,150',
    },
  ];

  return (
    <main style={customStyles.mainContent}>
      <div style={customStyles.pageHeader}>
        <div>
          <div style={customStyles.breadcrumb}>
            <span>效果监控</span>
            <span>/</span>
            <span style={{ color: '#111827' }}>CMP-892 首页点单推荐Tab</span>
          </div>
          <h1 style={customStyles.h1}>组合效果实时监控 Dashboard</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ ...customStyles.btn, ...customStyles.btnSecondary }}>导出报表</button>
          <button style={{ ...customStyles.btn, ...customStyles.btnSecondary }}>对比历史周期</button>
        </div>
      </div>

      <FilterBar
        activePeriod={activePeriod}
        setActivePeriod={setActivePeriod}
        activeDimension={activeDimension}
        setActiveDimension={setActiveDimension}
      />

      <div style={customStyles.summaryStrip}>
        <div style={customStyles.metricGroup}>
          <span style={customStyles.labelCaps}>累计曝光量 (PV)</span>
          <span style={customStyles.metricVal}>1,284,092</span>
          <span style={customStyles.metricSub}>↑ 12.4% vs 环比</span>
        </div>
        <div style={customStyles.metricGroup}>
          <span style={customStyles.labelCaps}>平均点击率 (CTR)</span>
          <span style={customStyles.metricVal}>8.42%</span>
          <span style={customStyles.metricSub}>↑ 0.8% vs 环比</span>
        </div>
        <div style={customStyles.metricGroup}>
          <span style={customStyles.labelCaps}>转化率 (CVR)</span>
          <span style={customStyles.metricVal}>3.15%</span>
          <span style={customStyles.metricSubNegative}>↓ 0.2% vs 环比</span>
        </div>
        <div style={{ ...customStyles.metricGroup, marginLeft: 'auto', textAlign: 'right' }}>
          <span style={customStyles.labelCaps}>实时在线版本</span>
          <span style={customStyles.metricVal}>Plan A (VID:102)</span>
          <span style={customStyles.metricSub}>更新于 2023-10-24 10:00</span>
        </div>
      </div>

      <div style={customStyles.monitoringGrid}>
        <ChartPanel title="曝光趋势 (Exposure)" unit="单位: 万" paths={exposureChartPaths} />
        <ChartPanel title="点击率趋势 (CTR)" unit="单位: %" paths={ctrChartPaths} />
        <ChartPanel title="转化率趋势 (CVR)" unit="单位: %" paths={cvrChartPaths} />
      </div>

      <div style={customStyles.panel}>
        <div style={customStyles.panelHeader}>
          <h2 style={customStyles.h2}>各坑位详细表现对比</h2>
        </div>
        <table style={customStyles.tableContainer}>
          <thead>
            <tr>
              <th style={customStyles.th}>位置</th>
              <th style={customStyles.th}>排序策略</th>
              <th style={customStyles.th}>累计曝光</th>
              <th style={customStyles.th}>点击率 (CTR)</th>
              <th style={customStyles.th}>CTR 达成率</th>
              <th style={customStyles.th}>转化率 (CVR)</th>
              <th style={customStyles.th}>GMV 贡献</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <tr key={row.slot}>
                <td style={customStyles.td}>
                  <span style={{ color: '#9CA3AF', fontVariantNumeric: 'tabular-nums' }}>{row.slot}</span>
                </td>
                <td style={customStyles.td}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500 }}>{row.strategyName}</span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{row.strategyType}</span>
                  </div>
                </td>
                <td style={{ ...customStyles.td, fontVariantNumeric: 'tabular-nums' }}>{row.exposure}</td>
                <td style={{ ...customStyles.td, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{row.ctr}</td>
                <td style={customStyles.td}>
                  <div style={customStyles.progressBar}>
                    <div
                      style={{
                        ...customStyles.progressFill,
                        width: `${row.progress}%`,
                        background: row.progressColor,
                      }}
                    ></div>
                  </div>
                </td>
                <td style={{ ...customStyles.td, fontVariantNumeric: 'tabular-nums' }}>{row.cvr}</td>
                <td style={{ ...customStyles.td, fontVariantNumeric: 'tabular-nums' }}>{row.gmv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

const App = () => {
  const [activeNav, setActiveNav] = useState('效果监控');

  return (
    <Router basename="/">
      <div style={customStyles.appContainer}>
        <Header activeNav={activeNav} setActiveNav={setActiveNav} />
        <Routes>
          <Route path="/" element={<MonitoringPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;