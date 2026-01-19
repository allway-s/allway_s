import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../apis/config/axiosConfig";

export const LoginSuccess = ({setIsLoggedIn}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // 이미 토큰이 있는 유저가 들어온 경우 차단
        if (!!localStorage.getItem("accessToken")) {
            navigate("/", { replace: true });
            return; // 아래 로직은 실행하지 않고 종료
        }
        const token = searchParams.get("token");
        
        if (token) {
            localStorage.setItem("accessToken", token);
            // 토큰 유효성 검증
            api.get("/api/user/me")
                .then(() => {
                    setIsLoggedIn(true);
                    alert("로그인 성공!");  
                    navigate("/", { replace: true });
                })
                .catch(() => {
                    // 가짜 토큰이거나 만료된 경우 여기로 옴
                    localStorage.removeItem("accessToken");
                    alert("유효하지 않은 접근입니다.");
                    navigate("/login", { replace: true });
                });
        }
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>로그인 처리 중입니다. 잠시만 기다려 주세요...</h2>
        </div>
    );
};