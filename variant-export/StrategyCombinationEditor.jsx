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
  },
  navLinkActive: {
    color: '#111827',
    background: '#FAFAFA',
  },
  navLinkHover: {
    color: '#111827',
    background: '#FAFAFA',
  },
  navActions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
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
  },
  btnPrimary: {
    background: '#1A1A1A',
    color: 'white',
    border: '1px solid transparent',
  },
  btnSecondary: {
    background: '#FFFFFF',
    borderColor: '#F0F0F0',
    color: '#111827',
    border: '1px solid #F0F0F0',
  },
  summaryStrip: {
    display: 'flex',
    gap: '48px',
    paddingBottom: '24px',
    borderBottom: '1px solid #F0F0F0',
  },
  metricGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricVal: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
  },
  metricSub: {
    fontSize: '12px',
    color: '#52A068',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  editorLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '24px',
    alignItems: 'start',
  },
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    overflow: 'hidden',
  },
  panelHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h2: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
  },
  tabs: {
    display: 'flex',
    gap: '24px',
    padding: '0 24px',
    borderBottom: '1px solid #F0F0F0',
  },
  tab: {
    padding: '12px 0',
    color: '#6B7280',
    fontWeight: 500,
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    color: '#111827',
    borderBottom: '2px solid #111827',
  },
  slotList: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  slotItem: {
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'grid',
    gridTemplateColumns: '24px 60px 2fr 1.5fr 1fr auto',
    alignItems: 'center',
    gap: '16px',
    background: '#FFFFFF',
    transition: 'box-shadow 0.2s, border-color 0.2s',
    position: 'relative',
  },
  slotItemHover: {
    borderColor: '#E5E5E5',
    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
    zIndex: 2,
  },
  dragHandle: {
    color: '#9CA3AF',
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotId: {
    fontFamily: 'monospace',
    color: '#9CA3AF',
    fontSize: '12px',
  },
  stratInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stratName: {
    fontWeight: 500,
    color: '#111827',
  },
  stratTrace: {
    fontSize: '11px',
    color: '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  traceArrow: {
    color: '#E5E5E5',
  },
  tagBase: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
  },
  tagHot: {
    color: '#F59E0B',
    background: '#FFFBEB',
  },
  tagNew: {
    color: '#3B82F6',
    background: '#EFF6FF',
  },
  tagManual: {
    color: '#8B5CF6',
    background: '#F5F3FF',
  },
  tagGreen: {
    background: '#52A068',
    color: 'white',
    padding: '4px 10px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    fontSize: '11px',
  },
  addSlotArea: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px dashed #F0F0F0',
    margin: '12px',
  },
  previewContent: {
    padding: '24px',
    background: '#FAFAFA',
    borderRadius: '0 0 12px 12px',
  },
  mobileFrame: {
    width: '280px',
    height: '500px',
    background: '#FFFFFF',
    borderRadius: '24px',
    margin: '0 auto',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    border: '4px solid #F0F0F0',
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
    overflow: 'hidden',
  },
  mockHeader: {
    height: '24px',
    background: '#FAFAFA',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  mockItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    padding: '8px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    position: 'relative',
  },
  mockImg: {
    width: '48px',
    height: '48px',
    background: '#FAFAFA',
    borderRadius: '6px',
    flexShrink: 0,
  },
  mockText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  mockLine1: {
    height: '8px',
    background: '#E5E5E5',
    borderRadius: '4px',
    width: '80%',
  },
  mockLine2: {
    height: '6px',
    background: '#F0F0F0',
    borderRadius: '4px',
    width: '40%',
  },
  dependencyList: {
    padding: '16px 24px',
    borderTop: '1px solid #F0F0F0',
    background: '#FFFFFF',
  },
  depItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #FAFAFA',
    fontSize: '12px',
  },
};

const DragIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

const Tag = ({ type, children }) => {
  const dotStyle = {
    content: '',
    display: 'block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  };

  const typeStyles = {
    hot: { tag: customStyles.tagHot, dot: { ...dotStyle, background: '#F59E0B' } },
    new: { tag: customStyles.tagNew, dot: { ...dotStyle, background: '#3B82F6' } },
    manual: { tag: customStyles.tagManual, dot: { ...dotStyle, background: '#8B5CF6' } },
  };

  const style = typeStyles[type];

  return (
    <span style={{ ...customStyles.tagBase, ...style.tag }}>
      <span style={style.dot}></span>
      {children}
    </span>
  );
};

const NavLink = ({ children, active, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      style={{
        ...customStyles.navLink,
        ...(active || hovered ? customStyles.navLinkActive : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
};

const SlotItem = ({ slotId, stratName, trace, tagType, tagLabel, fallback, onReplace }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...customStyles.slotItem,
        ...(hovered ? customStyles.slotItemHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={customStyles.dragHandle}>
        <DragIcon />
      </div>
      <div style={customStyles.slotId}>{slotId}</div>
      <div style={customStyles.stratInfo}>
        <span style={customStyles.stratName}>{stratName}</span>
        <span style={customStyles.stratTrace}>
          {trace.map((part, i) =>
            part === '→' ? (
              <span key={i} style={customStyles.traceArrow}>→</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </span>
      </div>
      <div>
        <Tag type={tagType}>{tagLabel}</Tag>
      </div>
      <div style={customStyles.labelCaps}>{fallback}</div>
      <div>
        <button
          style={{ ...customStyles.btn, ...customStyles.btnSecondary, padding: '4px 8px', fontSize: '11px' }}
          onClick={onReplace}
        >
          替换
        </button>
      </div>
    </div>
  );
};

const MockItemWithBadge = ({ badgeNum, badgeColor }) => {
  const badgeStyle = {
    position: 'absolute',
    right: '-8px',
    top: '-8px',
    background: badgeColor,
    color: 'white',
    fontSize: '9px',
    fontFamily: 'monospace',
    padding: '2px 4px',
    borderRadius: '4px',
  };

  return (
    <div style={customStyles.mockItem}>
      <span style={badgeStyle}>{badgeNum}</span>
      <div style={customStyles.mockImg}></div>
      <div style={customStyles.mockText}>
        <div style={customStyles.mockLine1}></div>
        <div style={customStyles.mockLine2}></div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [activeNav, setActiveNav] = useState('策略组合');
  const [activeTab, setActiveTab] = useState('模拟点单页预览');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [slots, setSlots] = useState([
    {
      id: '#01',
      stratName: '早鸟必点定序',
      trace: ['选品池: 早餐池', '→', '定序: 01'],
      tagType: 'manual',
      tagLabel: '人工定序 Manual',
      fallback: '热销榜',
    },
    {
      id: '#02',
      stratName: '全店热销Top10',
      trace: ['选品池: ALL全量池', '→', '算法打分'],
      tagType: 'hot',
      tagLabel: '热销模型 Hot',
      fallback: '-',
    },
    {
      id: '#03',
      stratName: '本周上新推荐',
      trace: ['选品池: Q3新品池', '→', '时间倒序'],
      tagType: 'new',
      tagLabel: '新品曝光 New',
      fallback: '热销榜',
    },
  ]);

  const navItems = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控', '全链路预览'];

  const handleSave = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setSlots([]);
    setShowResetConfirm(false);
  };

  const handleReplace = (index) => {
    alert(`替换坑位 ${slots[index].id}`);
  };

  const handleAddSlot = () => {
    const newId = `#0${slots.length + 1}`;
    const newSlot = {
      id: newId,
      stratName: '新坑位策略',
      trace: ['选品池: 待配置', '→', '待配置'],
      tagType: 'new',
      tagLabel: '新品曝光 New',
      fallback: '-',
    };
    setSlots([...slots, newSlot]);
  };

  const remaining = 10 - slots.length;

  return (
    <div style={customStyles.appContainer}>
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

      <main style={customStyles.mainContent}>
        <div style={customStyles.pageHeader}>
          <div>
            <div style={customStyles.breadcrumb}>
              <span>策略组合</span>
              <span>/</span>
              <span style={{ color: '#111827' }}>编辑组合</span>
            </div>
            <h1 style={customStyles.h1}>首页点单推荐Tab组合 (ID: CMP-892)</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{ ...customStyles.btn, ...customStyles.btnSecondary }}
              onClick={() => alert('已取消编辑')}
            >
              取消
            </button>
            <button
              style={{ ...customStyles.btn, ...customStyles.btnPrimary }}
              onClick={handleSave}
            >
              {showSaveSuccess ? '✓ 已保存' : '保存配置'}
            </button>
          </div>
        </div>

        <div style={customStyles.summaryStrip}>
          <div style={customStyles.metricGroup}>
            <span style={customStyles.labelCaps}>已配置坑位</span>
            <span style={customStyles.metricVal}>
              {slots.length}{' '}
              <span style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 'normal' }}>/ 10 限制</span>
            </span>
          </div>
          <div style={customStyles.metricGroup}>
            <span style={customStyles.labelCaps}>关联选品池</span>
            <span style={customStyles.metricVal}>
              3{' '}
              <span style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 'normal' }}>个活跃</span>
            </span>
          </div>
          <div style={customStyles.metricGroup}>
            <span style={customStyles.labelCaps}>生效状态</span>
            <span style={{ marginTop: '4px', ...customStyles.tagGreen }}>投放中</span>
          </div>
          <div style={{ ...customStyles.metricGroup, marginLeft: 'auto', textAlign: 'right' }}>
            <span style={customStyles.labelCaps}>关联投放计划</span>
            <span style={customStyles.metricVal}>周末促销Plan A</span>
            <span style={customStyles.metricSub}>AB实验组 VID: 102</span>
          </div>
        </div>

        <div style={customStyles.editorLayout}>
          <div style={customStyles.panel}>
            <div style={customStyles.panelHeader}>
              <h2 style={customStyles.h2}>坑位编排 (Slots)</h2>
              <button
                style={{ ...customStyles.btn, ...customStyles.btnSecondary, padding: '4px 10px', fontSize: '12px' }}
                onClick={handleReset}
              >
                清空重置
              </button>
            </div>

            <div style={customStyles.slotList}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '24px 60px 2fr 1.5fr 1fr auto',
                  gap: '16px',
                  padding: '0 16px 8px 16px',
                  borderBottom: '1px solid #F0F0F0',
                  ...customStyles.labelCaps,
                }}
              >
                <div></div>
                <div>位置</div>
                <div>绑定排序策略</div>
                <div>策略类型</div>
                <div>兜底规则</div>
                <div>操作</div>
              </div>

              {slots.map((slot, index) => (
                <SlotItem
                  key={slot.id}
                  slotId={slot.id}
                  stratName={slot.stratName}
                  trace={slot.trace}
                  tagType={slot.tagType}
                  tagLabel={slot.tagLabel}
                  fallback={slot.fallback}
                  onReplace={() => handleReplace(index)}
                />
              ))}

              <div style={customStyles.addSlotArea}>
                <button
                  style={{
                    ...customStyles.btn,
                    ...customStyles.btnSecondary,
                    width: '100%',
                    justifyContent: 'center',
                    borderStyle: 'dashed',
                  }}
                  onClick={handleAddSlot}
                >
                  + 添加新坑位规则 (剩余 {remaining} 个)
                </button>
              </div>
            </div>
          </div>

          <div style={{ ...customStyles.panel, display: 'flex', flexDirection: 'column' }}>
            <div style={customStyles.tabs}>
              {['模拟点单页预览', '全链路 Trace'].map((tabName) => (
                <div
                  key={tabName}
                  style={{
                    ...customStyles.tab,
                    ...(activeTab === tabName ? customStyles.tabActive : {}),
                  }}
                  onClick={() => setActiveTab(tabName)}
                >
                  {tabName}
                </div>
              ))}
            </div>

            <div style={customStyles.previewContent}>
              {activeTab === '模拟点单页预览' ? (
                <div style={customStyles.mobileFrame}>
                  <div style={customStyles.mockHeader}></div>
                  <MockItemWithBadge badgeNum="#1" badgeColor="#8B5CF6" />
                  <MockItemWithBadge badgeNum="#2" badgeColor="#F59E0B" />
                  <MockItemWithBadge badgeNum="#3" badgeColor="#3B82F6" />
                </div>
              ) : (
                <div style={{ ...customStyles.mobileFrame, height: '500px', overflowY: 'auto' }}>
                  <div style={{ padding: '8px' }}>
                    <div style={{ ...customStyles.labelCaps, marginBottom: '12px' }}>全链路追踪</div>
                    {[
                      { label: '请求进入', value: 'CMP-892', color: '#111827' },
                      { label: '匹配坑位', value: `${slots.length} 个坑位`, color: '#6B7280' },
                      { label: '选品池召回', value: '3 个池', color: '#6B7280' },
                      { label: '排序策略执行', value: '3 个策略', color: '#6B7280' },
                      { label: '过滤 & 去重', value: '完成', color: '#52A068' },
                      { label: '最终输出', value: `${slots.length} 个坑位`, color: '#52A068' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 0',
                          borderBottom: '1px solid #F0F0F0',
                          fontSize: '11px',
                        }}
                      >
                        <span style={{ color: '#6B7280' }}>{item.label}</span>
                        <span style={{ color: item.color, fontWeight: 500 }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={customStyles.dependencyList}>
              <div style={{ ...customStyles.labelCaps, marginBottom: '8px' }}>架构引用关系 (自底向上)</div>
              <div style={customStyles.depItem}>
                <span style={{ color: '#6B7280' }}>选品池 (基础)</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>已关联 3 个池</span>
              </div>
              <div style={customStyles.depItem}>
                <span style={{ color: '#6B7280' }}>排序策略 (依赖)</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>使用 3 个策略</span>
              </div>
              <div style={{ ...customStyles.depItem }}>
                <span style={{ color: '#111827', fontWeight: 500 }}>本策略组合 (当前)</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', color: '#111827' }}>CMP-892</span>
              </div>
              <div style={{ ...customStyles.depItem, borderBottom: 'none' }}>
                <span style={{ color: '#52A068' }}>投放计划 (上游)</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>被 1 个计划引用</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showResetConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              width: '320px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ ...customStyles.h2, marginBottom: '8px' }}>确认清空重置?</h2>
            <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '20px' }}>
              此操作将清空所有已配置的坑位规则，无法撤销。
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                style={{ ...customStyles.btn, ...customStyles.btnSecondary }}
                onClick={() => setShowResetConfirm(false)}
              >
                取消
              </button>
              <button
                style={{ ...customStyles.btn, background: '#E57373', color: 'white', border: 'none' }}
                onClick={confirmReset}
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
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
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;