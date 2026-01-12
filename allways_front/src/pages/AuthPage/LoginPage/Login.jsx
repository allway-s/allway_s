/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.styles.js';

// [해결] Props로 setIsLoggedIn을 받는 버전 선택
const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    
    // [해결] 31-마이페이지 브랜치의 핵심: 가입 여부 확인 로직 유지
    const isRegistered = localStorage.getItem('isRegistered') === 'true';

    // 가입 여부에 따른 페이지 분기 처리
    if (!isRegistered) {
      // 1. 처음 방문한 사람이라면? -> 추가 정보 페이지(Signup)로 이동
      alert(`${provider} 인증 성공! 우리 서비스가 처음이시군요. 추가 정보를 입력해주세요.`);
      navigate('/signup'); 
    } else {
      // 2. 이미 가입된 기록이 있다면? -> 바로 로그인 처리 후 메인으로 이동
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', '진현'); // 가상 데이터
      
      // App.jsx의 상태 업데이트
      if (setIsLoggedIn) setIsLoggedIn(true);
      
      alert(`${provider} 계정으로 다시 오신 걸 환영합니다!`);
      navigate('/');
    }
  };

  return (
    <div css={S.container}>
      {/* [해결] 로고 클릭 시 메인 이동 기능 포함 버전 선택 */}
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