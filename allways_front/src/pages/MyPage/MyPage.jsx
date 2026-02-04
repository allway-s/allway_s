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
      // 1. 클라이언트 측에서 1차 로그인 체크 (토큰 존재 여부)
      const userId = getUserIdFromToken();
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        // 2. 모든 데이터를 병렬로 요청
        // getUserMe는 이제 인자 없이 호출하며, 백엔드 UserRespDto 구조를 가져옵니다.
        const [userRes, presetRes, orderRes, postRes] = await Promise.all([
          getUserMe(),
          getMyPresets(),
          getOrderHistory(),
          getPosts().catch(() => ({ data: [] })) 
        ]);

        // 디버깅을 위한 로그
        console.log("유저 정보 상세:", userRes.data);

        const communityPosts = postRes.data || [];
        const rawPresets = presetRes.data || [];
        const orderData = orderRes.data || [];

        // 3. 프리셋 데이터 가공 로직
        const enrichedPresets = rawPresets.map(preset => {
          // 본인이 작성한 경우
          if (Number(userId) === Number(preset.userId)) {
            return { ...preset, authorName: userRes.data.nickname || "나" }; 
          }
          // 커뮤니티 게시글에서 작성자 닉네임 매칭
          const match = communityPosts.find(p => Number(p.userId) === Number(preset.postedUserId));
          return {
            ...preset,
            authorName: match ? match.nickname : `User ${preset.postedUserId}`
          };
        });

        // 4. 상태 업데이트
        setPresets(enrichedPresets.slice(0, 3));
        setOrders(orderData.slice(0, 2));

        // 백엔드 UserRespDto 필드에 맞춰 userInfo 저장
        console.log(userRes.data)
        setUserInfo({
          nickname: userRes.data.nickname,
          name: userRes.data.name,
          email: userRes.data.email,
          phoneNumber: userRes.data.phoneNumber || "전화번호 미등록",
        });

      } catch (error) {
        console.error("데이터 로드 중 에러 발생:", error);
        // 토큰이 만료되었거나 유효하지 않을 경우 처리
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

      </main>
    </div>
  );
};

export default MyPage;