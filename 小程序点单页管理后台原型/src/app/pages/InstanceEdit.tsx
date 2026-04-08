import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";
import { MOCK_INSTANCES, MOCK_SPUS, StrategyInstance, CandidateSource, RankerType } from "../lib/mockData";
import { Button, Card, Badge } from "../components/ui/Base";
import { SpuSelector } from "../components/SpuSelector";

interface InstanceEditProps {
  instanceId: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export function InstanceEdit({ instanceId, onSave, onCancel }: InstanceEditProps) {
  const [formData, setFormData] = useState<Partial<StrategyInstance>>({
    name: "",
    source: "STORE_MENU",
    ranker: "HOT",
    hot_scope: "STORE",
    hot_time_window: 7,
    new_time_window: 30,
    manual_spu_ids: [],
    blacklist_spu_ids: [],
    fallback_instance_id: "",
    algo_rank_strategy_id: ""
  });

  useEffect(() => {
    if (instanceId) {
      const inst = MOCK_INSTANCES.find(i => i.id === instanceId);
      if (inst) setFormData({ ...inst });
    }
  }, [instanceId]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel} className="pl-0">
          <ArrowLeft className="w-5 h-5 mr-1" /> 返回
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{instanceId ? "编辑策略实例" : "新建策略实例"}</h1>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">实例名称</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">选品来源</label>
            <select 
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
              value={formData.source}
              onChange={e => {
                const src = e.target.value as CandidateSource;
                const newRanker = src === "MANUAL_LIST" ? "MANUAL_ORDER" : formData.ranker;
                setFormData({...formData, source: src, ranker: newRanker});
              }}
            >
              <option value="STORE_MENU">门店菜单 (全量在售)</option>
              <option value="MANUAL_LIST">人工指定 (特定 SPU)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">排序/推荐逻辑</label>
            <select 
              className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
              value={formData.ranker}
              onChange={e => setFormData({...formData, ranker: e.target.value as RankerType})}
            >
              <option value="HOT">销量排行 (Hot)</option>
              <option value="NEW">新品排行 (New)</option>
              <option value="ALGO">个性化算法 (Algo)</option>
              <option value="MANUAL_ORDER">人工定序 (Manual)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Fields based on Ranker */}
        <div className="bg-muted/30 p-4 rounded-md border border-border space-y-4">
          <h4 className="text-sm font-semibold text-foreground">排序参数配置</h4>
          
          {formData.ranker === "ALGO" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">算法 ID (Rank Strategy ID)</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-input bg-background rounded-md font-mono focus:ring-2 focus:ring-ring focus:outline-none"
                placeholder="例如: rec_home_feed_v2"
                value={formData.algo_rank_strategy_id}
                onChange={e => setFormData({...formData, algo_rank_strategy_id: e.target.value})}
              />
              <p className="text-xs text-muted-foreground mt-1">请填写算法工程侧提供的策略 ID。</p>
            </div>
          )}

          {formData.ranker === "HOT" && (
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-foreground mb-1">统计范围</label>
                 <select 
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                    value={formData.hot_scope}
                    onChange={e => setFormData({...formData, hot_scope: e.target.value as any})}
                 >
                   <option value="STORE">当前门店销量</option>
                   <option value="NATIONAL">全国销量</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-foreground mb-1">时间窗口 (天)</label>
                 <input 
                   type="number" 
                   className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                   value={formData.hot_time_window}
                   onChange={e => setFormData({...formData, hot_time_window: parseInt(e.target.value)})}
                 />
               </div>
            </div>
          )}

          {formData.ranker === "NEW" && (
            <div>
               <label className="block text-sm font-medium text-foreground mb-1">"新品"定义 (上市天数内)</label>
               <input 
                 type="number" 
                 className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
                 value={formData.new_time_window}
                 onChange={e => setFormData({...formData, new_time_window: parseInt(e.target.value)})}
               />
            </div>
          )}

          {formData.source === "MANUAL_LIST" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">选择 SPU</label>
              <SpuSelector 
                spus={MOCK_SPUS}
                selectedIds={formData.manual_spu_ids || []}
                onSelectionChange={(ids) => setFormData({...formData, manual_spu_ids: ids})}
                label="添加 SPU"
              />
              <p className="text-xs text-muted-foreground mt-1">为此手动策略选择具体的商品。</p>
            </div>
          )}
        </div>

        {/* Common Config */}
        <div className="pt-4 border-t border-border space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">实例黑名单 (排除 SPU)</label>
            <SpuSelector 
                spus={MOCK_SPUS}
                selectedIds={formData.blacklist_spu_ids || []}
                onSelectionChange={(ids) => setFormData({...formData, blacklist_spu_ids: ids})}
                label="添加黑名单商品"
                placeholder="搜索要排除的商品..."
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-foreground mb-1">兜底实例 (Fallback)</label>
             <select 
               className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-ring focus:outline-none"
               value={formData.fallback_instance_id}
               onChange={e => setFormData({...formData, fallback_instance_id: e.target.value})}
             >
               <option value="">无兜底 (返回空)</option>
               {MOCK_INSTANCES.filter(i => i.id !== instanceId).map(inst => (
                 <option key={inst.id} value={inst.id}>{inst.name}</option>
               ))}
             </select>
             <p className="text-xs text-muted-foreground mt-1">当主策略返回结果数量不足时，使用此兜底策略补充。</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>取消</Button>
          <Button onClick={onSave}>
             <Save className="w-4 h-4 mr-2" />
             保存实例
          </Button>
        </div>
      </Card>
    </div>
  );
}
