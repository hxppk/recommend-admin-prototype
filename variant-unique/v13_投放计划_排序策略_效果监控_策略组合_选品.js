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
  }
};

const TopNav = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { label: '选品池', key: 'selection' },
    { label: '排序策略', key: 'sorting' },
    { label: '策略组合', key: 'combination' },
    { label: '投放计划', key: 'delivery' },
    { label: '效果监控', key: 'monitoring' },
  ];

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
      <div style={{
        fontWeight: 600,
        fontSize: '15px',
        marginRight: '48px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '16px',
          height: '16px',
          background: '#111827',
          borderRadius: '4px',
        }}></div>
        策略后台
      </div>
      <nav style={{ display: 'flex', gap: '8px' }}>
        {navItems.map(item => (
          <a
            key={item.key}
            href="#"
            onClick={e => { e.preventDefault(); setActiveNav(item.key); }}
            style={{
              padding: '6px 12px',
              color: activeNav === item.key ? '#111827' : '#6B7280',
              textDecoration: 'none',
              fontWeight: 500,
              borderRadius: '8px',
              transition: 'all 0.2s',
              background: activeNav === item.key ? '#FAFAFA' : 'transparent',
              fontSize: '13px',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
        }}>操作人: 运营 admin</span>
      </div>
    </header>
  );
};

const TemplateCard = ({ icon, title, info, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '16px',
        border: `1px solid ${hovered ? '#3B82F6' : '#F0F0F0'}`,
        borderRadius: '8px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: hovered ? '#EFF6FF' : '#FFFFFF',
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        background: '#FAFAFA',
        borderRadius: '6px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6B7280',
      }}>
        {icon}
      </div>
      <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px', color: '#111827' }}>{title}</div>
      <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{info}</div>
    </div>
  );
};

const IllustrationBox = ({ style }) => (
  <div style={{
    width: '40px',
    height: '40px',
    border: '2px solid #E5E5E5',
    borderRadius: '4px',
    position: 'absolute',
    ...style,
  }}></div>
);

const EmptyStatePanel = ({ onAddSlot, onSelectTemplate }) => {
  const templates = [
    {
      key: 'new-product',
      title: '新品首秀模版',
      info: '前2坑强制上新，后续热销兜底',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
    {
      key: 'time-based',
      title: '分时段定序',
      info: '早中晚针对性选品池自动切换',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      key: 'promo',
      title: '大促运营版',
      info: '全人工定序，严格控制展示位',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      padding: '80px 48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
    }}>
      <div style={{
        width: '160px',
        height: '120px',
        background: '#FAFAFA',
        border: '1px dashed #E5E5E5',
        borderRadius: '12px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <IllustrationBox style={{ top: '30px', left: '40px', transform: 'rotate(-8deg)' }} />
        <IllustrationBox style={{ top: '40px', left: '80px', transform: 'rotate(12deg)', borderColor: '#3B82F6', opacity: 0.5 }} />
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#111827' }}>
        尚未配置任何坑位
      </h3>
      <p style={{ color: '#6B7280', maxWidth: '400px', marginBottom: '32px', lineHeight: '1.6', fontSize: '13px' }}>
        策略组合通过定义多个"坑位 (Slots)"及其排序规则来工作。您可以从零开始添加规则，或者选择下方推荐的模版快速开始。
      </p>

      <button
        onClick={onAddSlot}
        style={{
          padding: '12px 24px',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          border: '1px solid transparent',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s',
          background: '#1A1A1A',
          color: 'white',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#000000'}
        onMouseLeave={e => e.currentTarget.style.background = '#1A1A1A'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        添加首个坑位规则
      </button>

      <div style={{
        width: '100%',
        maxWidth: '700px',
        marginTop: '48px',
        paddingTop: '32px',
        borderTop: '1px solid #F0F0F0',
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
        }}>推荐配置模版</span>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '16px',
          marginTop: '16px',
        }}>
          {templates.map(t => (
            <TemplateCard
              key={t.key}
              icon={t.icon}
              title={t.title}
              info={t.info}
              onSelect={() => onSelectTemplate(t.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SlotItem = ({ slot, index }) => (
  <div style={{
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }}>
    <div style={{
      width: '28px',
      height: '28px',
      background: '#F0F0F0',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 600,
      color: '#374151',
      flexShrink: 0,
    }}>
      {index + 1}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: '13px', color: '#111827', marginBottom: '2px' }}>{slot.name}</div>
      <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{slot.description}</div>
    </div>
    <div style={{
      padding: '2px 10px',
      borderRadius: '9999px',
      fontSize: '11px',
      fontWeight: 500,
      background: '#EFF6FF',
      color: '#3B82F6',
    }}>
      {slot.type}
    </div>
  </div>
);

const ConfiguredPanel = ({ slots, onAddSlot }) => {
  const [addHovered, setAddHovered] = useState(false);

  return (
    <div>
      {slots.map((slot, idx) => (
        <SlotItem key={slot.id} slot={slot} index={idx} />
      ))}
      <div style={{ padding: '16px 24px' }}>
        <button
          onClick={onAddSlot}
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            border: `1px solid ${addHovered ? '#6B7280' : '#F0F0F0'}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
            background: '#FFFFFF',
            color: '#111827',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          添加坑位规则
        </button>
      </div>
    </div>
  );
};

const PreviewPanel = ({ slots }) => {
  const hasSlots = slots.length > 0;

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #F0F0F0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
      overflow: 'hidden',
      opacity: hasSlots ? 1 : 0.6,
      filter: hasSlots ? 'none' : 'grayscale(0.2)',
      pointerEvents: hasSlots ? 'auto' : 'none',
    }}>
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #F0F0F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>预览</h2>
      </div>

      {!hasSlots ? (
        <div style={{
          padding: '48px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: '#9CA3AF',
          height: '400px',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.3 }}>
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>配置坑位后即可查看模拟预览</div>
        </div>
      ) : (
        <div style={{ padding: '16px 24px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
            marginBottom: '12px',
          }}>模拟展示位</div>
          {slots.map((slot, idx) => (
            <div key={slot.id} style={{
              padding: '12px',
              background: '#FAFAFA',
              borderRadius: '8px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: '#E5E5E5',
                borderRadius: '4px',
                flexShrink: 0,
              }}></div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>坑位 {idx + 1}</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{slot.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid #F0F0F0',
        background: '#FAFAFA',
        opacity: 0.5,
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
          marginBottom: '8px',
        }}>组合引用状态</div>
        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
          {hasSlots ? `已配置 ${slots.length} 个坑位，尚未发布` : '当前为草稿，暂无任何关联依赖'}
        </div>
      </div>
    </div>
  );
};

const AddSlotModal = ({ isOpen, onClose, onConfirm }) => {
  const [slotName, setSlotName] = useState('');
  const [slotDesc, setSlotDesc] = useState('');
  const [slotType, setSlotType] = useState('热销');

  const handleConfirm = () => {
    if (!slotName.trim()) return;
    onConfirm({ name: slotName, description: slotDesc, type: slotType });
    setSlotName('');
    setSlotDesc('');
    setSlotType('热销');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    }} onClick={onClose}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '32px',
        width: '440px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: '#111827' }}>
          添加坑位规则
        </h2>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
            坑位名称 <span style={{ color: '#E57373' }}>*</span>
          </label>
          <input
            value={slotName}
            onChange={e => setSlotName(e.target.value)}
            placeholder="例如：首坑强制上新"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${slotName ? '#F0F0F0' : '#F0F0F0'}`,
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
              color: '#111827',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
            描述
          </label>
          <input
            value={slotDesc}
            onChange={e => setSlotDesc(e.target.value)}
            placeholder="简要描述此坑位的用途"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #F0F0F0',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
              color: '#111827',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '12px', fontWeight: 500, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
            类型
          </label>
          <select
            value={slotType}
            onChange={e => setSlotType(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #F0F0F0',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
              color: '#111827',
              background: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <option>热销</option>
            <option>上新</option>
            <option>人工定序</option>
            <option>智能推荐</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid #F0F0F0',
              background: '#FFFFFF',
              color: '#111827',
              transition: 'all 0.2s',
            }}
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid transparent',
              background: slotName.trim() ? '#1A1A1A' : '#9CA3AF',
              color: 'white',
              transition: 'all 0.2s',
            }}
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  );
};

const templateSlots = {
  'new-product': [
    { id: 1, name: '首坑强制上新', description: '优先展示7天内新品', type: '上新' },
    { id: 2, name: '次坑强制上新', description: '第二位展示新品备选', type: '上新' },
    { id: 3, name: '热销兜底', description: '其余坑位热销自动填充', type: '热销' },
  ],
  'time-based': [
    { id: 1, name: '早间选品池', description: '08:00-12:00 早间推荐', type: '智能推荐' },
    { id: 2, name: '午间选品池', description: '12:00-18:00 午间推荐', type: '智能推荐' },
    { id: 3, name: '晚间选品池', description: '18:00-24:00 晚间推荐', type: '智能推荐' },
  ],
  'promo': [
    { id: 1, name: '大促爆款位', description: '人工指定，优先级最高', type: '人工定序' },
    { id: 2, name: '活动专区位', description: '大促活动商品严格管控', type: '人工定序' },
    { id: 3, name: '品牌合作位', description: '品牌合作商品固定展示', type: '人工定序' },
    { id: 4, name: '清仓尾品位', description: '促销清仓商品兜底', type: '人工定序' },
  ],
};

const NewCombinationPage = () => {
  const [slots, setSlots] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('combination');
  const [saved, setSaved] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);

  const handleAddSlot = () => setModalOpen(true);

  const handleConfirmAdd = (slotData) => {
    const newSlot = {
      id: Date.now(),
      ...slotData,
    };
    setSlots(prev => [...prev, newSlot]);
    setModalOpen(false);
    setSaved(false);
  };

  const handleSelectTemplate = (templateKey) => {
    const templateData = templateSlots[templateKey];
    if (templateData) {
      setSlots(templateData.map((s, i) => ({ ...s, id: Date.now() + i })));
      setSaved(false);
    }
  };

  const handleSave = () => {
    if (slots.length === 0) return;
    setSaved(true);
  };

  const handleCancel = () => {
    setSlots([]);
    setSaved(false);
  };

  const hasSlots = slots.length > 0;

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", background: '#FAFAFA', color: '#111827', fontSize: '13px', lineHeight: 1.5, WebkitFontSmoothing: 'antialiased', minHeight: '100vh' }}>
      <TopNav activeNav={activeNav} setActiveNav={setActiveNav} />

      <main style={{
        padding: '32px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#6B7280',
            }}>
              <span>策略组合</span>
              <span>/</span>
              <span style={{ color: '#111827' }}>新建组合</span>
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              未命名策略组合 (ID: NEW-000)
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleCancel}
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                border: `1px solid ${cancelHovered ? '#6B7280' : '#F0F0F0'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                background: '#FFFFFF',
                color: '#111827',
              }}
            >
              取消
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: hasSlots ? 'pointer' : 'not-allowed',
                border: '1px solid transparent',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                background: saved ? '#52A068' : '#1A1A1A',
                color: 'white',
                opacity: hasSlots ? 1 : 0.5,
              }}
            >
              {saved ? '已保存 ✓' : '保存配置'}
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '24px',
          alignItems: 'start',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #F0F0F0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #F0F0F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>坑位编排 (Slots)</h2>
              <span style={{
                padding: '2px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 500,
                color: '#6B7280',
                background: '#F0F0F0',
              }}>
                {hasSlots ? `已配置 ${slots.length} 个坑位` : '待配置'}
              </span>
            </div>

            {!hasSlots ? (
              <EmptyStatePanel onAddSlot={handleAddSlot} onSelectTemplate={handleSelectTemplate} />
            ) : (
              <ConfiguredPanel slots={slots} onAddSlot={handleAddSlot} />
            )}
          </div>

          <PreviewPanel slots={slots} />
        </div>
      </main>

      <AddSlotModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />
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
        <Route path="/" element={<NewCombinationPage />} />
        <Route path="*" element={<NewCombinationPage />} />
      </Routes>
    </Router>
  );
};

export default App;