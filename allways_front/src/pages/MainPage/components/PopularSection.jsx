/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { PresetCard } from '../../../components/PresetCard.jsx';
import { S } from './PopularSection.styles.js';
import axios from 'axios';

export function PopularSection({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const isLoggedInUser = user && (user.name || user.id || Object.keys(user).length > 0);

  const fetchPosts = async () => {
    try {
      // 커뮤니티 전체 게시글 가져오기
      const response = await axios.get('http://localhost:8080/api/post/getAllPost');
      setPosts(response.data || []);
    } catch (error) {
      console.error("최신 레시피 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ [수정된 로직] 작성 날짜(postedAt) 기준 내림차순 정렬 후 3개 추출
  const latestPreSets = useMemo(() => {
    return [...posts]
      .map(item => ({
        id: item.postId,
        title: item.presetName || '맛있는 레시피',
        author: item.nickname || '익명님',
        likes: item.likeCnt || 0,
        imgUrl: item.imgUrl || 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
        createdAt: item.postedAt || '', // 날짜 데이터 저장
        description: `추천 조합: ${item.ingredientNames?.join(', ') || '기본 조합'}`
      }))
      // 날짜를 비교하기 위해 Date 객체로 변환하여 내림차순 정렬
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [posts]);

  return (
    <section css={S.section}>
      <div css={S.container}>
        <div css={S.header}>
          {/* 타이틀을 최신 레시피 느낌으로 살짝 바꿔도 좋습니다 */}
          <h2 css={S.title}>New Recipe Community</h2>
          <div css={S.headerRight}>
            {!isLoggedInUser ? (
              <span css={S.headerText}>로그인 후 최신 꿀조합들을 만나보세요!</span>
            ) : (
              <span css={S.headerText}>{user.name || '회원'}님, 방금 올라온 레시피예요!</span>
            )}

            <button onClick={() => navigate("/community")} css={S.iconButton}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div css={S.grid}>
          {!isLoggedInUser && (
            <button 
              css={S.blurMessage} 
              onClick={() => navigate('/login')}
            >
              로그인하고 최신 레시피 확인하기
            </button>
          )}

          {latestPreSets.map((preset, index) => (
            <div 
              key={preset.id} 
              css={S.cardWrapper(!isLoggedInUser)}
            >
              {/* 최신순이라 하더라도 첫 번째 카드에는 뱃지를 달아주어 시선을 끕니다 */}
              {index === 0 && (
                <div css={S.bestBadge} style={{ backgroundColor: '#ffce32' }}>
                  <span style={{ color: '#009223', fontWeight: 'bold', fontSize: '12px' }}>NEW</span>
                </div>
              )}
              <PresetCard 
                preset={preset} 
                user={user} 
                showLoadButton={false} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// /** @jsxImportSource @emotion/react */
// import React, { useEffect, useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight, TrendingUp } from 'lucide-react';
// import { PresetCard } from '../../../components/PresetCard.jsx';
// import { S } from './PopularSection.styles.js';
// import axios from 'axios';

// export function PopularSection({ user }) {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]); // 서버에서 받은 실제 포스트들

//   // 1. 유저 로그인 여부 판단
//   const isLoggedInUser = user && (user.name || user.id || Object.keys(user).length > 0);

//   // 2. 서버 데이터 호출 (CommunityPage의 로직과 동일)
//   const fetchTopPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/post/getAllPost');
//       setPosts(response.data || []);
//     } catch (error) {
//       console.error("인기 레시피 로드 실패:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTopPosts();
//   }, []);

//   // 3. 데이터 가공: 좋아요순 정렬 후 상위 3개 추출
//   const topPreSets = useMemo(() => {
//     return posts
//       .map(item => ({
//         id: item.postId,
//         title: item.presetName || '맛있는 레시피',
//         author: item.nickname || '익명님',
//         likes: item.likeCnt || 0,
//         imgUrl: item.imgUrl || 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
//         // PresetCard 컴포넌트 내부에서 사용하는 규격에 맞춰 추가 데이터 매핑
//         description: `추천 조합: ${item.ingredientNames?.join(', ') || '기본 조합'}`
//       }))
//       .sort((a, b) => b.likes - a.likes) // 좋아요 많은 순
//       .slice(0, 3); // 3개만
//   }, [posts]);

//   return (
//     <section css={S.section}>
//       <div css={S.container}>
//         <div css={S.header}>
//           <h2 css={S.title}>Recipe Community</h2>
//           <div css={S.headerRight}>
//             {!isLoggedInUser ? (
//               <span css={S.headerText}>로그인 후 더 다양한 조합들을 만나보세요!</span>
//             ) : (
//               <span css={S.headerText}>{user.name || '진현'}님을 위한 인기 레시피입니다!</span>
//             )}

//             <button onClick={() => navigate("/community")} css={S.iconButton}>
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>
        
//         <div css={S.grid}>
//           {/* 비로그인 시 블러 처리 및 안내 버튼 */}
//           {!isLoggedInUser && (
//             <button 
//               css={S.blurMessage} 
//               onClick={() => navigate('/login')}
//             >
//               로그인하고 인기 레시피 확인하기
//             </button>
//           )}

//           {topPreSets.map((preset, index) => (
//             <div 
//               key={preset.id} 
//               css={S.cardWrapper(!isLoggedInUser)}
//             >
//               {index === 0 && (
//                 <div css={S.bestBadge}>
//                   <TrendingUp size={24} />
//                 </div>
//               )}
//               {/* 기존에 정의된 PresetCard 사용 */}
//               <PresetCard 
//                 preset={preset} 
//                 user={user} 
//                 showLoadButton={false} 
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// /** @jsxImportSource @emotion/react */
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight, TrendingUp } from 'lucide-react';
// import { PresetCard } from '../../../components/PresetCard.jsx';
// import { S } from './PopularSection.styles.js';

// export function PopularSection({ 
//   presets = [], 
//   onNavigate, 
//   onLike, 
//   onCopy, 
//   user 
// }) {
//   const navigate = useNavigate();
  
//   // ✅ 유저 로그인 여부 판단
//   const isLoggedInUser = user && (user.name || user.id || Object.keys(user).length > 0);

//   const topPreSets = [...presets]
//     .sort((a, b) => (b.likes || 0) - (a.likes || 0))
//     .slice(0, 3);

//   return (
//     <section css={S.section}>
//       <div css={S.container}>
//         <div css={S.header}>
//             <h2 css={S.title}>Recipe Community</h2>
//             <div css={S.headerRight}>
//                 {!isLoggedInUser ? (
//                   <span css={S.headerText}>로그인 후 더 다양한 조합들을 만나보세요!</span>
//                 ) : (
//                   <span css={S.headerText}>{user.name || '진현'}님을 위한 인기 레시피입니다!</span>
//                 )}

//                 <button onClick={() => navigate("/community")} css={S.iconButton}>
//                   <ChevronRight size={24} />
//                 </button>
//             </div>
//         </div>
        
//         <div css={S.grid}>
//           {/* ✅ 비로그인 시 카드 중앙에 안내 버튼 노출 */}
//           {!isLoggedInUser && (
//             <button 
//               css={S.blurMessage} 
//               onClick={() => navigate('/login')}
//             >
//               로그인하고 인기 레시피 확인하기
//             </button>
//           )}

//           {topPreSets.map((preset, index) => (
//             <div 
//               key={preset.id} 
//               /* ✅ 로그인 안됐을 때만 true 전달하여 블러 처리 */
//               css={S.cardWrapper(!isLoggedInUser)}
//             >
//               {index === 0 && (
//                 <div css={S.bestBadge}>
//                   <TrendingUp size={24} />
//                 </div>
//               )}
//               <PresetCard 
//                 preset={preset} 
//                 onLike={onLike} 
//                 onCopy={onCopy} 
//                 user={user} 
//                 showLoadButton={false} 
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }