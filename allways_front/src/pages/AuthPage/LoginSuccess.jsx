import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const LoginSuccess = ({ setIsLoggedIn }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // 1. 주소창의 쿼리 스트링에서 'token' 값을 추출합니다.
        const token = searchParams.get("token");

        if (token) {
            // 2. 브라우저의 저장소(localStorage)에 'accessToken'이라는 이름으로 저장합니다.
            // 앞으로 우리가 만든 api.js(인터셉터)가 여기서 토큰을 꺼내 쓸 거예요.
            localStorage.setItem("accessToken", token);
            
            // [중요 추가] App.jsx의 로그인 상태를 true로 변경합니다.
            // 이 코드가 실행되는 순간 App.jsx의 문지기(ProtectedRoute)들이 길을 열어줍니다.
            if (setIsLoggedIn) {
                setIsLoggedIn(true);
            }

            // 3. 성공 알림을 띄우고 메인 페이지로 보냅니다.
            alert("로그인에 성공하였습니다!");
            navigate("/"); 
        } else {
            // 토큰이 없는 비정상적 접근일 경우
            alert("로그인 정보가 유효하지 않습니다.");
            navigate("/auth/login");
        }
    }, [searchParams, navigate, setIsLoggedIn ]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>로그인 처리 중입니다. 잠시만 기다려 주세요...</h2>
        </div>
    );
};