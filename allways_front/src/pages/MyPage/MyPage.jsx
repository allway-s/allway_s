/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'; // ◀ 수정: useState, useEffect 추가
import { useNavigate } from 'react-router-dom';
import { S } from './MyPage.styles.js';
import axios from 'axios';
import { api } from '../../apis/config/axiosConfig.js';
import { getMyPresets } from '../../apis/items/communityApi.js';
import { getOrderDetail } from '../../apis/items/orderApi.js';

export const MyPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '진현';
  
  // 실제 DB에서 가져온 프리셋을 저장할 바구니
  const [presets, setPresets] = useState([]);

  // [추가] 주문 내역 데이터를 담을 상태
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
    const fetchPresets = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;
      try {
        const response = getMyPresets();
        // 최신순으로 3개만 잘라서 상태에 저장
        setPresets(response.data.slice(0, 3) || []);
      } catch (error) {
        console.error("마이페이지 프리셋 로드 실패:", error);
      }
    };
    fetchPresets();
  }, []);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      // RecentOrder와 동일한 API 호출
      const response = getOrderDetail();
      // 마이페이지 요약용으로 최근 2개만 저장
      setOrders(response.data.slice(0, 2) || []);
    } catch (error) {
      console.error("마이페이지 주문 내역 로드 실패:", error);
    }
  };
  fetchOrders();
}, []);

  return (
    <div css={S.container}>
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>
            My <span css={S.yellowText}>Page</span>
          </h1>
        </div>
      </section>

      <main css={S.main}>
        {/* 프로필 섹션 */}
        <section css={S.section}>
          <h3 css={S.sectionTitle}>프로필</h3>
          <div css={S.card}>
            <div css={S.profileInner}>
              <div css={S.avatarCircle}>S</div>
              <div css={S.infoList}>
                <p><strong>닉네임</strong> {userName}</p>
                <p><strong>이름</strong> {userName}</p>
                <p><strong>이메일</strong> {userName}@example.com</p>
                <p><strong>주소</strong> 부산광역시 수영구 ...</p>
                <p><strong>연락처</strong> 010-1234-5678</p>
              </div>
            </div>
          </div>
        </section>

        {/* 프리셋 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            <span 
              css={S.moreLink} 
              onClick={() => navigate('/mypreset')} // ◀ 수정: 중복된 onClick 속성 제거 및 정리
            >
              프리셋 관리 ＞
            </span>
          </div>

          <div css={S.presetGrid}>
            {/* ◀ 수정: [1,2,3] 대신 실제 데이터인 presets.length로 조건부 렌더링 시작 */}
            {presets.length > 0 ? (
              presets.map((item) => ( // ◀ 수정: i 대신 실제 item 객체 사용
                <div 
                  key={item.presetId} // ◀ 수정: i 대신 고유 식별자인 presetId 사용
                  css={S.presetCard} 
                  onClick={() => navigate('/mypreset')}
                >
                  <div css={S.imgBox}>
                    <img 
                      src={item.imgUrl || "/default-subway.png"} 
                      alt={item.presetName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>{item.presetName}</p>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {userName}</p>
                  <button 
                    css={S.orderBtn} 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('해당 구성으로 주문 페이지로 이동하시겠습니까?')) {
                        navigate('/menu');
                      }
                    }}
                  >
                    주문하기
                  </button>
                </div>
              )) // ◀ 수정: map 세미콜론 제거 및 괄호 정렬
            ) : (
              <div style={{ color: '#888', padding: '20px', textAlign: 'center', width: '100%' }}>
                저장된 프리셋이 없습니다.
              </div>
            )} 
          </div> {/* ◀ 수정: presetGrid 닫는 태그 확인 */}
        </section>

        {/* 주문내역 섹션 */}
    <section css={S.section}>
      <div css={S.sectionHeader}>
        <h3 css={S.sectionTitle}>주문내역</h3>
        <span 
          css={S.moreLink} 
          onClick={() => navigate('/recent-order')}
        >
          최근 주문 내역 ＞
        </span>
      </div>
      <div css={S.card}>
        {/* ◀ 수정 시작: 더미 데이터 대신 실제 orders 데이터 연결 */}
        {orders.length > 0 ? (
            orders.map((order, idx) => (
              <div key={idx} css={S.orderItem}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* 날짜 표시 추가 */}
                  <span style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>
                    {order.orderedAt?.split('T')[0]}
                  </span>
                  <span style={{ fontWeight: 'bold' }}>{order.productName}</span>
                  <span css={S.orderText}>{order.ingredients}</span>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                  <span style={{ fontWeight: 'bold', display: 'block' }}>
                    {order.totalPrice?.toLocaleString()}원
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* 데이터가 없을 때 표시 */
            <div style={{ color: '#888', padding: '30px', textAlign: 'center' }}>
              최근 주문 내역이 없습니다.
            </div>
          )}
          {/* ◀ 수정 끝 */}
        </div>
      </section>
      </main>
    </div>
  );
};

export default MyPage;