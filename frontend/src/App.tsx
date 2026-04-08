import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/shell'
import { AdminStoreProvider } from './lib/store'
import { CombinationEditPage } from './pages/CombinationEditPage'
import { CombinationsListPage } from './pages/CombinationsListPage'
import { DashboardPage } from './pages/DashboardPage'
import { PlanEditPage } from './pages/PlanEditPage'
import { PlansListPage } from './pages/PlansListPage'
import { PoolDetailPage } from './pages/PoolDetailPage'
import { PoolsListPage } from './pages/PoolsListPage'
import { PreviewPage } from './pages/PreviewPage'
import { StrategyEditPage } from './pages/StrategyEditPage'
import { StrategiesListPage } from './pages/StrategiesListPage'

function App() {
  return (
    <AdminStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/combinations" replace />} />
          <Route element={<AppShell />}>
            <Route path="/pools" element={<PoolsListPage />} />
            <Route path="/pools/:id" element={<PoolDetailPage />} />
            <Route path="/strategies" element={<StrategiesListPage />} />
            <Route path="/strategies/:id/edit" element={<StrategyEditPage />} />
            <Route path="/combinations" element={<CombinationsListPage />} />
            <Route path="/combinations/:id" element={<CombinationEditPage />} />
            <Route path="/plans" element={<PlansListPage />} />
            <Route path="/plans/:id/edit" element={<PlanEditPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminStoreProvider>
  )
}

export default App
