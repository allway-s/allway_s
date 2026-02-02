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
      return decoded.userId || decoded.id;
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
        const [userRes, presetRes, orderRes, postRes] = await Promise.all([
          // [수정] 백엔드에 실존하는 주소인 /api/user/me 로 변경
          api.get('/api/user/me').catch(err => {
            console.error("유저 정보 조회 실패:", err);
            return { data: null };
          }),
          api.get('/api/presets', { params: { userId } }).catch(() => ({ data: [] })),
          api.get('/api/orders/history', { params: { userId } }).catch(() => ({ data: [] })),
          getPosts().catch(() => ({ data: [] })) 
        ]);

        const communityPosts = postRes.data || [];
        const rawPresets = presetRes.data || [];
        const orderData = orderRes.data || [];

        // 프리셋 가공
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

        // [핵심] 유저 정보 표시 로직
        // 만약 /api/user/me 가 데이터를 반환하지 않는 상태라면(Void), 
        // 주문 내역(orderData)에서 정보를 추출하는 Fallback이 작동하게 됩니다.
        if (userRes.data && Object.keys(userRes.data).length > 0) {
          setUserInfo({
            nickname: userRes.data.nickname,
            name: userRes.data.name,
            email: userRes.data.email,
            phoneNumber: userRes.data.phoneNumber,
            address: userRes.data.address || "주소를 등록해주세요"
          });
        } else if (orderData.length > 0) {
          const latest = orderData[0];
          setUserInfo({
            nickname: latest.nickname || "진현",
            name: latest.name || "오진현",
            email: latest.email || "정보 없음",
            address: latest.address || "주소를 등록해주세요",
            phoneNumber: latest.phoneNumber || "번호를 등록해주세요"
          });
        } else {
          setUserInfo({
            nickname: '진현',
            name: '오진현',
            email: '정보 없음',
            address: '주소를 등록해주세요',
            phoneNumber: '번호를 등록해주세요'
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
        {/* 프로필 섹션 */}
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

        {/* 프리셋 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            <span css={S.moreLink} onClick={() => navigate('/mypreset')} style={{ cursor: 'pointer' }}>프리셋 관리 ＞</span>
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

        <SubwayNearby />
      </main>
    </div>
  );
};

export default MyPage;



// /** @jsxImportSource @emotion/react */
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { S } from './MypageStyles.js';
// import { api } from '../../apis/config/axiosConfig.js';
// import SubwayNearby from '../../components/SubwayNearby.jsx';
// import { getPosts } from '../../apis/items/communityApi.js';

// export const MyPage = () => {
//   const navigate = useNavigate();
  
//   const [userInfo, setUserInfo] = useState(null);
//   const [presets, setPresets] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const getUserIdFromToken = () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return null;
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
//         '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
//       const decoded = JSON.parse(jsonPayload);


//       // [중요] 여기서 토큰 전체 내용을 출력해보세요!
//     console.log("디코딩된 토큰 전체 내용:", decoded);


//       return Number(decoded.userId || decoded.id || decoded.sub);
//     } catch (e) { return null; }
//   };

//   useEffect(() => {
//     const fetchMyPageData = async () => {
//       const userId = getUserIdFromToken();
//       if (!userId) {
//         console.log("유저 ID를 찾을 수 없습니다. 현재 토큰 확인 필요.");

//         // navigate('/login');
//         // return;
//       }

//       try {
//         const [presetRes, orderRes, postRes] = await Promise.all([
//           api.get('/api/presets', { params: { userId } }).catch(() => ({ data: [] })),
//           api.get('/api/orders/history', { params: { userId } }).catch(() => ({ data: [] })),
//           getPosts().catch(() => ({ data: [] })) 
//         ]);

//         const communityPosts = postRes.data || [];
//         const rawPresets = presetRes.data || [];
//         const orderData = orderRes.data || [];

//         const enrichedPresets = rawPresets.map(preset => {
//           if (Number(preset.userId) === Number(preset.postedUserId)) {
//             return { ...preset, authorName: "진현" }; 
//           }
//           const match = communityPosts.find(p => Number(p.userId) === Number(preset.postedUserId));
//           return {
//             ...preset,
//             authorName: match ? match.nickname : `User ${preset.postedUserId}`
//           };
//         });

//         setPresets(enrichedPresets.slice(0, 3));
//         setOrders(orderData.slice(0, 2));

//         if (orderData.length > 0) {
//         const latest = orderData[0];
//         setUserInfo({
//             nickname: latest.nickname || "회원님의 닉네임",
//             name: latest.name || "회원님의 이름", // DB 이미지에 있는 실명
//             email: latest.email || "회원님의 이메일",
//             address: latest.address || "회원님의 주소",
//             phoneNumber: latest.phoneNumber || "회원님의 휴대폰번호"
//         });
//           } else {
//               // 주문 내역이 없을 때도 DB에서 가져온 값이 있다면 그걸 써야 합니다.
//               // 현재는 API가 없으므로 로컬 스토리지에 저장된 정보를 최대한 활용하세요.
//               setUserInfo({
//                   nickname: localStorage.getItem('userNickname') || '진현',
//                   name: localStorage.getItem('userName') || '오진현',
//                   email: localStorage.getItem('userEmail') || '정보 없음',
//                   address: '주소를 등록해주세요',
//                   phoneNumber: '번호를 등록해주세요'
//               });
//           }

//         // if (orderData.length > 0) {
//         //   const latest = orderData[0];
//         //   setUserInfo({
//         //     nickname: latest.nickname || latest.userNickname || "진현",
//         //     name: latest.name || latest.userName || "정보 없음",
//         //     email: latest.email || "정보 없음",
//         //     address: latest.address || "주소를 등록해주세요",
//         //     phoneNumber: latest.phoneNumber || "번호를 등록해주세요"
//         //   });
//         // } else {
//         //   setUserInfo({
//         //     nickname: localStorage.getItem('userName') || '진현',
//         //     name: '정보 없음', email: '정보 없음', address: '주소를 등록해주세요', phoneNumber: '번호를 등록해주세요'
//         //   });
//         // }

//       } catch (error) {
//         console.error("데이터 로드 중 에러 발생:", error);
//       }
//     };
//     fetchMyPageData();
//   }, [navigate]);


//   return (
//     <div css={S.container}>
//       <section css={S.titleSection}>
//         <div css={S.titleContainer}>
//           <h1 css={S.mainTitle}>My <span css={S.yellowText}>Page</span></h1>
//         </div>
//       </section>
      
//       <main css={S.main}>
//         {/* 프로필 섹션: 데이터가 없을 때도 영역 유지 */}
//         <section css={S.section}>
//           <h3 css={S.sectionTitle}>프로필</h3>
//           <div css={S.card}>
//             <div css={S.profileInner}>
//               <div css={S.avatarCircle}>{userInfo?.nickname?.charAt(0) || '회원'}</div>
//               <div css={S.infoList}>
//                 <p><strong>닉네임</strong> {userInfo?.nickname || '-'}</p>
//                 <p><strong>이름</strong> {userInfo?.name || '-'}</p>
//                 <p><strong>이메일</strong> {userInfo?.email || '-'}</p>
//                 <p><strong>주소</strong> {userInfo?.address || '-'}</p>
//                 <p><strong>연락처</strong> {userInfo?.phoneNumber || '-'}</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 프리셋 섹션: 이미지 영역 고정 */}
//         <section css={S.section}>
//           <div css={S.sectionHeader}>
//             <h3 css={S.sectionTitle}>프리셋</h3>
//             <span css={S.moreLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/mypreset')}>프리셋 관리 ＞</span>
//           </div>
//           <div css={S.presetGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
//             {presets.length > 0 ? (
//               presets.map((item) => (
//                 <div key={item.presetId} css={S.presetCard} onClick={() => navigate('/mypreset')} style={{ minHeight: '320px' }}>
//                   <div css={S.imgBox} style={{ height: '180px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
//                     <img 
//                       src={item.imgUrl || "https://www.subway.co.kr/upload/menu/Veggie-Delite_20211231095658375.png"} 
//                       alt="" 
//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                     />
//                   </div>
//                   <div style={{ padding: '15px' }}>
//                     <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>{item.presetName}</p>
//                     <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {item.authorName}</p>
//                     <button css={S.orderBtn} style={{ marginTop: '15px' }} onClick={(e) => { e.stopPropagation(); navigate('/menu'); }}>주문하기</button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div style={{ gridColumn: '1/4', padding: '40px', textAlign: 'center', color: '#888', border: '1px dashed #ddd', borderRadius: '10px' }}>
//                 저장된 프리셋이 없습니다.
//               </div>
//             )}
//           </div>
//         </section>

//         {/* 주문내역 섹션 */}
//         <section css={S.section}>
//           <div css={S.sectionHeader}>
//             <h3 css={S.sectionTitle}>주문내역</h3>
//             <span css={S.moreLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/recent-order')}>최근 주문 내역 ＞</span>
//           </div>
//           <div css={S.card} style={{ minHeight: '100px' }}>
//             {orders.length > 0 ? (
//               orders.map((order, idx) => (
//                 <div key={idx} css={S.orderItem}>
//                   <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
//                     <span style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>{order.orderedAt?.split('T')[0]}</span>
//                     <span style={{ fontWeight: 'bold' }}>{order.productName}</span>
//                     <span css={S.orderText}>{order.ingredients}</span>
//                   </div>
//                   <div style={{ textAlign: 'right', marginLeft: '20px' }}>
//                     <span style={{ fontWeight: 'bold', display: 'block' }}>{order.totalPrice?.toLocaleString()}원</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div style={{ color: '#888', padding: '30px', textAlign: 'center' }}>최근 주문 내역이 없습니다.</div>
//             )}
//           </div>
//         </section>

//         <SubwayNearby />
//       </main>
//     </div>
//   );
// };

// export default MyPage;


