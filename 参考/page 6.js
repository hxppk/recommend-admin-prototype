import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const customStyles = {
  fontDisplay: { fontFamily: "'Space Grotesk', sans-serif" },
  fontBody: { fontFamily: "'Inter', sans-serif" },
  logoMark: {
    width: '16px',
    height: '16px',
    background: '#0047FF',
    flexShrink: 0,
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
  navLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    color: '#000000',
    textDecoration: 'none',
    padding: '16px 20px',
    borderLeft: '4px solid transparent',
    display: 'block',
  },
  navLinkActive: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '14px',
    color: '#000000',
    textDecoration: 'none',
    padding: '16px 20px',
    borderLeft: '4px solid #0047FF',
    background: '#f0f3ff',
    display: 'block',
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
  },
  mainContent: {
    padding: '60px 40px',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  breadcrumb: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '12px',
    display: 'block',
  },
  detailHeader: {
    borderBottom: '4px solid #000000',
    paddingBottom: '40px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '80px',
    fontWeight: 700,
    lineHeight: 0.9,
    letterSpacing: '-0.05em',
    textTransform: 'uppercase',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '60px',
  },
  infoPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  infoItem: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '16px',
  },
  infoLabel: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#666666',
    marginBottom: '8px',
    display: 'block',
  },
  infoValue: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#000000',
  },
  tagStatus: {
    display: 'inline-block',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '12px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    background: '#000000',
    color: 'white',
  },
  slotSectionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
  },
  slotTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  slotTh: {
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '2px solid #000000',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    fontWeight: 800,
    textTransform: 'uppercase',
  },
  slotTd: {
    padding: '20px 16px',
    borderBottom: '1px solid #eee',
  },
  slotName: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '16px',
  },
  slotWeight: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '16px',
  },
  btnOutline: {
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: '2px solid #000000',
    background: 'transparent',
  },
};

const navItems = [
  { label: '选品池', path: '/product-pool' },
  { label: '排序策略', path: '/ranking-strategy' },
  { label: '策略组合', path: '/strategy-combos' },
  { label: '投放计划', path: '/delivery-plan' },
  { label: '效果监控', path: '/performance-monitor' },
];

const SideNav = ({ activePath }) => {
  const navigate = useNavigate();
  return (
    <aside style={customStyles.sideNav}>
      <div style={customStyles.logoContainer}>
        <div style={customStyles.logo}>
          <div style={customStyles.logoMark}></div>
          STRATEGY.LAB
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
        {navItems.map((item) => (
          <a
            key={item.path}
            href="#"
            onClick={(e) => { e.preventDefault(); navigate(item.path); }}
            style={activePath === item.path ? customStyles.navLinkActive : customStyles.navLink}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div style={customStyles.navFooter}>
        OPERATOR / ADMIN_01
      </div>
    </aside>
  );
};

const slotData = [
  { name: 'HERO_BANNER_01', weight: '40%', status: 'ENABLED', statusColor: '#000000', logicType: 'DYNAMIC_RANKING' },
  { name: 'FLASH_SALE_GRID', weight: '25%', status: 'ENABLED', statusColor: '#000000', logicType: 'TIME_DECAY' },
  { name: 'REC_FOR_YOU_V2', weight: '20%', status: 'ENABLED', statusColor: '#000000', logicType: 'COLLAB_FILTER' },
  { name: 'NEW_ARRIVALS_MINI', weight: '15%', status: 'STANDBY', statusColor: '#999999', logicType: 'MANUAL_CURATION' },
];

const StrategyCombosPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideNav activePath="/strategy-combos" />
      <div style={customStyles.mainWrapper}>
        <main style={customStyles.mainContent}>
          <span style={customStyles.breadcrumb}>STRATEGY_COMBOS / CMP-892</span>

          <header style={customStyles.detailHeader}>
            <h1 style={customStyles.detailTitle}>
              HOMEPAGE_TAB_<br />RECOMMEND
            </h1>
            <button
              style={customStyles.btnOutline}
              onClick={() => setEditModalOpen(true)}
            >
              Edit Configuration
            </button>
          </header>

          <div style={customStyles.detailGrid}>
            <aside style={customStyles.infoPanel}>
              <div style={customStyles.infoItem}>
                <span style={customStyles.infoLabel}>Current State</span>
                <span style={customStyles.tagStatus}>Active</span>
              </div>
              <div style={customStyles.infoItem}>
                <span style={customStyles.infoLabel}>Slot Allocation</span>
                <span style={customStyles.infoValue}>06 / 10 Units</span>
              </div>
              <div style={customStyles.infoItem}>
                <span style={customStyles.infoLabel}>Linked Plan</span>
                <span style={{ ...customStyles.infoValue, textDecoration: 'underline', cursor: 'pointer' }}>PROMO_PLAN_A</span>
              </div>
              <div style={customStyles.infoItem}>
                <span style={customStyles.infoLabel}>Business Unit</span>
                <span style={customStyles.infoValue}>E-COMMERCE_GLOBAL</span>
              </div>
              <div style={customStyles.infoItem}>
                <span style={customStyles.infoLabel}>Last Modified</span>
                <span style={customStyles.infoValue}>2023.10.24 14:30</span>
              </div>
            </aside>

            <section>
              <h2 style={customStyles.slotSectionTitle}>Active Slot Orchestration</h2>
              <table style={customStyles.slotTable}>
                <thead>
                  <tr>
                    <th style={customStyles.slotTh}>Slot Name</th>
                    <th style={customStyles.slotTh}>Weight</th>
                    <th style={customStyles.slotTh}>Status</th>
                    <th style={customStyles.slotTh}>Logic Type</th>
                  </tr>
                </thead>
                <tbody>
                  {slotData.map((slot, index) => (
                    <tr key={index}>
                      <td style={{ ...customStyles.slotTd, ...customStyles.slotName }}>{slot.name}</td>
                      <td style={{ ...customStyles.slotTd, ...customStyles.slotWeight }}>{slot.weight}</td>
                      <td style={customStyles.slotTd}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '11px', color: slot.statusColor }}>
                          {slot.status}
                        </span>
                      </td>
                      <td style={{ ...customStyles.slotTd, fontFamily: "'Space Grotesk', sans-serif" }}>{slot.logicType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </main>
      </div>

      {editModalOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200
          }}
          onClick={() => setEditModalOpen(false)}
        >
          <div
            style={{
              background: '#fff', border: '2px solid #000', padding: '40px',
              minWidth: '400px', maxWidth: '600px', width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ ...customStyles.slotSectionTitle, marginBottom: '24px' }}>Edit Configuration</h2>
            <div style={{ marginBottom: '20px' }}>
              <label style={customStyles.infoLabel}>Combo Name</label>
              <input
                defaultValue="HOMEPAGE_TAB_RECOMMEND"
                style={{
                  width: '100%', border: '2px solid #000', padding: '10px 14px',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={customStyles.infoLabel}>Business Unit</label>
              <input
                defaultValue="E-COMMERCE_GLOBAL"
                style={{
                  width: '100%', border: '2px solid #000', padding: '10px 14px',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ marginBottom: '32px' }}>
              <label style={customStyles.infoLabel}>Linked Plan</label>
              <input
                defaultValue="PROMO_PLAN_A"
                style={{
                  width: '100%', border: '2px solid #000', padding: '10px 14px',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                style={{ ...customStyles.btnOutline }}
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  ...customStyles.btnOutline,
                  background: '#000000',
                  color: '#ffffff',
                }}
                onClick={() => setEditModalOpen(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlaceholderPage = ({ title, activePath }) => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <SideNav activePath={activePath} />
    <div style={customStyles.mainWrapper}>
      <main style={customStyles.mainContent}>
        <h1 style={{ ...customStyles.detailTitle, fontSize: '60px' }}>{title}</h1>
      </main>
    </div>
  </div>
);

const App = () => {
  return (
    <Router basename="/">
      <div style={{ fontFamily: "'Inter', sans-serif", background: '#FFFFFF', color: '#000000', fontSize: '14px', lineHeight: 1.2 }}>
        <Routes>
          <Route path="/" element={<StrategyCombosPage />} />
          <Route path="/strategy-combos" element={<StrategyCombosPage />} />
          <Route path="/product-pool" element={<PlaceholderPage title="选品池" activePath="/product-pool" />} />
          <Route path="/ranking-strategy" element={<PlaceholderPage title="排序策略" activePath="/ranking-strategy" />} />
          <Route path="/delivery-plan" element={<PlaceholderPage title="投放计划" activePath="/delivery-plan" />} />
          <Route path="/performance-monitor" element={<PlaceholderPage title="效果监控" activePath="/performance-monitor" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;