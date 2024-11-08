// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import './Register.scss';

const Register = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      id, // 사용자 ID
      username, // 사용자 이름
      password, // 비밀번호
      email, // 이메일
    };
    try {
      await registerUser(userData);
      setError('');
      // 회원가입 성공 시 RegisterSuccess 페이지로 이동
      navigate('/register-success');
    } catch (error) {
      setError('Error registering user.');
    }
  };

  return (
    <div className="Register">
      <h1 className="title">Register New User</h1>
      <form onSubmit={handleSubmit} className="RegisterForm">
        <div className="formGroup">
          <label>ID</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div className="formGroup">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="formGroup">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="formGroup">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="submitButton">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
