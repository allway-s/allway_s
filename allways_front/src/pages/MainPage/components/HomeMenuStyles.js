import { css } from '@emotion/react';

export const S = {
  section: css`
    padding: 80px 0;
    background-color: #ffffff;
  `,
  container: css`
    /* ✅ 컨테이너 너비를 충분히 확보 */
    max-width: 1400px; 
    margin: 0 auto;
    padding: 0 40px;
  `,
  menuTabList: css`
    display: flex;
    justify-content: center;
    /* ✅ 탭 사이 간격을 40px -> 80px로 대폭 늘려 개방감 부여 */
    gap: 80px; 
    margin-bottom: 60px;
    border-bottom: 2px solid #f0f0f0;
  `,
  tabItem: (isActive) => css`
    padding: 15px 30px; /* 좌우 패딩 추가 */
    cursor: pointer;
    border-bottom: 4px solid ${isActive ? '#009223' : 'transparent'};
    color: ${isActive ? '#009223' : '#999'};
    font-weight: ${isActive ? '800' : '500'};
    font-size: 20px; /* 가독성을 위해 폰트 크기 살짝 키움 */
    transition: all 0.3s ease;
    
    &:hover {
      color: #009223;
    }
  `,
  menuName: css`
    display: block;
  `,
  detailPanel: css`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    /* ✅ 화살표가 숨 쉴 수 있는 충분한 내부 여백 */
    padding: 0 60px; 
  `,
  scrollContainer: css`
    overflow-x: auto;
    width: 100%;
    padding: 20px 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  arrowButton: (direction) => css`
    position: absolute;
    /* ✅ 버튼을 컨테이너 양 끝에 딱 붙여서 시각적 균형 유지 */
    ${direction}: 10px; 
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.95);
    border: 1px solid #eee;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #009223;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #009223;
      color: #ffffff;
      box-shadow: 0 6px 15px rgba(0, 146, 35, 0.3);
    }
  `,
  menuGrid: css`
    display: flex;
    gap: 35px;
    width: max-content;
    /* ✅ 중요: 카드가 적을 때 왼쪽으로 쏠리지 않도록 최소 너비를 부모만큼 확보 */
    min-width: 100%;
    justify-content: center; /* 중앙 정렬 추가 */
  `,
  menuCard: css`
    width: 280px; 
    flex-shrink: 0;
    background: #fff;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #f5f5f5;
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      border-color: #009223;
    }
  `,
  imageArea: css`
    
    width: 280px;
    height: 200px;
    background-color: #fcfcfc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
  noImage: css`
    color: #ccc;
    font-size: 14px;
    font-weight: bold;
  `,
  infoArea: css`
    padding: 25px 20px;
    text-align: center;
  `,
  itemName: css`
    display: block;
    font-size: 20px;
    color: #222;
    margin-bottom: 12px;
    font-weight: 700;
  `,
  itemDesc: css`
    font-size: 14px;
    color: #777;
    line-height: 1.5;
    height: 42px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  statusMessage: css`
    width: 100%;
    text-align: center;
    padding: 100px 0;
    color: #bbb;
    font-size: 16px;
  `
};




// import { css } from '@emotion/react';

// export const S = {
//   section: css`
//     padding: 60px 0;
//     background-color: #f8f8f8;
//   `,
//   container: css`
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 20px;
//   `,
//   menuTabList: css`
//     display: flex;
//     justify-content: center;
//     gap: 40px;
//     margin-bottom: 40px;
//     border-bottom: 2px solid #eee;
//   `,
//   tabItem: (isActive) => css`
//     padding: 15px 10px;
//     cursor: pointer;
//     border-bottom: 3px solid ${isActive ? '#009223' : 'transparent'};
//     color: ${isActive ? '#009223' : '#666'};
//     font-weight: ${isActive ? 'bold' : 'normal'};
//     transition: all 0.2s;
//   `,
//   detailPanel: css`
//     width: 100%;
//     overflow: hidden; /* 영역 밖 숨김 */
//   `,
//   // ✅ 가로 스크롤의 핵심 부분
//   scrollContainer: css`
//     overflow-x: auto;
//     padding-bottom: 20px;
    
//     /* 스크롤바 커스텀 (깔끔하게) */
//     &::-webkit-scrollbar {
//       height: 6px;
//     }
//     &::-webkit-scrollbar-thumb {
//       background: #ddd;
//       border-radius: 10px;
//     }
//   `,
//   menuGrid: css`
//     display: flex; /* Grid 대신 Flex로 가로 한 줄 배치 */
//     gap: 20px;
//     width: max-content; /* 내부 콘텐츠 크기에 맞게 가로로 길어짐 */
//   `,
//   menuCard: css`
//     width: 280px; /* 고정 너비 설정 */
//     flex-shrink: 0; /* 가로 공간이 좁아져도 줄어들지 않음 */
//     background: #fff;
//     border-radius: 20px;
//     overflow: hidden;
//     box-shadow: 0 4px 10px rgba(0,0,0,0.05);
//     cursor: pointer;
//     transition: transform 0.2s;
    
//     &:hover {
//       transform: translateY(-5px);
//     }
//   `,
//   imageArea: css`
//     width: 100%;
//     height: 180px;
//     background: #f1f1f1;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       padding: 10px;
//     }
//   `,
//   infoArea: css`
//     padding: 20px;
//     text-align: center;
//     strong {
//       display: block;
//       font-size: 18px;
//       margin-bottom: 8px;
//       color: #333;
//     }
//   `,
//   itemDesc: css`
//     font-size: 14px;
//     color: #999;
//     line-height: 1.4;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-line-clamp: 2; /* 두 줄 넘어가면 ... 처리 */
//     -webkit-box-orient: vertical;
//   `,
//   emptyText: css`
//     text-align: center;
//     color: #aaa;
//     padding: 50px 0;
//     width: 100%;
//   `
// };





// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';

// export const S = {
//   section: css`
//     padding: 2rem 0;
//     background-color: #fff;
//   `,
//   container: css`
//     max-width: 1100px;
//     min-width: 1100px;
//     margin: 0 auto;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//   `,
//   menuTabList: css`
//     display: flex;
//     justify-content: space-around;
//     gap: 3rem; // 텍스트 사이 간격
//     margin-bottom: 1rem;
//     border-bottom: 2px solid #eee; // 전체 하단 라인
//     width: 100%;
//     max-width: 800px;
//   `,
//   tabItem: (isActive) => css`
//     padding: 1rem 0.5rem;
//     cursor: pointer;
//     position: relative;
//     transition: all 0.2s ease;

//     // 선택 시 하단에 초록색 바(Bar) 표시
//     &::after {
//       content: '';
//       position: absolute;
//       bottom: -2px; // border-bottom 위치와 맞춤
//       left: 0;
//       width: 100%;
//       height: 4px;
//       background-color: ${isActive ? '#009223' : 'transparent'};
//       border-radius: 2px;
//     }

//     & > span {
//       font-size: 1.25rem;
//       color: ${isActive ? '#009223' : '#666'};
//       font-weight: ${isActive ? '900' : '600'};
//       transition: color 0.2s;
//     }

//     &:hover > span {
//       color: #009223;
//     }
//   `,
//   menuName: css`
//     display: block;
//   `,
//   detailPanel: css`
//     width: 100%;
//     max-width: 1060px;
//     padding: 2rem 0; // 패딩 살짝 조절
//     animation: fadeIn 0.4s ease-out;

//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//   `,

//   // ✅ 메뉴들을 바둑판 모양으로 정렬하는 Grid
//   menuGrid: css`
//     display: grid;
//     grid-template-columns: repeat(3, 1fr); // 한 줄에 3개씩 고정 (혹은 auto-fill 사용)
//     gap: 2rem;
//     width: 100%;
//   `,

//   // ✅ 개별 메뉴 카드 스타일
//   menuCard: css`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 2rem;
//     background-color: #fff;
//     border: 1px solid #f0f0f0;
//     border-radius: 1.5rem;
//     transition: all 0.3s ease;
//     cursor: pointer;

//     &:hover {
//       box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
//       transform: translateY(-8px);
//       border-color: #009223;
//     }
//   `,

//   // ✅ 이미지 영역 (이미지가 없을 때를 대비한 기본 배경)
//   imageArea: css`
//     width: 100%;
//     height: 160px;
//     background-color: #f8f8f8;
//     border-radius: 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 1.5rem;
//     overflow: hidden;

//     img {
//       width: 80%;
//       height: auto;
//       object-fit: contain;
//     }
//   `,

//   // ✅ 텍스트 정보 영역
//   infoArea: css`
//     text-align: center;
    
//     strong {
//       display: block;
//       font-size: 1.2rem;
//       color: #333;
//       margin-bottom: 0.5rem;
//       font-weight: 700;
//     }

//     p {
//       font-size: 0.9rem;
//       color: #888;
//       margin-bottom: 1rem;
//       line-height: 1.4;
//     }

//     span {
//       font-size: 1.1rem;
//       color: #009223;
//       font-weight: 800;
//     }
//   `,
// };