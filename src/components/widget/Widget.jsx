/*대시보드(홈) 위젯 */
import React from 'react'
import './Widget.scss'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'

const Widget = ({ type }) => {
  let data

  const amount = 100
  const diff = 20

  switch (type) {
    case 'user':
      data = {
        title: '사용자',
        isMoney: false,
        link: '모든 사용자 보기',
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      }
      break
    case 'order':
      data = {
        title: '계약 체결 수',
        isMoney: false,
        link: '모든 계약서 보기',
        icon: (
          <ArticleOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      }
      break
    case 'earning':
      data = {
        title: '수입',
        isMoney: true,
        link: '순이익 보기',
        icon: <MonetizationOnOutlinedIcon className="icon" style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }} />,
      }
      break
    case 'balance':
      data = {
        title: '자본',
        isMoney: true,
        link: '자세히 보기',
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              color: 'purple',
            }}
          />
        ),
      }
      break
    default:
      break
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && '$'} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  )
}

export default Widget
