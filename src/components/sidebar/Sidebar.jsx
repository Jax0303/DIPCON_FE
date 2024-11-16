import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

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

import Stage1 from '../contractpopup/Stage1'; // Stage1 컴포넌트 import

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [expanded, setExpanded] = useState({});

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">DIPCON</span>
        </Link>
      </div>
      <hr />
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
              <li><SendIcon className="icon" /> 보낸 계약</li>
              <li><InboxIcon className="icon" /> 받은 계약</li>
              <li><SaveIcon className="icon" /> 임시 저장</li>
            </ul>
          )}
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

          <li>
            <DeleteIcon className="icon" />
            <span>휴지통</span>
          </li>
        </ul>
      </div>
      {/* Stage1 팝업 */}
      {isPopupOpen && <Stage1 isOpen={isPopupOpen} onClose={handleClosePopup} />}
    </div>
  );
};

export default Sidebar;
