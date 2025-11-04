import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LeadManagement from './pages/LeadManagement';
import { Toaster } from './components/ui/toaster';
import { HeaderProvider } from './contexts/HeaderContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<LeadManagement />} />
            </Routes>
          </Layout>
        </HeaderProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
