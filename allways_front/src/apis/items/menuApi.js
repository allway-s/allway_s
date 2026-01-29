import { api } from "../config/axiosConfig";

// 카테고리별 아이템(빵, 메인 등) 조회
export const getItems = (category) => api.get(`/api/items?categoryName=${category}`);

// 카테고리별 재료(야채, 소스 등) 조회
export const getIngredients = (category) => api.get(`/api/ingredients?categoryName=${category}`);

// 모든 세트 메뉴 목록 조회
export const getSets = () => api.get("/api/sets");

// 특정 세트 상세 정보 (구성품 + 옵션 리스트)
export const getSetDetail = (setId) => api.get(`/api/sets/${setId}/detail`);
