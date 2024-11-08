// src/components/RegisterSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterSuccess.scss';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/'); // 메인 화면으로 이동
  };

  return (
    <div className="registerSuccessContainer">
      <h1>가입 완료!</h1>
      <p>회원가입이 성공적으로 완료되었습니다.</p>
      <button onClick={handleLogin} className="loginButton">가입한 계정으로 로그인하기</button>
    </div>
  );
};

export default RegisterSuccess;
