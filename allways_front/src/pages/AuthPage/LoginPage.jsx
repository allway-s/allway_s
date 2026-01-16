/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.styles.js';


const Login = () => {
  const navigate = useNavigate();

  const handleOAuth2LoginOnClick = (e) => {
    const clientName = e.target.id;
    window.location.href =
      'http://localhost:8080/oauth2/authorization/' + clientName;
  };

  return (
    <div css={S.container}>
    
      <main css={S.card}>
        <h2 css={S.title}>LOGIN</h2>

        <div css={S.buttonGroup}>
          <button
            id='naver'
            css={S.socialButton('naver')}
            onClick={handleOAuth2LoginOnClick}
          >
            네이버 로그인
          </button>
          <button
            id='google'
            css={S.socialButton('google')}
            onClick={handleOAuth2LoginOnClick}
          >
            구글 로그인
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
