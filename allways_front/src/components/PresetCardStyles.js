/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  card: css`
    background-color: #fff;
    border-radius: 2.5rem; // 시안처럼 아주 둥글게
    padding: 2.5rem 2rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); // 부드럽고 깊은 그림자
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 300px;
    height: 450px; // 카드 높이 고정
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover { transform: translateY(-8px); }
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
    justify-content: flex-start;
    margin-top: 1rem;
    margin-bottom: 2rem;
  `,
  image: css`
    width: 100%;
    height: auto;
    object-fit: contain; // 사진 비율 유지
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
    align-items: flex-end;
  `,

  // ✅ 수정된 방식 (함수 형태로 변경)
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

    // ✨ 이 부분이 핵심입니다! 
    // 내부의 Heart(svg) 아이콘 색상을 데이터 상태(isLiked)에 따라 바꿉니다.
    svg {
      fill: ${isLiked ? "#ff4d4f" : "none"};
      stroke: ${isLiked ? "#ff4d4f" : "#000"};
      transition: all 0.3s ease;
    }
  `,



  likeBox: css`
    justify-self: end;
    width: 72px;
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