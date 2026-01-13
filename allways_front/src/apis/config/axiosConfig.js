import axios from "axios";

// 1. axios 인스턴스 생성
export const api = axios.create({
    baseURL: "http://localhost:8080", // 서버 주소
    withCredentials: true             // 쿠키 공유가 필요하다면 추가
});

// 2. 요청 인터셉터 설정 (모든 api.get/post/put 이전에 실행됨)
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken"); 
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});