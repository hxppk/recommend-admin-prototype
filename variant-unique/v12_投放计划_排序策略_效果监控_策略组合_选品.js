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

const TopNav = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { label: '选品池', key: 'products' },
    { label: '排序策略', key: 'sort' },
    { label: '策略组合', key: 'combo' },
    { label: '投放计划', key: 'plan' },
    { label: '效果监控', key: 'monitor' },
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
            onClick={(e) => { e.preventDefault(); setActiveNav(item.key); }}
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

const Tag = ({ children, variant, style }) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    gap: '4px',
  };
  const variants = {
    green: { background: '#52A068', color: 'white', padding: '4px 10px' },
    greenSm: { background: '#52A068', color: 'white', padding: '2px 6px', fontSize: '10px' },
  };
  return (
    <span style={{ ...base, ...(variants[variant] || {}), ...style }}>
      {children}
    </span>
  );
};

const Panel = ({ children, style }) => (
  <div style={{
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F0F0F0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    marginBottom: '24px',
    ...style,
  }}>
    {children}
  </div>
);

const PanelHeader = ({ children }) => (
  <div style={{
    padding: '16px 24px',
    borderBottom: '1px solid #F0F0F0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    {children}
  </div>
);

const ProgressBar = ({ percent, color }) => (
  <div>
    <div style={{
      height: '6px',
      background: '#FAFAFA',
      borderRadius: '3px',
      overflow: 'hidden',
      width: '100%',
    }}>
      <div style={{
        height: '100%',
        width: `${percent}%`,
        background: color || '#3B82F6',
        borderRadius: '3px',
      }}></div>
    </div>
    <div style={{
      fontSize: '11px',
      marginTop: '4px',
      color: '#6B7280',
      fontVariantNumeric: 'tabular-nums',
    }}>{percent.toFixed(1)}%</div>
  </div>
);

const TimeSlot = ({ label, value }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    background: '#FAFAFA',
    borderRadius: '6px',
    marginBottom: '8px',
    fontSize: '13px',
  }}>
    <span style={{ color: '#6B7280' }}>{label}</span>
    <span style={{ fontWeight: 500 }}>{value}</span>
  </div>
);

const InfoCard = ({ children, style }) => (
  <div style={{
    border: '1px solid #F0F0F0',
    borderRadius: '8px',
    padding: '16px',
    ...style,
  }}>
    {children}
  </div>
);

const AudienceTag = ({ children, style }) => (
  <span style={{
    display: 'inline-flex',
    background: '#F5F3FF',
    color: '#8B5CF6',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    margin: '0 4px 4px 0',
    ...style,
  }}>
    {children}
  </span>
);

const ABExperimentPanel = () => {
  const experiments = [
    {
      group: '实验组 A',
      stratName: '首页点单推荐Tab组合 (CMP-892)',
      stratDetail: '包含: 早鸟必点、全店热销、本周上新',
      percent: 50,
      weight: 50,
      barColor: '#3B82F6',
    },
    {
      group: '对照组 B',
      stratName: '标准默认排序组合 (CMP-001)',
      stratDetail: '包含: 全量默认排序',
      percent: 50,
      weight: 50,
      barColor: '#E5E5E5',
    },
  ];

  return (
    <Panel>
      <PanelHeader>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>AB 实验分流配置</h2>
        <span style={{
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#3B82F6',
        }}>VID: 102 (Active)</span>
      </PanelHeader>
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 120px 80px',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          borderBottom: '1px solid #F0F0F0',
          background: '#FAFAFA',
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
        }}>
          <div>组别</div>
          <div>关联策略组合</div>
          <div>流量比例</div>
          <div>权重</div>
        </div>
        {experiments.map((exp, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 120px 80px',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            borderBottom: i < experiments.length - 1 ? '1px solid #F0F0F0' : 'none',
            fontSize: '13px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#111827',
            }}>{exp.group}</div>
            <div>
              <div style={{ fontSize: '13px', color: '#111827' }}>{exp.stratName}</div>
              <div style={{
                fontSize: '10px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#6B7280',
                marginTop: '2px',
              }}>{exp.stratDetail}</div>
            </div>
            <ProgressBar percent={exp.percent} color={exp.barColor} />
            <div style={{ fontVariantNumeric: 'tabular-nums' }}>{exp.weight}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

const SchedulingPanel = () => (
  <Panel>
    <PanelHeader>
      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>投放时段与频率管控 (Scheduling)</h2>
    </PanelHeader>
    <div style={{ padding: '24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
      }}>
        <div>
          <span style={{
            display: 'block',
            marginBottom: '12px',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>生效周期时段</span>
          <TimeSlot label="每周六, 周日" value="08:00 - 22:00" />
          <TimeSlot label="特殊节日" value="全天 (24h)" />
        </div>
        <div>
          <span style={{
            display: 'block',
            marginBottom: '12px',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>频次管控 (Capping)</span>
          <InfoCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
              <span>单用户展示上限</span>
              <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>5 次 / 天</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>曝光冷冻期</span>
              <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>30 分钟</span>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  </Panel>
);

const AudiencePanel = () => (
  <Panel>
    <PanelHeader>
      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>目标人群 (Audience)</h2>
    </PanelHeader>
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
        }}>定向维度</span>
        <div>
          <AudienceTag>高频消费人群</AudienceTag>
          <AudienceTag>新晋会员</AudienceTag>
          <AudienceTag>地域: 华东/华南区</AudienceTag>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '11px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
        }}>排除维度</span>
        <div>
          <AudienceTag style={{ background: '#FFF1F2', color: '#E11D48' }}>黑名单用户</AudienceTag>
          <AudienceTag style={{ background: '#FFF1F2', color: '#E11D48' }}>14天未登录</AudienceTag>
        </div>
      </div>
      <div style={{
        background: '#FAFAFA',
        borderRadius: '8px',
        padding: '16px',
        border: 'none',
      }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#6B7280',
        }}>人群画像匹配度</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#8B5CF6' }}>High</span>
          <span style={{ color: '#6B7280', fontVariantNumeric: 'tabular-nums', fontSize: '13px' }}>88.4%</span>
        </div>
      </div>
    </div>
  </Panel>
);

const ResourcePanel = () => (
  <Panel>
    <PanelHeader>
      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>投放资源位</h2>
    </PanelHeader>
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
          <span>首页 - 点单页Tab</span>
          <Tag variant="greenSm">Main</Tag>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6, fontSize: '13px' }}>
          <span>发现页 - 精选推荐</span>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>未开启</span>
        </div>
      </div>
    </div>
  </Panel>
);

const PlanDetailPage = () => {
  const [showOfflineConfirm, setShowOfflineConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
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
            <span>投放计划</span>
            <span>/</span>
            <span style={{ color: '#111827' }}>计划详情</span>
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em', color: '#111827' }}>
            周末促销Plan A (ID: PLN-4202)
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowOfflineConfirm(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid #F0F0F0',
              background: '#FFFFFF',
              color: '#111827',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            下线计划
          </button>
          <button
            onClick={() => setShowEditModal(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid transparent',
              background: '#1A1A1A',
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            编辑计划
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '48px',
        paddingBottom: '24px',
        borderBottom: '1px solid #F0F0F0',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>当前状态</span>
          <span style={{ marginTop: '4px' }}>
            <Tag variant="green">投放中</Tag>
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>覆盖用户(预估)</span>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>125,400</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>AB实验组数</span>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>2 组</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: 'auto', textAlign: 'right' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
          }}>计划周期</span>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>2023-10-20 ~ 2023-11-20</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '24px',
        alignItems: 'start',
      }}>
        <div>
          <ABExperimentPanel />
          <SchedulingPanel />
        </div>
        <div>
          <AudiencePanel />
          <ResourcePanel />
        </div>
      </div>

      {showOfflineConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowOfflineConfirm(false)}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#111827' }}>确认下线计划?</h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6 }}>
              下线后，计划将立即停止投放。已进行中的实验数据将被保留。
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowOfflineConfirm(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid #F0F0F0',
                  background: '#FFFFFF',
                  color: '#111827',
                }}
              >
                取消
              </button>
              <button
                onClick={() => setShowOfflineConfirm(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid transparent',
                  background: '#E11D48',
                  color: 'white',
                }}
              >
                确认下线
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowEditModal(false)}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '480px',
            width: '90%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: '#111827' }}>编辑计划</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#6B7280',
                  marginBottom: '8px',
                }}>计划名称</label>
                <input
                  defaultValue="周末促销Plan A"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#111827',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#6B7280',
                  marginBottom: '8px',
                }}>覆盖用户(预估)</label>
                <input
                  defaultValue="125400"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#111827',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid #F0F0F0',
                  background: '#FFFFFF',
                  color: '#111827',
                }}
              >
                取消
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid transparent',
                  background: '#1A1A1A',
                  color: 'white',
                }}
              >
                保存更改
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const App = () => {
  const [activeNav, setActiveNav] = useState('plan');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #FAFAFA;
        color: #111827;
        font-size: 13px;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#FAFAFA' }}>
        <TopNav activeNav={activeNav} setActiveNav={setActiveNav} />
        <Routes>
          <Route path="/" element={<PlanDetailPage />} />
          <Route path="*" element={<PlanDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;