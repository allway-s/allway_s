/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  // 1. 전체 페이지 레이아웃
  pageWrapper: css`
    width: 100%;
    min-height: 100vh;
    background-color: #fcfcfc;
  `,

  // 2. 레시피 카드 그리드 (메인 화면용)
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  `,

  // 3. 개별 레시피 카드 (공통 스타일)
  card: css`
    background-color: #fff;
    border-radius: 2.5rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    position: relative;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 480px;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    }
  `,

  // 4. 하트 버튼 및 숫자 스타일 (핵심!)
  likeSection: css`
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  `,

  likeButton: (isLiked) => css`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover { transform: scale(1.2); }
    &:active { transform: scale(0.9); }

    svg {
      fill: ${isLiked ? "#ff4d4f" : "none"};
      stroke: ${isLiked ? "#ff4d4f" : "#000"};
      transition: all 0.3s ease;
    }
  `,

  likeCount: (isLiked) => css`
    font-size: 1rem;
    font-weight: 800;
    color: ${isLiked ? "#ff4d4f" : "#000"};
    transition: color 0.3s ease;
  `,

  // 5. 플러스(복사) 버튼
  plusButton: css`
    position: absolute;
    top: 25px;
    right: 25px;
    background: #f5f5f5;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #e0e0e0; }
  `
};