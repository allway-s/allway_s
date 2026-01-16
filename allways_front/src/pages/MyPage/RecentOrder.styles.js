/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  wrapper: css`
    min-height: 100vh;
    background-color: #fcfcfc; /* 배경을 살짝 깔아 카드가 돋보이게 함 */
  `,
  titleSection: css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 20px 20px;
  `,
  mainTitle: css`
    font-size: 2.5rem;
    color: #009223;
    font-weight: 900;
    span { color: #ffc107; }
    border-bottom: 3px solid #ffc107;
    display: inline-block;
    padding-bottom: 10px;
  `,
  historyContainer: css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px 20px 80px;
  `,
  // 참조하신 시안의 둥근 라운딩과 그림자 적용
  orderCard: css`
    background-color: #fff;
    border-radius: 2.5rem; /* 시안과 동일하게 아주 둥글게 */
    padding: 2.5rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05); /* 부드럽고 깊은 그림자 */
    border: 1px solid #f2f2f2;
    margin-bottom: 40px;
    transition: transform 0.3s ease;
    &:hover { transform: translateY(-5px); }
  `,
  orderHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #f9f9f9;
    margin-bottom: 20px;
    .date { 
      color: #009223; 
      font-weight: 800; 
      font-size: 1.2rem; 
    }
    .total { 
      color: #333; 
      font-weight: 900; 
      font-size: 1.3rem; 
    }
  `,
  itemRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    &:not(:last-child) { border-bottom: 1px solid #f9f9f9; }
  `,
  itemInfo: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    .name { 
      font-weight: 800; 
      font-size: 1.15rem; 
      color: #000;
    }
    .options { 
      color: #666; 
      font-size: 0.95rem; 
      line-height: 1.4;
      max-width: 80%;
    }
  `,
  itemActions: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    .price { 
      font-weight: 800; 
      font-size: 1.1rem; 
      color: #333; 
    }
  `,
  saveBtn: css`
    background-color: #fff0f3; /* 연한 핑크 배경 */
    border: 1px solid #ff85a1;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ff85a1;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover { 
      background-color: #ff85a1; 
      color: #fff;
    }
  `
};