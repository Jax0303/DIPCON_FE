import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
import { AuthProvider } from './context/AuthContext'; // 다크모드 관련 코드 제거
import { productInputs } from './formSource';

// 로그인 컴포넌트
import LoginRegister from './components/LoginRegister/LoginRegister';
import Stage1 from './components/contractpopup/Stage1.jsx';
import Stage2 from './components/contractpopup/Stage2';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 로그인 성공 시 호출되는 함수
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // 단계 전환 함수
  const handleNext = () => {
    setCurrentStage(2);
  };

  const handlePrevious = () => {
    setCurrentStage(1);
  };

  // 계약 팝업 열기/닫기
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentStage(1);
  };

  return (
    <AuthProvider>
      <div className="app"> {/* 다크모드 관련 클래스 제거 */}
        <Router>
          <Routes>
            {/* 강제로 LoginRegister만 렌더링 */}
            <Route path="/" element={<LoginRegister />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<List />} />
            <Route path="/users/:userId" element={<Single />} />
            <Route path="/products" element={<List />} />
            <Route path="/products/new" element={<New inputs={productInputs} title="Add New Product" />} />
            <Route path="/products/:productId" element={<Single />} />
          </Routes>
        </Router>

        {/* 팝업 컴포넌트 */}
        {isPopupOpen && currentStage === 1 && <Stage1 isOpen={isPopupOpen} onClose={closePopup} onNext={handleNext} />}
        {isPopupOpen && currentStage === 2 && <Stage2 isOpen={isPopupOpen} onClose={closePopup} onPrevious={handlePrevious} />}
      </div>
    </AuthProvider>
  );
}

export default App;
