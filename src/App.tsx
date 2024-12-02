import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Clients from './pages/Clients';
import Pipeline from './pages/Pipeline';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import ClientDetails from './pages/ClientDetails';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <Header />
          <main className="lg:ml-20 pt-20 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/:id" element={<ClientDetails />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/billing" element={<Billing />} />
            </Routes>
          </main>
          <OfflineIndicator />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;