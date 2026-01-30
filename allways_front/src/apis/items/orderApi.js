import { api } from "../config/axiosConfig";

// ✅ Product 생성 API 추가
export const createProduct = (data) => api.post("/api/products", data);

// 커스텀 상품 생성 또는 기존 ID 찾기
export const calculateProductPrice = (productId) => api.get(`/api/products/${productId}/price`);

export const getOrderHistory = (userId) => api.get("/api/orders/history", { params: { userId } });

// 주문 생성
export const createOrder = (orderData) => api.post("/api/orders", orderData);

// 주문 상세 내역 조회
export const getOrderDetail = (orderId) => api.get(`/api/orders/${orderId}/details`);