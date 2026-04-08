import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const customStyles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    lineHeight: '1.2',
    backgroundColor: '#FFFFFF',
    color: '#000000',
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
    display: 'block',
  },
  navLinkActive: {
    borderLeftColor: '#0047FF',
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
    display: 'flex',
    minWidth: 0,
  },
  detailContent: {
    flex: 1,
    padding: '60px 40px',
    borderRight: '2px solid #000000',
    overflowY: 'auto',
  },
  auditSidebar: {
    width: '360px',
    background: '#F9F9F9',
    height: '100vh',
    position: 'sticky',
    top: 0,
    padding: '40px 30px',
    overflowY: 'auto',
  },
  pageHeader: {
    borderBottom: '4px solid #000000',
    paddingBottom: '30px',
    marginBottom: '40px',
  },
  breadcrumb: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    marginBottom: '16px',
    display: 'block',
    color: '#0047FF',
  },
  h1Detail: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    textTransform: 'uppercase',
  },
  configGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    paddingBottom: '8px',
    borderBottom: '2px solid #000000',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  configItem: {
    marginBottom: '24px',
  },
  label: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    fontWeight: 700,
    color: '#666666',
    textTransform: 'uppercase',
    marginBottom: '4px',
    display: 'block',
  },
  value: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: '18px',
  },
  valueMono: {
    fontFamily: 'monospace',
    background: '#eee',
    padding: '2px 6px',
    fontSize: '14px',
    fontWeight: 600,
  },
  slotTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    fontSize: '10px',
    padding: '8px',
    borderBottom: '1px solid #000000',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
  },
  td: {
    padding: '12px 8px',
    borderBottom: '1px solid #eee',
    fontSize: '13px',
    fontWeight: 600,
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: '20px',
    borderLeft: '2px solid #000000',
  },
  timelineItem: {
    position: 'relative',
    marginBottom: '32px',
  },
  timelineDot: {
    position: 'absolute',
    left: '-27px',
    top: '4px',
    width: '12px',
    height: '12px',
    background: '#FFFFFF',
    border: '2px solid #000000',
  },
  timelineDotActive: {
    background: '#0047FF',
    borderColor: '#0047FF',
  },
  timelineTime: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    fontWeight: 800,
    color: '#666666',
    marginBottom: '4px',
  },
  timelineContent: {
    background: 'white',
    border: '1px solid #000000',
    padding: '12px',
    boxShadow: '4px 4px 0px #000000',
  },
  timelineUser: {
    fontWeight: 700,
    fontSize: '12px',
    marginBottom: '4px',
    display: 'block',
    fontFamily: "'Inter', sans-serif",
  },
  timelineMsg: {
    fontSize: '13px',
    lineHeight: '1.4',
    fontFamily: "'Inter', sans-serif",
  },
  changeDiff: {
    marginTop: '8px',
    fontFamily: 'monospace',
    fontSize: '11px',
    background: '#f0f0f0',
    padding: '4px',
    borderLeft: '2px solid #0047FF',
  },
  btn: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    background: 'white',
    transition: 'all 0.2s',
  },
  btnPrimary: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    background: '#000000',
    color: 'white',
    marginLeft: '12px',
    transition: 'all 0.2s',
  },
};

const navItems = [
  { label: '选品池', path: '/selection-pool' },
  { label: '排序策略', path: '/sort-strategy' },
  { label: '策略组合', path: '/' },
  { label: '投放计划', path: '/campaign-plan' },
  { label: '效果监控', path: '/effect-monitor' },
];

const SideNav = () => {
  const location = useLocation();
  const [hoveredNav, setHoveredNav] = useState(null);

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
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...customStyles.navLink,
                ...(isActive ? customStyles.navLinkActive : {}),
                ...(hoveredNav === item.path && !isActive ? { background: '#f5f5f5' } : {}),
              }}
              onMouseEnter={() => setHoveredNav(item.path)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div style={customStyles.navFooter}>OPERATOR / ADMIN_01</div>
    </aside>
  );
};

const AuditTrail = () => {
  const auditItems = [
    {
      id: 1,
      time: '2023.10.24 14:30:01',
      user: 'ADMIN_01 (System)',
      message: (
        <span>
          Status changed to <strong>ACTIVE</strong>
        </span>
      ),
      diff: null,
      active: true,
    },
    {
      id: 2,
      time: '2023.10.23 09:15:22',
      user: 'ZHANG_WEI (Editor)',
      message: 'Modified weights for Slot 01 & 02',
      diff: '- weight: 0.50\n+ weight: 0.45',
      active: false,
    },
    {
      id: 3,
      time: '2023.10.22 18:00:45',
      user: 'LI_NA (Reviewer)',
      message: 'Approved technical logic for v4',
      diff: null,
      active: false,
    },
    {
      id: 4,
      time: '2023.10.20 11:20:00',
      user: 'SYSTEM',
      message: 'Combo Initial Creation',
      diff: null,
      active: false,
    },
  ];

  return (
    <aside style={customStyles.auditSidebar}>
      <h3 style={{ ...customStyles.sectionTitle, marginBottom: '30px' }}>Audit Trail</h3>
      <div style={customStyles.timelineContainer}>
        {auditItems.map((item) => (
          <div key={item.id} style={customStyles.timelineItem}>
            <div
              style={{
                ...customStyles.timelineDot,
                ...(item.active ? customStyles.timelineDotActive : {}),
              }}
            ></div>
            <div style={customStyles.timelineTime}>{item.time}</div>
            <div style={customStyles.timelineContent}>
              <span style={customStyles.timelineUser}>{item.user}</span>
              <div style={customStyles.timelineMsg}>{item.message}</div>
              {item.diff && (
                <div style={customStyles.changeDiff}>
                  {item.diff.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < item.diff.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

const SlotRow = ({ index, strategyId, weight, fallback }) => (
  <tr>
    <td style={customStyles.td}>{index}</td>
    <td style={{ ...customStyles.td, fontFamily: 'monospace' }}>{strategyId}</td>
    <td style={customStyles.td}>{weight}</td>
    <td style={customStyles.td}>{fallback}</td>
  </tr>
);

const ComboDetailPage = () => {
  const [duplicateHover, setDuplicateHover] = useState(false);
  const [updateHover, setUpdateHover] = useState(false);
  const [showDuplicateSuccess, setShowDuplicateSuccess] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  const handleDuplicate = () => {
    setShowDuplicateSuccess(true);
    setTimeout(() => setShowDuplicateSuccess(false), 2000);
  };

  const handleUpdate = () => {
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 2000);
  };

  const slots = [
    { index: '01', strategyId: 'STR-HIGH-CONV', weight: '45%', fallback: 'STATIC_TOP_SELLERS' },
    { index: '02', strategyId: 'STR-PERSONALIZED-01', weight: '35%', fallback: 'CATEGORY_POPULAR' },
    { index: '03', strategyId: 'STR-NEW-ARRIVAL', weight: '20%', fallback: 'NULL' },
  ];

  return (
    <main style={customStyles.detailContent}>
      <div style={customStyles.pageHeader}>
        <span style={customStyles.breadcrumb}>DIRECTORY / COMBO_DETAILS / CMP-892</span>
        <h1 style={customStyles.h1Detail}>
          HOMEPAGE_TAB_
          <br />
          RECOMMEND
        </h1>
      </div>

      <div style={customStyles.configGrid}>
        <div>
          <h3 style={customStyles.sectionTitle}>
            General Info <span>EDIT_01</span>
          </h3>
          <div style={customStyles.configItem}>
            <span style={customStyles.label}>Unique Identifier</span>
            <span style={customStyles.valueMono}>CMP-892-V4</span>
          </div>
          <div style={customStyles.configItem}>
            <span style={customStyles.label}>Orchestration Type</span>
            <span style={customStyles.value}>DYNAMIC_SLOT_FILLING</span>
          </div>
          <div style={customStyles.configItem}>
            <span style={customStyles.label}>Business Unit</span>
            <span style={customStyles.value}>CONSUMER_TECH_RETAIL</span>
          </div>
        </div>
        <div>
          <h3 style={customStyles.sectionTitle}>
            Deployment <span>EDIT_02</span>
          </h3>
          <div style={customStyles.configItem}>
            <span style={customStyles.label}>Active Status</span>
            <span style={{ ...customStyles.value, color: '#0047FF' }}>● LIVE_PRODUCTION</span>
          </div>
          <div style={customStyles.configItem}>
            <span style={customStyles.label}>Linked Campaign</span>
            <span style={{ ...customStyles.value, textDecoration: 'underline', cursor: 'pointer' }}>
              PROMO_PLAN_A_2023
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={customStyles.sectionTitle}>Slot Orchestration Logic</h3>
        <table style={customStyles.slotTable}>
          <thead>
            <tr>
              <th style={customStyles.th}>INDEX</th>
              <th style={customStyles.th}>STRATEGY_ID</th>
              <th style={customStyles.th}>WEIGHT</th>
              <th style={customStyles.th}>FALLBACK_LOGIC</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <SlotRow
                key={slot.index}
                index={slot.index}
                strategyId={slot.strategyId}
                weight={slot.weight}
                fallback={slot.fallback}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button
          style={{
            ...customStyles.btn,
            background: duplicateHover ? '#000000' : 'white',
            color: duplicateHover ? 'white' : '#000000',
          }}
          onMouseEnter={() => setDuplicateHover(true)}
          onMouseLeave={() => setDuplicateHover(false)}
          onClick={handleDuplicate}
        >
          Duplicate Combo
        </button>
        <button
          style={{
            ...customStyles.btnPrimary,
            marginLeft: 0,
            background: updateHover ? '#333333' : '#000000',
          }}
          onMouseEnter={() => setUpdateHover(true)}
          onMouseLeave={() => setUpdateHover(false)}
          onClick={handleUpdate}
        >
          Update Configuration
        </button>
        {showDuplicateSuccess && (
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              color: '#0047FF',
              textTransform: 'uppercase',
            }}
          >
            ✓ Duplicated!
          </span>
        )}
        {showUpdateSuccess && (
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              color: '#0047FF',
              textTransform: 'uppercase',
            }}
          >
            ✓ Updated!
          </span>
        )}
      </div>
    </main>
  );
};

const PlaceholderPage = ({ title }) => (
  <main style={customStyles.detailContent}>
    <div style={customStyles.pageHeader}>
      <span style={customStyles.breadcrumb}>DIRECTORY / {title.toUpperCase()}</span>
      <h1 style={customStyles.h1Detail}>{title.toUpperCase()}</h1>
    </div>
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '16px',
        color: '#666666',
        marginTop: '40px',
      }}
    >
      This section is under construction.
    </div>
  </main>
);

const Layout = ({ children }) => (
  <div style={customStyles.appContainer}>
    <SideNav />
    <div style={customStyles.mainWrapper}>{children}</div>
  </div>
);

const ComboPage = () => (
  <Layout>
    <ComboDetailPage />
    <AuditTrail />
  </Layout>
);

const SelectionPoolPage = () => (
  <Layout>
    <PlaceholderPage title="Selection Pool" />
  </Layout>
);

const SortStrategyPage = () => (
  <Layout>
    <PlaceholderPage title="Sort Strategy" />
  </Layout>
);

const CampaignPlanPage = () => (
  <Layout>
    <PlaceholderPage title="Campaign Plan" />
  </Layout>
);

const EffectMonitorPage = () => (
  <Layout>
    <PlaceholderPage title="Effect Monitor" />
  </Layout>
);

const App = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<ComboPage />} />
        <Route path="/selection-pool" element={<SelectionPoolPage />} />
        <Route path="/sort-strategy" element={<SortStrategyPage />} />
        <Route path="/campaign-plan" element={<CampaignPlanPage />} />
        <Route path="/effect-monitor" element={<EffectMonitorPage />} />
      </Routes>
    </Router>
  );
};

export default App;