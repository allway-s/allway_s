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
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phoneNumber: '',
    address: ''
  });

  // 이름 관련 메세지 및 상태
  const [nameMessage, setNameMessage] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  // 닉네임 관련 메세지 및 상태
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNickNameValid, setIsNicknameValid] = useState(false);
  // 폰번호 관련 메세지 및 상태
  const [phoneNumMessage, setPhoneNumMessage] = useState('');
  const [isPhoneNumValid, setIsPhoneNumValid] = useState(false);

  // 주소창에 oauth2ID 없으면 차단
  useEffect(() => {
    if (!oauth2Id) {
      alert("잘못된 접근입니다.");
      navigate("/", { replace: true });
    }
  }, [oauth2Id, navigate]);

  // 이름에 대한 실시간 검사
  useEffect(() => {
    if (!formData.name) {
      setNameMessage('');
      setIsNameValid(false);
      return;
    }
    const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;
    if (nameRegex.test(formData.name)) {
      setNameMessage('');
      setIsNameValid(true);
    } else {
      setNameMessage("이름 형식이 올바르지 않습니다.");
      setIsNameValid(false);
    }
  }, [formData.name]);
  
  // 닉네임에 대한 실시간 검사
  useEffect(() => {
    if (!formData.nickname) {
      setNicknameMessage('');
      setIsNicknameValid(false);
      return;
    }
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    if (nicknameRegex.test(formData.nickname)) {
      setNicknameMessage('');
      setIsNicknameValid(true);
    } else {
      setNicknameMessage("닉네임 형식이 올바르지 않습니다.");
      setIsNicknameValid(false);
    }
  }, [formData.nickname]);
  
  // 휴대폰 번호 검사
  useEffect(() => {
    if (!formData.phoneNumber) {
      setPhoneNumMessage('');
      setIsPhoneNumValid(false);
      return;
    }
    const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    
    if (phoneRegex.test(formData.phoneNumber)) {
      setPhoneNumMessage('');
      setIsPhoneNumValid(true);
    } else {
      setPhoneNumMessage("휴대폰 번호 형식이 올바르지 않습니다.");
      setIsPhoneNumValid(false);
    }
  }, [formData.phoneNumber]);
  

  // 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // 닉네임 수정시 중복환인 초기화
    if (name === 'nickname') {
    setIsNicknameAvailable(null);
    setChkNickMessage('');
  }
  };

  // 닉네임 중복 확인 버튼
  const handleCheckNickname = async () => {
      if (!formData.nickname.trim()) {
        setChkNickMessage('');
        setIsNicknameAvailable(false);
        return;
      }
      
      if (!isNickNameValid) {
        setChkNickMessage('형식이 맞지 않습니다.');
        setIsNicknameAvailable(false);
        return;
      }

      try {
        const response = await api.get(`/api/auth/check-nickname?nickname=${formData.nickname}`);
        const isDuplicate = response.data;

        if (isDuplicate) {
          setChkNickMessage("이미 사용 중인 닉네임입니다");
          setIsNicknameAvailable(false);
        } else {
          setChkNickMessage("사용 가능합니다");
          setIsNicknameAvailable(true);
        }
      } catch (error) {
        console.log("에러 발생");
      }
    };

  // formData 백엔드로 전송
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

  
  return (
    <div css={S.container}>
      <main css={S.card}>
        <h2 css={S.title}>회원가입</h2>
        
        <div css={S.inputList}>
          <div>
            <input 
            css={S.input} 
            name="name"
            placeholder="이름(한글 또는 영문 2~20자)" 
            value={formData.name}
            onChange={handleChange}
            maxLength={10}
          />

            <span css={S.checkMessage(isNameValid)}>{nameMessage}</span>
          </div>
          
          <div>
            <div style={{display:'flex', gap:'7px'}}>
              <input 
              css={S.input} 
              name="nickname"
              placeholder="닉네임(특수문자를 제외한 2~10자)" 
              value={formData.nickname}
              onChange={handleChange}
              />
              <button css={S.checkNickname} onClick={handleCheckNickname} type="button">중복 확인</button>
            </div>
            <span css={S.checkMessage(isNickNameValid && isNicknameAvailable)}>
              {chkNickMessage || nicknameMessage}
            </span>
          </div>
          
          <div>
            <input 
            css={S.input} 
            name="phoneNumber"
            placeholder="휴대폰(예시: 010-1234-5678)"
            value={formData.phoneNumber}
            onChange={handleChange}
            />

            <span css={S.checkMessage(isPhoneNumValid)}>{phoneNumMessage}</span>
          </div>
          
          <input 
            css={S.input} 
            name="address"
            placeholder="주소" 
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <span style={{marginBottom: "5px"}}>{formErrorMessage}</span>

        <button css={S.submitButton}
                onClick={handleSubmit}
                disabled={!isNameValid || !isNickNameValid || !isPhoneNumValid || !formData.address.trim() || isNicknameAvailable !== true || isSubmitting}
                >완료</button>
      </main>
    </div>
  );
};

export default Signup;