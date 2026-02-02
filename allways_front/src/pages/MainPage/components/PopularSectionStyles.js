/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  section: css`
    padding: 4rem 1rem;
    background-color: #fff;
  `,

  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4rem;
  `,

  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    width: 100%;
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 0.5rem;
  `,

  title: css`
    font-size: 2.5rem;
    font-weight: 900;
    color: #080808;
    letter-spacing: -0.03em;
  `,

  headerRight: css`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    gap: 1rem;
  `,

  headerText: css`
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    @media (max-width: 768px) {
      display: none;
    }
  `,

  iconButton: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid #333;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-left: 1rem;

    &:hover {
      background: #000;
      color: #fff;
      transform: scale(1.05);
    }
  `,

  grid: css`
    display: flex !important;
    justify-content: start;
    gap: 4rem;
    width: 100%;
    flex-wrap: wrap;
    position: relative; /* ✅ 메시지 배치를 위한 기준점 */
  `,

  // ✅ 블러 상태를 인자로 받는 함수형 스타일
  cardWrapper: (isBlur) => css`
    display: flex;
    justify-content: start;
    flex: 0 1 320px;
    min-width: 280px;
    transition: all 0.3s ease;

    ${isBlur && css`
      filter: blur(8px);      /* ✅ 흐림 효과 */
      pointer-events: none;   /* ✅ 클릭 방지 */
      user-select: none;      /* ✅ 드래그 방지 */
      opacity: 0.6;           /* ✅ 투명도 조절 */
    `}

    @media (max-width: 640px) {
      flex: 1 1 100%;
      max-width: 400px;
    }
  `,

  // ✅ 블러된 영역 중앙에 띄울 안내 문구 스타일
  blurMessage: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background: #ffe41a; /* 서브웨이 메인 그린 컬러 */
    color: white;
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 800;
    box-shadow: 0 10px 25px rgba(0, 146, 35, 0.3);
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;

    &:hover {
      background: #ffc812;
      transform: translate(-50%, -50%) scale(1.05);
    }
  `,

  bestBadge: css`
    position: absolute;
    top: -10px;
    left: -10px;
    background: #ffc608;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `,
};