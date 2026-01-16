import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from '../../apis/config/axiosConfig.js';


export const LoginSuccess = ({setIsLoggedIn}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("accessToken", token);

            // 2. 내 정보 조회 API 등을 호출하여 토큰 유효성 검증
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