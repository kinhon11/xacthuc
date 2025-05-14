import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerificationPage from './pages/VerificationPage';
import VerificationStatus from './pages/VerificationStatus';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<VerificationPage />} />
          <Route path="/status" element={<VerificationStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;