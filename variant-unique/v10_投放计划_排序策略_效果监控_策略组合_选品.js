import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

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
    '--color-red-bg': '#FFF5F5',
    '--color-purple': '#8B5CF6',
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
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FAFAFA',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#111827',
    WebkitFontSmoothing: 'antialiased',
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
    fontFamily: 'inherit',
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
    fontFamily: 'inherit',
  },
  btnSecondary: {
    background: '#FFFFFF',
    borderColor: '#F0F0F0',
    color: '#111827',
  },
  monitorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  statCard: {
    background: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  },
  statDiff: {
    fontSize: '12px',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  diffUp: {
    color: '#52A068',
    background: '#EDF7F0',
  },
  diffDown: {
    color: '#E57373',
    background: '#FFF5F5',
  },
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    overflow: 'hidden',
  },
  panelHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartPlaceholder: {
    height: '300px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chartBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    height: '200px',
  },
  barGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  barContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
    height: '100%',
    alignItems: 'flex-end',
  },
  barSegment: {
    width: '12px',
    borderRadius: '2px 2px 0 0',
    transition: 'height 0.3s ease',
  },
  legend: {
    display: 'flex',
    gap: '16px',
    padding: '16px 24px',
    borderTop: '1px solid #F0F0F0',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#6B7280',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
};

const StatCard = ({ label, value, diffText, diffType }) => {
  const diffStyle = diffType === 'up'
    ? { ...customStyles.statDiff, ...customStyles.diffUp }
    : { ...customStyles.statDiff, ...customStyles.diffDown };

  return (
    <div style={customStyles.statCard}>
      <div style={{ ...customStyles.labelCaps }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 600, margin: '8px 0', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={diffStyle}>
        {diffType === 'up' ? '↑' : '↓'} {diffText} <span style={{ fontWeight: 'normal', opacity: 0.8, marginLeft: '2px' }}>vs 对照组</span>
      </div>
    </div>
  );
};

const ChartBar = ({ controlHeight, expHeight, label }) => (
  <div style={customStyles.barGroup}>
    <div style={customStyles.barContainer}>
      <div style={{ ...customStyles.barSegment, height: controlHeight, background: '#E5E7EB' }}></div>
      <div style={{ ...customStyles.barSegment, height: expHeight, background: '#8B5CF6' }}></div>
    </div>
    <span style={{ ...customStyles.labelCaps }}>{label}</span>
  </div>
);

const SlotBar = ({ label, percent, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', ...customStyles.labelCaps }}>
      <span>{label}</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{percent}%</span>
    </div>
    <div style={{ height: '8px', background: '#FAFAFA', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${percent}%`, height: '100%', background: color }}></div>
    </div>
  </div>
);

const NavLink = ({ children, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const style = {
    ...customStyles.navLink,
    ...(active || hovered ? customStyles.navLinkActive : {}),
  };
  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

const MonitorPage = () => {
  const barData = [
    { control: '40%', exp: '55%', label: '10.18' },
    { control: '45%', exp: '60%', label: '10.19' },
    { control: '50%', exp: '75%', label: '10.20' },
    { control: '60%', exp: '85%', label: '10.21' },
    { control: '55%', exp: '80%', label: '10.22' },
    { control: '45%', exp: '65%', label: '10.23' },
    { control: '50%', exp: '70%', label: 'Today' },
  ];

  return (
    <main style={customStyles.mainContent}>
      <div style={customStyles.pageHeader}>
        <div>
          <div style={customStyles.breadcrumb}>
            <span>效果监控</span>
            <span>/</span>
            <span style={{ color: '#111827' }}>CMP-892 详细数据</span>
          </div>
          <h1 style={customStyles.h1}>
            首页点单推荐Tab效果分析{' '}
            <span style={{ fontWeight: 400, color: '#9CA3AF' }}>VID: 102 vs 对照组</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ ...customStyles.btn, ...customStyles.btnSecondary }}>导出报表</button>
          <button style={{ ...customStyles.btn, ...customStyles.btnSecondary }}>最近 7 天</button>
        </div>
      </div>

      <div style={customStyles.monitorGrid}>
        <StatCard label="曝光点击率 (CTR)" value="8.42%" diffText="1.2%" diffType="up" />
        <StatCard label="千次曝光GMV (GPM)" value="¥1,420" diffText="4.8%" diffType="up" />
        <StatCard label="加购转化率" value="12.1%" diffText="0.3%" diffType="down" />
        <StatCard label="人均曝光坑位数" value="5.2" diffText="0.5" diffType="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={customStyles.panel}>
          <div style={customStyles.panelHeader}>
            <h2 style={customStyles.h2}>GMV 与 CTR 趋势对比</h2>
            <div style={customStyles.labelCaps}>数据更新于: 2023-10-24 10:00</div>
          </div>
          <div style={customStyles.chartPlaceholder}>
            <div style={customStyles.chartBars}>
              {barData.map((d, i) => (
                <ChartBar key={i} controlHeight={d.control} expHeight={d.exp} label={d.label} />
              ))}
            </div>
          </div>
          <div style={customStyles.legend}>
            <div style={customStyles.legendItem}>
              <div style={{ ...customStyles.dot, background: '#E5E7EB' }}></div>
              对照组 (Control)
            </div>
            <div style={customStyles.legendItem}>
              <div style={{ ...customStyles.dot, background: '#8B5CF6' }}></div>
              实验组 (VID: 102)
            </div>
          </div>
        </div>

        <div style={customStyles.panel}>
          <div style={customStyles.panelHeader}>
            <h2 style={customStyles.h2}>分坑位点击分布</h2>
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SlotBar label="Slot #01 (早鸟必点)" percent={42} color="#8B5CF6" />
            <SlotBar label="Slot #02 (全店热销)" percent={28} color="#8B5CF6" />
            <SlotBar label="Slot #03 (本周上新)" percent={15} color="#8B5CF6" />
            <SlotBar label="Others" percent={15} color="#E5E5E5" />
          </div>
        </div>
      </div>

      <div style={customStyles.panel}>
        <div style={customStyles.panelHeader}>
          <h2 style={customStyles.h2}>策略组合明细表</h2>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                {['分层/组别', '曝光用户数', '点击率 (CTR)', '加购率', '转化率 (CVR)', '人均GMV', '置信度 (P-Value)'].map((th, i) => (
                  <th key={i} style={{ padding: '12px 24px', background: '#FAFAFA', borderBottom: '1px solid #F0F0F0', color: '#6B7280', fontWeight: 500, fontSize: '13px' }}>
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px' }}>
                  <span style={{ color: '#6B7280' }}>对照组 (Baseline)</span>
                </td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>42,801</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>7.21%</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>12.4%</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>3.10%</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>¥12.45</td>
                <td style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', fontSize: '13px' }}>-</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 24px', fontSize: '13px' }}>
                  <span style={{ fontWeight: 600 }}>实验组 (VID: 102)</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>43,120</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>
                  8.42% <span style={{ color: '#52A068', fontSize: '11px' }}>(+16%)</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>
                  12.1% <span style={{ color: '#E57373', fontSize: '11px' }}>(-2.4%)</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>
                  3.45% <span style={{ color: '#52A068', fontSize: '11px' }}>(+11%)</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>
                  ¥14.20 <span style={{ color: '#52A068', fontSize: '11px' }}>(+14%)</span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px' }}>
                  <span style={{ background: '#EDF7F0', color: '#52A068', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                    显著 (p&lt;0.05)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

const Header = ({ activeNav, setActiveNav }) => {
  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控'];

  return (
    <header style={customStyles.topNav}>
      <div style={customStyles.logo}>
        <div style={customStyles.logoMark}></div>
        策略后台
      </div>
      <nav style={customStyles.navLinks}>
        {navItems.map((item) => (
          <NavLink
            key={item}
            active={activeNav === item}
            onClick={() => setActiveNav(item)}
          >
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

const App = () => {
  const [activeNav, setActiveNav] = useState('效果监控');

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
      <div style={customStyles.appContainer}>
        <Header activeNav={activeNav} setActiveNav={setActiveNav} />
        <Routes>
          <Route path="/" element={<MonitorPage />} />
          <Route path="*" element={<MonitorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;