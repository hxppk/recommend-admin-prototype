import React, { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Play, Eye } from "lucide-react";
import { MOCK_PLANS, Plan } from "../lib/mockData";
import { Button, Card, Badge } from "../components/ui/Base";
import { Page } from "../components/Layout";

interface PlanListProps {
  onNavigate: (page: Page) => void;
  onEditPlan: (planId: string | null) => void;
}

export function PlanList({ onNavigate, onEditPlan }: PlanListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: Plan["status"]) => {
    switch (status) {
      case "ACTIVE": return <Badge variant="success">已发布</Badge>;
      case "DRAFT": return <Badge variant="neutral">草稿</Badge>;
      case "OFFLINE": return <Badge variant="danger">已下线</Badge>;
      case "ENDED": return <Badge variant="neutral">已结束</Badge>;
      default: return <Badge>未知</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">投放计划管理</h1>
          <p className="text-muted-foreground mt-1">管理菜单策略在不同时间和地点的投放。</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onNavigate("PREVIEW")}>
            <Play className="w-4 h-4 mr-2" />
            模拟预览
          </Button>
          <Button onClick={() => onEditPlan(null)}>
            <Plus className="w-4 h-4 mr-2" />
            新建计划
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="搜索计划..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <Button variant="secondary" size="sm" className="w-full sm:w-auto">
               <Filter className="w-4 h-4 mr-2" />
               状态筛选
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">计划名称</th>
                <th className="px-6 py-3 font-medium">优先级</th>
                <th className="px-6 py-3 font-medium">投放范围</th>
                <th className="px-6 py-3 font-medium">策略组合</th>
                <th className="px-6 py-3 font-medium">投放时间</th>
                <th className="px-6 py-3 font-medium">状态</th>
                <th className="px-6 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_PLANS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((plan) => (
                <tr key={plan.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{plan.name}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded border border-border text-muted-foreground">P-{plan.priority}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs">
                        门店: {plan.store_scope_type === "ALL" ? "所有门店" : `${plan.store_ids?.length || 0} 家门店`}
                      </span>
                      <span className="text-xs">
                        人群: {plan.crowd_scope_type === "ALL" ? "通投" : "定投人群包"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-primary font-medium cursor-pointer hover:underline">
                         {plan.strategy_set_id}
                       </span>
                       <Badge variant="neutral">v{plan.strategy_set_version}</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    <div>开始: {plan.start_time}</div>
                    {plan.end_time && <div>结束: {plan.end_time}</div>}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(plan.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEditPlan(plan.id)}>编辑</Button>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
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
