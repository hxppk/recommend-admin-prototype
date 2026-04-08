import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  root: {
    '--bg': '#FFFFFF',
    '--surface': '#FFFFFF',
    '--border': '#000000',
    '--text-main': '#000000',
    '--text-secondary': '#666666',
    '--accent': '#0047FF',
    '--sidebar-width': '200px',
  },
};

const SideNav = ({ activeLink, setActiveLink }) => {
  const navItems = [
    { label: '选品池', key: 'product-pool' },
    { label: '排序策略', key: 'sort-strategy' },
    { label: '策略组合', key: 'strategy-combo' },
    { label: '投放计划', key: 'launch-plan' },
  ];

  return (
    <aside style={{
      width: '200px',
      borderRight: '2px solid #000000',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: '#FFFFFF',
    }}>
      <div style={{ padding: '30px 20px', borderBottom: '2px solid #000000' }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{ width: '16px', height: '16px', background: '#0047FF' }}></div>
          STRATEGY.LAB
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>
        {navItems.map((item) => (
          <a
            key={item.key}
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveLink(item.key); }}
            style={{
              fontWeight: 600,
              color: '#000000',
              textDecoration: 'none',
              padding: '12px 20px',
              borderLeft: activeLink === item.key ? '4px solid #0047FF' : '4px solid transparent',
              background: activeLink === item.key ? '#f0f3ff' : 'transparent',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div style={{
        marginTop: 'auto',
        padding: '20px',
        borderTop: '1px solid #eee',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '10px',
        color: '#666666',
      }}>
        OPERATOR / ADMIN_01
      </div>
    </aside>
  );
};

const MetricCard = ({ label, value, delta }) => (
  <div style={{
    border: '1px solid #000000',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }}>
    <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: '#666666' }}>{label}</span>
    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700 }}>
      {value}
      {delta && <span style={{ fontSize: '10px', color: 'green' }}> {delta}</span>}
    </span>
  </div>
);

const SlotRow = ({ index, slotName, guid, priority, strategy, fallback, onDelete }) => {
  const [name, setName] = useState(slotName);
  const [prio, setPrio] = useState(priority);
  const [strat, setStrat] = useState(strategy);
  const [fall, setFall] = useState(fallback);
  const isSelect = index === 0;

  const inlineEditStyle = {
    background: 'transparent',
    border: '1px dashed transparent',
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 4px',
    width: '100%',
    cursor: 'text',
  };

  return (
    <tr>
      <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', verticalAlign: 'top', fontSize: '11px' }}>
        {String(index + 1).padStart(2, '0')}
      </td>
      <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', verticalAlign: 'top', fontSize: '11px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inlineEditStyle}
          onMouseEnter={(e) => { e.target.style.borderColor = '#ccc'; e.target.style.background = '#fafafa'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
          onFocus={(e) => { e.target.style.borderColor = '#0047FF'; e.target.style.background = 'white'; e.target.style.outline = 'none'; }}
          onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
        />
        <div style={{ fontSize: '9px', color: '#0047FF', paddingLeft: '4px' }}>{guid}</div>
      </td>
      <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', verticalAlign: 'top', fontSize: '11px' }}>
        <input
          type="text"
          value={prio}
          onChange={(e) => setPrio(e.target.value)}
          style={{ ...inlineEditStyle, width: '40px' }}
          onMouseEnter={(e) => { e.target.style.borderColor = '#ccc'; e.target.style.background = '#fafafa'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
          onFocus={(e) => { e.target.style.borderColor = '#0047FF'; e.target.style.background = 'white'; e.target.style.outline = 'none'; }}
          onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
        />
      </td>
      <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', verticalAlign: 'top', fontSize: '11px' }}>
        {isSelect ? (
          <select
            value={strat}
            onChange={(e) => setStrat(e.target.value)}
            style={inlineEditStyle}
            onMouseEnter={(e) => { e.target.style.borderColor = '#ccc'; e.target.style.background = '#fafafa'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
            onFocus={(e) => { e.target.style.borderColor = '#0047FF'; e.target.style.background = 'white'; e.target.style.outline = 'none'; }}
            onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
          >
            <option>CTR_MAXIMIZER_V2</option>
            <option>NEW_USER_WEIGHTED</option>
          </select>
        ) : (
          <input
            type="text"
            value={strat}
            onChange={(e) => setStrat(e.target.value)}
            style={inlineEditStyle}
            onMouseEnter={(e) => { e.target.style.borderColor = '#ccc'; e.target.style.background = '#fafafa'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
            onFocus={(e) => { e.target.style.borderColor = '#0047FF'; e.target.style.background = 'white'; e.target.style.outline = 'none'; }}
            onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
          />
        )}
      </td>
      <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', verticalAlign: 'top', fontSize: '11px' }}>
        <input
          type="text"
          value={fall}
          onChange={(e) => setFall(e.target.value)}
          style={inlineEditStyle}
          onMouseEnter={(e) => { e.target.style.borderColor = '#ccc'; e.target.style.background = '#fafafa'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
          onFocus={(e) => { e.target.style.borderColor = '#0047FF'; e.target.style.background = 'white'; e.target.style.outline = 'none'; }}
          onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
        />
      </td>
      <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', verticalAlign: 'top', textAlign: 'right', fontSize: '11px' }}>
        <button
          onClick={onDelete}
          style={{
            padding: '4px 10px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '10px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.target.style.background = '#000000'; e.target.style.color = 'white'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#000000'; }}
        >
          DEL
        </button>
      </td>
    </tr>
  );
};

const SectionWrapper = ({ title, badge, actionLabel, onAction, children, rightBorder }) => {
  const [open, setOpen] = useState(true);

  return (
    <section style={{
      borderBottom: '1px solid #000000',
      borderRight: rightBorder ? '1px solid #000000' : 'none',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '16px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#f9f9f9'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {open ? '▼' : '▶'} {title}
          {badge && <span style={{ fontWeight: 400, fontSize: '11px', opacity: 0.6 }}>{badge}</span>}
        </span>
        {actionLabel && (
          <span
            style={{
              padding: '4px 10px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '10px',
              border: '1px solid #000000',
              background: 'transparent',
              cursor: 'pointer',
            }}
            onClick={(e) => { e.stopPropagation(); onAction && onAction(); }}
          >
            {actionLabel}
          </span>
        )}
      </button>
      {open && (
        <div style={{ padding: '0 40px 24px 40px' }}>
          {children}
        </div>
      )}
    </section>
  );
};

const StrategyDetailPage = () => {
  const [slots, setSlots] = useState([
    { id: 1, slotName: 'HERO_CAROUSEL_01', guid: 'GUID-992-AX', priority: 'P0', strategy: 'CTR_MAXIMIZER_V2', fallback: 'STATIC_PROMO_V1' },
    { id: 2, slotName: 'DISCOVERY_FEED_TOP', guid: 'GUID-102-BF', priority: 'P1', strategy: 'PERSONALIZED_RANKER', fallback: 'NULL' },
  ]);
  const [publishFeedback, setPublishFeedback] = useState('');

  const handleAddSlot = () => {
    const newId = slots.length > 0 ? Math.max(...slots.map(s => s.id)) + 1 : 1;
    setSlots([...slots, {
      id: newId,
      slotName: `NEW_SLOT_0${newId}`,
      guid: `GUID-${Math.floor(Math.random() * 999)}-XX`,
      priority: `P${slots.length}`,
      strategy: 'CTR_MAXIMIZER_V2',
      fallback: 'NULL',
    }]);
  };

  const handleDeleteSlot = (id) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handlePublish = () => {
    setPublishFeedback('Changes published!');
    setTimeout(() => setPublishFeedback(''), 2500);
  };

  const thStyle = {
    textAlign: 'left',
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 800,
    textTransform: 'uppercase',
    fontSize: '9px',
    color: '#666666',
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#FFFFFF', color: '#000000', fontSize: '12px', lineHeight: 1.2 }}>
      <div style={{
        padding: '12px 40px',
        borderBottom: '1px solid #000000',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: '10px',
        letterSpacing: '0.1em',
        display: 'flex',
        gap: '8px',
      }}>
        DIRECTORY / INDEX_001 / <span style={{ color: '#0047FF' }}>CMP-892</span>
      </div>

      <header style={{ padding: '40px 40px 20px 40px', borderBottom: '2px solid #000000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '48px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}>
              HOMEPAGE_TAB_RECOMMEND
            </h1>
            <p style={{ marginTop: '8px', fontWeight: 500, color: '#666666' }}>
              Global orchestration logic for homepage hero and discovery slots.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {publishFeedback && (
              <span style={{ fontSize: '10px', color: 'green', fontWeight: 700 }}>{publishFeedback}</span>
            )}
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: '#000000',
              color: 'white',
              padding: '4px 12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '10px',
            }}>
              Active
            </span>
            <button
              onClick={handlePublish}
              style={{
                padding: '4px 10px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '10px',
                border: '1px solid #000000',
                background: '#000000',
                color: 'white',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
            >
              Publish Changes
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginTop: '32px' }}>
          {[
            { label: 'Combo ID', value: 'CMP-892_V4' },
            { label: 'Owner', value: 'Growth_Team_A' },
            { label: 'Last Modified', value: '2023.10.24 14:32:01' },
            { label: 'Business Unit', value: 'E-COMMERCE_GLOBAL' },
          ].map((item) => (
            <div key={item.label}>
              <label style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#666666',
                display: 'block',
                marginBottom: '4px',
              }}>
                {item.label}
              </label>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </header>

      <SectionWrapper
        title="01. SLOT CONFIGURATION"
        badge={`(${slots.length} ACTIVE SLOTS)`}
        actionLabel="+ Add Slot"
        onAction={handleAddSlot}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: '40px' }}>#</th>
              <th style={thStyle}>SLOT_NAME / TARGET_ID</th>
              <th style={thStyle}>PRIORITY</th>
              <th style={thStyle}>SELECTION_STRATEGY</th>
              <th style={thStyle}>FALLBACK</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, idx) => (
              <SlotRow
                key={slot.id}
                index={idx}
                slotName={slot.slotName}
                guid={slot.guid}
                priority={slot.priority}
                strategy={slot.strategy}
                fallback={slot.fallback}
                onDelete={() => handleDeleteSlot(slot.id)}
              />
            ))}
          </tbody>
        </table>
      </SectionWrapper>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <SectionWrapper title="02. PERFORMANCE METRICS" rightBorder={true}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <MetricCard label="CTR (Avg)" value="4.82%" delta="+0.2%" />
            <MetricCard label="Conversion" value="1.15%" />
          </div>
        </SectionWrapper>

        <SectionWrapper title="03. LINKED PLAN">
          <div style={{ padding: '12px', border: '1px solid #000000', background: '#f0f3ff' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, marginBottom: '4px' }}>ACTIVE PLAN:</div>
            <div style={{ fontWeight: 700, fontSize: '14px', textDecoration: 'underline' }}>PROMO_PLAN_A_2023_Q4</div>
            <div style={{ fontSize: '10px', marginTop: '8px' }}>Duration: 2023.10.01 - 2023.12.31</div>
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper title="04. AUDIT LOG">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', width: '140px', fontWeight: 700, fontSize: '11px' }}>2023.10.24 14:32</td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', width: '100px', fontSize: '11px' }}>ADMIN_01</td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '11px' }}>
                Modified <span style={{ fontWeight: 700 }}>SLOT_01</span> selection strategy from V1 to V2
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', fontWeight: 700, fontSize: '11px' }}>2023.10.22 09:15</td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '11px' }}>SYSTEM</td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '11px' }}>
                Automated fallback triggered for <span style={{ fontWeight: 700 }}>HERO_CAROUSEL</span>
              </td>
            </tr>
          </tbody>
        </table>
      </SectionWrapper>
    </div>
  );
};

const App = () => {
  const [activeLink, setActiveLink] = useState('strategy-combo');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { -webkit-font-smoothing: antialiased; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <SideNav activeLink={activeLink} setActiveLink={setActiveLink} />
        <div style={{ flex: 1, marginLeft: '200px' }}>
          <Routes>
            <Route path="/" element={<StrategyDetailPage />} />
            <Route path="*" element={<StrategyDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;