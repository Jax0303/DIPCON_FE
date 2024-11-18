import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
<<<<<<< HEAD

=======
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
>>>>>>> a3a1779 (.)
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/Inbox';
import SaveIcon from '@mui/icons-material/Save';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ShareIcon from '@mui/icons-material/Share';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
<<<<<<< HEAD

import Stage1 from '../contractpopup/Stage1'; // Stage1 컴포넌트 import

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
=======
import Stage1 from '../contractpopup/Stage1';

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [expanded, setExpanded] = useState('');
>>>>>>> a3a1779 (.)

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleExpand = (section) => {
<<<<<<< HEAD
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
=======
    setExpanded((prev) => (prev === section ? '' : section)); // 단일 열림 방식
>>>>>>> a3a1779 (.)
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">DIPCON</span>
        </Link>
      </div>
      <hr />
<<<<<<< HEAD
      <button onClick={handleOpenPopup} className="requestSignatureButton">계약 시작</button>
      <hr />
      <div className="center">
        <ul>
          <li className="expandable" onClick={() => toggleExpand('contractStorage')}>
            <SendIcon className="icon" />
            <span>계약 보관함</span>
            <ExpandMoreIcon className={`expandIcon ${expanded.contractStorage ? 'rotate' : ''}`} />
          </li>
          {expanded.contractStorage && (
            <ul className="submenu">
=======
      <button onClick={handleOpenPopup} className="requestSignatureButton">
        <BorderColorOutlinedIcon className="buttonIcon" />
        계약 시작
      </button>
      <hr />
      <div className="center">
        <ul>
          {/* 계약 보관함 */}
          <li className="expandable" onClick={() => toggleExpand('contractStorage')}>
            <SendIcon className="icon" />
            <span>계약 보관함</span>
            <ExpandMoreIcon className={`expandIcon ${expanded === 'cont ractStorage' ? 'rotate' : ''}`} />
          </li>
          {expanded === 'contractStorage' && (
            <ul className="submenu expanded">
>>>>>>> a3a1779 (.)
              <li><SendIcon className="icon" /> 보낸 계약</li>
              <li><InboxIcon className="icon" /> 받은 계약</li>
              <li><SaveIcon className="icon" /> 임시 저장</li>
            </ul>
          )}
<<<<<<< HEAD
          <div className="categoryPartition" />

          <li className="expandable" onClick={() => toggleExpand('smartTransfer')}>
            <FolderIcon className="icon" />
            <span>스마트 전송</span>
            <ExpandMoreIcon className={`expandIcon ${expanded.smartTransfer ? 'rotate' : ''}`} />
          </li>
          {expanded.smartTransfer && (
            <ul className="submenu">
              <li><FolderIcon className="icon" /> 대량전송</li>
            </ul>
          )}
          <div className="categoryPartition" />

=======

          <div className="categoryPartition" />

          {/* 스마트 전송 */}
          <li className="expandable" onClick={() => toggleExpand('smartTransfer')}>
            <FolderIcon className="icon" />
            <span>스마트 전송</span>
            <ExpandMoreIcon className={`expandIcon ${expanded === 'smartTransfer' ? 'rotate' : ''}`} />
          </li>
          {expanded === 'smartTransfer' && (
            <ul className="submenu expanded">
              <li><FolderIcon className="icon" /> 대량전송</li>
            </ul>
          )}

          <div className="categoryPartition" />

          {/* 공유 계약 */}
          <li className="expandable" onClick={() => toggleExpand('sharedContract')}>
            <ShareIcon className="icon" />
            <span>공유 계약</span>
            <ExpandMoreIcon className={`expandIcon ${expanded === 'sharedContract' ? 'rotate' : ''}`} />
          </li>
          {expanded === 'sharedContract' && (
            <ul className="submenu expanded">
              <li><FolderSharedIcon className="icon" /> 공유 문서함</li>
            </ul>
          )}

          <div className="categoryPartition" />

          {/* 내 폴더함 */}
          <li className="expandable" onClick={() => toggleExpand('myFolder')}>
            <LibraryBooksIcon className="icon" />
            <span>내 폴더함</span>
            <ExpandMoreIcon className={`expandIcon ${expanded === 'myFolder' ? 'rotate' : ''}`} />
          </li>
          {expanded === 'myFolder' && (
            <ul className="submenu expanded">
              <li><InsertDriveFileIcon className="icon" /> 템플릿</li>
              <li><InsertDriveFileIcon className="icon" /> 동의서</li>
            </ul>
          )}

          <div className="categoryPartition" />

          {/* 외부 문서 보관 */}
          <li className="expandable" onClick={() => toggleExpand('externalStorage')}>
            <FolderIcon className="icon" />
            <span>외부 문서 보관</span>
            <ExpandMoreIcon className={`expandIcon ${expanded === 'externalStorage' ? 'rotate' : ''}`} />
          </li>
          {expanded === 'externalStorage' && (
            <ul className="submenu expanded">
              <li><InsertDriveFileIcon className="icon" /> 기본 문서함</li>
            </ul>
          )}

          <div className="categoryPartition" />

          {/* 기타 옵션 */}
>>>>>>> a3a1779 (.)
          <li>
            <DeleteIcon className="icon" />
            <span>휴지통</span>
          </li>
<<<<<<< HEAD
        </ul>
      </div>
      {/* Stage1 팝업 */}
      {isPopupOpen && <Stage1 isOpen={isPopupOpen} onClose={handleClosePopup} />}
=======
          <li>
            <QueryStatsIcon className="icon" />
            <span>이관데이터 조회</span>
          </li>
        </ul>
      </div>
      <Stage1 isOpen={isPopupOpen} onClose={handleClosePopup} />
>>>>>>> a3a1779 (.)
    </div>
  );
};

export default Sidebar;
