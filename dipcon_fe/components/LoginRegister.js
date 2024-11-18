import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const LoginRegister = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById('container');
    if (!container) {
      console.error('Container element not found!');
      return;
    }

    const toggle = () => {
      container.classList.toggle('sign-in');
      container.classList.toggle('sign-up');
    };

    // 초기 상태 설정
    setTimeout(() => {
      container.classList.add('sign-in');
    }, 200);

    const pointerElements = document.querySelectorAll('.pointer');
    pointerElements.forEach((element) => {
      element.addEventListener('click', toggle);
    });

    return () => {
      pointerElements.forEach((element) => {
        element.removeEventListener('click', toggle);
      });
    };
  }, []);

  const handleSignInClick = () => {
    onLoginSuccess();
    navigate('/home');
  };

  return (
    <div id="container" className="container">
      <div className="row">
        {/* SIGN UP SECTION */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Confirm password" />
              </div>
              <button>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b className="pointer">Sign in here</b>
              </p>
            </div>
          </div>
        </div>

        {/* SIGN IN SECTION */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" />
              </div>
              <button onClick={handleSignInClick}>Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b className="pointer">Sign up here</b>
              </p>
            </div>
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="row content-row">
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>DIPCON</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
