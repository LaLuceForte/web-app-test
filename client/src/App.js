import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/Dashboard';
import JoinedTable from './components/JoinedTable';

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/joined" element={<JoinedTable />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
