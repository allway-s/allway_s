/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'; // ◀ 수정: useState, useEffect 추가
import { useNavigate } from 'react-router-dom';
import { S } from './MyPage.styles.js';
import axios from 'axios';

export const MyPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '진현';
  
  // 실제 DB에서 가져온 프리셋을 저장할 바구니
  const [presets, setPresets] = useState([]);

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
        const response = await axios.get(`http://localhost:8080/api/preset/list/${userId}`);
        // 최신순으로 3개만 잘라서 상태에 저장
        setPresets(response.data.slice(0, 3) || []);
      } catch (error) {
        console.error("마이페이지 프리셋 로드 실패:", error);
      }
    };
    fetchPresets();
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
                <p><strong>닉네임</strong> {userName}123</p>
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
            {[1, 2].map((i) => (
              <div key={i} css={S.orderItem}>
                <span style={{ fontWeight: 'bold' }}>스테이크 & 치즈</span>
                <span css={S.orderText}>위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...</span>
                <span style={{ fontWeight: 'bold' }}>183,000원</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPage;

// /** @jsxImportSource @emotion/react */
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { S } from './MyPage.styles.js';

// export const MyPage = () => {
//   const navigate = useNavigate();
//   const userName = localStorage.getItem('userName') || '진현';

//   return (
//     <div css={S.container}>

//       <main css={S.main}>
//         <h1 css={S.title}>My <span>Page</span></h1>

//         {/* 1. 프로필 섹션 */}
//         <section css={S.section}>
//           <h3 css={S.sectionTitle}>프로필</h3>
//           <div css={S.card}>
//             <div css={S.profileInner}>
//               <div css={S.avatarCircle}>S</div>
//               <div css={S.infoList}>
//                 <p><strong>닉네임</strong> {userName}123</p>
//                 <p><strong>이름</strong> {userName}</p>
//                 <p><strong>이메일</strong> {userName}@example.com</p>
//                 <p><strong>주소</strong> 부산광역시 수영구 ...</p>
//                 <p><strong>연락처</strong> 010-1234-5678</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 2. 프리셋 섹션 - 클릭 이벤트 연결 */}
//         <section css={S.section}>
//           <div css={S.sectionHeader}>
//             <h3 css={S.sectionTitle}>프리셋</h3>
//             {/* '프리셋 관리 >' 클릭 시 세부 페이지로 이동 */}
//             <span 
//               css={S.moreLink} 
//               onClick={() => navigate('/mypreset')} 
//               style={{ cursor: 'pointer' }}
//             >
//               프리셋 관리 ＞
//             </span>
//           </div>
//           <div css={S.presetGrid}>
//             {[1, 2, 3].map((i) => (
//               <div 
//                 key={i} 
//                 css={S.presetCard} 
//                 onClick={() => navigate('/mypreset')} // 카드 자체를 눌러도 이동
//                 style={{ cursor: 'pointer' }}
//               >
//                 <div css={S.imgBox}>샌드위치 이미지</div>
//                 <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>새우를 극상으로</p>
//                 <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {userName}</p>
//                 <button css={S.orderBtn} onClick={(e) => {
//                   e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
//                   alert('주문 페이지로 이동합니다.');
//                 }}>주문하기</button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 3. 주문내역 섹션 */}
//         <section css={S.section}>
//           <div css={S.sectionHeader}>
//             <h3 css={S.sectionTitle}>주문내역</h3>
//             {/* 클릭 시 주문 내역 페이지로 이동 */}
//             <span 
//               css={S.moreLink} 
//               onClick={() => navigate('/recent-order')}
//               style={{ cursor: 'pointer' }}
//             >
//               최근 주문 내역 ＞
//             </span>
//           </div>
//           <div css={S.card}>
//             {[1, 2].map((i) => (
//               <div key={i} css={S.orderItem}>
//                 <span style={{ fontWeight: 'bold' }}>스테이크 & 치즈</span>
//                 <span css={S.orderText}>위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...</span>
//                 <span style={{ fontWeight: 'bold' }}>183,000원</span>
//                 <button css={S.detailBtn}>상세 주문 내역 ＞</button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default MyPage;