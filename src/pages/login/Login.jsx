import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

const BASE_URL = 'http://127.0.0.1:8000'; // 백엔드 서버의 URL

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { id, password },
        { withCredentials: true }  // 쿠키 전송을 위한 옵션
      );
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        // 로그인 성공 시 홈으로 이동
        navigate('/Home');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert('ID 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 className="logo">DIPCON</h1>
        <div className="tabMenu">
          <button className="tab active">ID/PW</button>
          <button className="tab">일회용 번호</button>
          <button className="tab">QR코드</button>
        </div>
        <div className="inputBox">
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="options">
          <label>
            <input type="checkbox" /> 로그인 상태 유지
          </label>
          <button className="securityToggle">IP보안 <span className="securityStatus">ON</span></button>
        </div>
        <button className="loginButton" onClick={handleLogin}>로그인</button>
        <div className="links">
          <a href="#">비밀번호 찾기</a> | <a href="#">아이디 찾기</a> |
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
