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
    border: 'none',
    background: 'transparent',
    fontSize: '13px',
  },
  navLinkActive: {
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
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  metricVal: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111827',
    fontVariantNumeric: 'tabular-nums',
  },
  editorLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
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
    fontSize: '13px',
  },
  tabActive: {
    color: '#111827',
    borderBottom: '2px solid #111827',
  },
  filterRuleBox: {
    padding: '16px 24px',
    background: '#F9FAFB',
    borderBottom: '1px solid #F0F0F0',
  },
  ruleTag: {
    display: 'inline-flex',
    padding: '4px 10px',
    background: 'white',
    border: '1px solid #F0F0F0',
    borderRadius: '4px',
    fontSize: '12px',
    marginRight: '8px',
    marginBottom: '8px',
  },
  dataTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    textAlign: 'left',
    padding: '12px 24px',
    background: '#F9FAFB',
    borderBottom: '1px solid #F0F0F0',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
  },
  tableCell: {
    padding: '12px 24px',
    borderBottom: '1px solid #F0F0F0',
    verticalAlign: 'middle',
  },
  itemPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  itemImg: {
    width: '40px',
    height: '40px',
    background: '#FAFAFA',
    borderRadius: '4px',
    flexShrink: 0,
  },
  tagBlue: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    background: '#EFF6FF',
    color: '#3B82F6',
  },
  tagGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    background: '#EDF7F0',
    color: '#52A068',
  },
  sideList: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sideItem: {
    padding: '12px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  chartContainer: {
    padding: '24px',
    height: '180px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
  },
  chartBar: {
    flex: 1,
    background: '#EFF6FF',
    borderRadius: '2px 2px 0 0',
    position: 'relative',
    minHeight: '20px',
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
  chartBarHighlight: {
    background: '#3B82F6',
  },
};

const TableRow = ({ item, onDetail }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      style={{ background: hovered ? '#FCFCFC' : 'transparent', transition: 'background 0.15s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td style={customStyles.tableCell}>
        <div style={customStyles.itemPreview}>
          <div style={customStyles.itemImg}></div>
          <div>
            <div style={{ fontSize: '13px' }}>{item.name}</div>
            <div style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>SPU: {item.spu}</div>
          </div>
        </div>
      </td>
      <td style={{ ...customStyles.tableCell, fontVariantNumeric: 'tabular-nums' }}>{item.id}</td>
      <td style={customStyles.tableCell}><span style={customStyles.tagBlue}>{item.category}</span></td>
      <td style={{ ...customStyles.tableCell, fontVariantNumeric: 'tabular-nums' }}>{item.price}</td>
      <td style={{ ...customStyles.tableCell, fontVariantNumeric: 'tabular-nums' }}>{item.stock}</td>
      <td style={{ ...customStyles.tableCell, textAlign: 'right' }}>
        <button
          style={{ ...customStyles.btn, ...customStyles.btnSecondary, padding: '4px 8px', fontSize: '11px' }}
          onClick={() => onDetail(item)}
        >
          明细
        </button>
      </td>
    </tr>
  );
};

const ChartBar = ({ height, highlight }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...customStyles.chartBar,
        height,
        background: highlight || hovered ? '#3B82F6' : '#EFF6FF',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    ></div>
  );
};

const SideItem = ({ title, subtitle }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...customStyles.sideItem, borderColor: hovered ? '#9CA3AF' : '#F0F0F0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: '13px' }}>{title}</div>
      <div style={customStyles.labelCaps}>{subtitle}</div>
    </div>
  );
};

const DetailModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.3)', zIndex: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: '12px', padding: '32px',
          minWidth: '340px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={customStyles.h2}>商品明细</span>
          <button
            style={{ ...customStyles.btn, ...customStyles.btnSecondary, padding: '4px 10px', fontSize: '12px' }}
            onClick={onClose}
          >关闭</button>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ ...customStyles.itemImg, width: '60px', height: '60px' }}></div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>{item.name}</div>
            <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>SPU: {item.spu}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { label: '商品ID', value: item.id },
            { label: '分类', value: item.category },
            { label: '价格', value: item.price },
            { label: '当前库存', value: item.stock },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={customStyles.labelCaps}>{label}</span>
              <span style={{ fontWeight: 500, fontSize: '14px' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PoolDetailPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [exportClicked, setExportClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  const tableData = [
    { name: '招牌肉包套餐', spu: '1002341', id: '66291', category: '早餐', price: '¥12.00', stock: '1,240' },
    { name: '美式咖啡 (中)', spu: '2005122', id: '44120', category: '饮品', price: '¥15.00', stock: '9,99+' },
    { name: '全麦芝士三明治', spu: '1003394', id: '88219', category: '烘焙', price: '¥18.00', stock: '86' },
  ];

  const tabLabels = ['商品列表 (142)', '规模趋势', '变更日志'];
  const navLinks = ['选品池', '排序策略', '策略组合', '投放计划', '效果监控'];
  const [activeNav, setActiveNav] = useState(0);

  const handleExport = () => {
    setExportClicked(true);
    setTimeout(() => setExportClicked(false), 1200);
  };

  const handleEdit = () => {
    setEditClicked(true);
    setTimeout(() => setEditClicked(false), 1200);
  };

  return (
    <div style={customStyles.appContainer}>
      <header style={customStyles.topNav}>
        <div style={customStyles.logo}>
          <div style={customStyles.logoMark}></div>
          策略后台
        </div>
        <nav style={customStyles.navLinks}>
          {navLinks.map((link, i) => (
            <button
              key={link}
              style={{
                ...customStyles.navLink,
                ...(activeNav === i ? customStyles.navLinkActive : {}),
              }}
              onClick={() => setActiveNav(i)}
            >
              {link}
            </button>
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
              <span>选品池</span>
              <span>/</span>
              <span style={{ color: '#111827' }}>池详情</span>
            </div>
            <h1 style={customStyles.h1}>早餐池 (ID: POOL-042)</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                ...customStyles.btn,
                ...customStyles.btnSecondary,
                ...(exportClicked ? { background: '#F0F0F0' } : {}),
              }}
              onClick={handleExport}
            >
              {exportClicked ? '导出中...' : '导出数据'}
            </button>
            <button
              style={{
                ...customStyles.btn,
                ...customStyles.btnPrimary,
                ...(editClicked ? { background: '#333' } : {}),
              }}
              onClick={handleEdit}
            >
              {editClicked ? '编辑中...' : '编辑规则'}
            </button>
          </div>
        </div>

        <div style={customStyles.summaryStrip}>
          <div style={customStyles.metricGroup}>
            <span style={customStyles.labelCaps}>当前商品数</span>
            <span style={customStyles.metricVal}>
              142{' '}
              <span style={{ fontSize: '14px', color: '#52A068', fontWeight: 'normal' }}>↑ 12%</span>
            </span>
          </div>
          <div style={customStyles.metricGroup}>
            <span style={customStyles.labelCaps}>覆盖门店数</span>
            <span style={customStyles.metricVal}>1,208</span>
          </div>
          <div style={customStyles.metricGroup}>
            <span style={customStyles.labelCaps}>数据刷新频率</span>
            <span style={customStyles.metricVal}>每小时 (实时)</span>
          </div>
          <div style={{ ...customStyles.metricGroup, marginLeft: 'auto', textAlign: 'right' }}>
            <span style={customStyles.labelCaps}>池状态</span>
            <span style={{ ...customStyles.tagGreen, marginTop: '4px' }}>● 活跃中</span>
          </div>
        </div>

        <div style={customStyles.editorLayout}>
          <div>
            <div style={{ ...customStyles.panel, marginBottom: '24px' }}>
              <div style={customStyles.panelHeader}>
                <h2 style={customStyles.h2}>选品规则定义</h2>
              </div>
              <div style={customStyles.filterRuleBox}>
                <div style={{ ...customStyles.labelCaps, marginBottom: '12px' }}>筛选逻辑 (AND)</div>
                <div style={customStyles.ruleTag}>类目: [早餐, 烘焙, 饮品]</div>
                <div style={customStyles.ruleTag}>供餐时段: 05:00 - 10:30</div>
                <div style={customStyles.ruleTag}>库存状态: &gt; 5</div>
                <div style={customStyles.ruleTag}>商品状态: 上架中</div>
                <div style={{ ...customStyles.ruleTag, borderColor: '#8B5CF6', color: '#8B5CF6' }}>
                  黑名单: [POOL_EXCLUDE_LIST]
                </div>
              </div>
            </div>

            <div style={customStyles.panel}>
              <div style={customStyles.tabs}>
                {tabLabels.map((label, i) => (
                  <div
                    key={label}
                    style={{ ...customStyles.tab, ...(activeTab === i ? customStyles.tabActive : {}) }}
                    onClick={() => setActiveTab(i)}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {activeTab === 0 && (
                <>
                  <table style={customStyles.dataTable}>
                    <thead>
                      <tr>
                        <th style={{ ...customStyles.tableHead, width: '300px' }}>商品名称</th>
                        <th style={customStyles.tableHead}>商品ID</th>
                        <th style={customStyles.tableHead}>分类</th>
                        <th style={customStyles.tableHead}>价格</th>
                        <th style={customStyles.tableHead}>当前库存</th>
                        <th style={{ ...customStyles.tableHead, textAlign: 'right' }}>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item) => (
                        <TableRow key={item.id} item={item} onDetail={setSelectedItem} />
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: '16px', textAlign: 'center', color: '#9CA3AF', fontSize: '12px', cursor: 'pointer' }}>
                    查看更多 (共 142 个商品)
                  </div>
                </>
              )}

              {activeTab === 1 && (
                <div style={{ padding: '32px 24px', color: '#6B7280', fontSize: '13px', textAlign: 'center' }}>
                  <div style={{ marginBottom: '8px', fontSize: '15px' }}>📈</div>
                  规模趋势图表
                  <div style={{ marginTop: '8px', color: '#9CA3AF', fontSize: '12px' }}>近 30 日商品规模波动数据</div>
                </div>
              )}

              {activeTab === 2 && (
                <div style={{ padding: '32px 24px', color: '#6B7280', fontSize: '13px', textAlign: 'center' }}>
                  <div style={{ marginBottom: '8px', fontSize: '15px' }}>📋</div>
                  变更日志
                  <div style={{ marginTop: '8px', color: '#9CA3AF', fontSize: '12px' }}>暂无近期变更记录</div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div style={{ ...customStyles.panel, marginBottom: '24px' }}>
              <div style={customStyles.panelHeader}>
                <h2 style={customStyles.h2}>使用该池的组合</h2>
              </div>
              <div style={customStyles.sideList}>
                <SideItem title="首页点单推荐Tab (CMP-892)" subtitle="位置: #01, #04" />
                <SideItem title="支付后营销位 (CMP-112)" subtitle="位置: 浮层Banner" />
                <SideItem title="商详页关联推荐 (CMP-455)" subtitle="位置: 搭配购买" />
                <div style={{ textAlign: 'center', marginTop: '4px' }}>
                  <span style={{ ...customStyles.labelCaps, color: '#3B82F6', cursor: 'pointer' }}>
                    查看全部 8 个引用关系
                  </span>
                </div>
              </div>
            </div>

            <div style={customStyles.panel}>
              <div style={customStyles.panelHeader}>
                <h2 style={customStyles.h2}>近 7 日商品数波动</h2>
              </div>
              <div style={customStyles.chartContainer}>
                <ChartBar height="60%" highlight={false} />
                <ChartBar height="65%" highlight={false} />
                <ChartBar height="62%" highlight={false} />
                <ChartBar height="70%" highlight={false} />
                <ChartBar height="85%" highlight={false} />
                <ChartBar height="82%" highlight={false} />
                <ChartBar height="95%" highlight={true} />
              </div>
              <div
                style={{
                  padding: '0 24px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#6B7280',
                }}
              >
                <span>05-20</span>
                <span>今日 (142)</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background-color: #FAFAFA; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<PoolDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;