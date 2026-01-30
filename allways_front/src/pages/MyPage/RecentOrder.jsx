/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './RecentOrderStyles.js'; 
import { api } from '../../apis/config/axiosConfig.js';

export const RecentOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);


  // [추가] 토큰에서 userId를 추출하는 공통 함수
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

      if (!userId) {
        console.log("사용자 ID를 찾을 수 없습니다");
        return;
      }

      
      try {
        const response = await api.get("/api/orders/history", {
          params: {userId: userId}
        });
        setOrders(response.data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };
    fetchOrders();
  }, []);

  const handleScrapPreset = async (order) => {
    // [수정] localStorage의 'user' 대신 'accessToken'을 직접 복호화하여 ID 추출
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const decoded = JSON.parse(jsonPayload);
        // 토큰 내의 키값(userId 혹은 id 혹은 sub)에 맞춰 선택
        return decoded.userId || decoded.id || decoded.sub;
      } catch (e) { return null; }
    };

    const userIdFromToken = getUserIdFromToken();

    if (!userIdFromToken) {
      alert("로그인 정보가 유효하지 않습니다, 로그인 페이지로 이동합니다");
      navigate('/login');
      return;
    }

    // [중요] productId가 없는지 체크
    if (!order.productId) {
      console.error("주문 데이터에 productId가 없습니다:", order);
      alert("상품 정보(ID)를 찾을 수 없어 저장할 수 없습니다.");
      return;
    }

    try {
      const presetReqDto = {
        productId: Number(order.productId),
        userId: userIdFromToken,
        presetName: `${order.productName} 프리셋`
      };

      console.log("보내는 데이터:", presetReqDto);

      const response = await api.post("/api/preset/scrap", presetReqDto);

      if (response.status === 201 || response.status === 200) {
        alert('프리셋 저장에 성공했습니다!');
      }
    } catch (error) {
      console.error("프리셋 저장 실패:", error);
      alert("인증 오류 또는 상품 정보의 누락으로 오류가 발생했습니다.");
    }
  }; // handleScrapPreset 끝

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
                <span className="date">{order.orderedAt?.split('T')[0]}</span>
                <span className="total">Total: {order.totalPrice?.toLocaleString()}원</span>
              </div>

              <div css={S.itemRow}>
                <div css={S.itemInfo}>
                  <span className="name">{order.productName}</span>
                  <span className="options">{order.ingredients}</span>
                </div>
                <div css={S.itemActions}>
                  <span className="price">{order.unitPrice?.toLocaleString()}원</span>
                  {/* alert 대신 실제 함수 handleScrapPreset을 연결합니다. */}
                  <button css={S.saveBtn} onClick={() => handleScrapPreset(order)}>
                    내 프리셋에 저장
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>주문 내역이 없습니다.</div>
        )}
      </main>
    </div>
  );
}; // RecentOrder 컴포넌트 끝

export default RecentOrder;