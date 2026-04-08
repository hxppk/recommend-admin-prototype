import React, { useState } from "react";
import { Search, Play, AlertTriangle, Info, CheckCircle, Smartphone } from "lucide-react";
import { MOCK_PLANS, MOCK_STRATEGY_SETS, MOCK_INSTANCES, MOCK_SPUS, MOCK_STORES, Plan } from "../lib/mockData";
import { Button, Card, Badge } from "../components/ui/Base";

export function Preview() {
  const [storeId, setStoreId] = useState("store_101");
  const [userId, setUserId] = useState("user_vip");
  const [result, setResult] = useState<any>(null);

  const handleSimulate = () => {
    // 1. Find Candidate Plans
    const now = new Date();
    const activePlans = MOCK_PLANS.filter(p => p.status === "ACTIVE"); // Simple filter

    // 2. Filter by Store
    const storePlans = activePlans.filter(p => {
       if (p.store_scope_type === "ALL") return true;
       return p.store_ids?.includes(storeId);
    });

    // 3. Filter by Crowd (Mock Logic)
    // Assume "user_vip" belongs to "crowd_vip_v1"
    const userCrowds = userId.includes("vip") ? ["crowd_vip_v1"] : [];
    
    const matchedPlans = storePlans.filter(p => {
       if (p.crowd_scope_type === "ALL") return true;
       return userCrowds.includes(p.crowd_pack_id || "");
    });

    // 4. Sort by Priority
    matchedPlans.sort((a, b) => b.priority - a.priority);

    const hitPlan = matchedPlans[0] || null;

    if (!hitPlan) {
      setResult({ hit: false });
      return;
    }

    // 5. Get Strategy Set
    const strategySet = MOCK_STRATEGY_SETS.find(s => s.id === hitPlan.strategy_set_id);
    
    // 6. Simulate Slots
    const slotsResult = strategySet?.slots.map(slot => {
       const instance = MOCK_INSTANCES.find(i => i.id === slot.instance_id);
       // Mock SPU generation
       let spuList = [];
       let source = "Primary";
       
       if (instance) {
          if (instance.ranker === "HOT") spuList = MOCK_SPUS.slice(0, slot.count);
          else if (instance.ranker === "NEW") spuList = MOCK_SPUS.slice(10, 10 + slot.count);
          else if (instance.ranker === "ALGO") spuList = MOCK_SPUS.slice(20, 20 + slot.count);
          else if (instance.source === "MANUAL_LIST") {
             spuList = MOCK_SPUS.filter(s => instance.manual_spu_ids?.includes(s.spu_id)).slice(0, slot.count);
          }
          
          // Fallback Logic Simulation
          if (spuList.length < slot.count && instance.fallback_instance_id) {
             const fallback = MOCK_INSTANCES.find(i => i.id === instance.fallback_instance_id);
             if (fallback) {
               const fallbackSpus = MOCK_SPUS.slice(40, 40 + (slot.count - spuList.length)); // Mock fallback data
               spuList = [...spuList, ...fallbackSpus];
               source = "Primary + Fallback";
             }
          }
       }
       
       return {
         ...slot,
         spuList,
         source
       };
    });

    setResult({
      hit: true,
      plan: hitPlan,
      strategySet,
      slots: slotsResult
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">预览与排查</h1>
        <p className="text-muted-foreground mt-1">模拟特定上下文（门店、用户）下的推荐逻辑。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 space-y-4">
             <h3 className="font-semibold text-foreground">上下文参数</h3>
             
             <div>
               <label className="block text-sm font-medium text-foreground mb-1">门店 ID</label>
               <select 
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                 value={storeId}
                 onChange={e => setStoreId(e.target.value)}
               >
                 {MOCK_STORES.map(s => (
                   <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                 ))}
               </select>
             </div>

             <div>
               <label className="block text-sm font-medium text-foreground mb-1">用户 ID</label>
               <input 
                 type="text" 
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                 placeholder="输入用户 ID"
                 value={userId}
                 onChange={e => setUserId(e.target.value)}
               />
               <div className="text-xs text-muted-foreground mt-1">
                 提示: 尝试使用 "user_vip" 来触发 VIP 专属计划。
               </div>
             </div>

             <Button onClick={handleSimulate} className="w-full mt-2">
               <Play className="w-4 h-4 mr-2" />
               运行模拟
             </Button>
          </Card>

          {result && result.hit && (
             <Card className="p-6 space-y-4 bg-primary/5 border-primary/20">
               <h3 className="font-semibold text-primary flex items-center gap-2">
                 <CheckCircle className="w-5 h-5" />
                 命中计划
               </h3>
               
               <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                   <span className="text-primary/80">计划名称:</span>
                   <span className="font-medium text-primary">{result.plan.name}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-primary/80">优先级:</span>
                   <span className="font-medium text-primary">{result.plan.priority}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-primary/80">策略组合:</span>
                   <span className="font-medium text-primary">{result.strategySet.name} v{result.strategySet.version}</span>
                 </div>
               </div>
             </Card>
          )}

          {result && !result.hit && (
             <Card className="p-6 bg-destructive/10 border-destructive/20 text-destructive">
               <div className="flex items-center gap-2 font-semibold">
                 <AlertTriangle className="w-5 h-5" />
                 未命中计划
               </div>
               <p className="text-sm mt-2">当前门店/用户组合没有匹配到任何生效中的计划。将展示默认空状态。</p>
             </Card>
          )}
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
           {result && result.hit ? (
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">模拟菜单 Tab 返回结果</h3>
                </div>

                {result.slots.map((slot: any) => (
                  <Card key={slot.slot_id} className="overflow-hidden">
                    <div className="bg-muted/30 border-b border-border px-4 py-2 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <Badge variant="neutral">{slot.slot_id}</Badge>
                         <span className="font-medium text-foreground">{slot.title}</span>
                       </div>
                       <span className="text-xs text-muted-foreground">
                         来源: {slot.source === "Primary" ? "主策略" : slot.source === "Primary + Fallback" ? "主策略 + 兜底" : slot.source}
                       </span>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {slot.spuList.map((spu: any) => (
                         <div key={spu.spu_id} className="flex gap-3 p-2 border border-border rounded hover:bg-muted/30">
                            <div className="w-12 h-12 bg-muted rounded flex-shrink-0 overflow-hidden">
                              <img src={spu.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="text-sm font-medium truncate text-foreground">{spu.name}</div>
                               <div className="text-xs text-muted-foreground">¥{spu.price}</div>
                               <div className="text-xs text-muted-foreground/50 font-mono mt-0.5">{spu.spu_id}</div>
                            </div>
                         </div>
                       ))}
                       {slot.spuList.length === 0 && (
                         <div className="text-sm text-muted-foreground italic py-2">无商品返回</div>
                       )}
                    </div>
                  </Card>
                ))}
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg p-12">
               <Smartphone className="w-12 h-12 mb-4 opacity-20" />
               <p>输入上下文并运行模拟以查看结果。</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
