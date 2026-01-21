/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './RecentOrder.styles.js'; 
import { api } from '../../apis/config/axiosConfig.js';

export const RecentOrder = () => {
  const navigate = useNavigate();

  // 2. 데이터를 담을 상태(State) 생성
  const [orders, setOrders] = useState([]);

  // 3. 페이지가 처음 로드될 때만 API를 호출하도록 useEffect 사용
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/api/v1/orders/history");
        // 2. response.data(객체 배열)를 상태에 저장
        setOrders(response.data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };

    fetchOrders();
  }, []);

  // const response = api.get("/api/v1/orders/history")
  // console.log(response.data);

  // const orders = [
  //   {
  //     date: '2026-01-08',
  //     totalPrice: '366,000원',
  //     items: [
  //       { id: 1, name: '스테이크 & 치즈', options: '위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...', price: '183,000원' },
  //       { id: 2, name: '스테이크 & 치즈', options: '위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...', price: '183,000원' },
  //     ]
  //   }
  // ];

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
          {/* order 객체 내의 orderedAt에 직접 접근 */}
          <span className="date">{order.orderedAt?.split('T')[0]}</span>
          <span className="total">Total: {order.totalPrice?.toLocaleString()}원</span>
        </div>

        {/* ⚠️ 문제의 구간: order.items.map을 삭제하고 아래처럼 바로 렌더링하세요 */}
        <div css={S.itemRow}>
          <div css={S.itemInfo}>
            <span className="name">{order.productName}</span>
            <span className="options">{order.ingredients}</span>
          </div>
          <div css={S.itemActions}>
            <span className="price">{order.unitPrice?.toLocaleString()}원</span>
            <button css={S.saveBtn} onClick={() => alert('프리셋 저장!')}>
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
};

export default RecentOrder;