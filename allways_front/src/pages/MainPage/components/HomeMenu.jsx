/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { S } from './HomeMenu.styles.js';
import { HOME_MENU_DATA } from '../constants.js'; // ✅ 경로 주의: components 폴더 밖의 constants를 참조

const MENU_CATEGORIES = [
  { id: 'sandwich', name: '샌드위치' },
  { id: 'salad', name: '샐러드' },
  { id: 'wrap', name: '유닛/랩' },
];

export function HomeMenu() {
  const [activeCategory, setActiveCategory] = useState('sandwich');

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
  };

  // ✅ 현재 선택된 카테고리의 메뉴 데이터 가져오기
  const currentMenus = HOME_MENU_DATA[activeCategory] || [];

  return (
    <section css={S.section}>
      <div css={S.container}>
        {/* 1. 카테고리 탭 메뉴 */}
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

        {/* 2. 상세 메뉴 패널 */}
        <div css={S.detailPanel}>
            <div css={S.menuGrid}>
              {currentMenus.map((menu) => (
                <div key={menu.id} css={S.menuCard}>
                  <div css={S.imageArea}>
                    {/* 이미지가 있다면 넣고, 없다면 텍스트로 대체 */}
                    {menu.image ? <img src={menu.image} alt={menu.name} /> : <span style={{color: '#ddd'}}>No Image</span>}
                  </div>
                  <div css={S.infoArea}>
                    <strong>{menu.name}</strong>
                    <p css={S.itemDesc}>{menu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}