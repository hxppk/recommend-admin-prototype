import React, { useState } from "react";
import { Plus, Search, Filter, Copy, Edit2 } from "lucide-react";
import { MOCK_INSTANCES, StrategyInstance } from "../lib/mockData";
import { Button, Card, Badge } from "../components/ui/Base";

interface InstanceListProps {
  onEditInstance: (id: string | null) => void;
}

export function InstanceList({ onEditInstance }: InstanceListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getTypeBadge = (ranker: StrategyInstance["ranker"]) => {
    switch (ranker) {
      case "ALGO": return <Badge variant="default">算法排序</Badge>;
      case "HOT": return <Badge variant="danger">热销排行</Badge>;
      case "NEW": return <Badge variant="success">新品排行</Badge>;
      case "MANUAL_ORDER": return <Badge variant="neutral">人工定序</Badge>;
      default: return <Badge>未知</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">策略实例库</h1>
          <p className="text-muted-foreground mt-1">复用性强的选品与排序逻辑模块。</p>
        </div>
        <Button onClick={() => onEditInstance(null)}>
          <Plus className="w-4 h-4 mr-2" />
          新建实例
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
           <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="搜索实例..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">实例名称</th>
                <th className="px-6 py-3 font-medium">排序类型</th>
                <th className="px-6 py-3 font-medium">选品来源</th>
                <th className="px-6 py-3 font-medium">兜底策略</th>
                <th className="px-6 py-3 font-medium">更新时间</th>
                <th className="px-6 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_INSTANCES.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((inst) => (
                <tr key={inst.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{inst.name}</td>
                  <td className="px-6 py-4">{getTypeBadge(inst.ranker)}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{inst.source === "STORE_MENU" ? "门店菜单" : "人工列表"}</td>
                  <td className="px-6 py-4">
                    {inst.fallback_instance_id ? (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        有兜底
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">无</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{inst.updated_at}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEditInstance(inst.id)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
