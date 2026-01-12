/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.styles.js';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    
    // [추가] 가상의 회원가입 여부 확인 (브라우저 로컬 저장소 활용)
    const isRegistered = localStorage.getItem('isRegistered') === 'true';

    // [변경/추가] 가입 여부에 따른 페이지 분기 처리
    if (!isRegistered) {
      // 1. 처음 방문한 사람이라면? -> 추가 정보 페이지(Signup)로 보냅니다.
      alert(`${provider} 인증 성공! 우리 서비스가 처음이시군요. 추가 정보를 입력해주세요.`);
      navigate('/signup'); 
    } else {
      // 2. 이미 가입된 기록이 있다면? -> 바로 로그인 처리 후 메인으로 보냅니다.
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', '진현'); // 가상 데이터
      
      if (setIsLoggedIn) setIsLoggedIn(true);
      
      alert(`${provider} 계정으로 다시 오신 걸 환영합니다!`);
      navigate('/');
    }
  };

  return (
    <div css={S.container}>
      <header css={S.header} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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