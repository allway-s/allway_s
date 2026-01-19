import React, { useState } from 'react';
// import { HomePage } from '../../HomePage/index.jsx'; // HomePage.jsx와 같은 위치에 있다고 가정

import PresetImage1 from '../../../assets/images/PresetImages/PresetImage1.png';
import PresetImage2 from '../../../assets/images/PresetImages/PresetImage2.png';
import PresetImage3 from '../../../assets/images/PresetImages/PresetImage3.png';
import { S } from './LittleCommunity.styles.js';
import { Heart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LittleCommunity() {
  // 1. 상태 관리: isLiked를 포함한 초기 데이터 설정
  const navigate = useNavigate();

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

  const handleCopyAndMove = (preset) => {
    const isConfirm = window.confirm(`'${preset.title}' 레시피를 내 프리셋에 저장하고 이동하시겠습니까?`);
    if (isConfirm) {
      console.log(preset.title + '복사됨!' );
      navigate('/mypreset');
      
      // console.log("이동 함수 호출 직전");
      // navigate('/mypreset');
      // console.log("이동 함수 호출 직후");
    }
  }

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




    return (
      <div css={S.communityWrapper}> {/* 스타일 이름 확인 필요 */}
        {presets.map((preset) => (
          <div key={preset.id} css={S.card}>
            {/* ✅ 파란 동그라미 친 그 버튼 위치 */}
            <button 
              type="button" 
              onClick={() => handleCopyAndMove(preset)} 
              css={S.plusButton} 
              style={{ cursor: 'pointer' }}
            >
              <Plus size={24} />
            </button>

            <img src={preset.image} alt={preset.title} css={S.image} />
            <div css={S.info}>
              <h4>{preset.title}</h4>
              <p>작성자: {preset.author}</p>
            </div>
            
            <div css={S.likeArea}>
              <button onClick={() => handleLike(preset.id)}>
                <Heart fill={preset.isLiked ? "red" : "none"} color={preset.isLiked ? "red" : "black"} />
              </button>
              <span>{preset.likes}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

export default LittleCommunity;   
 

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