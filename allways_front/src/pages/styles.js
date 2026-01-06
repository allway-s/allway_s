import { css } from '@emotion/react';

export const styles = {
  // --- 전체 레이아웃 & 헤더 ---
  wrapper: css`
    min-height: 100vh;
    background-color: #f8fbf8;
  `,

  header: css`
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 100;
  `,

  headerInner: css`
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,

  logoArea: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  utilMenu: css`
    position: absolute;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #374151;
      font-weight: 700;
      font-size: 1rem;
      
      &:hover {
        color: #009223;
      }
    }
  `,

  // --- 배너 섹션 ---

  // styles.js 에 추가
bannerDots: css`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`,

dot: (isActive) => css`
  height: 8px;
  width: ${isActive ? '24px' : '8px'};
  background-color: ${isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
`,

  bannerSection: css`
    width: 100%;
    height: 400px;
    overflow: hidden; 
    position: relative;
    &:hover .arrow-btn { opacity: 1; }
  `,

  bannerWrapper: css`
    display: flex; 
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
  `,

  bannerItem: css`
    min-width: 100%;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `,

  bannerContent: css`
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    gap: 40px;
    box-sizing: border-box;
  `,

  bannerText: css`
    flex: 1;
    min-width: 500px;
    h2 { 
      font-size: 3rem; 
      margin-bottom: 1rem; 
      font-weight: 800; 
      line-height: 1.3;
      white-space: pre-line;
    }
    p { font-size: 1.25rem; opacity: 0.9; }
  `,

  bannerImageArea: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  bannerImg: css`
    max-height: 320px;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
  `,

  arrowButton: (side) => css`
    position: absolute;
    top: 50%;
    ${side === 'left' ? 'left: 20px;' : 'right: 20px;'}
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
    opacity: 0;
    &:hover { background: rgba(255, 255, 255, 0.4); transform: translateY(-50%) scale(1.1); }
  `,

  // --- 히어로 섹션 ---
  heroSection: css`
    padding: 6rem 1rem;
    background-color: #fff;
    text-align: center;
  `,

  heroTitle: css`
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 2rem;
  `,

  heroTitleGreen: css`
    color: #009223;
  `,

  orderButton: css`
    background-color: #009223;
    color: #fff;
    padding: 1.25rem 2.5rem;
    border-radius: 50px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
      background-color: #007b1d;
    }
  `,

  // --- 프리셋 섹션 & 그리드 ---
  popularSection: css`
    padding: 5rem 1rem;
  `,

  popularContainer: css`
    max-width: 1200px;
    margin: 0 auto;
  `,

  sectionHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
  `,

  sectionTitle: css`
    font-size: 2rem;
    font-weight: 800;
  `,

  moreButton: css`
    color: #009223;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      text-decoration: underline;
    }
  `,

  grid: css`
    display: grid;
    grid-template-cols: repeat(3, 1fr); 
    gap: 2rem;
    
    @media (max-width: 1024px) {
      grid-template-cols: repeat(2, 1fr);
    }
    @media (max-width: 640px) {
      grid-template-cols: 1fr;
    }
  `,

  cardWrapper: css`
    position: relative;
  `,

  bestBadge: css`
    position: absolute;
    top: -15px;
    left: -15px;
    background: #ffc608;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border: 4px solid white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  `,

  /* ⭐ [수정/추가됨] PresetCard 관련 스타일 */
  card: css`
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #f3f4f6;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateY(-4px);
    }
  `,

  cardImagePlaceholder: css`
    height: 10rem;
    background-color: #f0fdf4;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  cardContent: css`
    padding: 1.25rem;
  `,

  cardHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  `,

  cardTitle: css`
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
  `,

  authorBox: css`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #6b7280;
  `,

  cardFooter: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #f9fafb;
  `,

  iconGroup: css`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,

  /* ⭐ [에러 해결 핵심] actionButton을 함수 형태로 수정 */
  actionButton: (type) => css`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #4b5563;
    transition: color 0.2s;

    &:hover {
      color: ${type === 'like' ? '#ef4444' : '#3b82f6'};
    }
  `,

  detailButton: css`
    font-size: 0.75rem;
    font-weight: 700;
    color: #059669;
    background-color: #f0fdf4;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #dcfce7;
    }
  `,

  // --- 서비스 특징 섹션 ---
  featureSection: css`
    padding: 5rem 1rem;
    background-color: #fff;
  `,

  featureGrid: css`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-cols: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
  `,

  featureItem: css`
    padding: 2.5rem;
    background: #f8fbf8;
    border-radius: 30px;
    transition: border-color 0.3s;
    border: 1px solid transparent;

    &:hover {
      border-color: #009223;
    }
  `,

  featureIconBox: css`
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  `,

  featureNumber: css`
    color: #009223;
    font-weight: 900;
    font-size: 1.5rem;
  `,
};