/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { S } from './HomeMenu.styles.js';

// 이미지가 필요 없으므로 텍스트 데이터만 유지합니다.
const MENU_CATEGORIES = [
  { id: 'sandwich', name: '샌드위치' },
  { id: 'salad', name: '샐러드' },
  { id: 'wrap', name: '유닛/랩' },
];

export function HomeMenu() {
  const [activeCategory, setActiveCategory] = useState('sandwich'); // 기본값을 'sandwich'로 설정하면 더 자연스러워요.

  const handleCategoryClick = (id) => {
    setActiveCategory(id); // 탭 메뉴 특성상 다시 눌러도 닫히지 않고 유지되는 것이 일반적입니다.
  };

  return (
    <section css={S.section}>
      <div css={S.container}>
        {/* 1. 텍스트 카테고리 메뉴 (Tab 형태) */}
        <div css={S.menuTabList}>
          {MENU_CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              css={S.tabItem(activeCategory === category.id)}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span css={S.menuName}>{category.name}</span>
            </div>
          ))}
        </div>

        {/* 2. 상세 메뉴 패널 (선택된 카테고리 내용 표시) */}
        <div css={S.detailPanel}>
           <div css={S.detailContent}>
              <h3 css={S.detailTitle}>
                {MENU_CATEGORIES.find(c => c.id === activeCategory)?.name}
              </h3>
              <div css={S.menuListPlaceholder}>
                 {/* 여기에 나중에 카테고리별 실제 메뉴 리스트를 렌더링하세요 */}
                 <p>{activeCategory} 섹션의 메뉴들이 여기에 표시됩니다.</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}