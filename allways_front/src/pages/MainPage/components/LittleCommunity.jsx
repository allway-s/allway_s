import React, { useState } from 'react';
import { HomePage } from '../../HomePage/index.jsx'; // HomePage.jsx와 같은 위치에 있다고 가정

import PresetImage1 from '../../../assets/images/PresetImages/PresetImage1.png';
import PresetImage2 from '../../../assets/images/PresetImages/PresetImage2.png';
import PresetImage3 from '../../../assets/images/PresetImages/PresetImage3.png';
import { S } from './LittleCommunity.styles.js';

function LittleCommunity() {
  // 1. 상태 관리: isLiked를 포함한 초기 데이터 설정
  const [presets, setPresets] = useState([
    { 
      id: '1', 
      title: '서브웨이클럽', 
      likes: 150, 
      author: 'JINHYUN1996', 
      image: PresetImage1,
      isLiked: false 
    },
    { 
      id: '2', 
      title: '비엠티 추천', 
      likes: 90, 
      author: 'BAEKGYUN',
      image: PresetImage2,
      isLiked: false
    },
    { 
      id: '3', 
      title: '토시비프 샐러드', 
      likes: 210, 
      author: '비건이지만고기먹습니다',
      image: PresetImage3,
      isLiked: false
    },
  ]);

  const [user] = useState({ name: '진현', id: 'jinhyeon123' });

  // ✅ [수정] 좋아요 클릭 시 해당 카드의 likes 숫자와 isLiked 상태를 동시에 토글
  const handleLike = (id) => {
    setPresets((prevPresets) => 
      prevPresets.map((preset) => {
        if (preset.id === id) {
          const isLikedNow = !preset.isLiked;
          return {
            ...preset,
            isLiked: isLikedNow,
            likes: isLikedNow ? preset.likes + 1 : preset.likes - 1
          };
        }
        return preset;
      })
    );
  };

  const handleStartOrder = () => console.log('주문 시작!');
  const handleNavigateCommunity = () => console.log('커뮤니티 이동!');
  const handleCopy = (preset) => console.log(preset.title + ' 복사됨!');


    // 2. 좋아요 클릭 시 데이터가 실제로 바뀌도록 로직 수정
    // <div css={S.like}>
    //           <button
    //             type='button'
    //               onClick={() => toggleLike(selected.id)}
    //               style={{
    //                 background: 'transparent',
    //                 border: 'none',
    //                 padding: 0,
    //                 cursor: 'pointer',
    //               }}
    //               aria-label='좋아요'
    //             >
    //               <Heart
    //                   css={S.heart}
    //                   aria-hidden='true'
    //                   fill={likes[selected.id]?.liked ? 'currentColor' : 'none'}
    //                 />
    //               </button>
    //               <span css={S.count}>
    //                 {likes[selected.id]?.count ?? selected.likeCount}
    //               </span>
    //             </div>

    return (
      <div css={S.pageWrapper}>
        <HomePage 
        communityPreSets={presets}
        onStartOrder={handleStartOrder}
        onNavigateToCommunity={handleNavigateCommunity}
        onLike={handleLike}
        onCopy={handleCopy}
        user={user}
      />
      </div>
    );
  }

export default LittleCommunity;