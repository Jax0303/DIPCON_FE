// src/components/contractpopup/ContractPopup.jsx

import React, { useState } from 'react';
import './ContractPopup.scss';

const ContractPopup = ({ isOpen, onClose }) => {
  const [signers, setSigners] = useState([{ name: '', email: '' }]);

  const addSigner = () => {
    setSigners([...signers, { name: '', email: '' }]);
  };

  const removeSigner = (index) => {
    setSigners(signers.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="contractPopupOverlay">
      <div className="contractPopup">
        <div className="popupHeader">
          <h2>계약 서명 요청</h2>
          <button onClick={onClose} className="closeButton">X</button>
        </div>
        <div className="partition"></div> {/* 파티션 추가 */}

        <div className="signingMethod">
          <label>서명 진행 방법</label>
          <div className="radioGroup">
            <label>
              <input type="radio" name="signMethod" defaultChecked />
              순서대로 서명
            </label>
            <label>
              <input type="radio" name="signMethod" />
              순서없이 서명
            </label>
          </div>
        </div>

        <div className="partition"></div> {/* 파티션 추가 */}

        <div className="signerList">
          {signers.map((signer, index) => (
            <div className="signerSection" key={index}>
              <div className="signerHeader">
                <span>{index + 1} 번째 서명자</span>
                <button onClick={() => removeSigner(index)} className="removeSignerButton">X</button>
              </div>
              <input type="text" placeholder="이름" value={signer.name} />
              <input type="email" placeholder="이메일(해당 이메일로 알림을 보냅니다)" value={signer.email} />
            </div>
          ))}
          <button onClick={addSigner} className="addSignerButton">+ 서명자 추가하기</button>
        </div>

        <div className="partition"></div> {/* 파티션 추가 */}

        <div className="popupFooter">
          <button className="backButton">이전 단계로</button>
          <button className="nextButton">다음 단계로</button>
        </div>
      </div>
    </div>
  );
};

export default ContractPopup;
