/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MypageStyles.js';
import { api } from '../../apis/config/axiosConfig.js';
import SubwayNearby from '../../components/SubwayNearby.jsx';
// ✅ [수정] 닉네임 매칭을 위해 커뮤니티 게시글을 가져오는 API 추가
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
        // ✅ [수정] getPosts()를 추가 호출하여 커뮤니티의 작성자 정보를 확보합니다.
        const [presetRes, orderRes, postRes] = await Promise.all([
          api.get('/api/presets', { params: { userId } }),
          api.get('/api/orders/history', { params: { userId } }),
          getPosts() 
        ]);

        const communityPosts = postRes.data || [];
        const rawPresets = presetRes.data || [];

        // ✅ [수정] 프리셋 데이터에 실제 작성자 닉네임을 매칭하여 넣어줍니다.
        const enrichedPresets = rawPresets.map(preset => {
          // 1. 내가 만든 오리지널인 경우 (userId === postedUserId)
          if (Number(preset.userId) === Number(preset.postedUserId)) {
            return { ...preset, authorName: "진현" }; 
          }
          // 2. 저장한 커뮤니티 레시피인 경우, communityPosts에서 닉네임을 찾습니다.
          const match = communityPosts.find(p => Number(p.userId) === Number(preset.postedUserId));
          return {
            ...preset,
            authorName: match ? match.nickname : `User ${preset.postedUserId}`
          };
        });

        // 상위 3개만 표시
        setPresets(enrichedPresets.slice(0, 3));
        
        const orderData = orderRes.data || [];
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
            name: '정보 없음',
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
              <div css={S.avatarCircle}>{userInfo?.nickname?.charAt(0) || '진'}</div>
              <div css={S.infoList}>
                <p><strong>닉네임</strong> {userInfo?.nickname || '로딩 중...'}</p>
                <p><strong>이름</strong> {userInfo?.name || '로딩 중...'}</p>
                <p><strong>이메일</strong> {userInfo?.email || '로딩 중...'}</p>
                <p><strong>주소</strong> {userInfo?.address || '로딩 중...'}</p>
                <p><strong>연락처</strong> {userInfo?.phoneNumber || '로딩 중...'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 프리셋 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            <span css={S.moreLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/mypreset')}>프리셋 관리 ＞</span>
          </div>
          <div css={S.presetGrid}>
            {presets.length > 0 ? (
              presets.map((item) => (
                <div key={item.presetId} css={S.presetCard} onClick={() => navigate('/mypreset')}>
                  <div css={S.imgBox}>
                    <img src={item.imgUrl || "/default-subway.png"} alt={item.presetName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>{item.presetName}</p>
                  
                  {/* ✅ [수정] 무조건 본인 닉네임이 뜨던 부분을 매칭된 authorName으로 변경 */}
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    작성자 : {item.authorName}
                  </p>
                  
                  <button css={S.orderBtn} onClick={(e) => { e.stopPropagation(); navigate('/menu'); }}>주문하기</button>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', padding: '20px', textAlign: 'center', width: '100%' }}>저장된 프리셋이 없습니다.</div>
            )}
          </div>
        </section>

        {/* 주문내역 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>주문내역</h3>
            <span css={S.moreLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/recent-order')}>최근 주문 내역 ＞</span>
          </div>
          <div css={S.card}>
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

        {/* 매장 찾기 섹션 */}
        <SubwayNearby />
      </main>
    </div>
  );
};

export default MyPage;


// /** @jsxImportSource @emotion/react */

// import React, { useState, useEffect } from 'react'; // ◀ 수정: useState, useEffect 추가

// import { useNavigate } from 'react-router-dom';

// import { S } from './MypageStyles.js';

// import axios from 'axios';

// import { api } from '../../apis/config/axiosConfig.js';



// export const MyPage = () => {

//   const navigate = useNavigate();

//   const userName = localStorage.getItem('userName') || '진현';

 

//   // 실제 DB에서 가져온 프리셋을 저장할 바구니

//   const [presets, setPresets] = useState([]);



//   // [추가] 주문 내역 데이터를 담을 상태

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

//       return decoded.userId || decoded.id || decoded.sub;

//     } catch (e) { return null; }

//   };





//   useEffect(() => {

//     const fetchMyPageData = async () => {

//       const userId = getUserIdFromToken();

//       console.log("마이페이지 데이터 요청 시작 - ID:", userId);



//       if (!userId) return;



//       try {

//         // [수정] 컨트롤러 규격(?userId=)에 맞춰서 호출

//         const [presetRes, orderRes] = await Promise.all([

//           // GET /api/presets?userId=3

//           api.get('/api/presets', { params: { userId } }),

//           // GET /api/orders/history?userId=3

//           api.get('/api/orders/history', { params: { userId } })

//         ]);



//         console.log("프리셋 로드 완료:", presetRes.data);

//         console.log("주문내역 로드 완료:", orderRes.data);



//         setPresets(presetRes.data.slice(0, 3) || []);

//         setOrders(orderRes.data.slice(0, 2) || []);

//       } catch (error) {

//         // 주소가 틀리면 여기서 401이 나고, 인터셉터가 로그인창으로 튕겨버립니다.

//         console.error("마이페이지 로드 실패:", error);

//       }

//     };



//     fetchMyPageData();

//   }, []);



//   return (

//     <div css={S.container}>

//       <section css={S.titleSection}>

//         <div css={S.titleContainer}>

//           <h1 css={S.mainTitle}>

//             My <span css={S.yellowText}>Page</span>

//           </h1>

//         </div>

//       </section>



//       <main css={S.main}>

//         {/* 프로필 섹션 */}

//         <section css={S.section}>

//           <h3 css={S.sectionTitle}>프로필</h3>

//           <div css={S.card}>

//             <div css={S.profileInner}>

//               <div css={S.avatarCircle}>S</div>

//               <div css={S.infoList}>

//                 <p><strong>닉네임</strong> {userName}</p>

//                 <p><strong>이름</strong> {userName}</p>

//                 <p><strong>이메일</strong> {userName}@example.com</p>

//                 <p><strong>주소</strong> 부산광역시 수영구 ...</p>

//                 <p><strong>연락처</strong> 010-1234-5678</p>

//               </div>

//             </div>

//           </div>

//         </section>



//         {/* 프리셋 섹션 */}

//         <section css={S.section}>

//           <div css={S.sectionHeader}>

//             <h3 css={S.sectionTitle}>프리셋</h3>

//             <span

//               css={S.moreLink}

//               onClick={() => navigate('/mypreset')} // ◀ 수정: 중복된 onClick 속성 제거 및 정리

//             >

//               프리셋 관리 ＞

//             </span>

//           </div>



//           <div css={S.presetGrid}>

//             {/* ◀ 수정: [1,2,3] 대신 실제 데이터인 presets.length로 조건부 렌더링 시작 */}

//             {presets.length > 0 ? (

//               presets.map((item) => ( // ◀ 수정: i 대신 실제 item 객체 사용

//                 <div

//                   key={item.presetId} // ◀ 수정: i 대신 고유 식별자인 presetId 사용

//                   css={S.presetCard}

//                   onClick={() => navigate('/mypreset')}

//                 >

//                   <div css={S.imgBox}>

//                     <img

//                       src={item.imgUrl || "/default-subway.png"}

//                       alt={item.presetName}

//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}

//                     />

//                   </div>

//                   <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>{item.presetName}</p>

//                   <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {userName}</p>

//                   <button

//                     css={S.orderBtn}

//                     onClick={(e) => {

//                       e.stopPropagation();

//                       if (window.confirm('해당 구성으로 주문 페이지로 이동하시겠습니까?')) {

//                         navigate('/menu');

//                       }

//                     }}

//                   >

//                     주문하기

//                   </button>

//                 </div>

//               )) // ◀ 수정: map 세미콜론 제거 및 괄호 정렬

//             ) : (

//               <div style={{ color: '#888', padding: '20px', textAlign: 'center', width: '100%' }}>

//                 저장된 프리셋이 없습니다.

//               </div>

//             )}

//           </div> {/* ◀ 수정: presetGrid 닫는 태그 확인 */}

//         </section>



//         {/* 주문내역 섹션 */}

//     <section css={S.section}>

//       <div css={S.sectionHeader}>

//         <h3 css={S.sectionTitle}>주문내역</h3>

//         <span

//           css={S.moreLink}

//           onClick={() => navigate('/recent-order')}

//         >

//           최근 주문 내역 ＞

//         </span>

//       </div>

//       <div css={S.card}>

//         {/* ◀ 수정 시작: 더미 데이터 대신 실제 orders 데이터 연결 */}

//         {orders.length > 0 ? (

//             orders.map((order, idx) => (

//               <div key={idx} css={S.orderItem}>

//                 <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

//                   {/* 날짜 표시 추가 */}

//                   <span style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>

//                     {order.orderedAt?.split('T')[0]}

//                   </span>

//                   <span style={{ fontWeight: 'bold' }}>{order.productName}</span>

//                   <span css={S.orderText}>{order.ingredients}</span>

//                 </div>

//                 <div style={{ textAlign: 'right', marginLeft: '20px' }}>

//                   <span style={{ fontWeight: 'bold', display: 'block' }}>

//                     {order.totalPrice?.toLocaleString()}원

//                   </span>

//                 </div>

//               </div>

//             ))

//           ) : (

//             /* 데이터가 없을 때 표시 */

//             <div style={{ color: '#888', padding: '30px', textAlign: 'center' }}>

//               최근 주문 내역이 없습니다.

//             </div>

//           )}

//           {/* ◀ 수정 끝 */}

//         </div>

//       </section>

//       </main>

//     </div>

//   );

// };



// export default MyPage;