import { api } from "../config/axiosConfig";

// [GET] 특정 카테고리의 식재료 조회
export const getIngredients = (category) => {
    return api.get(`/api/menu/ingredients/${category}`); 
};

// [GET] 특정 카테고리의 아이템 조회
export const getItems = (category) => {
    return api.get(`/api/menu/items/${category}`);
};

// [POST] 커스텀 조합 생성 또는 조회
export const getOrCreateProduct = (productReqDto) => {
    return api.post(`/api/menu/product`, productReqDto);
};

// [POST] 실제 주문 생성 (CartPage에서 사용)
export const createOrder = (orderData) => {
    // 백엔드에 해당 엔드포인트가 구성되어 있어야 합니다.
    return api.post(`/api/v1/orders`, orderData);
};

// [GET] 프리셋 조회
export const getMyPresets = (userId) => {
    return api.get(`/api/v1/list/${userId}`);
};