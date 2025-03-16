import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Keys from './components/Keys';
import Email from './components/Email';
import Documentation from './components/Documentation';
import Settings from './components/Settings';
import { ServerProvider } from './components/ServerContext'; // Import Server Context
import './App.css';

const App = () => {
  return (
    <ServerProvider> {/* Wrap the app with the context provider */}
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Routes>
              {/* Redirect the root path to /dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/keys" element={<Keys />} />
              <Route path="/email" element={<Email />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ServerProvider>
  );
};

export default App;
