/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { S } from './HomeMenu.styles.js';
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
                    <img src={menu.imgUrl} alt={menu.itemName} />
                  </div>
                  <div css={S.infoArea}>
                    <strong>{menu.itemName}</strong>
                    <p css={S.itemDesc}>{menu.content}</p>
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


// /** @jsxImportSource @emotion/react */
// import React, { useState, useEffect } from 'react';
// import { S } from './HomeMenu.styles.js';
// import { getItems } from '../../../apis/items/orderApi'; // ✅ 기존 API 활용
// import { useNavigate } from 'react-router-dom';

// const MENU_CATEGORIES = [
//   { id: '샌드위치', name: '샌드위치' },
//   { id: '샐러드', name: '샐러드' },
//   { id: '랩', name: '유닛/랩' },
// ];

// export function HomeMenu() {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState('샌드위치');
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ 1. API를 통해 실제 메뉴 데이터 가져오기
//   const fetchMenus = async (category) => {
//     setLoading(true);
//     try {
//       const response = await getItems(category);
//       // 15cm 사이즈만 필터링 (MenuPage 로직 유지)
//       const filtered = (response.data || []).filter(item => item.size === 15 || !item.size);
//       setItems(filtered);
//     } catch (error) {
//       console.error("메뉴 로드 실패:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenus(activeCategory);
//   }, [activeCategory]);

//   return (
//     <section css={S.section}>
//       <div css={S.container}>
//         {/* 1. 카테고리 탭 */}
//         <div css={S.menuTabList}>
//           {MENU_CATEGORIES.map((category) => (
//             <div 
//               key={category.id} 
//               css={S.tabItem(activeCategory === category.id)}
//               onClick={() => setActiveCategory(category.id)}
//             >
//               <span css={S.menuName}>{category.name}</span>
//             </div>
//           ))}
//         </div>

//         {/* 2. 상세 메뉴 패널 (가로 스크롤 적용 영역) */}
//         <div css={S.detailPanel}>
//           <div css={S.scrollContainer}> 
//             {loading ? (
//               <p css={S.emptyText}>메뉴를 불러오는 중입니다...</p>
//             ) : items.length === 0 ? (
//               <p css={S.emptyText}>등록된 메뉴가 없습니다.</p>
//             ) : (
//               <div css={S.menuGrid}>
//                 {items.map((menu) => (
//                   <div 
//                     key={menu.itemId} 
//                     css={S.menuCard} 
//                     onClick={() => navigate('/menu')} // 클릭 시 메뉴 페이지로 이동
//                   >
//                     <div css={S.imageArea}>
//                       {menu.imgUrl ? (
//                         <img src={menu.imgUrl} alt={menu.itemName} />
//                       ) : (
//                         <span style={{color: '#ddd'}}>No Image</span>
//                       )}
//                     </div>
//                     <div css={S.infoArea}>
//                       <strong>{menu.itemName}</strong>
//                       <p css={S.itemDesc}>{menu.content}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// /** @jsxImportSource @emotion/react */
// import React, { useState } from 'react';
// import { S } from './HomeMenu.styles.js';
// import { HOME_MENU_DATA } from '../constants.js'; // ✅ 경로 주의: components 폴더 밖의 constants를 참조

// const MENU_CATEGORIES = [
//   { id: 'sandwich', name: '샌드위치' },
//   { id: 'salad', name: '샐러드' },
//   { id: 'wrap', name: '유닛/랩' },
// ];

// export function HomeMenu() {
//   const [activeCategory, setActiveCategory] = useState('sandwich');

//   const handleCategoryClick = (id) => {
//     setActiveCategory(id);
//   };

//   // ✅ 현재 선택된 카테고리의 메뉴 데이터 가져오기
//   const currentMenus = HOME_MENU_DATA[activeCategory] || [];

//   return (
//     <section css={S.section}>
//       <div css={S.container}>
//         {/* 1. 카테고리 탭 메뉴 */}
//         <div css={S.menuTabList}>
//           {MENU_CATEGORIES.map((category) => (
//             <div 
//               key={category.id} 
//               css={S.tabItem(activeCategory === category.id)}
//               onClick={() => handleCategoryClick(category.id)}
//             >
//               <span css={S.menuName}>{category.name}</span>
//             </div>
//           ))}
//         </div>

//         {/* 2. 상세 메뉴 패널 */}
//         <div css={S.detailPanel}>
//             <div css={S.menuGrid}>
//               {currentMenus.map((menu) => (
//                 <div key={menu.id} css={S.menuCard}>
//                   <div css={S.imageArea}>
//                     {/* 이미지가 있다면 넣고, 없다면 텍스트로 대체 */}
//                     {menu.image ? <img src={menu.image} alt={menu.name} /> : <span style={{color: '#ddd'}}>No Image</span>}
//                   </div>
//                   <div css={S.infoArea}>
//                     <strong>{menu.name}</strong>
//                     <p css={S.itemDesc}>{menu.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//       </div>
//     </section>
//   );
// }