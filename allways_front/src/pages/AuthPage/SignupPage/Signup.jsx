/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { S } from './Signup.styles.js';

export const Signup = () => {
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

  // 3. 완료 버튼 클릭 핸들러
  const handleSubmit = () => {
    console.log('회원가입 데이터:', formData);
    alert(`${formData.name}님, 가입 정보가 입력되었습니다!`);
    // 여기에 나중에 서버 전송 로직이 들어갑니다.
  };

  return (
    <div css={S.container}>
      <header css={S.header}>
        <div css={S.logo}>ALLWAY-<span>S</span></div>
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