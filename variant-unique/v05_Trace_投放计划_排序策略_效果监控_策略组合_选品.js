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
    '--btn-primary': '#1A1A1A',
    '--btn-primary-hover': '#000000',
    '--radius-panel': '12px',
    '--radius-element': '8px',
    '--radius-pill': '9999px',
    '--shadow-sm': '0 1px 2px rgba(0,0,0,0.02)',
    '--shadow-md': '0 4px 12px rgba(0,0,0,0.04)',
    '--shadow-float': '0 8px 24px rgba(0,0,0,0.06)',
  }
};

const TraceNode = ({ label, value, variant }) => {
  let style = {
    padding: '8px 12px',
    background: '#FFFFFF',
    border: '1px solid #F0F0F0',
    borderRadius: '6px',
    minWidth: '100px',
    position: 'relative',
    zIndex: 2,
  };
  let valueStyle = { fontWeight: 500, fontSize: '12px', whiteSpace: 'nowrap' };

  if (variant === 'active') {
    style = { ...style, borderColor: '#3B82F6', background: '#EFF6FF' };
    valueStyle = { ...valueStyle, color: '#3B82F6' };
  } else if (variant === 'fallback') {
    style = { ...style, borderStyle: 'dashed', borderColor: '#F59E0B' };
    valueStyle = { ...valueStyle, color: '#F59E0B' };
  } else if (variant === 'success') {
    style = { ...style, borderColor: '#52A068', background: '#EDF7F0' };
    valueStyle = { ...valueStyle, color: '#52A068' };
  }

  return (
    <div style={style}>
      <span style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
};

const ArrowLine = () => (
  <div style={{ position: 'relative', height: '2px', background: '#F0F0F0', flex: 1, minWidth: '24px' }}>
    <div style={{
      position: 'absolute', right: '-1px', top: '-3px',
      width: 0, height: 0,
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: '6px solid #F0F0F0'
    }} />
  </div>
);

const TraceRow = ({ slotId, nodes, faded }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '16px',
    position: 'relative',
    opacity: faded ? 0.5 : 1
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '32px', background: '#FAFAFA', borderRadius: '6px',
      fontFamily: 'monospace', fontWeight: 600, color: '#111827',
      border: '1px solid #F0F0F0'
    }}>{slotId}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <TraceNode label={node.label} value={node.value} variant={node.variant} />
          {i < nodes.length - 1 && <ArrowLine />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('trace');

  const traceRows = [
    {
      slotId: '#01',
      nodes: [
        { label: 'Pool', value: '早餐池 (ID:1)', variant: 'active' },
        { label: 'Sort', value: '人工定序:01', variant: 'active' },
        { label: 'FB', value: '热销榜' },
        { label: 'Result', value: 'SKU-9021', variant: 'success' },
      ]
    },
    {
      slotId: '#02',
      nodes: [
        { label: 'Pool', value: '全量池 (ID:0)', variant: 'active' },
        { label: 'Sort', value: '热销模型 Score', variant: 'active' },
        { label: 'FB', value: '无' },
        { label: 'Result', value: 'SKU-8821', variant: 'success' },
      ]
    },
    {
      slotId: '#03',
      nodes: [
        { label: 'Pool', value: 'Q3新品池 (ID:5)', variant: 'active' },
        { label: 'Sort', value: 'Time: DESC (Empty)', variant: 'fallback' },
        { label: 'FB', value: '热销榜 (Triggered)', variant: 'fallback' },
        { label: 'Result', value: 'SKU-1022', variant: 'success' },
      ]
    },
    {
      slotId: '#04',
      faded: true,
      nodes: [
        { label: 'Pool', value: '下午茶池' },
        { label: 'Sort', value: 'LTV Max' },
        { label: 'FB', value: '随机推荐' },
        { label: 'Result', value: 'Pending' },
      ]
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", background: '#FAFAFA', color: '#111827', fontSize: '13px', lineHeight: 1.5, WebkitFontSmoothing: 'antialiased', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Nav */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '0 32px', display: 'flex', alignItems: 'center', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 600, fontSize: '15px', marginRight: '48px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#111827', borderRadius: '4px' }} />
          策略后台
        </div>
        <nav style={{ display: 'flex', gap: '8px' }}>
          {[
            { label: '选品池', active: false },
            { label: '排序策略', active: false },
            { label: '策略组合', active: true },
            { label: '投放计划', active: false },
            { label: '效果监控', active: false },
          ].map((item) => (
            <a key={item.label} href="#" style={{
              padding: '6px 12px', color: item.active ? '#111827' : '#6B7280',
              textDecoration: 'none', fontWeight: 500, borderRadius: '8px',
              background: item.active ? '#FAFAFA' : 'transparent', transition: 'all 0.2s'
            }}>{item.label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>操作人: 运营 admin</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>
              <span>策略组合</span> / <span style={{ color: '#111827' }}>CMP-892</span>
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>首页点单推荐Tab组合 (ID: CMP-892)</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 500,
              cursor: 'pointer', border: '1px solid #F0F0F0', background: '#FFFFFF', color: '#111827',
              display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }}>导出链路图</button>
            <button style={{
              padding: '8px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: 500,
              cursor: 'pointer', border: '1px solid transparent', background: '#1A1A1A', color: 'white',
              display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }}>保存配置</button>
          </div>
        </div>

        {/* Summary Strip */}
        <div style={{ display: 'flex', gap: '48px', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>已配置坑位</span>
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>
              6 <span style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 'normal' }}>/ 10</span>
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>生效状态</span>
            <span style={{ marginTop: '4px', display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 500, gap: '4px', background: '#52A068', color: 'white' }}>投放中</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: 'auto', textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>实时调用量 (QPS)</span>
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>1,240</span>
          </div>
        </div>

        {/* Editor Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px', alignItems: 'start' }}>
          {/* Left Panel */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #F0F0F0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '24px', padding: '0 24px', borderBottom: '1px solid #F0F0F0' }}>
              {[
                { key: 'slots', label: '坑位编排 (Slots)' },
                { key: 'trace', label: '全链路 Trace' },
              ].map((tab) => (
                <div
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: '12px 0', color: activeTab === tab.key ? '#111827' : '#6B7280',
                    fontWeight: 500, cursor: 'pointer',
                    borderBottom: activeTab === tab.key ? '2px solid #111827' : '2px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >{tab.label}</div>
              ))}
            </div>

            {/* Trace Container */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff' }}>
              {/* Waterfall Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '80px 1.2fr 1.2fr 1fr 1fr',
                gap: '16px', paddingBottom: '12px', borderBottom: '1px solid #F0F0F0',
                fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280'
              }}>
                <div>坑位</div>
                <div>Step 1: 选品池检索</div>
                <div>Step 2: 排序策略</div>
                <div>Step 3: 兜底逻辑</div>
                <div>Output: 结果</div>
              </div>

              {traceRows.map((row) => (
                <TraceRow key={row.slotId} slotId={row.slotId} nodes={row.nodes} faded={row.faded} />
              ))}
            </div>

            {/* Legend */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #F0F0F0', display: 'flex', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6B7280' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1px solid #3B82F6', background: '#EFF6FF' }} />
                命中流程
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6B7280' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1px dashed #F59E0B' }} />
                兜底触发
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6B7280' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', border: '1px solid #52A068', background: '#EDF7F0' }} />
                最终输出
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #F0F0F0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>组合依赖详情</h2>
            </div>
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', padding: '4px 16px' }}>基础选品池 (3)</div>

              {[
                { name: 'Breakfast_Pool_01', status: '检索成功', statusBg: '#FAFAFA', statusColor: '#6B7280' },
                { name: 'Global_All_Pool', status: '检索成功', statusBg: '#FAFAFA', statusColor: '#6B7280' },
                { name: 'New_Arrival_Q3', status: '无结果', statusBg: '#FFFBEB', statusColor: '#F59E0B' },
              ].map((pool) => (
                <div key={pool.name} style={{
                  padding: '10px 16px', border: '1px solid #F0F0F0', borderRadius: '8px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 500 }}>{pool.name}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
                    borderRadius: '9999px', fontSize: '11px', fontWeight: 500,
                    background: pool.statusBg, color: pool.statusColor
                  }}>{pool.status}</span>
                </div>
              ))}

              <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', padding: '12px 16px 4px 16px' }}>计算引擎</div>
              <div style={{ padding: '0 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #FAFAFA' }}>
                  <span style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase' }}>引擎版本</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>v4.2.0-stable</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase' }}>平均耗时</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: '#52A068' }}>42ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAFA; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;