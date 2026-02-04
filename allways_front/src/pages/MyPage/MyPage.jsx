/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MypageStyles.js';
import SubwayNearby from '../../components/SubwayNearby.jsx';
import { getMyPresets, getPosts } from '../../apis/items/communityApi.js';
import { getOrderHistory } from '../../apis/items/orderApi.js';
import { getUserMe } from '../../apis/items/userApi.js';
import { getUserIdFromToken } from '../../utils/getUserId.js';

export const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [presets, setPresets] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyPageData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const [userRes, presetRes, orderRes, postRes] = await Promise.all([
          getUserMe(),
          getMyPresets(),
          getOrderHistory(),
          getPosts().catch(() => ({ data: [] })) 
        ]);

        console.log("유저 정보 상세:", userRes.data);
        console.log("주문 내역 원본:", orderRes.data); // ✅ 디버깅

        const communityPosts = postRes.data || [];
        const rawPresets = presetRes.data || [];
        const rawOrders = orderRes.data || [];

        // 프리셋 데이터 가공
        const enrichedPresets = rawPresets.map(preset => {
          if (Number(userId) === Number(preset.userId)) {
            return { ...preset, authorName: userRes.data.nickname || "나" }; 
          }
          const match = communityPosts.find(p => Number(p.userId) === Number(preset.postedUserId));
          return {
            ...preset,
            authorName: match ? match.nickname : `User ${preset.postedUserId}`
          };
        });

        // ✅ 주문 내역 가공 (RecentOrder 구조에 맞춤)
        const groupedByOrderId = rawOrders.reduce((acc, detail) => {
          const orderId = detail.orderId;
          
          if (!acc[orderId]) {
            acc[orderId] = {
              orderId: orderId,
              orderNumber: detail.orderNumber || `ORDER-${orderId}`,
              orderedAt: detail.orderedAt,
              productName: detail.itemName, // ✅ 첫 상품명
              totalPrice: 0,
              items: []
            };
          }

          acc[orderId].items.push(detail);
          acc[orderId].totalPrice += (detail.unitPrice || 0) * (detail.quantity || 1);

          return acc;
        }, {});

        const processedOrders = Object.values(groupedByOrderId).map(order => ({
          ...order,
          // ✅ 여러 상품이면 "상품명 외 N개" 형식
          productName: order.items.length > 1 
            ? `${order.items[0].itemName} 외 ${order.items.length - 1}개`
            : order.items[0].itemName,
          ingredients: order.items.map(item => item.itemName).join(', ')
        }));

        console.log("가공된 주문 내역:", processedOrders); // ✅ 디버깅

        setPresets(enrichedPresets.slice(0, 3));
        setOrders(processedOrders.slice(0, 2)); // ✅ 최신 2개만

        setUserInfo({
          nickname: userRes.data.nickname,
          name: userRes.data.name,
          email: userRes.data.email,
          phoneNumber: userRes.data.phoneNumber || "전화번호 미등록",
        });

      } catch (error) {
        console.error("데이터 로드 중 에러 발생:", error);
        if (error.response?.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate('/login');
        }
      }
    };

    fetchMyPageData();
  }, [navigate]);

  return (
    <div css={S.container}>
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>My <span css={S.yellowText}>Page</span></h1>
        </div>
      </section>
      
      <main css={S.main}>
        {/* 프로필 섹션 */}
        <section css={S.section}>
          <h3 css={S.sectionTitle}>프로필</h3>
          <div css={S.card}>
            <div css={S.profileInner}>
              {/* 닉네임의 첫 글자를 아바타로 사용 */}
              <div css={S.avatarCircle}>{userInfo?.nickname?.charAt(0) || '회'}</div>
              <div css={S.infoList}>
                <p><strong>닉네임</strong> {userInfo?.nickname || '-'}</p>
                <p><strong>이름</strong> {userInfo?.name || '-'}</p>
                <p><strong>이메일</strong> {userInfo?.email || '-'}</p>
                <p><strong>연락처</strong> {userInfo?.phoneNumber || '-'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 프리셋 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            <span css={S.moreLink} onClick={() => navigate('/mypreset')} style={{ cursor: 'pointer' }}>프리셋 관리 ＞</span>
          </div>
          <div css={S.presetGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {presets.length > 0 ? (
              presets.map((item) => (
                <div key={item.presetId} css={S.presetCard} onClick={() => navigate('/mypreset')} style={{ minHeight: '320px', cursor: 'pointer' }}>
                  <div css={S.imgBox} style={{ height: '180px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.presetName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '15px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>{item.presetName}</p>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {item.authorName}</p>
                    <button 
                      css={S.orderBtn} 
                      style={{ marginTop: '15px' }} 
                      onClick={(e) => { e.stopPropagation(); navigate('/menu'); }}
                    >
                      주문하기
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/4', padding: '40px', textAlign: 'center', color: '#888', border: '1px dashed #ddd', borderRadius: '10px' }}>
                저장된 프리셋이 없습니다.
              </div>
            )}
          </div>
        </section>

        {/* 주문내역 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>주문내역</h3>
            <span css={S.moreLink} onClick={() => navigate('/recent-order')} style={{ cursor: 'pointer' }}>최근 주문 내역 ＞</span>
          </div>
          <div css={S.card} style={{ minHeight: '100px' }}>
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <div key={idx} css={S.orderItem}>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>
                      {order.orderedAt?.split(' ')[0] || order.orderedAt}
                    </span>
                    <span style={{ fontWeight: 'bold' }}>{order.productName}</span>
                    <span css={S.orderText} style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                      {order.ingredients}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '1.1rem', color: '#009223' }}>
                      {order.totalPrice?.toLocaleString()}원
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', padding: '30px', textAlign: 'center' }}>최근 주문 내역이 없습니다.</div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
};

export default MyPage;