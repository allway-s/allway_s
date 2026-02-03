/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { S } from './HomeMenuStyles.js';
import { getItems } from '../../../apis/items/menuApi.js';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 아이콘 라이브러리 활용

export function HomeMenu() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('샌드위치');
  const [items, setItems] = useState([]);
  const scrollRef = useRef(null); // 스크롤 제어를 위한 ref

  const fetchMenus = async (category) => {
    try {
      const response = await getItems(category);
      const filtered = (response.data || []).filter(item => item.size === 15 || !item.size);
      setItems(filtered);
    } catch (error) {
      console.error("메뉴 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchMenus(activeCategory);
  }, [activeCategory]);

  // ✅ 좌우 스크롤 이동 함수
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 600; // 한 번 클릭 시 이동할 거리
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section css={S.section}>
      <div css={S.container}>
        <div css={S.menuTabList}>
          {['샌드위치', '샐러드', '랩'].map((cat) => (
            <div 
              key={cat} 
              css={S.tabItem(activeCategory === cat)}
              onClick={() => setActiveCategory(cat)}
            >
              <span css={S.menuName}>{cat}</span>
            </div>
          ))}
        </div>

        <div css={S.detailPanel}>
          {/* ✅ 좌측 화살표 버튼 (진현님이 짚어주신 스타일) */}
          <button css={S.arrowButton('left')} onClick={() => handleScroll('left')}>
            <ChevronLeft size={24} />
          </button>

          <div css={S.scrollContainer} ref={scrollRef}>
            <div css={S.menuGrid}>
              {items.map((menu) => (
                <div key={menu.itemId} css={S.menuCard} onClick={() => navigate('/menu')}>
                  <div css={S.imageArea}>
                    <img src={menu.imageUrl} alt={menu.itemName}/>
                  </div>
                  <div css={S.infoArea}>
                    <strong>{menu.itemName}</strong>
                    <p css={S.itemDesc}>{menu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ 우측 화살표 버튼 */}
          <button css={S.arrowButton('right')} onClick={() => handleScroll('right')}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}