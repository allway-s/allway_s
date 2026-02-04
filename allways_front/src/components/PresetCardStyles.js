/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  card: css`
    background-color: #fff;
    border-radius: 2.5rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 300px;
    height: 450px;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-8px);
    }
  `,

  plusButton: css`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 2;
  `,

  imageWrapper: css`
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center; /* ✅ flex-start → center로 수정 */
    margin-top: 1rem;
    margin-bottom: 2rem;
  `,

  image: css`
    width: 100%;
    height: 100%; /* ✅ auto → 100%로 수정 */
    object-fit: cover; /* ✅ contain → cover로 수정 (더 예쁨) */
    border-radius: 1rem; /* ✅ 이미지에 둥근 모서리 추가 */
  `,

  content: css`
    text-align: left;
    flex-grow: 1;
  `,

  cardTitle: css`
    font-size: 1.25rem;
    font-weight: 800;
    color: #000;
    margin-bottom: 0.5rem;
  `,

  authorText: css`
    font-size: 0.95rem;
    font-weight: 600;
    color: #666;
  `,

  footer: css`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end; /* ✅ 이미 flex-end라 괜찮음 */
  `,

  likeButton: (isLiked) => css`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      fill: ${isLiked ? "#ff4d4f" : "none"};
      stroke: ${isLiked ? "#ff4d4f" : "#000"};
      transition: all 0.3s ease;
    }
  `,

  likeBox: css`
    /* ✅ justify-self는 flex에서 작동 안함 - 제거 */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  `,

  likeMark: css`
    background: transparent;
    border: none;
    padding: 0;
    line-height: 0;
    cursor: pointer; /* ✅ 클릭 가능하게 추가 */
  `,

  heartMini: css`
    width: 20px;
    height: 20px;
  `,

  countMini: css`
    font-size: 14px;
    font-weight: 600;
    color: #111;
  `,
};