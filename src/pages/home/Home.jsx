import React from 'react';
import './Home.scss';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <header className="welcomeMessage">
          Sample Text
        </header>
        <div className="statusIcons">
          <div className="statusIcon">
            <div className="icon">👤</div>
            <div>계약자 수</div>
            <div>100</div>
          </div>
          <div className="statusIcon">
            <div className="icon">📄</div>
            <div>계약 문서 수</div>
            <div>200</div>
          </div>
          <div className="statusIcon">
            <div className="icon">📈</div>
            <div>진행중인 계약</div>
            <div>50</div>
          </div>
        </div>
        <div className="cardSection">
          <div className="card">
            <div className="cardIcon">📁</div>
            <p>내 파일함</p>
            <button>Start</button>
          </div>
          <div className="card">
            <div className="cardIcon">📄</div>
            <p>내 문서</p>
            <button>Start</button>
          </div>
          <div className="card">
            <div className="cardIcon">📑</div>
            <p>내 서식함</p>
            <button>Start</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;