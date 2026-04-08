# Design System Tokens (Variant - Design Sync 风格)

来源：Variant.com 生成的 6 个深色管理后台设计方案

## Colors

### Backgrounds
- `--bg-master`: #271418 (侧边栏，带暖色调的深色)
- `--bg-detail`: #151515 (主内容区背景)
- `--bg-card`: #222222 (卡片/面板背景)
- `--bg-card-hover`: #2A2A2A (卡片 hover 态)
- `--bg-action-btn`: rgba(255, 255, 255, 0.06) (按钮默认)
- `--bg-action-btn-hover`: rgba(255, 255, 255, 0.1) (按钮 hover)

### Text
- `--text-primary`: #FFFFFF (标题/主要文字)
- `--text-secondary`: rgba(255, 255, 255, 0.45) (正文/辅助)
- `--text-tertiary`: rgba(255, 255, 255, 0.25) (最弱辅助文字)

### Accent
- `--accent-gradient`: linear-gradient(90deg, #4A4DFF 0%, #E91E63 50%, #FF9800 100%) (渐变强调色)
- 主色提取：蓝紫 #4A4DFF / 品红 #E91E63 / 橙色 #FF9800

### Status
- `--badge-bg`: #333333 (标签底色)
- Active: 绿色或主色
- Training/Testing: 橙色
- Draft: 灰色

## Typography
- 字体栈: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- 默认字号: 14px
- 抗锯齿: `-webkit-font-smoothing: antialiased`

## Border Radius
- `--radius-lg`: 12px (大面板/卡片)
- `--radius-md`: 10px (按钮/输入框)
- `--radius-sm`: 8px (标签/小组件)

## Layout
- 侧边栏（Master）: 320px 宽，#271418 背景
- 主内容区（Detail）: flex-grow，#151515 背景
- 分隔: 1px solid rgba(0,0,0,0.5)

## 风格特点
- 暖色深色主题（侧边栏带红棕色调 #271418，不是纯黑）
- 渐变强调色（蓝→品红→橙），视觉冲击力强
- 圆角偏大（8-12px），现代 SaaS 感
- 系统字体栈（SF Pro / Segoe UI），不加载外部字体
- 半透明文字层次（0.45 / 0.25 opacity）

## 参考文件
- variant-view-1.html (611行) — 左侧列表 + 右侧详情 + Activity Log
- variant-view-2.html (382行) — 参与者网格 + 聊天面板
- variant-view-3.html (441行) — 参与者列表 + 弹窗表单
- variant-view-4.html (631行) — 参与者注册表 + 数据表格
