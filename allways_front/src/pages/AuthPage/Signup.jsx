/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { S } from './Signup.styles.js';
import { api } from '../../apis/config/axiosConfig.js';

// [해결] App.jsx로부터 setIsLoggedIn 함수를 Props로 받는 버전 선택
export const Signup = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oauth2Id = searchParams.get("oauth2Id");
  const email = searchParams.get("email");

  // 주소창에 oauth2ID 없으면 차단
  useEffect(() => {
    if (!oauth2Id) {
      alert("잘못된 접근입니다.");
      navigate("/", { replace: true });
    }
  }, [oauth2Id, navigate]);

  // 1. 입력 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phoneNumber: '',
    address: ''
  });
  
  // 2. 입력값 변경 시 호출되는 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
        const signupData = {
            ...formData,
            oauth2Id,
            email,
        };
        try {
          const response = await api.post("/api/auth/signup", signupData);

          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setIsLoggedIn(true);
            alert("가입 완료!");
            navigate("/", { replace: true });
          }
        } catch(error) {
          alert("가입 실패: " + (error.response?.data?.message || "오류 발생"));
        }
    };

  return (
    <div css={S.container}>
      {/* <header css={S.header}>
        <div css={S.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          ALLWAY-<span>S</span>
        </div>
      </header> */}

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
            name="phoneNumber"
            placeholder="휴대폰" 
            value={formData.phoneNumber}
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