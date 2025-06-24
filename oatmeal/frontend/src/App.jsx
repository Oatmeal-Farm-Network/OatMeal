import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DirectoryList from './pages/DirectoryList';
import DirectoryDetail from './pages/DirectoryDetail';
import BusinessProfile from './pages/BusinessProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/directory/agricultural-associations" replace />} />
        <Route path="/directory/:directoryType" element={<DirectoryDetail />} />
        <Route path="/profile" element={<BusinessProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 