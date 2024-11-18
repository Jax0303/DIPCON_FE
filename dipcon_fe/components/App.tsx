import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './LoginRegister'; 
import Home from './home'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister onLoginSuccess={() => {}} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
