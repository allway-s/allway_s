/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.styles.js';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    // 백엔드 연결 시 OAuth 주소로 이동하는 로직이 들어갈 자리입니다.
  };

  return (
    <div css={S.container}>
      <header css={S.header}>
        <div css={S.logo}>ALLWAY-<span>S</span></div>
      </header>

      <main css={S.card}>
        <h2 css={S.title}>LOGIN</h2>
        
        <div css={S.buttonGroup}>
          <button 
            css={S.socialButton('naver')} 
            onClick={() => handleLogin('네이버')}
          >
            네이버 로그인
          </button>
          <button 
            css={S.socialButton('google')} 
            onClick={() => handleLogin('구글')}
          >
            구글 로그인
          </button>
        </div>

        
      </main>
    </div>
  );
};

export default Login;