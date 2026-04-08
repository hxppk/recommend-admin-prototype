export type ProductStatus = 'ACTIVE' | 'INACTIVE'
export type PoolStatus = 'ACTIVE' | 'INACTIVE'
export type StrategyMode = 'HOT' | 'NEW' | 'MANUAL'
export type CombinationStatus = 'ACTIVE' | 'INACTIVE'
export type PlanStatus = 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'ENDED'
export type StoreScopeType = 'ALL' | 'REGION' | 'STORE'
export type AudienceScopeType = 'ALL' | 'SEGMENT'
export type DashboardMetric = 'ctr' | 'vacancy' | 'exposure'

export interface Product {
  id: string
  spuId: string
  name: string
  category: string
  price: number
  status: ProductStatus
  salesRank: number
  launchRank: number
  accent: string
}

export interface Pool {
  id: string
  name: string
  description: string
  status: PoolStatus
  createdAt: string
  createdBy: string
  updatedAt: string | null
  updatedBy: string | null
  productIds: string[]
  productAddedTimes: Record<string, string>
  kind: 'SYSTEM' | 'CUSTOM'
}

export interface Strategy {
  id: string
  name: string
  description: string
  poolId: string
  mode: StrategyMode
  status: 'ACTIVE' | 'INACTIVE'
  sortDimension: 'SALES_COUNT' | 'SALES_AMOUNT'
  timeWindow: '7D' | '14D' | '30D'
  fallbackStrategyId: string | null
  createdAt: string
  createdBy: string
  manualProductIds: string[]
  filterUnavailable: boolean
  kind: 'SYSTEM' | 'CUSTOM'
}

export interface CombinationSlot {
  id: string
  strategyId: string | null
}

export interface Combination {
  id: string
  name: string
  status: CombinationStatus
  createdAt: string
  createdBy: string
  slots: CombinationSlot[]
  categoryLimit: number | null
  sessionDedup: boolean
}

export interface AbTestGroup {
  id: string
  name: string
  vid: string
  traffic: number
}

export interface Plan {
  id: string
  name: string
  createdBy: string
  status: PlanStatus
  priority: number
  startAt: string
  endAt: string
  scene: 'ORDER_RECOMMEND'
  combinationId: string | null
  version: number
  storeScope: {
    type: StoreScopeType
    regionIds: string[]
    storeIds: string[]
  }
  audienceScope: {
    type: AudienceScopeType
    segmentIds: string[]
  }
  abTest: {
    enabled: boolean
    experimentKey: string
    groups: AbTestGroup[]
  }
}

export interface StoreLocation {
  id: string
  name: string
  region: string
}

export interface AudienceSegment {
  id: string
  name: string
  description: string
}

export interface DashboardPoint {
  date: string
  planId: string
  storeId: string
  group: string
  ctr: number
  vacancy: number
  exposure: number
}

export interface AdminState {
  products: Product[]
  pools: Pool[]
  strategies: Strategy[]
  combinations: Combination[]
  plans: Plan[]
  stores: StoreLocation[]
  segments: AudienceSegment[]
  dashboardSeries: DashboardPoint[]
}

export interface PreviewSlotResult {
  slotId: string
  slotIndex: number
  product: Product | null
  strategyId: string | null
  strategyName: string
  poolId: string | null
  rank: number | null
  fallbackUsed: boolean
  reason: string
  skipReasons: string[]
}

export interface PreviewResult {
  plan: Plan | null
  groupName: string | null
  store: StoreLocation | null
  inferredSegments: AudienceSegment[]
  slots: PreviewSlotResult[]
  technicalTrace: Array<Record<string, string | number | boolean | null>>
  missReason?: string
}
