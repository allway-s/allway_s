import React, { useState } from 'react';
import axios from 'axios';
// import { HomePage } from '../../HomePage/index.jsx'; // HomePage.jsx와 같은 위치에 있다고 가정

import PresetImage1 from '../../../assets/images/PresetImages/PresetImage1.png';
import PresetImage2 from '../../../assets/images/PresetImages/PresetImage2.png';
import PresetImage3 from '../../../assets/images/PresetImages/PresetImage3.png';
import { S } from './LittleCommunityStyles.js';
import { Heart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LittleCommunity() {
  const navigate = useNavigate();

  // 1. 실제 로그인된 사용자 정보 가져오기
  // 진현님 말씀대로 로그인을 했다면 localStorage에 'user'가 있어야 합니다.
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [presets, setPresets] = useState([
    { id: '1', title: '서브웨이클럽', likes: 150, author: 'JINHYUN1996', image: PresetImage1, isLiked: false },
    { id: '2', title: '비엠티 추천', likes: 90, author: 'BAEKGYUN', image: PresetImage2, isLiked: false },
    { id: '3', title: '토시비프 샐러드', likes: 210, author: '비건이지만고기먹습니다', image: PresetImage3, isLiked: false },
  ]);

  const handleCopyAndMove = async (preset) => {
    // 유저 정보가 없으면 로그인 유도
    if (!storedUser?.id) {
      alert("로그인이 필요한 서비스입니다.");
      navigate('/login');
      return;
    }

    const isConfirm = window.confirm(`'${preset.title}' 레시피를 내 프리셋으로 저장하시겠습니까?`);
    
    if (isConfirm) {
      try {
        // 💡 고정값 1 대신 실제 로그인된 storedUser.id를 사용합니다.
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/preset/scrap`, {
          userId: storedUser.id,
          productId: parseInt(preset.id),
          presetName: preset.title
        });

        if (response.status === 200 || response.status === 201) {
          alert("성공적으로 저장되었습니다! 내 프리셋 페이지로 이동합니다.");
          setTimeout(() => {
            navigate('/mypreset');
          }, 100);
        }
      } catch (error) {
        console.error("스크랩 저장 실패:", error);
        alert("이미 저장된 레시피이거나 서버 오류가 발생했습니다.");
      }
    }
  };


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