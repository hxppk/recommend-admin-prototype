import type {
  AdminState,
  AudienceSegment,
  Combination,
  DashboardPoint,
  Plan,
  Pool,
  Product,
  Role,
  StoreLocation,
  Strategy,
  User,
} from './types'

const products: Product[] = [
  { id: 'prod-soy-kirin', spuId: 'CBD1001', name: '豆乳玉麒麟', category: '奶茶', price: 19, status: 'ACTIVE', salesRank: 2, launchRank: 11, accent: 'linear-gradient(135deg, #1c3b27 0%, #8dc191 100%)' },
  { id: 'prod-jasmine-milk', spuId: 'CBD1002', name: '茉莉奶绿', category: '奶茶', price: 17, status: 'ACTIVE', salesRank: 4, launchRank: 10, accent: 'linear-gradient(135deg, #365f35 0%, #a8d8a5 100%)' },
  { id: 'prod-taro-boba', spuId: 'CBD1003', name: '芋圆奶茶', category: '奶茶', price: 18, status: 'ACTIVE', salesRank: 6, launchRank: 9, accent: 'linear-gradient(135deg, #583e6e 0%, #cfb6f2 100%)' },
  { id: 'prod-black-sugar', spuId: 'CBD1004', name: '黑糖珍珠奶茶', category: '奶茶', price: 20, status: 'ACTIVE', salesRank: 3, launchRank: 8, accent: 'linear-gradient(135deg, #4c2e1e 0%, #c98955 100%)' },
  { id: 'prod-grape', spuId: 'CBD2001', name: '多肉葡萄', category: '果茶', price: 21, status: 'ACTIVE', salesRank: 1, launchRank: 6, accent: 'linear-gradient(135deg, #3d2564 0%, #b590f5 100%)' },
  { id: 'prod-super-fruit', spuId: 'CBD2002', name: '超级杯水果茶', category: '果茶', price: 23, status: 'ACTIVE', salesRank: 5, launchRank: 5, accent: 'linear-gradient(135deg, #d46b17 0%, #ffd28d 100%)' },
  { id: 'prod-orange', spuId: 'CBD2003', name: '满杯橙果', category: '果茶', price: 19, status: 'ACTIVE', salesRank: 8, launchRank: 7, accent: 'linear-gradient(135deg, #bb4d10 0%, #ffb54d 100%)' },
  { id: 'prod-watermelon', spuId: 'CBD2004', name: '西瓜啵啵', category: '果茶', price: 19, status: 'INACTIVE', salesRank: 9, launchRank: 4, accent: 'linear-gradient(135deg, #2d8a4b 0%, #9fe4b3 100%)' },
  { id: 'prod-coconut-latte', spuId: 'CBD3001', name: '生椰拿铁', category: '咖啡', price: 22, status: 'ACTIVE', salesRank: 7, launchRank: 3, accent: 'linear-gradient(135deg, #3b3129 0%, #c7b29a 100%)' },
  { id: 'prod-americano', spuId: 'CBD3002', name: '美式咖啡', category: '咖啡', price: 16, status: 'ACTIVE', salesRank: 10, launchRank: 12, accent: 'linear-gradient(135deg, #121212 0%, #6b6b6b 100%)' },
  { id: 'prod-oat-latte', spuId: 'CBD3003', name: '燕麦拿铁', category: '咖啡', price: 20, status: 'ACTIVE', salesRank: 11, launchRank: 2, accent: 'linear-gradient(135deg, #87663c 0%, #d9c098 100%)' },
  { id: 'prod-seasonal', spuId: 'CBD4001', name: '当季限定款', category: '新品', price: 24, status: 'ACTIVE', salesRank: 12, launchRank: 1, accent: 'linear-gradient(135deg, #c55d16 0%, #ffdf87 100%)' },
]

const stores: StoreLocation[] = [
  { id: 'store-taikoo', name: '春熙路太古里店', region: '锦江区' },
  { id: 'store-tianfu', name: '天府广场店', region: '青羊区' },
  { id: 'store-yintai', name: '高新区银泰店', region: '高新区' },
  { id: 'store-airport', name: '双流机场店', region: '双流区' },
]

const storeGroups: Record<string, string[]> = {
  'group-chengdu': ['store-taikoo', 'store-tianfu'],
  'group-chongqing': ['store-yintai', 'store-airport'],
}

const segments: AudienceSegment[] = [
  { id: 'seg-high', name: '高频用户', description: '月消费 8 次及以上' },
  { id: 'seg-new', name: '新注册用户', description: '注册 30 天内' },
  { id: 'seg-sleep', name: '沉睡用户', description: '60 天未消费' },
  { id: 'seg-coffee', name: '咖啡偏好用户', description: '咖啡类商品偏好高' },
]

const pools: Pool[] = [
  {
    id: 'pool-all',
    name: 'ALL 全量池',
    description: '系统内置全量池，包含所有在售商品',
    status: 'ACTIVE',
    createdAt: '2026-01-02 10:30',
    createdBy: 'system',
    updatedAt: null,
    updatedBy: null,
    productIds: products.map((item) => item.id),
    productAddedTimes: Object.fromEntries(products.map((item) => [item.id, '2026-01-02 10:30'])),
    kind: 'SYSTEM',
  },
  {
    id: 'pool-fruit',
    name: '爆款果茶池',
    description: '季节性爆款水果茶专用池，夏季主推',
    status: 'ACTIVE',
    createdAt: '2026-02-11 14:20',
    createdBy: '张运营',
    updatedAt: '2026-03-18 16:05',
    updatedBy: '李选品',
    productIds: ['prod-grape', 'prod-super-fruit', 'prod-orange', 'prod-watermelon'],
    productAddedTimes: {
      'prod-grape': '2026-02-11 14:25',
      'prod-super-fruit': '2026-02-11 14:26',
      'prod-orange': '2026-02-15 09:10',
      'prod-watermelon': '2026-03-18 16:05',
    },
    kind: 'CUSTOM',
  },
  {
    id: 'pool-coffee',
    name: '咖啡加购池',
    description: '咖啡品类日常加购推荐',
    status: 'ACTIVE',
    createdAt: '2026-02-15 09:40',
    createdBy: '王策略',
    updatedAt: '2026-03-20 10:30',
    updatedBy: '王策略',
    productIds: ['prod-coconut-latte', 'prod-americano', 'prod-oat-latte'],
    productAddedTimes: {
      'prod-coconut-latte': '2026-02-15 09:45',
      'prod-americano': '2026-02-15 09:46',
      'prod-oat-latte': '2026-03-20 10:30',
    },
    kind: 'CUSTOM',
  },
  {
    id: 'pool-seasonal',
    name: '春季新品池',
    description: '春季限定新品集合，用于新品曝光策略',
    status: 'ACTIVE',
    createdAt: '2026-03-01 12:10',
    createdBy: '陈悦',
    updatedAt: '2026-03-15 11:20',
    updatedBy: '陈悦',
    productIds: ['prod-seasonal', 'prod-watermelon', 'prod-oat-latte'],
    productAddedTimes: {
      'prod-seasonal': '2026-03-01 12:15',
      'prod-watermelon': '2026-03-10 08:30',
      'prod-oat-latte': '2026-03-15 11:20',
    },
    kind: 'CUSTOM',
  },
]

const strategies: Strategy[] = [
  {
    id: 'strategy-hot-all',
    name: '全量热销榜',
    description: '系统内置全量热销排序，基于全部商品按销量排行',
    poolId: 'pool-all',
    mode: 'HOT',
    status: 'ACTIVE',
    sortDimension: 'SALES_COUNT',
    timeWindow: '7D',
    fallbackStrategyId: null,
    createdAt: '2026-02-02 09:00',
    createdBy: 'system',
    manualProductIds: [],
    filterUnavailable: true,
    kind: 'SYSTEM',
    salesDataSource: 'NATIONAL',
  },
  {
    id: 'strategy-new-seasonal',
    name: '新品曝光优先',
    description: '春季限定新品按上新时间排序，优先曝光近期新品',
    poolId: 'pool-seasonal',
    mode: 'NEW',
    status: 'ACTIVE',
    sortDimension: 'SALES_COUNT',
    timeWindow: '14D',
    fallbackStrategyId: 'strategy-hot-all',
    createdAt: '2026-03-02 09:15',
    createdBy: '陈悦',
    manualProductIds: [],
    filterUnavailable: true,
    kind: 'CUSTOM',
    salesDataSource: 'NATIONAL',
  },
  {
    id: 'strategy-manual-coffee',
    name: '咖啡人工定序',
    description: '咖啡品类人工精选排序，优先推荐高毛利单品',
    poolId: 'pool-coffee',
    mode: 'MANUAL',
    status: 'ACTIVE',
    sortDimension: 'SALES_COUNT',
    timeWindow: '7D',
    fallbackStrategyId: 'strategy-hot-all',
    createdAt: '2026-02-21 11:05',
    createdBy: '张运营',
    manualProductIds: ['prod-coconut-latte', 'prod-oat-latte', 'prod-americano'],
    filterUnavailable: true,
    kind: 'CUSTOM',
    salesDataSource: 'NATIONAL',
  },
  {
    id: 'strategy-hot-fruit',
    name: '果茶热销补位',
    description: '果茶品类按销售额排序，用于补位场景',
    poolId: 'pool-fruit',
    mode: 'HOT',
    status: 'ACTIVE',
    sortDimension: 'SALES_AMOUNT',
    timeWindow: '30D',
    fallbackStrategyId: 'strategy-hot-all',
    createdAt: '2026-02-18 10:12',
    createdBy: '李选品',
    manualProductIds: [],
    filterUnavailable: true,
    kind: 'CUSTOM',
    salesDataSource: 'NATIONAL',
  },
]

const combinations: Combination[] = [
  {
    id: 'comb-home-core',
    name: '首页推荐核心版',
    status: 'ACTIVE',
    createdAt: '2026-02-25 18:20',
    createdBy: '陈悦',
    categoryLimit: 2,
    sessionDedup: true,
    slots: [
      { id: 'slot-1', strategyId: 'strategy-hot-all' },
      { id: 'slot-2', strategyId: 'strategy-hot-fruit' },
      { id: 'slot-3', strategyId: 'strategy-new-seasonal' },
    ],
  },
  {
    id: 'comb-coffee-push',
    name: '咖啡转化增强版',
    status: 'ACTIVE',
    createdAt: '2026-03-04 15:40',
    createdBy: '张运营',
    categoryLimit: 1,
    sessionDedup: true,
    slots: [
      { id: 'slot-1', strategyId: 'strategy-manual-coffee' },
      { id: 'slot-2', strategyId: 'strategy-hot-all' },
    ],
  },
]

const plans: Plan[] = [
  {
    id: 'plan-lunch',
    name: '午高峰果茶加推',
    createdBy: '陈悦',
    status: 'PUBLISHED',
    priority: 90,
    startAt: '2026-04-01T10:00',
    endAt: '2026-06-30T20:00',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-home-core',
    version: 3,
    storeScope: { type: 'ALL', regionIds: [], storeIds: [] },
    audienceScope: { type: 'ALL', segmentIds: [] },
    slotIds: ['slot-order-left', 'slot-home-top', 'slot-home-guess'],
    abTest: {
      enabled: true,
      experimentKey: 'order-reco-lunch',
      groups: [
        { id: 'ab-a', name: '基线组', vid: 'VID1001', traffic: 50 },
        { id: 'ab-b', name: '增强组', vid: 'VID1002', traffic: 50 },
      ],
    },
  },
  {
    id: 'plan-new-user',
    name: '新用户首单推荐',
    createdBy: '张运营',
    status: 'PUBLISHED',
    priority: 70,
    startAt: '2026-04-01T00:00',
    endAt: '2026-05-31T23:59',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-home-core',
    version: 2,
    storeScope: { type: 'REGION', regionIds: ['高新区', '青羊区'], storeIds: [] },
    audienceScope: { type: 'SEGMENT', segmentIds: ['seg-new'] },
    abTest: {
      enabled: false,
      experimentKey: '',
      groups: [
        { id: 'ab-single', name: '默认组', vid: 'VID2002', traffic: 100 },
      ],
    },
  },
  {
    id: 'plan-coffee-airport',
    name: '机场咖啡提升计划',
    createdBy: '王策略',
    status: 'DRAFT',
    priority: 50,
    startAt: '2026-04-15T06:00',
    endAt: '2026-05-15T23:00',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-coffee-push',
    version: 1,
    storeScope: { type: 'STORE', regionIds: [], storeIds: ['store-airport'] },
    audienceScope: { type: 'SEGMENT', segmentIds: ['seg-coffee'] },
    abTest: {
      enabled: false,
      experimentKey: '',
      groups: [
        { id: 'ab-control', name: '默认组', vid: 'VID2001', traffic: 100 },
      ],
    },
  },
  {
    id: 'plan-ended',
    name: '春节限定回顾',
    createdBy: '李选品',
    status: 'ENDED',
    priority: undefined,
    startAt: '2026-01-10T00:00',
    endAt: '2026-02-10T23:59',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-home-core',
    version: 5,
    storeScope: { type: 'ALL', regionIds: [], storeIds: [] },
    audienceScope: { type: 'ALL', segmentIds: [] },
    abTest: {
      enabled: false,
      experimentKey: '',
      groups: [
        { id: 'ab-default', name: '默认组', vid: 'VID2003', traffic: 100 },
      ],
    },
  },
  {
    id: 'plan-weekend',
    name: '周末奶茶加推',
    createdBy: '陈悦',
    status: 'PAUSED',
    priority: 60,
    startAt: '2026-04-05T10:00',
    endAt: '2026-05-05T20:00',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-home-core',
    version: 2,
    storeScope: { type: 'ALL', regionIds: [], storeIds: [] },
    audienceScope: { type: 'ALL', segmentIds: [] },
    abTest: {
      enabled: false,
      experimentKey: '',
      groups: [
        { id: 'ab-default', name: '默认组', vid: 'VID2004', traffic: 100 },
      ],
    },
  },
  {
    id: 'plan-autumn',
    name: '秋季上新预热',
    createdBy: '王策略',
    status: 'PAUSED',
    priority: 30,
    startAt: '2026-04-01T09:00',
    endAt: '2026-05-01T23:59',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-home-core',
    version: 1,
    storeScope: { type: 'ALL', regionIds: [], storeIds: [] },
    audienceScope: { type: 'ALL', segmentIds: [] },
    abTest: {
      enabled: false,
      experimentKey: '',
      groups: [
        { id: 'ab-default', name: '默认组', vid: 'VID2005', traffic: 100 },
      ],
    },
  },
  {
    id: 'plan-summer',
    name: '暑期大促回顾',
    createdBy: '李选品',
    status: 'ENDED',
    priority: undefined,
    startAt: '2025-07-01T00:00',
    endAt: '2025-08-31T23:59',
    scene: 'ORDER_RECOMMEND',
    combinationId: 'comb-home-core',
    version: 3,
    storeScope: { type: 'ALL', regionIds: [], storeIds: [] },
    audienceScope: { type: 'ALL', segmentIds: [] },
    abTest: {
      enabled: false,
      experimentKey: '',
      groups: [
        { id: 'ab-default', name: '默认组', vid: 'VID2006', traffic: 100 },
      ],
    },
  },
]

function buildSeries(): DashboardPoint[] {
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date('2026-03-03T00:00:00+08:00')
    date.setDate(date.getDate() + index)
    return date.toISOString().slice(0, 10)
  })

  const records: DashboardPoint[] = []
  const publishedPlans = plans.filter((plan) => plan.status === 'PUBLISHED')
  const groups = ['全部流量', '实验组']

  days.forEach((date, dayIndex) => {
    const decay = 1 - dayIndex / 14 * 0.8
    publishedPlans.forEach((plan, planIndex) => {
      stores.forEach((store, storeIndex) => {
        groups.forEach((group, groupIndex) => {
          records.push({
            date,
            planId: plan.id,
            storeId: store.id,
            group,
            ctr: Math.round(
              (8.6 + planIndex * 0.9 + storeIndex * 0.35 + groupIndex * 0.25
                + (Math.random() - 0.5) * 3.0 * decay) * 100,
            ) / 100,
            cvr: Math.round(
              (2.1 + planIndex * 0.3 + storeIndex * 0.15 + groupIndex * 0.1
                + (Math.random() - 0.5) * 1.0 * decay) * 100,
            ) / 100,
            exposure: Math.round(
              9800 + planIndex * 850 + storeIndex * 190 + groupIndex * 70
                + (Math.random() - 0.5) * 3000 * decay,
            ),
          })
        })
      })
    })
  })

  return records
}

const ALL_PERMISSIONS = [
  'pool:read', 'pool:write',
  'strategy:read', 'strategy:write',
  'combination:read', 'combination:write',
  'plan:read', 'plan:write',
  'monitoring:read',
  'preview:read',
  'user:read', 'user:write',
  'role:read', 'role:write',
]

const ADMIN_PERMISSIONS = ALL_PERMISSIONS.filter(p => !p.startsWith('user:') && !p.startsWith('role:'))

const OPERATOR_PERMISSIONS = [
  'pool:read', 'pool:write',
  'combination:read', 'combination:write',
  'plan:read', 'plan:write',
  'monitoring:read',
]

const VIEWER_PERMISSIONS = ALL_PERMISSIONS.filter(p => p.endsWith(':read'))

const ROLES: Role[] = [
  {
    id: 'role-super-admin',
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    description: '拥有全部权限，包括用户和角色管理',
    permissions: ALL_PERMISSIONS,
    createdAt: '2026-01-01 10:00',
    createdBy: 'system',
    kind: 'SYSTEM',
  },
  {
    id: 'role-admin',
    name: '管理员',
    code: 'ADMIN',
    description: '拥有除用户和角色管理外的全部权限',
    permissions: ADMIN_PERMISSIONS,
    createdAt: '2026-01-01 10:00',
    createdBy: 'system',
    kind: 'SYSTEM',
  },
  {
    id: 'role-operator',
    name: '运营人员',
    code: 'OPERATOR',
    description: '选品池、策略组合、投放计划读写，效果监控只读',
    permissions: OPERATOR_PERMISSIONS,
    createdAt: '2026-01-01 10:00',
    createdBy: 'system',
    kind: 'SYSTEM',
  },
  {
    id: 'role-viewer',
    name: '观察者',
    code: 'VIEWER',
    description: '全局只读权限',
    permissions: VIEWER_PERMISSIONS,
    createdAt: '2026-01-01 10:00',
    createdBy: 'system',
    kind: 'SYSTEM',
  },
]

const USERS: User[] = [
  {
    id: 'user-chenyue',
    username: 'chenyue',
    displayName: '陈悦',
    email: 'chenyue@chabaidao.com',
    phone: '13800138001',
    roleId: 'role-admin',
    roleCode: 'ADMIN',
    status: 'ACTIVE',
    lastLoginAt: '2026-04-20 09:30',
    createdAt: '2026-01-01 10:00',
    createdBy: 'system',
  },
  {
    id: 'user-zhangyunying',
    username: 'zhangyunying',
    displayName: '张运营',
    email: 'zhangyy@chabaidao.com',
    phone: '13800138002',
    roleId: 'role-operator',
    roleCode: 'OPERATOR',
    status: 'ACTIVE',
    lastLoginAt: '2026-04-19 14:20',
    createdAt: '2026-01-05 10:00',
    createdBy: 'chenyue',
  },
  {
    id: 'user-lixuanpin',
    username: 'lixuanpin',
    displayName: '李选品',
    email: 'lixp@chabaidao.com',
    phone: '13800138003',
    roleId: 'role-operator',
    roleCode: 'OPERATOR',
    status: 'ACTIVE',
    lastLoginAt: '2026-04-18 16:45',
    createdAt: '2026-01-10 10:00',
    createdBy: 'chenyue',
  },
  {
    id: 'user-wangcelue',
    username: 'wangcelue',
    displayName: '王策略',
    email: 'wangcl@chabaidao.com',
    phone: '13800138004',
    roleId: 'role-viewer',
    roleCode: 'VIEWER',
    status: 'DISABLED',
    lastLoginAt: '2026-03-15 11:00',
    createdAt: '2026-02-01 10:00',
    createdBy: 'chenyue',
  },
]

export const initialState: AdminState = {
  products,
  pools,
  strategies,
  combinations,
  plans,
  stores,
  segments,
  storeGroups,
  dashboardSeries: buildSeries(),
  roles: ROLES,
  users: USERS,
}
