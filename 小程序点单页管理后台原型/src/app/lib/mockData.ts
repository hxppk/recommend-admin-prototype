import { format, subDays, addDays } from "date-fns";

export interface SPU {
  spu_id: string;
  name: string;
  price: number;
  image: string;
  is_available: boolean; // For simulation
}

export type CandidateSource = "STORE_MENU" | "MANUAL_LIST";
export type RankerType = "HOT" | "NEW" | "MANUAL_ORDER" | "ALGO";

export interface StrategyInstance {
  id: string;
  name: string;
  description?: string;
  source: CandidateSource;
  ranker: RankerType;
  // Specific params
  algo_rank_strategy_id?: string;
  hot_scope?: "STORE" | "NATIONAL";
  hot_time_window?: number; // days
  new_time_window?: number; // days
  manual_spu_ids?: string[]; // If source is MANUAL_LIST
  blacklist_spu_ids?: string[];
  fallback_instance_id?: string;
  updated_at: string;
}

export interface SlotConfig {
  slot_id: string; // slot1 - slot5
  title: string;
  count: number;
  instance_id: string;
}

export interface StrategySet {
  id: string;
  name: string;
  version: number;
  slots: SlotConfig[];
  dedup_enabled: boolean;
  global_blacklist_spu_ids: string[];
  created_by: string;
  updated_at: string;
  remark?: string;
}

export type PlanStatus = "DRAFT" | "ACTIVE" | "OFFLINE" | "ENDED";

export interface Plan {
  id: string;
  name: string;
  priority: number;
  store_scope_type: "ALL" | "LIST";
  store_ids?: string[];
  crowd_scope_type: "ALL" | "CROWD_PACK";
  crowd_pack_id?: string;
  strategy_set_id: string; // Reference to StrategySet
  strategy_set_version: number;
  start_time: string;
  end_time?: string;
  status: PlanStatus;
}

// --- MOCK DATA ---

export const MOCK_SPUS: SPU[] = Array.from({ length: 50 }).map((_, i) => ({
  spu_id: `spu_${i + 1}`,
  name: `Product ${i + 1} - ${["Latte", "Mocha", "Tea", "Cake", "Sandwich"][i % 5]}`,
  price: 20 + (i % 15),
  image: `https://source.unsplash.com/random/200x200?coffee,food&sig=${i}`,
  is_available: Math.random() > 0.1, // 90% available
}));

export const MOCK_INSTANCES: StrategyInstance[] = [
  {
    id: "inst_001",
    name: "全国热销榜 (7天)",
    source: "STORE_MENU",
    ranker: "HOT",
    hot_scope: "NATIONAL",
    hot_time_window: 7,
    updated_at: format(subDays(new Date(), 2), "yyyy-MM-dd HH:mm"),
  },
  {
    id: "inst_002",
    name: "新品上市 (30天)",
    source: "STORE_MENU",
    ranker: "NEW",
    new_time_window: 30,
    fallback_instance_id: "inst_001",
    updated_at: format(subDays(new Date(), 5), "yyyy-MM-dd HH:mm"),
  },
  {
    id: "inst_003",
    name: "人工精选 (夏日促销)",
    source: "MANUAL_LIST",
    ranker: "MANUAL_ORDER",
    manual_spu_ids: ["spu_1", "spu_5", "spu_10"],
    fallback_instance_id: "inst_001",
    updated_at: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm"),
  },
  {
    id: "inst_004",
    name: "个性化推荐 V1",
    source: "STORE_MENU",
    ranker: "ALGO",
    algo_rank_strategy_id: "algo_rec_v1",
    fallback_instance_id: "inst_001",
    updated_at: format(new Date(), "yyyy-MM-dd HH:mm"),
  },
];

export const MOCK_STRATEGY_SETS: StrategySet[] = [
  {
    id: "set_001",
    name: "标准菜单 Tab 策略组合",
    version: 1,
    dedup_enabled: true,
    global_blacklist_spu_ids: [],
    created_by: "admin",
    updated_at: format(subDays(new Date(), 10), "yyyy-MM-dd HH:mm"),
    slots: [
      { slot_id: "slot1", title: "猜你喜欢", count: 2, instance_id: "inst_004" },
      { slot_id: "slot2", title: "热销推荐", count: 3, instance_id: "inst_001" },
      { slot_id: "slot3", title: "新品尝鲜", count: 2, instance_id: "inst_002" },
      { slot_id: "slot4", title: "更多选择", count: 4, instance_id: "inst_001" },
    ],
  },
  {
    id: "set_002",
    name: "夏季大促策略组合",
    version: 1,
    dedup_enabled: true,
    global_blacklist_spu_ids: ["spu_2"],
    created_by: "marketing",
    updated_at: format(subDays(new Date(), 2), "yyyy-MM-dd HH:mm"),
    slots: [
      { slot_id: "slot1", title: "夏日特饮", count: 3, instance_id: "inst_003" },
      { slot_id: "slot2", title: "人气热卖", count: 3, instance_id: "inst_001" },
      { slot_id: "slot3", title: "探索新味", count: 2, instance_id: "inst_002" },
    ],
  },
];

export const MOCK_PLANS: Plan[] = [
  {
    id: "plan_001",
    name: "默认推荐计划",
    priority: 1,
    store_scope_type: "ALL",
    crowd_scope_type: "ALL",
    strategy_set_id: "set_001",
    strategy_set_version: 1,
    start_time: format(subDays(new Date(), 30), "yyyy-MM-dd HH:mm"),
    status: "ACTIVE",
  },
  {
    id: "plan_002",
    name: "夏季大促 - 重点城市",
    priority: 10,
    store_scope_type: "LIST",
    store_ids: ["store_101", "store_102", "store_103"],
    crowd_scope_type: "ALL",
    strategy_set_id: "set_002",
    strategy_set_version: 1,
    start_time: format(subDays(new Date(), 2), "yyyy-MM-dd HH:mm"),
    status: "ACTIVE",
  },
  {
    id: "plan_003",
    name: "VIP 用户测试计划",
    priority: 100,
    store_scope_type: "ALL",
    crowd_scope_type: "CROWD_PACK",
    crowd_pack_id: "crowd_vip_v1",
    strategy_set_id: "set_001",
    strategy_set_version: 1,
    start_time: format(addDays(new Date(), 1), "yyyy-MM-dd HH:mm"),
    status: "DRAFT",
  },
];

export const MOCK_CROWD_PACKS = [
  { id: "crowd_vip_v1", name: "高价值 VIP 用户" },
  { id: "crowd_new_v1", name: "新注册用户" },
  { id: "crowd_churn_risk", name: "流失风险用户" },
];

export const MOCK_STORES = [
  { id: "store_101", name: "市中心旗舰店" },
  { id: "store_102", name: "购物中心店" },
  { id: "store_103", name: "机场 T1 店" },
];
