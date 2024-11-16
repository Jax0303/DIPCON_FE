import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar__wrapper">
        {/* 네비게이션 메뉴 */}
        <ul className="navbar__menu">
          <li>
            <NavLink to="/contract-management" className={({ isActive }) => (isActive ? "active" : "")}>
              계약관리
            </NavLink>
          </li>
          <li>
            <NavLink to="/document-management" className={({ isActive }) => (isActive ? "active" : "")}>
              문서관리
            </NavLink>
          </li>
          <li>
            <NavLink to="/transaction-integration" className={({ isActive }) => (isActive ? "active" : "")}>
              거래통합
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
              설정하기
            </NavLink>
          </li>
        </ul>

        {/* 우측 샘플 유틸리티 아이콘 */}
        <div className="navbar__utilities">
          <div className="icon">
            <NotificationsNoneOutlinedIcon />
          </div>
          <div className="icon">
            <ChatBubbleOutlineOutlinedIcon />
          </div>
          <div className="icon">
            <SettingsOutlinedIcon />
          </div>
        </div>

        {/* 도움말 및 문의하기 샘플 버튼 */}
        <div className="navbar__buttons">
          <Link to="/help" className="helpButton">
            <HelpOutlineIcon className="icon" />
            도움말
          </Link>
          <Link to="/contact" className="contactButton">
            <QuestionAnswerOutlinedIcon className="icon" />
            문의하기
          </Link>
          {loggedInUser ? (
            <span className="username">안녕하세요, {loggedInUser.name} 님!</span>
          ) : (
            <Link to="/login" className="loginButton">
              로그인
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
