import React from "react";
import { LayoutDashboard, Layers, FileText, Play, Activity, Settings, User } from "lucide-react";

export type Page = "PLAN_LIST" | "PLAN_EDIT" | "SET_LIST" | "SET_DETAIL" | "INST_LIST" | "INST_EDIT" | "PREVIEW" | "MONITORING";

interface LayoutProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

export function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0 flex flex-col border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-lg font-bold tracking-tight">点单页推荐后台</h1>
          <p className="text-xs text-sidebar-foreground/70 mt-1">Recommendation System</p>
        </div>
        
        <nav className="flex-1 py-6 space-y-1 px-3">
          <NavItem 
            icon={<Layers className="w-5 h-5" />} 
            label="投放计划管理" 
            isActive={currentPage === "PLAN_LIST" || currentPage === "PLAN_EDIT"} 
            onClick={() => onNavigate("PLAN_LIST")} 
          />
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="策略组合管理" 
            isActive={currentPage === "SET_LIST" || currentPage === "SET_DETAIL"} 
            onClick={() => onNavigate("SET_LIST")} 
          />
          <NavItem 
            icon={<FileText className="w-5 h-5" />} 
            label="基础策略实例" 
            isActive={currentPage === "INST_LIST" || currentPage === "INST_EDIT"} 
            onClick={() => onNavigate("INST_LIST")} 
          />
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            工具
          </div>
          <NavItem 
            icon={<Play className="w-5 h-5" />} 
            label="预览排查" 
            isActive={currentPage === "PREVIEW"} 
            onClick={() => onNavigate("PREVIEW")} 
          />
          <NavItem 
            icon={<Activity className="w-5 h-5" />} 
            label="效果监控" 
            isActive={currentPage === "MONITORING"} 
            onClick={() => onNavigate("MONITORING")} 
          />
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-accent-foreground">
              AD
            </div>
            <div className="text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-sidebar-foreground/70 text-xs">admin@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/20">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
