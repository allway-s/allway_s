/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MypageStyles.js';
import { api } from '../../apis/config/axiosConfig.js';
import SubwayNearby from '../../components/SubwayNearby.jsx';
import { getPosts } from '../../apis/items/communityApi.js';

export const MyPage = () => {
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState(null);
  const [presets, setPresets] = useState([]);
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
      return Number(decoded.userId || decoded.id || decoded.sub);
    } catch (e) { return null; }
  };

  useEffect(() => {
    const fetchMyPageData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const [presetRes, orderRes, postRes] = await Promise.all([
          api.get('/api/presets', { params: { userId } }).catch(() => ({ data: [] })),
          api.get('/api/orders/history', { params: { userId } }).catch(() => ({ data: [] })),
          getPosts().catch(() => ({ data: [] })) 
        ]);

        const communityPosts = postRes.data || [];
        const rawPresets = presetRes.data || [];
        const orderData = orderRes.data || [];

        const enrichedPresets = rawPresets.map(preset => {
          if (Number(preset.userId) === Number(preset.postedUserId)) {
            return { ...preset, authorName: "진현" }; 
          }
          const match = communityPosts.find(p => Number(p.userId) === Number(preset.postedUserId));
          return {
            ...preset,
            authorName: match ? match.nickname : `User ${preset.postedUserId}`
          };
        });

        setPresets(enrichedPresets.slice(0, 3));
        setOrders(orderData.slice(0, 2));

        if (orderData.length > 0) {
          const latest = orderData[0];
          setUserInfo({
            nickname: latest.nickname || latest.userNickname || "진현",
            name: latest.name || latest.userName || "정보 없음",
            email: latest.email || "정보 없음",
            address: latest.address || "주소를 등록해주세요",
            phoneNumber: latest.phoneNumber || "번호를 등록해주세요"
          });
        } else {
          setUserInfo({
            nickname: localStorage.getItem('userName') || '진현',
            name: '정보 없음', email: '정보 없음', address: '주소를 등록해주세요', phoneNumber: '번호를 등록해주세요'
          });
        }
      } catch (error) {
        console.error("데이터 로드 중 에러 발생:", error);
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
        {/* 프로필 섹션: 데이터가 없을 때도 영역 유지 */}
        <section css={S.section}>
          <h3 css={S.sectionTitle}>프로필</h3>
          <div css={S.card}>
            <div css={S.profileInner}>
              <div css={S.avatarCircle}>{userInfo?.nickname?.charAt(0) || '회'}</div>
              <div css={S.infoList}>
                <p><strong>닉네임</strong> {userInfo?.nickname || '-'}</p>
                <p><strong>이름</strong> {userInfo?.name || '-'}</p>
                <p><strong>이메일</strong> {userInfo?.email || '-'}</p>
                <p><strong>주소</strong> {userInfo?.address || '-'}</p>
                <p><strong>연락처</strong> {userInfo?.phoneNumber || '-'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 프리셋 섹션: 이미지 영역 고정 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            <span css={S.moreLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/mypreset')}>프리셋 관리 ＞</span>
          </div>
          <div css={S.presetGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {presets.length > 0 ? (
              presets.map((item) => (
                <div key={item.presetId} css={S.presetCard} onClick={() => navigate('/mypreset')} style={{ minHeight: '320px' }}>
                  <div css={S.imgBox} style={{ height: '180px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                    <img 
                      src={item.imgUrl || "https://www.subway.co.kr/upload/menu/Veggie-Delite_20211231095658375.png"} 
                      alt="" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '15px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>{item.presetName}</p>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {item.authorName}</p>
                    <button css={S.orderBtn} style={{ marginTop: '15px' }} onClick={(e) => { e.stopPropagation(); navigate('/menu'); }}>주문하기</button>
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
            <span css={S.moreLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/recent-order')}>최근 주문 내역 ＞</span>
          </div>
          <div css={S.card} style={{ minHeight: '100px' }}>
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <div key={idx} css={S.orderItem}>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>{order.orderedAt?.split('T')[0]}</span>
                    <span style={{ fontWeight: 'bold' }}>{order.productName}</span>
                    <span css={S.orderText}>{order.ingredients}</span>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>{order.totalPrice?.toLocaleString()}원</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', padding: '30px', textAlign: 'center' }}>최근 주문 내역이 없습니다.</div>
            )}
          </div>
        </section>

        <SubwayNearby />
      </main>
    </div>
  );
};

export default MyPage;


