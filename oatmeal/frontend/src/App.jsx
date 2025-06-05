import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DirectoryList from './pages/DirectoryList';
import DirectoryDetail from './pages/DirectoryDetail';

// Basic global styles can be injected here if you don't want a separate CSS file
const GlobalStyle = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f8f9fa; /* A light background color */
      color: #333; /* Default text color */
    }
    a {
        text-decoration: none;
        color: #007bff;
    }
    a:hover {
        text-decoration: underline;
    }
  `;
  document.head.appendChild(style);
  return null;
};

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/*<Route path="/" element={<DirectoryList />} /> */}
        <Route path="/" element={<Navigate to="/directory/agricultural-associations" replace />} />
        <Route path="/directory/:directoryType" element={<DirectoryDetail />} />
        {/* Redirect any other paths to the main page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 