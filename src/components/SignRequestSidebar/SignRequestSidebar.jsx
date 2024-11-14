import React from 'react';
import './SignRequestSidebar.scss';

const SignRequestSidebar = () => {
  return (
    <div className="sign-request-sidebar">
      <h3>서명/도장</h3>
      <ul>
        <li draggable="true">서명</li>
        <li draggable="true">도장</li>
      </ul>
    </div>
  );
};

export default SignRequestSidebar;
