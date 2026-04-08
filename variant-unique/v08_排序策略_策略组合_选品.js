import React, { useState, useEffect } from 'react';

const customStyles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    filter: 'blur(4px)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: '#FAFAFA',
    color: '#111827',
    fontSize: '13px',
    lineHeight: '1.5',
    WebkitFontSmoothing: 'antialiased',
    overflow: 'hidden',
  },
  topNav: {
    background: '#FFFFFF',
    borderBottom: '1px solid #F0F0F0',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    height: '64px',
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
    background: '#1A1A1A',
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
    cursor: 'pointer',
  },
  navLinkActive: {
    padding: '6px 12px',
    color: '#111827',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: '8px',
    background: '#FAFAFA',
    cursor: 'pointer',
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
  h1: {
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  summaryStrip: {
    display: 'flex',
    gap: '48px',
    paddingBottom: '24px',
    borderBottom: '1px solid #F0F0F0',
  },
  labelCaps: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#6B7280',
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
    height: '200px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: '13px',
  },
  modalContainer: {
    background: '#FFFFFF',
    width: '860px',
    maxHeight: '90vh',
    borderRadius: '16px',
    boxShadow: '0 20px 48px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '20px 24px',
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
  modalBody: {
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    overflow: 'hidden',
  },
  configSection: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    borderRight: '1px solid #F0F0F0',
    overflowY: 'auto',
  },
  previewSection: {
    padding: '24px',
    background: '#FAFAFA',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  formLabel: {
    fontWeight: 600,
    fontSize: '12px',
    color: '#374151',
  },
  inputSelect: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #F0F0F0',
    background: '#FFFFFF',
    fontSize: '13px',
    color: '#111827',
    outline: 'none',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  typeCard: {
    padding: '16px',
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  typeCardActive: {
    padding: '16px',
    border: '1px solid #1A1A1A',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: '#F9F9F9',
    boxShadow: 'inset 0 0 0 1px #1A1A1A',
  },
  typeCardDesc: {
    fontSize: '11px',
    color: '#6B7280',
    lineHeight: '1.4',
  },
  tagHot: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    color: '#F59E0B',
    background: '#FFFBEB',
    alignSelf: 'flex-start',
  },
  tagNew: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    color: '#3B82F6',
    background: '#EFF6FF',
    alignSelf: 'flex-start',
  },
  tagManual: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
    color: '#8B5CF6',
    background: '#F5F3FF',
    alignSelf: 'flex-start',
  },
  tagDot: {
    display: 'block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  btnPrimary: {
    padding: '10px 20px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s',
    background: '#1A1A1A',
    color: 'white',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  btnSecondary: {
    padding: '10px 20px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid #F0F0F0',
    transition: 'all 0.2s',
    background: '#FFFFFF',
    color: '#111827',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  modalFooter: {
    padding: '16px 24px',
    borderTop: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  previewCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #F0F0F0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  previewItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  previewImg: {
    width: '40px',
    height: '40px',
    background: '#F3F4F6',
    borderRadius: '4px',
    flexShrink: 0,
  },
  previewText: {
    flex: 1,
  },
  pLine1: {
    height: '8px',
    background: '#E5E7EB',
    borderRadius: '4px',
    width: '70%',
    marginBottom: '6px',
  },
  pLine2: {
    height: '6px',
    background: '#F3F4F6',
    borderRadius: '4px',
    width: '40%',
  },
};

const TagDot = ({ color }) => (
  <span style={{ ...customStyles.tagDot, background: color }} />
);

const TypeCard = ({ tag, tagStyle, description, isActive, onClick }) => (
  <div
    style={isActive ? customStyles.typeCardActive : customStyles.typeCard}
    onClick={onClick}
  >
    <span style={tagStyle}>
      <TagDot color={
        tagStyle === customStyles.tagHot ? '#F59E0B' :
        tagStyle === customStyles.tagNew ? '#3B82F6' : '#8B5CF6'
      } />
      {tag}
    </span>
    <span style={customStyles.typeCardDesc}>{description}</span>
  </div>
);

const PreviewItem = ({ opacity }) => (
  <div style={{ ...customStyles.previewItem, opacity: opacity || 1 }}>
    <div style={customStyles.previewImg}></div>
    <div style={customStyles.previewText}>
      <div style={customStyles.pLine1}></div>
      <div style={customStyles.pLine2}></div>
    </div>
  </div>
);

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [activeType, setActiveType] = useState('hot');
  const [selectedPool, setSelectedPool] = useState('Q4 午餐新品池 (ID: P-901)');
  const [selectedFallback, setSelectedFallback] = useState('当池内不足时：展示"猜你喜欢"兜底');
  const [weight, setWeight] = useState(0.8);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { overflow: hidden; }
      input[type=range] { accent-color: #1A1A1A; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const typeCards = [
    {
      id: 'hot',
      tag: '热销模型',
      tagStyle: customStyles.tagHot,
      description: '基于近期销量与转化率自动计算排序。',
    },
    {
      id: 'new',
      tag: '新品曝光',
      tagStyle: customStyles.tagNew,
      description: '优先展示指定日期内上架的新品。',
    },
    {
      id: 'manual',
      tag: '人工定序',
      tagStyle: customStyles.tagManual,
      description: '根据运营手动填写的序列进行展示。',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", fontSize: '13px', lineHeight: '1.5', color: '#111827', WebkitFontSmoothing: 'antialiased' }}>
      {/* Background App */}
      <div style={customStyles.appContainer}>
        <header style={customStyles.topNav}>
          <div style={customStyles.logo}>
            <div style={customStyles.logoMark}></div>
            策略后台
          </div>
          <nav style={customStyles.navLinks}>
            <a href="#" style={customStyles.navLink}>选品池</a>
            <a href="#" style={customStyles.navLink}>排序策略</a>
            <a href="#" style={customStyles.navLinkActive}>策略组合</a>
          </nav>
        </header>
        <main style={customStyles.mainContent}>
          <div style={customStyles.pageHeader}>
            <h1 style={customStyles.h1}>首页点单推荐Tab组合 (ID: CMP-892)</h1>
          </div>
          <div style={customStyles.summaryStrip}>
            <div>
              <div style={customStyles.labelCaps}>已配置坑位</div>
              <div style={{ fontVariantNumeric: 'tabular-nums', fontSize: '13px' }}>6 / 10</div>
            </div>
          </div>
          <div style={customStyles.editorLayout}>
            <div style={customStyles.panel}></div>
            <div style={customStyles.panel}></div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={customStyles.modalOverlay}>
          <div style={customStyles.modalContainer}>
            {/* Modal Header */}
            <div style={customStyles.modalHeader}>
              <h2 style={customStyles.h2}>配置新坑位规则</h2>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: '#9CA3AF', cursor: 'pointer' }}
                onClick={() => setIsModalOpen(false)}
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>

            {/* Modal Body */}
            <div style={customStyles.modalBody}>
              {/* Config Section */}
              <div style={customStyles.configSection}>
                {/* Step 1 */}
                <div style={customStyles.formGroup}>
                  <span style={customStyles.formLabel}>1. 选择排序策略类型</span>
                  <div style={customStyles.typeGrid}>
                    {typeCards.map((card) => (
                      <TypeCard
                        key={card.id}
                        tag={card.tag}
                        tagStyle={card.tagStyle}
                        description={card.description}
                        isActive={activeType === card.id}
                        onClick={() => setActiveType(card.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div style={customStyles.formGroup}>
                  <span style={customStyles.formLabel}>2. 关联选品池</span>
                  <select
                    style={customStyles.inputSelect}
                    value={selectedPool}
                    onChange={(e) => setSelectedPool(e.target.value)}
                  >
                    <option>Q4 午餐新品池 (ID: P-901)</option>
                    <option>全量热销商品池 (ID: P-001)</option>
                    <option>折扣促销池 (ID: P-442)</option>
                  </select>
                </div>

                {/* Step 3 */}
                <div style={customStyles.formGroup}>
                  <span style={customStyles.formLabel}>3. 配置兜底规则</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                      style={customStyles.inputSelect}
                      value={selectedFallback}
                      onChange={(e) => setSelectedFallback(e.target.value)}
                    >
                      <option>当池内不足时：展示"猜你喜欢"兜底</option>
                      <option>当池内不足时：展示"门店热搜"兜底</option>
                      <option>不兜底：空位占位</option>
                    </select>
                  </div>
                </div>

                {/* Step 4 */}
                <div style={customStyles.formGroup}>
                  <span style={customStyles.formLabel}>4. 权重系数 (0.1 - 1.0)</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#1A1A1A' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280' }}>
                    <span>低优先级</span>
                    <span style={{ color: '#111827' }}>当前值: {weight.toFixed(1)}</span>
                    <span>高优先级</span>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div style={customStyles.previewSection}>
                <span style={customStyles.labelCaps}>策略输出预览</span>
                <div style={customStyles.previewCard}>
                  <div style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px' }}>
                    预期生效坑位 #04
                  </div>
                  <PreviewItem />
                  <PreviewItem />
                  <PreviewItem opacity={0.4} />
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #F0F0F0', fontSize: '11px', color: '#52A068' }}>
                    ● 预计匹配 12 个商品
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '12px', border: '1px solid #F0F0F0' }}>
                  <span style={{ ...customStyles.labelCaps, display: 'block', marginBottom: '6px' }}>逻辑校验</span>
                  <div style={{ fontSize: '11px', color: '#6B7280', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#52A068', marginTop: '2px', flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    选品池与当前人群包匹配度高 (98%)
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={customStyles.modalFooter}>
              <button style={customStyles.btnSecondary} onClick={() => setIsModalOpen(false)}>
                取消
              </button>
              <button style={customStyles.btnPrimary} onClick={() => setIsModalOpen(false)}>
                确认绑定到 #04 坑位
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;