/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
// [해결] 페이지 이동을 위한 useNavigate 임포트 유지
import { useNavigate } from 'react-router-dom';
import { S } from './Signup.styles.js';

// [해결] App.jsx로부터 setIsLoggedIn 함수를 Props로 받는 버전 선택
export const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // 1. 입력 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phone: '',
    address: ''
  });

  // 2. 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. 완료 버튼 클릭 핸들러 [해결: 가입 완료 로직 포함 버전]
  const handleSubmit = () => {
    console.log('회원가입 데이터:', formData);
    
    // 필수 입력값 체크
    if (!formData.name || !formData.nickname) {
      alert("이름과 닉네임은 필수 입력 항목입니다.");
      return;
    }

    // [핵심] 회원가입 절차 완료 로직
    // 1. DB에 가입된 유저임을 기록 (재로그인 시 분기용)
    localStorage.setItem('isRegistered', 'true');
    
    // 2. 로그인 상태 데이터 저장 (새로고침 시 유지용)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', formData.name || '진현'); // 입력한 이름을 저장

    // 3. App.jsx의 상태를 업데이트하여 즉시 헤더 UI(로그아웃 버튼 등)를 바꿈
    if (setIsLoggedIn) {
      setIsLoggedIn(true);
    }

    alert(`${formData.name}님, 가입 정보가 입력되었습니다!`);
    
    // 4. 메인 페이지로 이동
    navigate('/');
  };

  return (
    <div css={S.container}>
      <header css={S.header}>
        {/* [해결] 로고 클릭 시 메인으로 이동하는 기능 포함 */}
        <div css={S.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          ALLWAY-<span>S</span>
        </div>
      </header>

      <main css={S.card}>
        <h2 css={S.title}>추가 정보 입력</h2>
        
        <div css={S.inputList}>
          <input 
            css={S.input} 
            name="name"
            placeholder="이름" 
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            css={S.input} 
            name="nickname"
            placeholder="닉네임" 
            value={formData.nickname}
            onChange={handleChange}
          />
          <input 
            css={S.input} 
            name="phone"
            placeholder="휴대폰" 
            value={formData.phone}
            onChange={handleChange}
          />
          <input 
            css={S.input} 
            name="address"
            placeholder="주소" 
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button css={S.submitButton} onClick={handleSubmit}>완료</button>
      </main>
    </div>
  );
};

export default Signup;