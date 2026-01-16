/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './RecentOrder.styles.js'; 

export const RecentOrder = () => {
  const navigate = useNavigate();

  const orders = [
    {
      date: '2026-01-08',
      totalPrice: '366,000원',
      items: [
        { id: 1, name: '스테이크 & 치즈', options: '위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...', price: '183,000원' },
        { id: 2, name: '스테이크 & 치즈', options: '위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...', price: '183,000원' },
      ]
    }
  ];

  return (
    <div css={S.wrapper}>

      <div css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>주문<span>내역</span></h1>
        </div>
      </div>

      <main css={S.historyContainer}>
        {orders.map((order, idx) => (
          <div key={idx} css={S.orderCard}>
            <div css={S.orderHeader}>
              <span className="date">{order.date}</span>
              <span className="total">Total: {order.totalPrice}</span>
            </div>
            {order.items.map(item => (
              <div key={item.id} css={S.itemRow}>
                <div css={S.itemInfo}>
                  <span className="name">{item.name}</span>
                  <span className="options">{item.options}</span>
                </div>
                <div css={S.itemActions}>
                  <span className="price">{item.price}</span>
                  <button css={S.saveBtn} onClick={() => alert('프리셋에 저장되었습니다!')}>
                    내 프리셋에 저장
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
};

export default RecentOrder;