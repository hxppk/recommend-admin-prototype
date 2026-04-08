import React, { useState, useEffect } from 'react';
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
  }
};

const DragIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" />
  </svg>
);

const Tag = ({ type, children, style }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
  };
  const dotStyle = {
    content: '',
    display: 'block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  };
  const variants = {
    hot: { tag: { color: '#F59E0B', background: '#FFFBEB' }, dot: { background: '#F59E0B' } },
    new: { tag: { color: '#3B82F6', background: '#EFF6FF' }, dot: { background: '#3B82F6' } },
    manual: { tag: { color: '#8B5CF6', background: '#F5F3FF' }, dot: { background: '#8B5CF6' } },
    green: { tag: { background: '#52A068', color: 'white', padding: '4px 10px', fontWeight: 600, letterSpacing: '0.5px' }, dot: null },
    skipped: { tag: { background: '#F0F0F0', color: '#6B7280' }, dot: { background: '#9CA3AF' } },
    hit: { tag: { color: '#3B82F6', background: '#EFF6FF' }, dot: { background: '#3B82F6' } },
  };
  const v = variants[type] || variants.manual;
  return (
    <span style={{ ...baseStyle, ...v.tag, ...style }}>
      {v.dot && <span style={{ ...dotStyle, ...v.dot }} />}
      {children}
    </span>
  );
};

const NodeDot = ({ status }) => {
  const base = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: '2px solid white',
  };
  if (status === 'hit') return <span style={{ ...base, background: '#52A068', boxShadow: '0 0 0 1px #52A068' }} />;
  if (status === 'miss') return <span style={{ ...base, background: '#E57373', boxShadow: '0 0 0 1px #E57373' }} />;
  return <span style={{ ...base, background: '#E5E5E5', boxShadow: '0 0 0 1px #F0F0F0' }} />;
};

const TraceLine = ({ label, fillWidth, fillColor, latency, hitRate, opacity }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '120px 1fr 80px 60px',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 0',
    position: 'relative',
    opacity: opacity || 1,
  }}>
    <div style={{ position: 'absolute', left: '10px', top: 0, bottom: 0, width: '1px', background: '#F0F0F0', zIndex: 0 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1, background: '#FFFFFF', width: 'fit-content', paddingRight: '8px' }}>
      <NodeDot status={fillWidth > 0 ? 'hit' : 'none'} />
      <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>{label}</span>
    </div>
    <div style={{ height: '6px', background: '#FAFAFA', borderRadius: '3px', width: '100%' }}>
      <div style={{ height: '100%', borderRadius: '3px', background: fillColor, width: `${fillWidth}%` }} />
    </div>
    <div style={{ color: '#6B7280', textAlign: 'right', fontFamily: 'monospace', fontSize: '11px' }}>{latency}</div>
    <div style={{ textAlign: 'right', fontWeight: 500, color: fillColor }}>{hitRate}</div>
  </div>
);

const WaterfallSection = ({ title, badge, badgeType, ranker, children, bgDim }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #F0F0F0', borderRadius: '8px', overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: '10px 16px', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {ranker && <span style={{ fontFamily: 'monospace', color: '#9CA3AF', fontSize: '11px' }}>{ranker}</span>}
          {badge && <Tag type={badgeType} style={{ padding: '2px 6px', fontSize: '10px' }}>{badge}</Tag>}
          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: '16px', position: 'relative', background: bgDim ? '#FAFAFA' : '#FFFFFF', opacity: bgDim ? 0.6 : 1 }}>
          {children}
        </div>
      )}
    </div>
  );
};

const SlotItem = ({ id, name, tagType, tagLabel, source, status, selected }) => {
  const statusColor = status === 'ACTIVE' ? '#52A068' : '#3B82F6';
  return (
    <div style={{
      border: `1px solid ${selected ? '#3B82F6' : '#F0F0F0'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      display: 'grid',
      gridTemplateColumns: '24px 60px 2fr 1.5fr 1fr auto',
      alignItems: 'center',
      gap: '16px',
      background: selected ? '#EFF6FF' : '#FFFFFF',
      opacity: selected ? 1 : 0.8,
      transition: 'all 0.2s',
    }}>
      <div style={{ color: '#9CA3AF', cursor: 'grab', display: 'flex', alignItems: 'center' }}><DragIcon /></div>
      <div style={{ fontFamily: 'monospace', color: '#9CA3AF', fontSize: '12px' }}>{id}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontWeight: 500, color: '#111827' }}>{name}</span>
      </div>
      <div><Tag type={tagType}>{tagLabel}</Tag></div>
      <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>{source}</div>
      <div style={{ color: statusColor, fontSize: '11px', fontWeight: 600 }}>{status}</div>
    </div>
  );
};

const Header = ({ activeNav, setActiveNav }) => {
  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控', '全链路预览'];
  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #F0F0F0',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontWeight: 600, fontSize: '15px', marginRight: '48px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '16px', height: '16px', background: '#111827', borderRadius: '4px' }} />
        策略后台
      </div>
      <nav style={{ display: 'flex', gap: '8px' }}>
        {navItems.map(item => (
          <a
            key={item}
            href="#"
            onClick={e => { e.preventDefault(); setActiveNav(item); }}
            style={{
              padding: '6px 12px',
              color: activeNav === item ? '#111827' : '#6B7280',
              textDecoration: 'none',
              fontWeight: 500,
              borderRadius: '8px',
              background: activeNav === item ? '#FAFAFA' : 'transparent',
              transition: 'all 0.2s',
              fontSize: '13px',
            }}
          >
            {item}
          </a>
        ))}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>操作人: 运营 admin</span>
      </div>
    </header>
  );
};

const SummaryStrip = () => (
  <div style={{ display: 'flex', gap: '48px', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>平均接口耗时</span>
      <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>
        42ms <span style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 'normal' }}>P99: 115ms</span>
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>请求成功率</span>
      <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>99.98%</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>生效状态</span>
      <span style={{ marginTop: '4px' }}><Tag type="green">投放中</Tag></span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: 'auto', textAlign: 'right' }}>
      <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>关联投放计划</span>
      <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>周末促销Plan A</span>
      <span style={{ fontSize: '12px', color: '#52A068', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>AB实验组 VID: 102</span>
    </div>
  </div>
);

const SlotPanel = ({ showAll, setShowAll }) => (
  <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #F0F0F0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
    <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>坑位编排 (Slots)</h2>
    </div>
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <SlotItem id="#01" name="早鸟必点定序" tagType="manual" tagLabel="Manual" source="热销榜" status="ACTIVE" selected={false} />
      <SlotItem id="#02" name="全店热销Top10" tagType="hot" tagLabel="Hot" source="-" status="SELECTED" selected={true} />
      <SlotItem id="#03" name="本周上新推荐" tagType="new" tagLabel="New" source="热销榜" status="ACTIVE" selected={false} />
    </div>
    <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', borderTop: '1px dashed #F0F0F0', margin: '12px' }}>
      <button
        onClick={() => setShowAll(!showAll)}
        style={{
          width: '100%',
          justifyContent: 'center',
          borderStyle: 'dashed',
          padding: '8px 16px',
          borderRadius: '9999px',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          border: '1px dashed #F0F0F0',
          background: '#FFFFFF',
          color: '#111827',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s',
        }}
      >
        {showAll ? '收起列表' : '查看完整配置列表'}
      </button>
    </div>
    {showAll && (
      <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {['#04', '#05', '#06'].map((id, i) => (
          <SlotItem key={id} id={id} name={`附加策略 ${id}`} tagType={['hot', 'new', 'manual'][i]} tagLabel={['Hot', 'New', 'Manual'][i]} source="通用池" status="ACTIVE" selected={false} />
        ))}
      </div>
    )}
  </div>
);

const TracePanel = ({ activeTab, setActiveTab }) => (
  <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #F0F0F0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
    <div style={{ display: 'flex', gap: '24px', padding: '0 24px', borderBottom: '1px solid #F0F0F0' }}>
      {['模拟点单页预览', '全链路 Trace'].map(tab => (
        <div
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            padding: '12px 0',
            color: activeTab === tab ? '#111827' : '#6B7280',
            fontWeight: 500,
            cursor: 'pointer',
            borderBottom: `2px solid ${activeTab === tab ? '#111827' : 'transparent'}`,
            fontSize: '13px',
            transition: 'all 0.2s',
          }}
        >
          {tab}
        </div>
      ))}
    </div>

    {activeTab === '全链路 Trace' ? (
      <>
        <div style={{ padding: '24px', background: '#fdfdfd', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #F0F0F0' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>Slot #02 决策路径分析</span>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#9CA3AF' }}>ReqID: trace_88x29910z</span>
          </div>

          <WaterfallSection title="1. 选品池检索 (Selection)" badge="HIT" badgeType="hit">
            <TraceLine label="ALL全量池" fillWidth={25} fillColor="#52A068" latency="8ms" hitRate="100%" />
            <TraceLine label="缓存预热层" fillWidth={10} fillColor="#9CA3AF" latency="2ms" hitRate="-" opacity={0.5} />
          </WaterfallSection>

          <WaterfallSection title="2. 排序策略 (Ranking)" ranker="Ranker: XGBoost_v2">
            <TraceLine label="粗排过滤" fillWidth={40} fillColor="#3B82F6" latency="12ms" hitRate="94%" />
            <TraceLine label="精排模型" fillWidth={70} fillColor="#3B82F6" latency="22ms" hitRate="100%" />
          </WaterfallSection>

          <WaterfallSection title="3. 兜底规则 (Fallback)" badge="SKIPPED" badgeType="skipped" bgDim>
            <TraceLine label="热销榜兜底" fillWidth={0} fillColor="#9CA3AF" latency="0ms" hitRate="0%" />
          </WaterfallSection>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#3B82F6' }}>总链路耗时: 42ms</span>
          </div>
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid #F0F0F0', background: '#FFFFFF' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '8px' }}>性能健康指标</div>
          {[
            { label: '缓存命中率 (L1/L2)', value: '82.4% / 91.0%', color: '#111827' },
            { label: '下游服务超时次数 (24h)', value: '12 次', color: '#E57373' },
            { label: 'Trace 版本', value: 'v2.4.0-prod', color: '#111827', bold: true },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FAFAFA', fontSize: '12px' }}>
              <span style={{ color: item.bold ? '#111827' : '#6B7280', fontWeight: item.bold ? 500 : 400 }}>{item.label}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      </>
    ) : (
      <div style={{ padding: '48px 24px', textAlign: 'center', color: '#9CA3AF', background: '#fdfdfd' }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>📱</div>
        <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280', marginBottom: '8px' }}>模拟点单页预览</div>
        <div style={{ fontSize: '13px' }}>此处展示首页点单推荐Tab的模拟渲染效果</div>
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px', margin: '24px auto 0' }}>
          {[
            { name: '早鸟必点定序', tag: 'Manual', tagType: 'manual' },
            { name: '全店热销Top10', tag: 'Hot', tagType: 'hot' },
            { name: '本周上新推荐', tag: 'New', tagType: 'new' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #F0F0F0', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500, color: '#111827', fontSize: '13px' }}>{item.name}</span>
              <Tag type={item.tagType}>{item.tag}</Tag>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const MainPage = () => {
  const [activeNav, setActiveNav] = useState('策略组合');
  const [activeTab, setActiveTab] = useState('全链路 Trace');
  const [showAll, setShowAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [exported, setExported] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#FAFAFA', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", fontSize: '13px', lineHeight: 1.5, WebkitFontSmoothing: 'antialiased' }}>
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>
              <span>策略组合</span>
              <span>/</span>
              <span style={{ color: '#111827' }}>全链路 Trace</span>
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em', color: '#111827' }}>首页点单推荐Tab组合 (ID: CMP-892)</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleExport}
              style={{ padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: '1px solid #F0F0F0', background: '#FFFFFF', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              {exported ? '✓ 已导出' : '导出日志'}
            </button>
            <button
              onClick={handleRefresh}
              style={{ padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', border: '1px solid transparent', background: refreshing ? '#333' : '#1A1A1A', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              {refreshing ? '刷新中...' : '刷新数据'}
            </button>
          </div>
        </div>

        <SummaryStrip />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: '24px', alignItems: 'start' }}>
          <SlotPanel showAll={showAll} setShowAll={setShowAll} />
          <TracePanel activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background-color: #FAFAFA; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
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