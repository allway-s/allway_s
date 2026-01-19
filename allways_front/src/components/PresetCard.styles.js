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
    justify-content: center;
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
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  `,


  likeCount: (isLiked) => css`
    font-size: 1rem;
    font-weight: 800;
    color: ${isLiked ? "#ff4d4f" : "#000"}; /* 좋아요 시 숫자도 빨간색으로 */
  `,
};