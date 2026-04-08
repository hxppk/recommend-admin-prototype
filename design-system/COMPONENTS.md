# 组件规范 — 推荐系统运营管理后台

> 所有组件状态定义基于 Variant 导出的视觉稿提取，开发时严格遵循。

---

## 1. Button 按钮

### 变体
| 变体 | 背景 | 边框 | 文字色 | 场景 |
|------|------|------|--------|------|
| Primary | `--btn-primary` #1A1A1A | 无 | white | 主操作：保存、发布 |
| Secondary | `--surface` #FFF | `--border` #F0F0F0 | `--text-main` | 次操作：取消、替换 |
| Dashed | `--surface` | dashed `--border` | `--text-label` | 添加区域：+ 添加坑位 |

### 交互状态
| 状态 | Primary | Secondary |
|------|---------|-----------|
| Default | bg #1A1A1A | bg #FFF, border #F0F0F0 |
| Hover | bg #000000 | border #6B7280 |
| Active | bg #000, scale(0.98) | bg #FAFAFA |
| Disabled | bg #9CA3AF, cursor: not-allowed | bg #FAFAFA, text #9CA3AF |

### 尺寸
| 尺寸 | padding | font-size |
|------|---------|-----------|
| Default | 8px 16px | 13px |
| Small | 4px 10px | 12px |
| Mini | 4px 8px | 11px |

圆角：`--radius-pill` (9999px)，所有按钮均为胶囊形。

---

## 2. Tag 标签

### 语义标签（排序方式）
| 类型 | 文字色 | 背景色 | 圆点色 | 文字 |
|------|--------|--------|--------|------|
| Hot 热销 | `--color-orange` | `--color-orange-bg` | `--color-orange` | 热销模型 Hot |
| New 新品 | `--color-blue` | `--color-blue-bg` | `--color-blue` | 新品曝光 New |
| Manual 人工 | `--color-purple` | `--color-purple-bg` | `--color-purple` | 人工定序 Manual |

结构：6px 圆点 `::before` + 文字，padding 2px 8px，圆角 pill。

### 状态标签
| 类型 | 样式 |
|------|------|
| 投放中 | bg `--color-green`, color white, font-weight 600 |
| 草稿 | bg #F3F4F6, color `--text-label` |
| 已暂停 | bg `--color-orange-bg`, color `--color-orange` |
| 已结束 | bg #F3F4F6, color `--text-muted`, border 1px |

---

## 3. Panel 面板/卡片

```
background: var(--surface);
border-radius: var(--radius-panel);  /* 12px */
border: 1px solid var(--border);
box-shadow: var(--shadow-sm);
overflow: hidden;
```

### Panel Header
- padding: 16px 24px
- border-bottom: 1px solid `--border`
- flex, space-between, align-center

### 交互状态（可点击卡片）
| 状态 | 变化 |
|------|------|
| Default | border #F0F0F0, shadow-sm |
| Hover | border #E5E5E5, shadow-md |
| Selected | border `--color-blue`, shadow-md |

---

## 4. Slot Item 坑位行

```
border: 1px solid var(--border);
border-radius: var(--radius-element);  /* 8px */
padding: 12px 16px;
grid: 24px 60px 2fr 1.5fr 1fr auto;
```

### 交互状态
| 状态 | 变化 |
|------|------|
| Default | border #F0F0F0 |
| Hover | border #E5E5E5, shadow-md, z-index: 2 |
| Dragging | shadow-float, opacity 0.9, scale(1.02) |
| Drag Over | 上方出现 2px `--color-blue` 插入线 |

---

## 5. Nav Link 导航项

```
padding: 6px 12px;
font-weight: 500;
border-radius: var(--radius-element);
```

### 交互状态
| 状态 | 文字色 | 背景 |
|------|--------|------|
| Default | `--text-label` #6B7280 | transparent |
| Hover | `--text-main` #111827 | `--bg` #FAFAFA |
| Active (当前页) | `--text-main` | `--bg` |

---

## 6. Tab 选项卡

```
padding: 12px 0;
font-weight: 500;
border-bottom: 2px solid transparent;
```

### 交互状态
| 状态 | 文字色 | 底边线 |
|------|--------|--------|
| Default | `--text-label` | transparent |
| Hover | `--text-secondary` | #E5E5E5 |
| Active | `--text-main` | `--text-main` #111827 |

---

## 7. Table 表格

### 表头
```css
font-size: 11px;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.04em;
color: var(--text-label);
padding: 0 16px 8px;
border-bottom: 1px solid var(--border);
```

### 表格行
| 状态 | 变化 |
|------|------|
| Default | bg transparent |
| Hover | bg #FAFAFA |
| Selected | bg `--color-blue-bg` #EFF6FF |
| 冲突行 | bg `--color-orange-bg` + ⚠️ 图标 |

---

## 8. Input 输入框

```
padding: 8px 12px;
border: 1px solid var(--border);
border-radius: var(--radius-element);
font-size: 13px;
```

### 交互状态
| 状态 | 边框色 | 附加效果 |
|------|--------|----------|
| Default | #F0F0F0 | — |
| Hover | #E5E5E5 | — |
| Focus | `--color-blue` | box-shadow: 0 0 0 3px rgba(59,130,246,0.1) |
| Error | `--color-red` | box-shadow: 0 0 0 3px rgba(229,115,115,0.1) |
| Disabled | #F0F0F0 | bg #FAFAFA, color #9CA3AF |

---

## 9. Dropdown 下拉选择器

基于 Input 样式，附加：
- 右侧 chevron-down 图标（`--text-muted`）
- 展开面板：bg `--surface`, shadow-float, border-radius `--radius-element`
- 选项 hover：bg `--bg`
- 选项 selected：bg `--color-blue-bg`, 文字 `--color-blue`
- 支持搜索框内嵌

---

## 10. Toggle Switch 开关

| 状态 | 轨道 | 圆点 |
|------|------|------|
| Off | #E5E5E5 | white, shadow-sm |
| Off + Hover | #D1D5DB | white |
| On | `--color-green` | white, shadow-sm |
| On + Hover | #3F8A56 | white |
| Disabled | #F3F4F6 | #E5E5E5 |

尺寸：轨道 36x20px，圆点 16px。

---

## 11. Metric Card 指标卡片

```
display: flex;
flex-direction: column;
gap: 4px;
```

- 标签：`.label-caps`（11px, uppercase, letter-spacing 0.04em, `--text-label`）
- 数值：20px, font-weight 600, `--text-main`
- 辅助信息：12px, `--color-green`（正向）或 `--color-red`（负向）

---

## 12. Mobile Preview Frame 手机预览框

```
width: 280px;
height: 500px;
border-radius: 24px;
border: 4px solid var(--border);
box-shadow: var(--shadow-float);
padding: 16px 12px;
```

坑位角标：绝对定位右上角，圆角 4px，9px monospace 白字。
- #1: `--color-purple`
- #2: `--color-orange`
- #3: `--color-blue`

---

## 13. Breadcrumb 面包屑

```
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.04em;
color: var(--text-label);
```

分隔符 `/`，当前页 color `--text-main`。

---

## Typography 排版规则

| 类名 | 大小 | 重量 | 用途 |
|------|------|------|------|
| .h1 | 18px | 600 | 页面标题 |
| .h2 | 14px | 600 | 面板标题 |
| .label-caps | 11px | 500, uppercase, ls 0.04em | 表头、标签 |
| .num | tabular-nums | — | 数字对齐 |
| body | 13px | 400 | 正文 |

字体：`'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

---

## 全局过渡

所有可交互元素统一 `transition: all 0.2s`。
