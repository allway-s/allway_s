/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.styles.js';

// [해결] Props로 setIsLoggedIn을 받는 버전 유지
const Login = () => {
  const handleOAuth2LoginOnClick = (e) => {
        const clientName = e.target.id;
        window.location.href = "http://localhost:8080/oauth2/authorization/" + clientName;
    }


  return (
    <div css={S.container}>
      {/* [해결] 로고 클릭 시 메인 이동 기능 포함 버전 유지 */}
      <header css={S.header} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div css={S.logo}>ALLWAY-<span>S</span></div>
      </header>

      <main css={S.card}>
        <h2 css={S.title}>LOGIN</h2>
        
        <div css={S.buttonGroup}>
          <button 
            id="naver"
            css={S.socialButton('naver')} 
            onClick={handleOAuth2LoginOnClick}
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