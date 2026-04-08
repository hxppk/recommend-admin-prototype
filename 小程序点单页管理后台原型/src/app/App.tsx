import React, { useState } from "react";
import { Layout, Page } from "./components/Layout";
import { PlanList } from "./pages/PlanList";
import { PlanEdit } from "./pages/PlanEdit";
import { StrategySetList } from "./pages/StrategySetList";
import { StrategySetDetail } from "./pages/StrategySetDetail";
import { InstanceList } from "./pages/InstanceList";
import { InstanceEdit } from "./pages/InstanceEdit";
import { Preview } from "./pages/Preview";
import { Monitoring } from "./pages/Monitoring";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("PLAN_LIST");
  
  // Navigation State params
  const [editPlanId, setEditPlanId] = useState<string | null>(null);
  const [viewSetId, setViewSetId] = useState<string | null>(null);
  const [editInstanceId, setEditInstanceId] = useState<string | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleEditPlan = (id: string | null) => {
    setEditPlanId(id);
    navigate("PLAN_EDIT");
  };

  const handleSelectSet = (id: string) => {
    setViewSetId(id);
    navigate("SET_DETAIL");
  };

  const handleNewSet = () => {
    setViewSetId(null);
    navigate("SET_DETAIL");
  };

  const handleEditInstance = (id: string | null) => {
    setEditInstanceId(id);
    navigate("INST_EDIT");
  };

  return (
    <Layout currentPage={currentPage} onNavigate={navigate}>
      {currentPage === "PLAN_LIST" && <PlanList onNavigate={navigate} onEditPlan={handleEditPlan} />}
      {currentPage === "PLAN_EDIT" && <PlanEdit planId={editPlanId} onSave={() => navigate("PLAN_LIST")} onCancel={() => navigate("PLAN_LIST")} />}
      
      {currentPage === "SET_LIST" && <StrategySetList onSelectSet={handleSelectSet} onNewSet={handleNewSet} />}
      {currentPage === "SET_DETAIL" && <StrategySetDetail setId={viewSetId} onBack={() => navigate("SET_LIST")} />}
      
      {currentPage === "INST_LIST" && <InstanceList onEditInstance={handleEditInstance} />}
      {currentPage === "INST_EDIT" && <InstanceEdit instanceId={editInstanceId} onSave={() => navigate("INST_LIST")} onCancel={() => navigate("INST_LIST")} />}
      
      {currentPage === "PREVIEW" && <Preview />}
      {currentPage === "MONITORING" && <Monitoring />}
    </Layout>
  );
}
