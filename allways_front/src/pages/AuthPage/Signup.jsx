/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { S } from './Signup.styles.js';
import { api } from '../../apis/config/axiosConfig.js';

export const Signup = ({setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oauth2Id = searchParams.get("oauth2Id");
  const email = searchParams.get("email");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chkNickMessage, setChkNickMessage] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [formErrorMessage, setFormErrorMessage] = useState('');

  // 주소창에 oauth2ID 없으면 차단
  useEffect(() => {
    if (!oauth2Id) {
      alert("잘못된 접근입니다.");
      navigate("/", { replace: true });
    }
  }, [oauth2Id, navigate]);

  // 입력 데이터
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phoneNumber: '',
    address: ''
  });
  
  // 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
      setFormErrorMessage('');

      if (isSubmitting) return;

      if (!formData.name.trim()) return setFormErrorMessage("이름을 입력해주세요.");
      if (!formData.nickname.trim()) return setFormErrorMessage("닉네임을 입력해주세요.");
      if (!formData.phoneNumber.trim()) return setFormErrorMessage("전화번호를 입력해주세요.");
      if (!formData.address.trim()) return setFormErrorMessage("주소를 입력해주세요.");

      if (isNicknameAvailable !== true) return setFormErrorMessage("닉네임 중복 확인이 필요합니다.");

      setIsSubmitting(true)

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
        if (error.response?.status === 400) {
          const { errors, message } = error.response.data;
          setFormErrorMessage(errors ? Object.values(errors)[0] : message);
        }
        
      } finally {
        setIsSubmitting(false);
      }
    };

  const handleCheckNickname = async () => {

    try {
      const response = await api.get(`/api/auth/check-nickname?nickname=${formData.nickname}`);
      const isDuplicate = response.data;

      if (isDuplicate) {
        setChkNickMessage("이미 사용 중인 닉네임입니다-프론트.");
        setIsNicknameAvailable(false);
      } else {
        setChkNickMessage("사용 가능한 닉네임입니다.-프론트");
        setIsNicknameAvailable(true);
      }
    } catch (error) {
      console.log("에러 발생-프론트 메세지");
    }
  };
  
  return (
    <div css={S.container}>
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

          <div style={{display:'flex', gap:'5px'}}>
            <input 
            css={S.input} 
            name="nickname"
            placeholder="닉네임" 
            value={formData.nickname}
            onChange={handleChange}
            />
            <button onClick={handleCheckNickname}>중복 확인</button>
              
          </div>
          
          <span style={{fontSize: '15px', lineHeight: '15px', height:'15px'}}>{chkNickMessage}</span>

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

        <span>{formErrorMessage}</span>

        <button css={S.submitButton} onClick={handleSubmit} disabled={isSubmitting}>완료</button>
      </main>
    </div>
  );
};

export default Signup;