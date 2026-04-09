import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'
import { createId } from './domain'
import { initialState } from './mockData'
import type {
  AdminState,
  Combination,
  Plan,
  Pool,
  Strategy,
} from './types'

interface AdminStoreValue {
  state: AdminState
  createPool: () => string
  updatePool: (poolId: string, next: Pool) => void
  deletePool: (poolId: string) => void
  createStrategy: () => string
  updateStrategy: (strategyId: string, next: Strategy) => void
  copyStrategy: (strategyId: string) => string | null
  deleteStrategy: (strategyId: string) => void
  createCombination: () => string
  updateCombination: (combinationId: string, next: Combination) => void
  copyCombination: (combinationId: string) => string | null
  deleteCombination: (combinationId: string) => void
  createPlan: () => string
  updatePlan: (planId: string, next: Plan) => void
  copyPlan: (planId: string) => string | null
  deletePlan: (planId: string) => void
}

export const CURRENT_USER = '陈悦'

const STORAGE_KEY = 'recommend-admin-store'
const AdminStoreContext = createContext<AdminStoreValue | null>(null)

function replaceItem<T extends { id: string }>(items: T[], next: T) {
  return items.map((item) => (item.id === next.id ? next : item))
}

function clonePlan(plan: Plan): Plan {
  return {
    ...plan,
    abTest: {
      ...plan.abTest,
      groups: plan.abTest.groups.map((group) => ({ ...group })),
    },
    audienceScope: { ...plan.audienceScope, segmentIds: [...plan.audienceScope.segmentIds] },
    storeScope: {
      ...plan.storeScope,
      regionIds: [...plan.storeScope.regionIds],
      storeIds: [...plan.storeScope.storeIds],
    },
  }
}

export function AdminStoreProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AdminState>(() => {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (!cached) return initialState
    try {
      const parsed = JSON.parse(cached) as AdminState
      // Reset if cached data is missing new fields
      if (
        (parsed.pools?.[0] && !('createdBy' in parsed.pools[0])) ||
        (parsed.strategies?.[0] && !('createdBy' in parsed.strategies[0])) ||
        (parsed.strategies?.[0] && !('kind' in parsed.strategies[0])) ||
        (parsed.strategies?.[0] && !('status' in parsed.strategies[0])) ||
        (parsed.strategies?.[0] && !('description' in parsed.strategies[0])) ||
        (parsed.pools?.[0] && !('productAddedTimes' in parsed.pools[0]))
      ) {
        return initialState
      }
      return parsed
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value: AdminStoreValue = {
    state,
    createPool() {
      const id = createId('pool')
      const next: Pool = {
        id,
        name: `新建选品池 ${state.pools.length}`,
        description: '',
        status: 'ACTIVE',
        createdAt: '2026-03-16 10:00',
        createdBy: '陈悦',
        updatedAt: null,
        updatedBy: null,
        productIds: [],
        productAddedTimes: {},
        kind: 'CUSTOM',
      }
      setState((current) => ({ ...current, pools: [...current.pools, next] }))
      return id
    },
    updatePool(poolId, next) {
      setState((current) => ({
        ...current,
        pools: replaceItem(
          current.pools,
          poolId === next.id ? next : { ...next, id: poolId },
        ),
      }))
    },
    deletePool(poolId) {
      setState((current) => ({
        ...current,
        pools: current.pools.filter((item) => item.id !== poolId),
      }))
    },
    createStrategy() {
      const id = createId('strategy')
      const allPool = state.pools.find((item) => item.id === 'pool-all') ?? state.pools[0]
      const next: Strategy = {
        id,
        name: '',
        description: '',
        poolId: allPool.id,
        mode: 'HOT',
        status: 'ACTIVE',
        sortDimension: 'SALES_COUNT',
        timeWindow: '7D',
        fallbackStrategyId: 'strategy-hot-all',
        createdAt: '2026-03-16 10:05',
        createdBy: CURRENT_USER,
        manualProductIds: [],
        filterUnavailable: true,
        kind: 'CUSTOM',
      }
      setState((current) => ({ ...current, strategies: [...current.strategies, next] }))
      return id
    },
    updateStrategy(strategyId, next) {
      setState((current) => ({
        ...current,
        strategies: replaceItem(
          current.strategies,
          strategyId === next.id ? next : { ...next, id: strategyId },
        ),
      }))
    },
    copyStrategy(strategyId) {
      const strategy = state.strategies.find((item) => item.id === strategyId)
      if (!strategy) return null
      const id = createId('strategy')
      const next: Strategy = {
        ...strategy,
        id,
        name: `${strategy.name} - 副本`,
        createdAt: '2026-03-16 10:15',
        createdBy: CURRENT_USER,
        manualProductIds: [...strategy.manualProductIds],
        kind: 'CUSTOM',
      }
      setState((current) => ({ ...current, strategies: [...current.strategies, next] }))
      return id
    },
    deleteStrategy(strategyId) {
      const target = state.strategies.find((item) => item.id === strategyId)
      if (target?.kind === 'SYSTEM') return
      setState((current) => ({
        ...current,
        strategies: current.strategies.filter((item) => item.id !== strategyId),
      }))
    },
    createCombination() {
      const id = createId('comb')
      const next: Combination = {
        id,
        name: `新建组合 ${state.combinations.length}`,
        status: 'ACTIVE',
        createdAt: '2026-03-16 10:20',
        createdBy: CURRENT_USER,
        categoryLimit: 2,
        sessionDedup: true,
        slots: [{ id: createId('slot'), strategyId: state.strategies[0]?.id ?? null }],
      }
      setState((current) => ({
        ...current,
        combinations: [...current.combinations, next],
      }))
      return id
    },
    updateCombination(combinationId, next) {
      setState((current) => ({
        ...current,
        combinations: replaceItem(
          current.combinations,
          combinationId === next.id ? next : { ...next, id: combinationId },
        ),
      }))
    },
    copyCombination(combinationId) {
      const combination = state.combinations.find((item) => item.id === combinationId)
      if (!combination) return null
      const id = createId('comb')
      const next: Combination = {
        ...combination,
        id,
        name: `${combination.name} - 副本`,
        createdAt: '2026-03-16 10:30',
        slots: combination.slots.map((slot) => ({ ...slot, id: createId('slot') })),
      }
      setState((current) => ({
        ...current,
        combinations: [...current.combinations, next],
      }))
      return id
    },
    deleteCombination(combinationId) {
      setState((current) => ({
        ...current,
        combinations: current.combinations.filter((item) => item.id !== combinationId),
      }))
    },
    createPlan() {
      const id = createId('plan')
      const next: Plan = {
        id,
        name: `新建计划 ${state.plans.length}`,
        createdBy: CURRENT_USER,
        status: 'DRAFT',
        priority: 50,
        startAt: '2026-03-16T09:00',
        endAt: '2026-04-16T23:59',
        scene: 'ORDER_RECOMMEND',
        combinationId: state.combinations[0]?.id ?? null,
        version: 1,
        storeScope: { type: 'ALL', regionIds: [], storeIds: [] },
        audienceScope: { type: 'ALL', segmentIds: [] },
        abTest: {
          enabled: false,
          experimentKey: '',
          groups: [{ id: createId('ab'), name: '默认组', vid: 'VID3001', traffic: 100 }],
        },
      }
      setState((current) => ({ ...current, plans: [...current.plans, next] }))
      return id
    },
    updatePlan(planId, next) {
      setState((current) => ({
        ...current,
        plans: replaceItem(current.plans, planId === next.id ? next : clonePlan({ ...next, id: planId })),
      }))
    },
    copyPlan(planId) {
      const plan = state.plans.find((item) => item.id === planId)
      if (!plan) return null
      const id = createId('plan')
      const next = clonePlan({
        ...plan,
        id,
        name: `${plan.name} - 副本`,
        status: 'DRAFT',
        version: 1,
      })
      setState((current) => ({ ...current, plans: [...current.plans, next] }))
      return id
    },
    deletePlan(planId) {
      setState((current) => ({
        ...current,
        plans: current.plans.filter((item) => item.id !== planId),
      }))
    },
  }

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  )
}

export function useAdminStore() {
  const context = useContext(AdminStoreContext)
  if (!context) {
    throw new Error('useAdminStore must be used within AdminStoreProvider')
  }
  return context
}
