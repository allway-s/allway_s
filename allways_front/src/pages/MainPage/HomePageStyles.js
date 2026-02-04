/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    min-height: 100vh;
    background-color: #f8fbf8;
  `,

  header: css`
    width: 100%;
    min-width: 1100px;
    height: 70px;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    z-index: 100;
  `,

  headerInner: css`
    min-width: 1100px;
    margin: 0;
    width: 100%;
    padding: 0 18px;
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
      transition: color 0.2s ease; /* ✅ 트랜지션 추가 */
      
      &:hover {
        color: #009223;
      }
    }
  `,

  heroSection: css`
    padding: 8rem 1rem;
    background-color: #fff;
  `,

  heroContent: css`
    min-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center; 
  `,

  heroTitle: css`
    width: 100%;
    text-align: center; 
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1.4;
    margin-bottom: 5rem;
    color: #111;
    letter-spacing: -0.04em;

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  `,

  heroTitleGreen: css`
    color: #009223;
  `,

  heroTitleBlack: css`
    color: #000; /* ✅ rgb(0, 0, 0) → #000 통일 */
  `,

  heroTitleYellow: css`
    color: #ffc608; /* ✅ #f5c835ff → #ffc608 (서브웨이 노란색 통일) */
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
    transition: all 0.2s ease; /* ✅ ease-in-out → ease로 통일 */
    box-shadow: 0 4px 12px rgba(0, 146, 35, 0.2); /* ✅ 그림자 추가 */

    &:hover {
      background: #007a1c; /* ✅ #1e6a1a → #007a1c (더 일관된 색상) */
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 146, 35, 0.3); /* ✅ 호버시 그림자 강화 */
    }

    &:active {
      transform: scale(0.98); /* ✅ 클릭시 살짝 눌림 효과 */
    }

    /* ✅ 아이콘 스타일 추가 */
    svg {
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateX(4px); /* ✅ 호버시 화살표 살짝 이동 */
    }

    @media (max-width: 768px) {
      align-self: center;
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  `,
};