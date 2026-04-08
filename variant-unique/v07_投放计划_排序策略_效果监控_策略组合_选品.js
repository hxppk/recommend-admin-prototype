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
    flex: 1,
  },
  navLink: {
    padding: '6px 12px',
    color: '#6B7280',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: '8px',
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
    alignItems: 'flex-end',
  },
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  filterBar: {
    background: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  selectMock: {
    padding: '6px 12px',
    border: '1px solid #F0F0F0',
    borderRadius: '6px',
    fontSize: '12px',
    background: '#FAFAFA',
    minWidth: '140px',
    color: '#111827',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  statCard: {
    background: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statMain: {
    fontSize: '24px',
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
  },
  statCompare: {
    fontSize: '12px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  monitorLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
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
  chartContainer: {
    padding: '24px',
    height: '320px',
    position: 'relative',
  },
  chartMock: {
    width: '100%',
    height: '260px',
    borderLeft: '1px solid #F0F0F0',
    borderBottom: '1px solid #F0F0F0',
    position: 'relative',
  },
  chartLegend: {
    display: 'flex',
    gap: '16px',
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
  tagAb: {
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 600,
  },
  tagVid: {
    background: '#F5F3FF',
    color: '#8B5CF6',
  },
  tagCtrl: {
    background: '#FAFAFA',
    color: '#6B7280',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableTh: {
    textAlign: 'left',
    padding: '12px 24px',
    background: '#FAFAFA',
    borderBottom: '1px solid #F0F0F0',
    color: '#6B7280',
    fontSize: '11px',
    fontWeight: 500,
  },
  tableTd: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
  },
};

const StatCard = ({ label, value, tag, change, changeType, vsLabel }) => (
  <div style={customStyles.statCard}>
    <span style={customStyles.labelCaps}>{label}</span>
    <span style={{ ...customStyles.statMain }}>{value}</span>
    <div style={customStyles.statCompare}>
      <span style={{ ...customStyles.tagAb, ...customStyles.tagVid }}>{tag}</span>
      <span style={{ color: changeType === 'up' ? '#52A068' : '#E57373' }}>
        {changeType === 'up' ? '↑' : '↓'} {change}
      </span>
      {vsLabel && <span style={{ color: '#9CA3AF' }}>{vsLabel}</span>}
    </div>
  </div>
);

const MonitorPage = () => {
  const [activeNav, setActiveNav] = useState('效果监控');
  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控'];

  return (
    <div style={customStyles.appContainer}>
      <header style={customStyles.topNav}>
        <div style={customStyles.logo}>
          <div style={customStyles.logoMark}></div>
          策略后台
        </div>
        <nav style={customStyles.navLinks}>
          {navItems.map((item) => (
            <button
              key={item}
              style={activeNav === item ? customStyles.navLinkActive : customStyles.navLink}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <div>
          <span style={customStyles.labelCaps}>操作人: 运营 admin</span>
        </div>
      </header>

      <main style={customStyles.mainContent}>
        <div style={customStyles.pageHeader}>
          <div>
            <div style={{ ...customStyles.labelCaps, marginBottom: '8px' }}>监控概览 / CMP-892</div>
            <h1 style={{ fontSize: '18px', fontWeight: 600 }}>首页点单推荐Tab 实验监控</h1>
          </div>
          <div style={customStyles.filterItem}>
            <span style={customStyles.labelCaps}>统计周期</span>
            <div style={customStyles.selectMock}>过去 7 天 (05/14 - 05/20)</div>
          </div>
        </div>

        <div style={customStyles.filterBar}>
          <div style={customStyles.filterItem}>
            <span style={customStyles.labelCaps}>当前组合</span>
            <div style={customStyles.selectMock}>CMP-892 (首页点单)</div>
          </div>
          <div style={customStyles.filterItem}>
            <span style={customStyles.labelCaps}>对比维度</span>
            <div style={customStyles.selectMock}>AB 实验组 (VID: 102 vs Control)</div>
          </div>
          <div style={customStyles.filterItem}>
            <span style={customStyles.labelCaps}>终端平台</span>
            <div style={customStyles.selectMock}>全部终端</div>
          </div>
        </div>

        <div style={customStyles.statsGrid}>
          <StatCard
            label="曝光点击率 (CTR)"
            value="12.84%"
            tag="VID:102"
            change="2.41%"
            changeType="up"
            vsLabel="vs Control"
          />
          <StatCard
            label="转化率 (CVR)"
            value="4.52%"
            tag="VID:102"
            change="0.85%"
            changeType="up"
            vsLabel="vs Control"
          />
          <StatCard
            label="日均曝光量 (PV)"
            value="142,093"
            tag="VID:102"
            change="0.12%"
            changeType="down"
          />
          <StatCard
            label="单UV价值 (ARPU)"
            value="¥ 12.5"
            tag="VID:102"
            change="5.20%"
            changeType="up"
          />
        </div>

        <div style={customStyles.monitorLayout}>
          <div style={customStyles.panel}>
            <div style={customStyles.panelHeader}>
              <h2 style={{ fontSize: '14px', fontWeight: 600 }}>核心指标趋势 (CTR)</h2>
              <div style={customStyles.chartLegend}>
                <div style={customStyles.legendItem}>
                  <div style={{ ...customStyles.dot, background: '#8B5CF6' }}></div>
                  实验组 VID:102
                </div>
                <div style={customStyles.legendItem}>
                  <div style={{ ...customStyles.dot, background: '#9CA3AF' }}></div>
                  对照组 Control
                </div>
              </div>
            </div>
            <div style={customStyles.chartContainer}>
              <div style={customStyles.chartMock}>
                <svg
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  style={{ position: 'absolute', bottom: 0, left: 0 }}
                >
                  <path
                    d="M0,50 Q25,30 50,45 T100,20"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,55 Q25,58 50,52 T100,50"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                </svg>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#6B7280',
                }}
              >
                <span>05/14</span>
                <span>05/15</span>
                <span>05/16</span>
                <span>05/17</span>
                <span>05/18</span>
                <span>05/19</span>
                <span>05/20</span>
              </div>
            </div>
          </div>

          <div style={customStyles.panel}>
            <div style={customStyles.panelHeader}>
              <h2 style={{ fontSize: '14px', fontWeight: 600 }}>实验组明细数据</h2>
            </div>
            <table style={customStyles.table}>
              <thead>
                <tr>
                  <th style={customStyles.tableTh}>版本</th>
                  <th style={customStyles.tableTh}>流量占比</th>
                  <th style={customStyles.tableTh}>CTR</th>
                  <th style={customStyles.tableTh}>显著性</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={customStyles.tableTd}>
                    <span style={{ ...customStyles.tagAb, ...customStyles.tagVid }}>VID: 102</span>
                  </td>
                  <td style={{ ...customStyles.tableTd, fontVariantNumeric: 'tabular-nums' }}>20%</td>
                  <td style={{ ...customStyles.tableTd, fontVariantNumeric: 'tabular-nums' }}>12.84%</td>
                  <td style={customStyles.tableTd}>
                    <span style={{ color: '#52A068', fontWeight: 600 }}>显著提升</span>
                  </td>
                </tr>
                <tr>
                  <td style={customStyles.tableTd}>
                    <span style={{ ...customStyles.tagAb, ...customStyles.tagCtrl }}>Control</span>
                  </td>
                  <td style={{ ...customStyles.tableTd, fontVariantNumeric: 'tabular-nums' }}>80%</td>
                  <td style={{ ...customStyles.tableTd, fontVariantNumeric: 'tabular-nums' }}>10.43%</td>
                  <td style={{ ...customStyles.tableTd, color: '#9CA3AF' }}>-</td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ ...customStyles.labelCaps, marginBottom: '8px' }}>置信度分析</div>
              <div style={{ fontSize: '12px', color: '#374151' }}>
                基于当前样本量，实验结论置信度为{' '}
                <span style={{ color: '#52A068', fontWeight: 600 }}>98.2%</span>。建议继续投放观察。
              </div>
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
        <Route path="/" element={<MonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;