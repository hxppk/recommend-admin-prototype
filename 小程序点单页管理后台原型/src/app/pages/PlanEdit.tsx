import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { MOCK_PLANS, MOCK_STRATEGY_SETS, MOCK_CROWD_PACKS, Plan } from "../lib/mockData";
import { Button, Card, Badge } from "../components/ui/Base";

interface PlanEditProps {
  planId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export function PlanEdit({ planId, onSave, onCancel }: PlanEditProps) {
  const [formData, setFormData] = useState<Partial<Plan>>({
    name: "",
    priority: 10,
    store_scope_type: "ALL",
    crowd_scope_type: "ALL",
    strategy_set_id: "",
    strategy_set_version: 1,
    start_time: "",
    status: "DRAFT"
  });

  const [validationMsg, setValidationMsg] = useState<string | null>(null);

  useEffect(() => {
    if (planId) {
      const plan = MOCK_PLANS.find(p => p.id === planId);
      if (plan) setFormData({ ...plan });
    }
  }, [planId]);

  const handlePublish = () => {
    // Mock Validation
    if (formData.store_scope_type === "LIST" && (!formData.store_ids || formData.store_ids.length === 0)) {
       setValidationMsg("Please select at least one store.");
       return;
    }
    // Simulate API call
    console.log("Publishing plan:", formData);
    onSave();
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    onSave();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel} className="pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="w-5 h-5 mr-1" /> 返回
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{planId ? "编辑投放计划" : "新建投放计划"}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
             <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">基本信息</h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2">
                 <label className="block text-sm font-medium text-foreground mb-1">计划名称</label>
                 <input 
                   type="text" 
                   className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-foreground mb-1">优先级 (1-100)</label>
                 <input 
                   type="number" 
                   className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                   value={formData.priority}
                   onChange={e => setFormData({...formData, priority: parseInt(e.target.value)})}
                 />
                 <p className="text-xs text-muted-foreground mt-1">数值越大，优先级越高。</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-foreground mb-1">开始时间</label>
                 <input 
                   type="datetime-local" 
                   className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                   value={formData.start_time}
                   onChange={e => setFormData({...formData, start_time: e.target.value})}
                 />
               </div>
             </div>
          </Card>

          <Card className="p-6 space-y-6">
             <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">投放范围</h3>
             
             {/* Store Scope */}
             <div className="space-y-3">
               <label className="block text-sm font-medium text-foreground">门店范围</label>
               <div className="flex gap-4">
                 <label className="flex items-center gap-2 cursor-pointer text-sm">
                   <input 
                     type="radio" 
                     name="storeScope" 
                     className="accent-primary"
                     checked={formData.store_scope_type === "ALL"} 
                     onChange={() => setFormData({...formData, store_scope_type: "ALL"})}
                   />
                   <span>所有门店</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm">
                   <input 
                     type="radio" 
                     name="storeScope" 
                     className="accent-primary"
                     checked={formData.store_scope_type === "LIST"} 
                     onChange={() => setFormData({...formData, store_scope_type: "LIST"})}
                   />
                   <span>指定门店列表</span>
                 </label>
               </div>
               
               {formData.store_scope_type === "LIST" && (
                 <div className="p-4 bg-muted/30 border border-border rounded-md">
                   <div className="text-sm text-muted-foreground mb-2">粘贴门店 ID (逗号分隔)</div>
                   <textarea 
                     className="w-full h-24 border border-input bg-background rounded p-2 text-sm font-mono focus:ring-2 focus:ring-ring focus:outline-none"
                     placeholder="store_101, store_102..."
                     value={formData.store_ids?.join(", ")}
                     onChange={(e) => setFormData({...formData, store_ids: e.target.value.split(",").map(s => s.trim())})}
                   />
                 </div>
               )}
             </div>

             <div className="border-t border-border pt-4 space-y-3">
               <label className="block text-sm font-medium text-foreground">人群范围</label>
               <div className="flex gap-4">
                 <label className="flex items-center gap-2 cursor-pointer text-sm">
                   <input 
                     type="radio" 
                     name="crowdScope" 
                     className="accent-primary"
                     checked={formData.crowd_scope_type === "ALL"} 
                     onChange={() => setFormData({...formData, crowd_scope_type: "ALL"})}
                   />
                   <span>全部用户 (通投)</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm">
                   <input 
                     type="radio" 
                     name="crowdScope" 
                     className="accent-primary"
                     checked={formData.crowd_scope_type === "CROWD_PACK"} 
                     onChange={() => setFormData({...formData, crowd_scope_type: "CROWD_PACK"})}
                   />
                   <span>指定人群包 (定投)</span>
                 </label>
               </div>

               {formData.crowd_scope_type === "CROWD_PACK" && (
                  <select 
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                    value={formData.crowd_pack_id}
                    onChange={e => setFormData({...formData, crowd_pack_id: e.target.value})}
                  >
                    <option value="">选择人群包...</option>
                    {MOCK_CROWD_PACKS.map(pack => (
                      <option key={pack.id} value={pack.id}>{pack.name} ({pack.id})</option>
                    ))}
                  </select>
               )}
             </div>
          </Card>

          <Card className="p-6 space-y-6">
             <h3 className="text-lg font-semibold border-b border-border pb-2 mb-4">策略配置</h3>
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-foreground mb-1">选择策略组合 (Strategy Set)</label>
                   <select 
                     className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                     value={formData.strategy_set_id}
                     onChange={e => setFormData({...formData, strategy_set_id: e.target.value, strategy_set_version: 1})}
                   >
                     <option value="">选择一个策略组合...</option>
                     {MOCK_STRATEGY_SETS.map(set => (
                       <option key={set.id} value={set.id}>{set.name}</option>
                     ))}
                   </select>
                </div>
                {formData.strategy_set_id && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">版本</label>
                    <select 
                      className="w-32 px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                      value={formData.strategy_set_version}
                      onChange={e => setFormData({...formData, strategy_set_version: parseInt(e.target.value)})}
                    >
                      <option value={1}>v1 (最新)</option>
                      {/* Mocking versions */}
                      <option value={2}>v2 (草稿)</option>
                    </select>
                  </div>
                )}
             </div>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4 sticky top-6">
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-muted-foreground">当前状态</span>
               <Badge variant={formData.status === "ACTIVE" ? "success" : "neutral"}>{formData.status === "ACTIVE" ? "已发布" : "草稿"}</Badge>
             </div>
             
             {validationMsg && (
               <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md text-sm flex gap-2">
                 <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                 {validationMsg}
               </div>
             )}

             <div className="pt-4 space-y-3">
               <Button onClick={handlePublish} className="w-full" disabled={!formData.strategy_set_id}>
                 <CheckCircle className="w-4 h-4 mr-2" />
                 发布计划
               </Button>
               <Button variant="secondary" onClick={handleSaveDraft} className="w-full">
                 <Save className="w-4 h-4 mr-2" />
                 保存草稿
               </Button>
             </div>

             <div className="border-t border-border pt-4 text-xs text-muted-foreground">
               <p className="font-semibold mb-1">发布前检查:</p>
               <ul className="list-disc pl-4 space-y-1">
                 <li>检查门店覆盖率...</li>
                 <li>验证人群包有效性...</li>
                 <li>策略兜底检查...</li>
               </ul>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
