/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPage.styles.js';

export const MyPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '진현';

  return (
    <div css={S.container}>
      {/* 1. 타이틀 영역: MyPreSet과 동일한 구조로 통일 */}
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>
            My <span css={S.yellowText}>Page</span>
          </h1>
        </div>
      </section>

      {/* 2. 메인 컨텐츠 영역: max-width를 1200px로 통일하여 균형 유지 */}
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
              onClick={() => navigate('/mypreset')}
            >
              프리셋 관리 ＞
            </span>
          </div>
          <div css={S.presetGrid}>
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                css={S.presetCard} 
                onClick={() => navigate('/mypreset')}
              >
                <div css={S.imgBox}>샌드위치 이미지</div>
                <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>새우를 극상으로</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {userName}</p>
                <button 
                  css={S.orderBtn} 
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 카드(프리셋 관리)로 이동하는 이벤트 전파 방지
                    
                    // confirm 창은 확인을 누르면 true, 취소를 누르면 false를 반환합니다.
                    const isConfirmed = window.confirm('해당 구성으로 주문 페이지로 이동하시겠습니까?');
                    
                    if (isConfirmed) {
                      navigate('/menu'); // 확인을 눌렀을 때만 이동 (실제 주문 경로로 수정하세요)
                    }
                  }}
                >
                  주문하기
                </button>
              </div>
            ))}
          </div>
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
                <button css={S.detailBtn}>상세 주문 내역 ＞</button>
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