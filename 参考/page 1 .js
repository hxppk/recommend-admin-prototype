import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const customStyles = {
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
    background: 'none',
    border: 'none',
    borderLeft: '4px solid transparent',
    textAlign: 'left',
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
  pageHeader: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '4px solid #000000',
    paddingBottom: '40px',
    marginBottom: '40px',
  },
  h1: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: 0.95,
    letterSpacing: '-0.05em',
    textTransform: 'uppercase',
  },
  breadcrumb: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '12px',
    color: '#666666',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
  },
  infoPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  infoGroup: {
    borderBottom: '1px solid #eee',
    paddingBottom: '24px',
  },
  infoGroupLast: {
    borderBottom: 'none',
    paddingBottom: '24px',
  },
  infoLabel: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#666666',
    marginBottom: '12px',
    display: 'block',
  },
  infoValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '24px',
    letterSpacing: '-0.02em',
  },
  tag: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    textTransform: 'uppercase',
    padding: '6px 12px',
    border: '2px solid #000000',
    display: 'inline-block',
  },
  tagActive: {
    background: '#000000',
    color: 'white',
  },
  visualPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  chartContainer: {
    padding: '30px',
    border: '2px solid #000000',
  },
  barChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '24px',
  },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  barLabel: {
    width: '80px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
  },
  barTrack: {
    flex: 1,
    height: '24px',
    background: '#f0f0f0',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    background: '#000000',
  },
  barValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    width: '40px',
    textAlign: 'right',
  },
  actionsRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  },
  btn: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '14px 28px',
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    transition: 'all 0.1s',
    textAlign: 'center',
    flex: 1,
    background: 'transparent',
    color: '#000000',
  },
  btnDanger: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '14px 28px',
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #FF0000',
    transition: 'all 0.1s',
    textAlign: 'center',
    flex: 1,
    background: 'transparent',
    color: '#FF0000',
  },
  timestampList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  timestampItem: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    color: '#000000',
  },
  timestampSpan: {
    color: '#666666',
    marginRight: '8px',
    fontWeight: 500,
  },
  linkPlanCard: {
    padding: '16px',
    border: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkPlanName: {
    fontWeight: 700,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  smallTag: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '10px',
    textTransform: 'uppercase',
    padding: '6px 12px',
    border: '1px solid #000000',
    display: 'inline-block',
    cursor: 'pointer',
  },
};

const SideNav = ({ activeLink, setActiveLink }) => {
  const navItems = [
    { id: 'pool', label: '选品池' },
    { id: 'sort', label: '排序策略' },
    { id: 'combo', label: '策略组合' },
    { id: 'plan', label: '投放计划' },
    { id: 'monitor', label: '效果监控' },
    { id: 'preview', label: '全链路预览' },
  ];

  return (
    <aside style={customStyles.sideNav}>
      <div style={customStyles.logoContainer}>
        <div style={customStyles.logo}>
          <div style={customStyles.logoMark}></div>
          STRATEGY.LAB
        </div>
      </div>
      <nav style={customStyles.navLinks}>
        {navItems.map((item) => {
          const isActive = activeLink === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveLink(item.id)}
              style={{
                ...customStyles.navLink,
                ...(isActive ? customStyles.navLinkActive : {}),
                background: isActive ? '#f0f3ff' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div style={customStyles.navFooter}>
        OPERATOR / ADMIN_01
      </div>
    </aside>
  );
};

const BarChartRow = ({ label, percentage }) => {
  return (
    <div style={customStyles.barRow}>
      <span style={customStyles.barLabel}>{label}</span>
      <div style={customStyles.barTrack}>
        <div style={{ ...customStyles.barFill, width: `${percentage}%` }}></div>
      </div>
      <span style={customStyles.barValue}>{percentage}%</span>
    </div>
  );
};

const DetailPage = () => {
  const [pauseHover, setPauseHover] = useState(false);
  const [duplicateHover, setDuplicateHover] = useState(false);
  const [archiveHover, setArchiveHover] = useState(false);
  const [activeLink, setActiveLink] = useState('combo');
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const handlePause = () => showNotification('Combo paused successfully.');
  const handleDuplicate = () => showNotification('Combo duplicated successfully.');
  const handleArchive = () => {
    if (window.confirm('Are you sure you want to permanently archive this combo? This action cannot be undone.')) {
      showNotification('Combo archived permanently.');
    }
  };

  return (
    <div style={customStyles.appContainer}>
      <SideNav activeLink={activeLink} setActiveLink={setActiveLink} />
      <div style={customStyles.mainWrapper}>
        <main style={customStyles.mainContent}>

          {notification && (
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: '#000000',
              color: '#ffffff',
              padding: '14px 24px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              zIndex: 999,
              letterSpacing: '0.05em',
            }}>
              {notification}
            </div>
          )}

          <div style={customStyles.pageHeader}>
            <div style={customStyles.breadcrumb}>
              <span
                style={{ color: '#000000', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                onClick={() => {}}
              >
                STRATEGY_COMBOS
              </span>
              {' / CMP-892'}
            </div>
            <h1 style={customStyles.h1}>
              HOMEPAGE_TAB_<br />RECOMMEND
            </h1>
          </div>

          <div style={customStyles.detailGrid}>
            <div style={customStyles.infoPanel}>
              <div style={customStyles.infoGroup}>
                <span style={customStyles.infoLabel}>Combo Identity</span>
                <div style={{ ...customStyles.infoValue, color: '#0047FF' }}>CMP-892-V2.0</div>
              </div>

              <div style={customStyles.infoGroup}>
                <span style={customStyles.infoLabel}>Current Status</span>
                <div style={{ ...customStyles.tag, ...customStyles.tagActive }}>ACTIVE / ONLINE</div>
              </div>

              <div style={customStyles.infoGroup}>
                <span style={customStyles.infoLabel}>Timestamps</span>
                <div style={customStyles.timestampList}>
                  <div style={customStyles.timestampItem}>
                    <span style={customStyles.timestampSpan}>CREATED:</span>
                    2023.08.12 14:20:01
                  </div>
                  <div style={customStyles.timestampItem}>
                    <span style={customStyles.timestampSpan}>LAST_MODIFIED:</span>
                    2023.10.24 09:45:12
                  </div>
                  <div style={customStyles.timestampItem}>
                    <span style={customStyles.timestampSpan}>RELEASED:</span>
                    2023.10.24 10:00:00
                  </div>
                </div>
              </div>

              <div style={customStyles.infoGroupLast}>
                <span style={customStyles.infoLabel}>Linked Plan</span>
                <div style={customStyles.linkPlanCard}>
                  <span style={customStyles.linkPlanName}>PROMO_PLAN_A_2023_FALL</span>
                  <span
                    style={customStyles.smallTag}
                    onClick={() => showNotification('Navigating to plan view...')}
                  >
                    VIEW_PLAN
                  </span>
                </div>
              </div>
            </div>

            <div style={customStyles.visualPanel}>
              <div style={customStyles.chartContainer}>
                <span style={customStyles.infoLabel}>Slot Allocation Distribution</span>
                <div style={customStyles.barChart}>
                  <BarChartRow label="SLOT_01-03" percentage={85} />
                  <BarChartRow label="SLOT_04-06" percentage={60} />
                  <BarChartRow label="SLOT_07-10" percentage={35} />
                </div>
                <p style={{ fontSize: '11px', marginTop: '20px', color: '#666666', fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Total Utilization: 06 / 10 Active Slots
                </p>
              </div>

              <div>
                <span style={customStyles.infoLabel}>Operational Actions</span>
                <div style={customStyles.actionsRow}>
                  <button
                    style={{
                      ...customStyles.btn,
                      background: pauseHover ? '#000000' : 'transparent',
                      color: pauseHover ? '#ffffff' : '#000000',
                    }}
                    onMouseEnter={() => setPauseHover(true)}
                    onMouseLeave={() => setPauseHover(false)}
                    onClick={handlePause}
                  >
                    Pause Combo
                  </button>
                  <button
                    style={{
                      ...customStyles.btn,
                      background: duplicateHover ? '#000000' : 'transparent',
                      color: duplicateHover ? '#ffffff' : '#000000',
                    }}
                    onMouseEnter={() => setDuplicateHover(true)}
                    onMouseLeave={() => setDuplicateHover(false)}
                    onClick={handleDuplicate}
                  >
                    Duplicate
                  </button>
                </div>
                <div style={{ ...customStyles.actionsRow, marginTop: '12px' }}>
                  <button
                    style={{
                      ...customStyles.btnDanger,
                      background: archiveHover ? '#FF0000' : 'transparent',
                      color: archiveHover ? '#ffffff' : '#FF0000',
                      borderColor: '#FF0000',
                    }}
                    onMouseEnter={() => setArchiveHover(true)}
                    onMouseLeave={() => setArchiveHover(false)}
                    onClick={handleArchive}
                  >
                    Archive Permanent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;