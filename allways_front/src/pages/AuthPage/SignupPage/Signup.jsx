/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
// [추가] 가입 완료 후 메인 페이지로 이동시키기 위해 필요합니다.
import { useNavigate } from 'react-router-dom';
import { S } from './Signup.styles.js';

// [변경] App.jsx로부터 setIsLoggedIn 함수를 Props로 받습니다.
export const Signup = ({ setIsLoggedIn }) => {
  // [추가] 페이지 이동을 위한 navigate 선언
  const navigate = useNavigate();

  // 1. 입력 데이터 상태 관리 [유지]
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phone: '',
    address: ''
  });

  // 2. 입력값 변경 핸들러 [유지]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. 완료 버튼 클릭 핸들러 [변경/추가]
  const handleSubmit = () => {
    console.log('회원가입 데이터:', formData);
    
    // [추가] 필수 입력값이 비어있는지 간단히 체크 (선택 사항)
    if (!formData.name || !formData.nickname) {
      alert("이름과 닉네임은 필수 입력 항목입니다.");
      return;
    }

    // [추가/핵심] 회원가입 절차 완료 로직
    // 1. DB에 가입된 유저임을 기록 (가상)
    localStorage.setItem('isRegistered', 'true');
    
    // 2. 로그인 상태 데이터 저장 (새로고침 유지용)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', formData.name || '진현'); // 입력한 이름을 저장

    // 3. App.jsx의 상태를 깨워서 즉시 헤더 UI를 바꿈
    if (setIsLoggedIn) {
      setIsLoggedIn(true);
    }

    // [유지] 기존 알림창
    alert(`${formData.name}님, 가입 정보가 입력되었습니다!`);
    
    // [추가] 메인 페이지로 이동 (이제 상단바가 바뀐 상태로 보임)
    navigate('/');
  };

  return (
    <div css={S.container}>
      <header css={S.header}>
        {/* [추가] 로고 클릭 시 메인으로 돌아가는 기능 */}
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

        {/* [유지] 버튼 클릭 시 수정된 handleSubmit 실행 */}
        <button css={S.submitButton} onClick={handleSubmit}>완료</button>
      </main>
    </div>
  );
};

export default Signup;