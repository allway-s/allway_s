/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './RecentOrderStyles.js'; 
import { api } from '../../apis/config/axiosConfig.js';

export const RecentOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const decoded = JSON.parse(jsonPayload);
      return decoded.userId || decoded.id || decoded.sub;
    } catch (e) { return null; }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const response = await api.get("/api/orders/history");
        
        // 매퍼의 SELECT 결과와 프론트엔드 매핑
        const mappedData = response.data.map((order) => {
          // 세트 메뉴일 경우 상품명 뒤에 세트 이름을 붙임
          const fullName = order.setName 
            ? `${order.itemName} (${order.setName})` 
            : order.itemName;

          // 음료나 사이드가 선택된 경우 재료 텍스트 뒤에 추가
          let detailOptions = order.ingredientsText || "기본 구성";
          if (order.drinkName) detailOptions += `, 음료: ${order.drinkName}`;
          if (order.sideName) detailOptions += `, 사이드: ${order.sideName}`;

          return {
            ...order,
            productName: fullName || "상품명 없음",
            ingredients: detailOptions,
            // 매퍼의 unit_price, ordered_at 대응
            unitPrice: order.unitPrice || 0,
            totalPrice: (order.unitPrice || 0) * (order.quantity || 1),
            date: order.orderedAt ? order.orderedAt.split(' ')[0] : "날짜 정보 없음"
          };
        });

        setOrders(mappedData);
        console.log("매핑 완료된 데이터:", mappedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleScrapPreset = async (order) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    try {
      const presetReqDto = {
        productId: Number(order.productId),
        userId: userId,
        presetName: `${order.itemName} 프리셋`
      };
      const response = await api.post("/api/preset/scrap", presetReqDto);
      if (response.status === 201 || response.status === 200) alert('내 프리셋에 저장되었습니다!');
    } catch (error) {
      alert("이미 저장된 프리셋이거나 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div css={S.wrapper}>
      <div css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>주문<span>내역</span></h1>
        </div>
      </div>

      <main css={S.historyContainer}>
        {orders.length > 0 ? (
          orders.map((order, idx) => (
            <div key={idx} css={S.orderCard}>
              <div css={S.orderHeader}>
                <span className="date">{order.date}</span>
                <span className="total">수량: {order.quantity}개 / 합계: {Number(order.totalPrice).toLocaleString()}원</span>
              </div>

              <div css={S.itemRow}>
                <div css={S.itemInfo}>
                  <span className="name" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2d2d2d' }}>
                    {order.productName}
                  </span>
                  <span className="options" style={{ color: '#666', fontSize: '0.95rem', marginTop: '6px', display: 'block' }}>
                    구성: {order.ingredients}
                  </span>
                </div>
                <div css={S.itemActions}>
                  <span className="price">단가 {Number(order.unitPrice).toLocaleString()}원</span>
                  <button css={S.saveBtn} onClick={() => handleScrapPreset(order)}>
                    내 프리셋에 저장
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
            최근 주문 내역이 없습니다.
          </div>
        )}
      </main>
    </div>
  );
};

export default RecentOrder;