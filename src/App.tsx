import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;