import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const customStyles = {
  root: {
    '--bg': '#FFFFFF',
    '--surface': '#FFFFFF',
    '--border': '#000000',
    '--text-main': '#000000',
    '--text-secondary': '#000000',
    '--text-muted': '#666666',
    '--accent': '#0047FF',
    '--sidebar-width': '200px',
    '--radius': '0px',
  },
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '14px',
    lineHeight: '1.2',
    WebkitFontSmoothing: 'antialiased',
    overflowX: 'hidden',
  },
  sideNav: {
    width: '200px',
    background: '#FFFFFF',
    borderRight: '2px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logoContainer: {
    padding: '30px 20px',
    borderBottom: '2px solid #000000',
  },
  logo: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '18px',
    letterSpacing: '-0.04em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoMark: {
    width: '16px',
    height: '16px',
    background: '#0047FF',
    flexShrink: 0,
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
  },
  navLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    color: '#000000',
    textDecoration: 'none',
    padding: '16px 20px',
    borderLeft: '4px solid transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderLeft: '4px solid transparent',
    textAlign: 'left',
    display: 'block',
    width: '100%',
  },
  navLinkActive: {
    borderLeft: '4px solid #0047FF',
    background: '#f0f3ff',
  },
  navFooter: {
    marginTop: 'auto',
    padding: '20px',
    borderTop: '1px solid #eee',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500,
    fontSize: '10px',
    color: '#666666',
  },
  mainWrapper: {
    flex: 1,
    marginLeft: '200px',
    minWidth: 0,
  },
  mainContent: {
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  backLink: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: '#000000',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },
  detailHero: {
    borderBottom: '4px solid #000000',
    paddingBottom: '40px',
    marginBottom: '0px',
  },
  h1Hero: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '80px',
    fontWeight: 700,
    lineHeight: 0.9,
    letterSpacing: '-0.06em',
    textTransform: 'uppercase',
    marginTop: '10px',
  },
  statsBar: {
    display: 'flex',
    borderBottom: '2px solid #000000',
    background: '#fcfcfc',
  },
  statItem: {
    flex: 1,
    padding: '24px',
    borderRight: '2px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statItemLast: {
    flex: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statLabel: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '10px',
    fontWeight: 800,
    textTransform: 'uppercase',
    color: '#666666',
    letterSpacing: '0.1em',
  },
  statValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
  },
  tabsNav: {
    display: 'flex',
    gap: 0,
    borderBottom: '2px solid #000000',
    marginTop: '40px',
  },
  tabBtn: {
    padding: '16px 32px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    position: 'relative',
    color: '#000000',
  },
  tabBtnActive: {
    background: '#000000',
    color: 'white',
  },
  contentArea: {
    padding: '40px 0',
  },
  slotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  slotCard: {
    border: '2px solid #000000',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  slotHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  slotIdx: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 800,
    fontSize: '32px',
    lineHeight: 1,
    opacity: 0.2,
  },
  slotTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '16px',
  },
  tag: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '10px',
    textTransform: 'uppercase',
    padding: '4px 8px',
    border: '1px solid #000000',
    display: 'inline-block',
  },
  tagActive: {
    background: '#000000',
    color: 'white',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '10px',
    textTransform: 'uppercase',
    padding: '4px 8px',
    border: '1px solid #000000',
    display: 'inline-block',
  },
  btn: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    transition: 'all 0.1s',
    background: 'transparent',
    color: '#000000',
  },
  btnPrimary: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    transition: 'all 0.1s',
    background: '#000000',
    color: 'white',
  },
};

const Tag = ({ active, children }) => (
  <span style={active ? customStyles.tagActive : customStyles.tag}>{children}</span>
);

const NavLink = ({ active, onClick, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        ...customStyles.navLink,
        ...(active ? customStyles.navLinkActive : {}),
        ...(hovered && !active ? { background: '#f5f5f5' } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const SlotCard = ({ index, title, logic, isActive }) => (
  <div style={customStyles.slotCard}>
    <div style={customStyles.slotHeader}>
      <span style={customStyles.slotIdx}>{index}</span>
      <Tag active={isActive}>{isActive ? 'Active' : 'Inactive'}</Tag>
    </div>
    <span style={customStyles.slotTitle}>{title}</span>
    <p style={{ fontSize: '12px', color: '#666666' }}>Selection Logic: {logic}</p>
  </div>
);

const SlotsTab = () => {
  const slots = [
    { index: '01', title: 'Primary Hero Carousel', logic: 'ML_RANK_V4', isActive: true },
    { index: '02', title: 'Daily Specials Grid', logic: 'TRENDING_GLOBAL', isActive: true },
    { index: '03', title: 'User Affinity Feed', logic: 'RECALL_CF_01', isActive: false },
  ];

  return (
    <div style={customStyles.slotGrid}>
      {slots.map((slot) => (
        <SlotCard key={slot.index} {...slot} />
      ))}
    </div>
  );
};

const HistoryTab = () => (
  <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #000000' }}>
          {['Date', 'Modified By', 'Change Summary'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666666' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          { date: '2023.10.24', by: 'ADMIN_01', change: 'Activated slot 02: Daily Specials Grid' },
          { date: '2023.10.20', by: 'ADMIN_01', change: 'Updated selection logic for slot 01 to ML_RANK_V4' },
          { date: '2023.10.15', by: 'ADMIN_02', change: 'Initial combo configuration created' },
        ].map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '14px 16px', fontSize: '13px' }}>{row.date}</td>
            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#0047FF', fontWeight: 700 }}>{row.by}</td>
            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#666666' }}>{row.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PreviewTab = () => (
  <div style={{ border: '2px solid #000000', padding: '40px', textAlign: 'center' }}>
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666666', marginBottom: '16px' }}>Live Preview Simulation</div>
    <div style={{ background: '#f5f5f5', border: '2px dashed #cccccc', padding: '60px 20px' }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', fontWeight: 700, color: '#999999' }}>[ HOMEPAGE_TAB_RECOMMEND PREVIEW ]</div>
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {['Slot 01 — Hero Carousel', 'Slot 02 — Daily Specials', 'Slot 03 — Affinity Feed'].map((label, i) => (
          <div key={i} style={{ background: i === 2 ? '#eeeeee' : '#000000', color: i === 2 ? '#999999' : 'white', padding: '24px 12px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
            {label}
            {i === 2 && <div style={{ fontSize: '10px', marginTop: '4px', color: '#aaa' }}>(Inactive)</div>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StrategyDetailPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeNav, setActiveNav] = useState(2);
  const navigate = useNavigate();

  const tabs = ['Slots (06)', 'History', 'Preview'];
  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控', '全链路预览'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <SlotsTab />;
      case 1: return <HistoryTab />;
      case 2: return <PreviewTab />;
      default: return <SlotsTab />;
    }
  };

  return (
    <div style={customStyles.appContainer}>
      <aside style={customStyles.sideNav}>
        <div style={customStyles.logoContainer}>
          <div style={customStyles.logo}>
            <div style={customStyles.logoMark}></div>
            STRATEGY.LAB
          </div>
        </div>
        <nav style={customStyles.navLinks}>
          {navItems.map((item, i) => (
            <NavLink key={i} active={activeNav === i} onClick={() => setActiveNav(i)}>
              {item}
            </NavLink>
          ))}
        </nav>
        <div style={customStyles.navFooter}>OPERATOR / ADMIN_01</div>
      </aside>

      <div style={customStyles.mainWrapper}>
        <main style={customStyles.mainContent}>
          <button style={customStyles.backLink} onClick={() => navigate('/')}>
            ← BACK TO DIRECTORY
          </button>

          <div style={customStyles.detailHero}>
            <Tag active={true}>Active Combo</Tag>
            <h1 style={customStyles.h1Hero}>
              HOMEPAGE_TAB_<br />RECOMMEND
            </h1>
          </div>

          <div style={customStyles.statsBar}>
            <div style={customStyles.statItem}>
              <span style={customStyles.statLabel}>Total Slots</span>
              <span style={customStyles.statValue}>10</span>
            </div>
            <div style={customStyles.statItem}>
              <span style={customStyles.statLabel}>Active Slots</span>
              <span style={customStyles.statValue}>06</span>
            </div>
            <div style={customStyles.statItem}>
              <span style={customStyles.statLabel}>Linked Plans</span>
              <span style={{ ...customStyles.statValue, color: '#0047FF' }}>PROMO_PLAN_A</span>
            </div>
            <div style={customStyles.statItemLast}>
              <span style={customStyles.statLabel}>Last Modified</span>
              <span style={customStyles.statValue}>2023.10.24</span>
            </div>
          </div>

          <div style={customStyles.tabsNav}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                style={{
                  ...customStyles.tabBtn,
                  ...(activeTab === i ? customStyles.tabBtnActive : {}),
                }}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={customStyles.contentArea}>
            {renderTabContent()}
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
            <button style={customStyles.btnPrimary}>Edit Configuration</button>
            <button style={{ ...customStyles.btn, borderColor: '#eee', color: '#999' }}>Archive Combo</button>
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { overflow-x: hidden; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<StrategyDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;