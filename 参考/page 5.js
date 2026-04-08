import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const customStyles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '14px',
    lineHeight: '1.2',
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
  },
  navLinkActive: {
    borderLeftColor: '#0047FF',
    background: '#f0f3ff',
  },
  navLinkHover: {
    background: '#f5f5f5',
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
  detailHeader: {
    padding: '60px 40px',
    borderBottom: '4px solid #000000',
  },
  breadcrumb: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '24px',
    display: 'block',
  },
  heroTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '40px',
  },
  h1Detail: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '80px',
    fontWeight: 700,
    lineHeight: '0.9',
    letterSpacing: '-0.04em',
    textTransform: 'uppercase',
    wordBreak: 'break-all',
  },
  metaBadges: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    alignItems: 'center',
  },
  tag: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    textTransform: 'uppercase',
    padding: '6px 12px',
    border: '2px solid #000000',
  },
  statusActive: {
    background: '#000000',
    color: 'white',
  },
  idTag: {
    borderColor: '#0047FF',
    color: '#0047FF',
  },
  configTag: {
    borderStyle: 'dashed',
  },
  headerStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    border: '2px solid #000000',
    marginTop: '40px',
  },
  statBox: {
    padding: '24px',
    borderRight: '2px solid #000000',
  },
  statBoxLast: {
    padding: '24px',
  },
  statLabel: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
  },
  statValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '32px',
    fontWeight: 700,
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 0,
  },
  section: {
    padding: '40px',
    borderBottom: '2px solid #000000',
  },
  sectionLeft: {
    borderRight: '2px solid #000000',
  },
  sectionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleSmall: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotRow: {
    display: 'flex',
    padding: '20px',
    border: '2px solid #000000',
    marginBottom: '-2px',
    alignItems: 'center',
    gap: '20px',
  },
  slotNum: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    minWidth: '40px',
  },
  slotInfo: {
    flex: 1,
  },
  slotTitle: {
    fontWeight: 700,
    fontSize: '16px',
    marginBottom: '4px',
  },
  slotDesc: {
    fontSize: '12px',
    color: '#666666',
    fontWeight: 500,
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
  },
  btnSmall: {
    padding: '6px 12px',
    fontSize: '11px',
  },
  btnPrimary: {
    background: '#000000',
    color: 'white',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    transition: 'all 0.1s',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#000000',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    transition: 'all 0.1s',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  infoItem: {
    padding: '16px 0',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontWeight: 700,
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  infoVal: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500,
  },
  historyItem: {
    padding: '16px 0',
    borderBottom: '1px solid #eee',
  },
  historyItemLast: {
    padding: '16px 0',
  },
  historyDate: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
  },
  historyMsg: {
    fontSize: '13px',
    marginTop: '4px',
  },
};

const NavItem = ({ label, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const style = {
    ...customStyles.navLink,
    ...(active ? customStyles.navLinkActive : {}),
    ...(!active && hovered ? customStyles.navLinkHover : {}),
  };
  return (
    <span
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
};

const SlotRow = ({ num, title, desc, onConfig }) => (
  <div style={customStyles.slotRow}>
    <span style={customStyles.slotNum}>{num}</span>
    <div style={customStyles.slotInfo}>
      <div style={customStyles.slotTitle}>{title}</div>
      <div style={customStyles.slotDesc}>{desc}</div>
    </div>
    <button
      style={{ ...customStyles.btnSecondary, ...customStyles.btnSmall }}
      onClick={onConfig}
    >
      Config
    </button>
  </div>
);

const slots = [
  {
    num: '01',
    title: 'HERO_BANNER_PRIORITY',
    desc: 'Logic: Weighted Random | Pool: SEASONAL_PROMO_01',
  },
  {
    num: '02',
    title: 'USER_INTEREST_FEED',
    desc: 'Logic: Collaborative Filtering | Pool: GLOBAL_INVENTORY',
  },
  {
    num: '03',
    title: 'FLASH_SALE_WIDGET',
    desc: 'Logic: Time-Based Decay | Pool: LIMITED_OFFERS',
  },
];

const navItems = [
  { label: '选品池', key: 'pool' },
  { label: '排序策略', key: 'sort' },
  { label: '策略组合', key: 'combo' },
  { label: '投放计划', key: 'plan' },
  { label: '效果监控', key: 'monitor' },
  { label: '全链路预览', key: 'preview' },
];

const MainPage = () => {
  const [activeNav, setActiveNav] = useState('combo');
  const [slotList, setSlotList] = useState(slots);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configTarget, setConfigTarget] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [primaryHovered, setPrimaryHovered] = useState(false);

  const handleConfig = (slot) => {
    setConfigTarget(slot);
    setShowConfigModal(true);
  };

  const handleAddSlot = () => {
    setShowAddSlotModal(true);
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
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              label={item.label}
              active={activeNav === item.key}
              onClick={() => setActiveNav(item.key)}
            />
          ))}
        </nav>
        <div style={customStyles.navFooter}>OPERATOR / ADMIN_01</div>
      </aside>

      <div style={customStyles.mainWrapper}>
        <header style={customStyles.detailHeader}>
          <span style={customStyles.breadcrumb}>DIRECTORY / COMBOS / CMP-892</span>
          <div style={customStyles.heroTitleRow}>
            <div>
              <h1 style={customStyles.h1Detail}>
                HOMEPAGE_TAB_<br />RECOMMEND
              </h1>
              <div style={customStyles.metaBadges}>
                <span style={{ ...customStyles.tag, ...customStyles.statusActive }}>
                  Active Status
                </span>
                <span style={{ ...customStyles.tag, ...customStyles.idTag }}>
                  ID: CMP-892
                </span>
                <span style={{ ...customStyles.tag, borderStyle: 'dashed' }}>
                  Config Version: v.2.4.0
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={customStyles.btnSecondary}
                onClick={() => setShowExportModal(true)}
              >
                Export Config
              </button>
              <button
                style={{
                  ...customStyles.btnPrimary,
                  ...(primaryHovered
                    ? { background: '#0047FF', borderColor: '#0047FF' }
                    : {}),
                }}
                onMouseEnter={() => setPrimaryHovered(true)}
                onMouseLeave={() => setPrimaryHovered(false)}
                onClick={() => setShowEditModal(true)}
              >
                Edit Strategy
              </button>
            </div>
          </div>

          <div style={customStyles.headerStats}>
            <div style={customStyles.statBox}>
              <span style={customStyles.statLabel}>Active Slots</span>
              <span style={customStyles.statValue}>06 / 10</span>
            </div>
            <div style={customStyles.statBox}>
              <span style={customStyles.statLabel}>24H Impressions</span>
              <span style={customStyles.statValue}>1.2M+</span>
            </div>
            <div style={customStyles.statBoxLast}>
              <span style={customStyles.statLabel}>Current CTR</span>
              <span style={customStyles.statValue}>4.12%</span>
            </div>
          </div>
        </header>

        <div style={customStyles.contentGrid}>
          <div style={customStyles.sectionLeft}>
            <section style={customStyles.section}>
              <div style={customStyles.sectionTitle}>
                Slot Configuration
                <button
                  style={{ ...customStyles.btnSecondary, ...customStyles.btnSmall }}
                  onClick={handleAddSlot}
                >
                  + Add Slot
                </button>
              </div>
              <div>
                {slotList.map((slot) => (
                  <SlotRow
                    key={slot.num}
                    num={slot.num}
                    title={slot.title}
                    desc={slot.desc}
                    onConfig={() => handleConfig(slot)}
                  />
                ))}
              </div>
            </section>
          </div>

          <div>
            <section style={customStyles.section}>
              <div style={customStyles.sectionTitleSmall}>Linked Plan</div>
              <ul style={customStyles.infoList}>
                <li style={customStyles.infoItem}>
                  <span style={customStyles.infoLabel}>Plan Name</span>
                  <span
                    style={{
                      ...customStyles.infoVal,
                      textDecoration: 'underline',
                      fontWeight: 700,
                    }}
                  >
                    PROMO_PLAN_A
                  </span>
                </li>
                <li style={customStyles.infoItem}>
                  <span style={customStyles.infoLabel}>Business Unit</span>
                  <span style={customStyles.infoVal}>E-COMMERCE_GLOBAL</span>
                </li>
                <li style={customStyles.infoItem}>
                  <span style={customStyles.infoLabel}>Target Audience</span>
                  <span style={customStyles.infoVal}>Returning_Users</span>
                </li>
              </ul>
            </section>

            <section style={{ ...customStyles.section, borderBottom: 'none' }}>
              <div style={customStyles.sectionTitleSmall}>Edit History</div>
              <div>
                <div style={customStyles.historyItem}>
                  <div style={customStyles.historyDate}>2023.10.24 14:20</div>
                  <div style={customStyles.historyMsg}>
                    Slot 03 logic updated by <strong>Admin_01</strong>
                  </div>
                </div>
                <div style={customStyles.historyItem}>
                  <div style={customStyles.historyDate}>2023.10.20 09:15</div>
                  <div style={customStyles.historyMsg}>
                    Strategy combo activated by <strong>Sys_Automator</strong>
                  </div>
                </div>
                <div style={customStyles.historyItemLast}>
                  <div style={customStyles.historyDate}>2023.10.18 11:00</div>
                  <div style={customStyles.historyMsg}>
                    Initial configuration created.
                  </div>
                </div>
              </div>
              <button
                style={{
                  ...customStyles.btnSecondary,
                  ...customStyles.btnSmall,
                  width: '100%',
                  marginTop: '20px',
                }}
                onClick={() => setShowLogModal(true)}
              >
                View Full Log
              </button>
            </section>
          </div>
        </div>
      </div>

      {showConfigModal && (
        <Modal onClose={() => setShowConfigModal(false)} title={`Config: ${configTarget?.title}`}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase' }}>Slot Number</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700 }}>{configTarget?.num}</div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase' }}>Logic</div>
            <div style={{ fontSize: '14px', color: '#444' }}>{configTarget?.desc}</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              style={customStyles.btnSecondary}
              onClick={() => setShowConfigModal(false)}
            >
              Close
            </button>
            <button
              style={customStyles.btnPrimary}
              onClick={() => setShowConfigModal(false)}
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)} title="Edit Strategy">
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Strategy Name</label>
            <input
              defaultValue="HOMEPAGE_TAB_RECOMMEND"
              style={{ width: '100%', border: '2px solid #000', padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Config Version</label>
            <input
              defaultValue="v.2.4.0"
              style={{ width: '100%', border: '2px solid #000', padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button style={customStyles.btnSecondary} onClick={() => setShowEditModal(false)}>Cancel</button>
            <button style={customStyles.btnPrimary} onClick={() => setShowEditModal(false)}>Save</button>
          </div>
        </Modal>
      )}

      {showExportModal && (
        <Modal onClose={() => setShowExportModal(false)} title="Export Config">
          <div style={{ marginBottom: '16px', fontFamily: "'Space Grotesk', sans-serif" }}>
            <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase' }}>Format</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['JSON', 'YAML', 'CSV'].map((fmt) => (
                <button key={fmt} style={{ ...customStyles.btnSecondary, ...customStyles.btnSmall }}>{fmt}</button>
              ))}
            </div>
          </div>
          <div style={{ background: '#f5f5f5', border: '2px solid #000', padding: '16px', fontFamily: 'monospace', fontSize: '12px', marginBottom: '16px' }}>
            {`{\n  "id": "CMP-892",\n  "name": "HOMEPAGE_TAB_RECOMMEND",\n  "version": "v.2.4.0",\n  "status": "active"\n}`}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={customStyles.btnSecondary} onClick={() => setShowExportModal(false)}>Cancel</button>
            <button style={customStyles.btnPrimary} onClick={() => setShowExportModal(false)}>Download</button>
          </div>
        </Modal>
      )}

      {showLogModal && (
        <Modal onClose={() => setShowLogModal(false)} title="Full Edit Log">
          {[
            { date: '2023.10.24 14:20', msg: 'Slot 03 logic updated by Admin_01' },
            { date: '2023.10.20 09:15', msg: 'Strategy combo activated by Sys_Automator' },
            { date: '2023.10.18 11:00', msg: 'Initial configuration created.' },
            { date: '2023.10.15 10:30', msg: 'Draft version saved by Admin_01' },
            { date: '2023.10.12 08:45', msg: 'Strategy template applied by Admin_02' },
            { date: '2023.10.10 16:00', msg: 'New strategy record initialized by Sys_Automator' },
          ].map((entry, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <div style={customStyles.historyDate}>{entry.date}</div>
              <div style={customStyles.historyMsg}>{entry.msg}</div>
            </div>
          ))}
          <button style={{ ...customStyles.btnSecondary, width: '100%', marginTop: '20px' }} onClick={() => setShowLogModal(false)}>Close</button>
        </Modal>
      )}

      {showAddSlotModal && (
        <Modal onClose={() => setShowAddSlotModal(false)} title="Add New Slot">
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Slot Title</label>
            <input
              placeholder="e.g. NEW_ARRIVALS_FEED"
              style={{ width: '100%', border: '2px solid #000', padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Logic Type</label>
            <select style={{ width: '100%', border: '2px solid #000', padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', outline: 'none', background: '#fff' }}>
              <option>Weighted Random</option>
              <option>Collaborative Filtering</option>
              <option>Time-Based Decay</option>
              <option>Rule-Based</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Pool</label>
            <input
              placeholder="e.g. GLOBAL_INVENTORY"
              style={{ width: '100%', border: '2px solid #000', padding: '10px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button style={customStyles.btnSecondary} onClick={() => setShowAddSlotModal(false)}>Cancel</button>
            <button
              style={customStyles.btnPrimary}
              onClick={() => {
                const newNum = String(slotList.length + 1).padStart(2, '0');
                setSlotList([...slotList, {
                  num: newNum,
                  title: 'NEW_SLOT_' + newNum,
                  desc: 'Logic: Weighted Random | Pool: GLOBAL_INVENTORY',
                }]);
                setShowAddSlotModal(false);
              }}
            >
              Add Slot
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ onClose, title, children }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div
      style={{
        background: '#fff',
        border: '2px solid #000',
        padding: '40px',
        minWidth: '400px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '20px', textTransform: 'uppercase' }}>
          {title}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            fontWeight: 700,
            lineHeight: 1,
            padding: '4px 8px',
          }}
        >
          ×
        </button>
      </div>
      {children}
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
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