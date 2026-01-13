import { css } from '@emotion/react';
import { S as CommonS } from './MyPreset.styles.js'; // 기존 공통 스타일 활용

export const S = {
  ...CommonS,
  historyContainer: css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 20px;
  `,
  orderCard: css`
    background: #fff;
    border-radius: 35px;
    padding: 40px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    border: 1px solid #f2f2f2;
    margin-bottom: 40px;
  `,
  orderHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    font-weight: bold;
    .date { color: #666; font-size: 1.1rem; }
    .total { color: #333; font-size: 1.2rem; }
  `,
  itemRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    &:not(:last-child) { border-bottom: 1px solid #f9f9f9; }
  `,
  itemInfo: css`
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 1;
    .name { font-weight: 800; font-size: 1.1rem; min-width: 150px; }
    .options { color: #888; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; }
  `,
  itemActions: css`
    display: flex;
    align-items: center;
    gap: 15px;
    .price { font-weight: bold; min-width: 100px; text-align: right; }
  `,
  saveBtn: css`
    background-color: #d9d9d9;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    &:hover { background-color: #ccc; }
  `
};