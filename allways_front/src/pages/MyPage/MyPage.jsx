/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MypageStyles.js';
import { api } from '../../apis/config/axiosConfig.js';

export const MyPage = () => {
  const navigate = useNavigate();
  
  // 1. 실제 데이터 바구니 (userInfo를 null로 시작하여 로딩 상태 처리)
  const [userInfo, setUserInfo] = useState(null);
  const [presets, setPresets] = useState([]);
  const [orders, setOrders] = useState([]);

  // 2. 토큰에서 유저 ID 추출 (이미 검증됨)
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
    const fetchMyPageData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        // [본질] 성공이 보장된 API들만 호출합니다. (튕김 방지)
        const [presetRes, orderRes] = await Promise.all([
          api.get('/api/presets', { params: { userId } }),
          api.get('/api/orders/history', { params: { userId } })
        ]);

        // 데이터 저장
        setPresets(presetRes.data.slice(0, 3) || []);
        const orderData = orderRes.data || [];
        setOrders(orderData.slice(0, 2));

        // [핵심] DB 데이터 추출: 주문 내역이 하나라도 있다면 그 안의 유저 정보를 사용합니다.
        if (orderData.length > 0) {
          const latest = orderData[0];
          setUserInfo({
            nickname: latest.nickname || latest.userNickname || "회원님의 닉네임",
            name: latest.name || latest.userName || "회원님의 이름",
            email: latest.email || "회원님의 이메일",
            address: latest.address || "회원님의 주소",
            phoneNumber: latest.phoneNumber || "회원님의 휴대폰 번호"
          });
        } else {
          // 주문 내역이 없을 경우에만 로컬 스토리지 정보를 최소한으로 사용
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
        // 여기서 401이 나면 인터셉터가 처리하도록 둡니다.
      }
    };

    fetchMyPageData();
  }, []);

  return (
    <div css={S.container}>
      {/* ... (중략: 타이틀 섹션은 동일) ... */}
      
      <main css={S.main}>
        {/* 프로필 섹션: 이제 더미 데이터가 아닌 userInfo 상태를 사용합니다. */}
        <section css={S.section}>
          <h3 css={S.sectionTitle}>프로필</h3>
          <div css={S.card}>
            <div css={S.profileInner}>
              <div css={S.avatarCircle}>{userInfo?.nickname?.charAt(0) || 'S'}</div>
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

        {/* 프리셋 섹션 (실제 데이터 반영) */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            <span css={S.moreLink} onClick={() => navigate('/mypreset')}>프리셋 관리 ＞</span>
          </div>
          <div css={S.presetGrid}>
            {presets.length > 0 ? (
              presets.map((item) => (
                <div key={item.presetId} css={S.presetCard} onClick={() => navigate('/mypreset')}>
                  <div css={S.imgBox}>
                    <img src={item.imgUrl || "/default-subway.png"} alt={item.presetName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>{item.presetName}</p>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {userInfo?.nickname}</p>
                  <button css={S.orderBtn} onClick={(e) => { e.stopPropagation(); navigate('/menu'); }}>주문하기</button>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', padding: '20px', textAlign: 'center', width: '100%' }}>저장된 프리셋이 없습니다.</div>
            )}
          </div>
        </section>

        {/* 주문내역 섹션 (실제 데이터 반영) */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>주문내역</h3>
            <span css={S.moreLink} onClick={() => navigate('/recent-order')}>최근 주문 내역 ＞</span>
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