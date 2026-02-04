import { api } from "../config/axiosConfig";

// 커스텀 상품 생성 또는 기존 ID 찾기
export const createProduct = (data) => api.post(`/api/products`, data);

export const productIngredient = (productId) => api.get(`api/products/${productId}`)

// 상품 가격 계산
export const calculateProductPrice = (productId) => api.get(`/api/products/${productId}/price`);

export const getOrderHistory = () => api.get(`/api/orders/history`); 

export const createOrder = (orderData) => api.post(`/api/orders`, orderData);

// 주문 상세 내역 조회
export const getOrderDetail = (orderId) => api.get(`/api/orders/${orderId}/details`);

// 결제 검증
export const verifyPayment = (verifyData) => api.post(`/api/payment/verify`, verifyData);

export const cancelOrder = async (orderNumber) => {
    const response = await api.put(`/api/orders/${orderNumber}/cancel`);
    return response;
};