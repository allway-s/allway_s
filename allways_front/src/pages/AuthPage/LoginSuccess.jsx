import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../apis/config/axiosConfig";

export const LoginSuccess = ({setIsLoggedIn}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const oauth2Id = searchParams.get("oauth2Id");
        const email = searchParams.get("email");
        
        // ✅ Case 1: 기존 회원 - 토큰으로 로그인
        if (token) {
            localStorage.setItem("accessToken", token);
            
            // 토큰 유효성 검증
            api.get("/api/user/me")
                .then(() => {
                    setIsLoggedIn(true);
                    navigate("/", { replace: true });
                })
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    alert("유효하지 않은 접근입니다.");
                    navigate("/login", { replace: true });
                });
        } 
        // ✅ Case 2: 신규 회원 - 회원가입 페이지로
        else if (oauth2Id && email) {
            navigate(`/auth/signup?oauth2Id=${oauth2Id}&email=${email}`, { replace: true });
        }
        // ✅ Case 3: 잘못된 접근
        else {
            alert("로그인 정보가 없습니다.");
            navigate("/login", { replace: true });
        }
    }, [searchParams, navigate, setIsLoggedIn]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <h2>로그인 처리 중입니다. 잠시만 기다려 주세요...</h2>
        </div>
    );
};