import React, { useState } from 'react';
import { HomePage } from '../HomePage/index.jsx'; // HomePage.jsx와 같은 위치에 있다고 가정

import PresetImage1 from '../../../assets/images/PresetImages/PresetImage1.png';
import PresetImage2 from '../../../assets/images/PresetImages/PresetImage2.png';
import PresetImage3 from '../../../assets/images/PresetImages/PresetImage3.png';

function LittleCommunity() {
  // 1. 화면에 보여줄 임시 데이터
  const [presets] = useState([
    { 
      id: '1', 
      title: '서브웨이클럽', 
      likes: 150, 
      author: 'JINHYUN1996', 
      image: PresetImage1
    },

    { 
      id: '2', 
      title: '비엠티 추천', 
      likes: 90, 
      author: 'BAEKGYUN',
      image: PresetImage2
    },

    { 
      id: '3', 
      title: '토시비프 샐러드', 
      likes: 210, 
      author: '비건이지만고기먹습니다',
      image: PresetImage3
    },

  ]);

  const [user] = useState({ name: '진현', id: 'jinhyeon123' });

  // 2. 각 버튼을 눌렀을 때 실행될 함수들
  const handleStartOrder = () => console.log('주문 시작!');
  const handleNavigateCommunity = () => console.log('커뮤니티 이동!');
  const handleLike = (id) => console.log(id + '번 좋아요!');
  const handleCopy = (preset) => console.log(preset.title + ' 복사됨!');

  return (
    <div>
      {/* 우리가 만든 홈페이지를 여기서 불러옵니다 */}
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