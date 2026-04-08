import React from "react";
import { Plus, Copy, Eye } from "lucide-react";
import { MOCK_STRATEGY_SETS } from "../lib/mockData";
import { Button, Card, Badge } from "../components/ui/Base";

interface StrategySetListProps {
  onSelectSet: (setId: string) => void;
  onNewSet: () => void;
}

export function StrategySetList({ onSelectSet, onNewSet }: StrategySetListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">策略组合管理</h1>
          <p className="text-muted-foreground mt-1">定义“菜单 Tab”场景下的坑位与策略编排。</p>
        </div>
        <Button onClick={onNewSet}>
          <Plus className="w-4 h-4 mr-2" />
          新建策略组合
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_STRATEGY_SETS.map(set => (
          <Card key={set.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer relative group" >
             <div onClick={() => onSelectSet(set.id)}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{set.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">ID: {set.id}</p>
                  </div>
                  <Badge variant="neutral">v{set.version}</Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-foreground/80">
                    <span className="font-semibold">{set.slots.length} 个坑位</span> 已配置
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {set.slots.map(slot => (
                      <span key={slot.slot_id} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">
                        {slot.title}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                  <span>更新时间: {set.updated_at}</span>
                  <span>创建人: {set.created_by}</span>
                </div>
             </div>
             
             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); onSelectSet(set.id); }}>
                  <Eye className="w-3 h-3" />
                </Button>
                <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); /* copy logic */ }}>
                  <Copy className="w-3 h-3" />
                </Button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
