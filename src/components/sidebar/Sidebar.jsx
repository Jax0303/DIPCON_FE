import { DarkModeContext } from '../../context/darkModeContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.scss'

import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import StoreIcon from '@mui/icons-material/Store'
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsertChartIcon from '@mui/icons-material/InsertChart'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext)
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">DIPCON Master 대시보드</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Home</p>
          <li>
            <DashboardIcon className="icon" />
            <span>대시보드</span>
          </li>
          <p className="title">Client</p>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>사용자</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className="icon" />
              <span>기관</span>
            </li>
          </Link>
          <p className="title">Contract</p>
          <li>
            <AssignmentIcon className="icon" />
            <span>문서함</span>
          </li>
          <li>
            <SummarizeOutlinedIcon className="icon" />
            <span>템플릿</span>
          </li>
          <p className="title">Service</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>시스템 설정</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>로그</span>
          </li>
          <p className="title">User</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>프로필</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>로그아웃</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: 'DARK' })}></div>
      </div>
    </div>
  )
}

export default Sidebar
