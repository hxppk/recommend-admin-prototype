# Codex Task: 推荐系统运营管理后台

## ⚠️ 第一步：使用 Paper MCP 在 Paper 中创建项目

在开始写代码前，先调用 Paper MCP 工具在 Paper 中创建一个新的 Vite + React 项目：
- 项目名称：`recommend-admin`
- 框架：React + TypeScript
- 构建工具：Vite
- 在 Paper 中完成项目初始化后，再进行后续开发

---

## 项目概述

为茶百道搭建**推荐系统运营管理后台**的前端原型（纯前端 Mock 数据，无后端）。

运营人员通过这个后台配置小程序点单页的商品推荐策略，核心是四层架构：
- **选品池** → 定义哪些商品有资格被推荐
- **排序策略** → 定义候选商品按什么规则排序
- **策略组合** → 编排页面上有几个坑位、每个坑位用什么策略
- **投放计划** → 控制何时上线、投给谁

---

## 项目文件结构

```
/推荐系统运营管理后台/
├── README.md                                    ← 完整的 10 页前端开发 Spec（必读）
├── PROMPT.md                                    ← 本文件
├── design-system/
│   ├── tokens.css                               ← CSS 变量（颜色/间距/圆角/投影/字号）
│   ├── COMPONENTS.md                            ← 13 个组件的交互状态规范（必读）
│   └── variant-source.html                      ← Variant 导出的原始 HTML，视觉基准参考
├── variant-export/
│   └── StrategyCombinationEditor.jsx            ← Variant 导出的 React 组件（策略组合编辑页）
└── docs/
    └── PRD.pdf                                  ← 产品需求文档（参考）
```

---

## 开发要求

### 1. 技术栈
- **Vite + React + TypeScript**
- **CSS Modules** 或 **styled-components**（不用 Ant Design / Arco Design，完全自定义组件）
- **React Router v6** 路由
- **dnd-kit** 拖拽（坑位排序、人工定序）
- **Recharts** 图表（效果监控页）

### 2. 设计规范
- **必须严格遵循** `design-system/tokens.css` 中的 CSS 变量
- **必须严格遵循** `design-system/COMPONENTS.md` 中的组件交互状态
- 所有可交互元素必须有 hover / active / disabled 状态
- 视觉风格以 `variant-export/StrategyCombinationEditor.jsx` 为基准

### 3. 已有组件
- `variant-export/StrategyCombinationEditor.jsx` 是 Variant AI 导出的策略组合编辑页
- **先将其拆解为可复用组件**（Button, Tag, Panel, SlotItem, MetricCard, Tab, MobilePreview 等）
- 其他页面基于这些复用组件构建，确保全站视觉一致

### 4. 路由结构
```
/                    → 重定向到 /combinations
/pools               → 选品池列表
/pools/:id           → 选品池详情
/strategies          → 排序策略列表
/strategies/:id/edit → 排序策略编辑
/combinations        → 策略组合列表
/combinations/:id    → 策略组合编辑（已有 Variant 导出）
/plans               → 投放计划列表
/plans/:id/edit      → 投放计划编辑
/dashboard           → 效果监控
/preview             → 全链路预览
```

### 5. Mock 数据
使用茶百道商品和成都门店数据，让 Demo 真实可演示：

**商品：**
- 奶茶：豆乳玉麒麟、茉莉奶绿、芋圆奶茶、黑糖珍珠奶茶
- 果茶：多肉葡萄、超级杯水果茶、满杯橙果、西瓜啵啵
- 咖啡：生椰拿铁、美式咖啡、燕麦拿铁
- 新品：当季限定款

**门店：** 春熙路太古里店、天府广场店、高新区银泰店、双流机场店

**人群包：** 高频用户、新注册用户、沉睡用户、咖啡偏好用户

### 6. 页面详细规格
每个页面的字段、交互、规则详见 `README.md`，共 10 个页面。

---

## 开发顺序建议

1. **初始化项目** — Vite + React + TS + Router + 全局样式（import tokens.css）
2. **拆解 Variant 组件** — 从 StrategyCombinationEditor.jsx 提取可复用组件
3. **策略组合编辑页** — 基于 Variant 导出直接跑通
4. **选品池列表 + 详情** — 基础 CRUD 页面
5. **排序策略列表 + 编辑** — 含拖拽排序交互
6. **投放计划列表 + 编辑** — 含 ABTest 配置和冲突检测
7. **效果监控** — 图表看板
8. **全链路预览** — 模拟推荐请求 + 双视角 Trace

---

## 完成后

运行 `npm run dev` 启动开发服务器，确保所有页面可访问、导航可切换、交互状态正常。
