import axios from "axios";

// axios 인스턴스 생성
export const api = axios.create({
    baseURL: "http://localhost:8080", // 서버 주소
    withCredentials: true             // 쿠키 공유가 필요하다면 추가
});

// 요청 인터셉터 설정 (모든 api.get/post/put 이전에 실행됨)
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("accessToken"); 
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => Promise.reject(error));

export const ResponseInterceptor = (navigate, setIsLoggedIn) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                const { status, data } = error.response
                const message = data.message;

                switch(status) {
                    case 400:
                        break;
                    case 401:
                        localStorage.removeItem("accessToken");
                        setIsLoggedIn(false);
                        navigate("/login", { replace: true });  
                        break;
                    case 403: 
                        navigate("/", { replace: true });
                        break;
                    case 500:
                        break;
                }
            }
            return Promise.reject(error);
        }
    );
};