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
}, error => Promise.reject(error));

export const ResponseInterceptor = (navigate, setIsLoggedIn) => {
    // 기존에 등록된 인터셉터가 있다면 제거
    api.interceptors.response.handlers = [];

    api.interceptors.response.use(
        (response) => response, // 성공 시 통과
        (error) => {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data.message;

                if (status === 401) {
                    localStorage.removeItem("accessToken");
                    setIsLoggedIn(false);
                    alert(message || "세션이 만료되었습니다. 다시 로그인해주세요.");
                    navigate("/login", { replace: true });
                } 
                else if (status === 403) {
                    alert(message || "접근 권한이 없습니다.");
                    navigate("/", { replace: true });
                }
            }
            return Promise.reject(error);
        }
    );
};