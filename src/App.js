import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
import { AuthProvider } from './context/AuthContext';
import { productInputs } from './formSource';

import LoginRegister from './components/LoginRegister/LoginRegister';
import Stage1 from './components/contractpopup/Stage1.jsx';
import Stage2 from './components/contractpopup/Stage2';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <Routes>
            {/* 로그인 상태에 따라 리다이렉트 */}
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/home" /> : <LoginRegister onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
            <Route path="/users" element={<List />} />
            <Route path="/users/:userId" element={<Single />} />
            <Route path="/products" element={<List />} />
            <Route
              path="/products/new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
            <Route path="/products/:productId" element={<Single />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
