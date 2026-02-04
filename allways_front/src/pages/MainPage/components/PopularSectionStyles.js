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
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-left: 1rem;

    &:hover {
      background: #000;
      svg {
        stroke: #fff;
      }
      transform: scale(1.05);
    }
  `,

  // ✅ 핵심 수정: 카드 3개를 가운데 정렬
  grid: css`
    display: flex;
    justify-content: center; /* ✅ start → center 변경 */
    gap: 2.5rem; /* ✅ 4rem → 2.5rem (간격 좁힘) */
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    
    /* ✅ 최대 3개만 표시되도록 제한 */
    max-width: 1100px;
    margin: 0 auto;
  `,

  cardWrapper: (isBlur) => css`
    flex: 0 0 320px; /* ✅ flex-grow 0으로 고정 크기 유지 */
    max-width: 320px; /* ✅ 최대 크기 제한 */
    position: relative;
    transition: all 0.3s ease;

    ${isBlur && css`
      filter: blur(8px);
      pointer-events: none;
      user-select: none;
      opacity: 0.6;
    `}

    @media (max-width: 1100px) {
      flex: 0 0 calc(50% - 1.25rem); /* ✅ 2개씩 배치 */
      max-width: calc(50% - 1.25rem);
    }

    @media (max-width: 768px) {
      flex: 0 0 100%; /* ✅ 1개씩 배치 */
      max-width: 400px;
    }
  `,

  blurMessage: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background: #009223;
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
      background: #007a1c;
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
    font-weight: 700;
    font-size: 0.8rem;
    z-index: 10;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `,
};