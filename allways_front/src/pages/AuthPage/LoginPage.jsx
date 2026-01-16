/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.styles.js';

// [해결] Props로 setIsLoggedIn을 받는 버전 유지
const Login = () => {

  const handleOAuth2LoginOnClick = (clientName) => {
    window.location.href =
      `http://localhost:8080/oauth2/authorization/${clientName}`;
  };

  return (
    <div css={S.container}>
      <main css={S.card}>
        <h2 css={S.title}>LOGIN</h2>

        <div css={S.buttonGroup}>
          <button
            css={S.socialButton('naver')}
            onClick={() => handleOAuth2LoginOnClick('naver')}
          >
            네이버 로그인
          </button>
          <button
            css={S.socialButton('google')}
            onClick={() => handleOAuth2LoginOnClick('google')}
          >
            구글 로그인
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
