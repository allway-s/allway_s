import { css } from '@emotion/react';

export const S = {
  wrapper: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fafafa;
    min-height: 100vh;
  `,

  titleSection: css`
    margin-bottom: 30px;
    padding: 20px 0;
    border-bottom: 3px solid #009223;
  `,

  titleContainer: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  mainTitle: css`
    font-size: 2rem;
    font-weight: bold;
    color: #2d2d2d;
    
    span {
      color: #009223;
    }
  `,

  historyContainer: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  orderCard: css`
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  `,

  orderHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
    
    .date {
      font-size: 1rem;
      color: #666;
      font-weight: 500;
    }
    
    .total {
      font-size: 1rem;
      color: #009223;
      font-weight: bold;
    }
  `,

  itemRow: css`
    display: flex;
    gap: 20px;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f0f0f0;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  `,

  // ✅ 상품 이미지 영역 추가
  itemImage: css`
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,

  itemInfo: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .name {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2d2d2d;
    }
    
    .options {
      font-size: 0.95rem;
      color: #666;
      line-height: 1.6;
      
      div {
        margin-bottom: 4px;
        
        strong {
          display: inline-block;
          min-width: 50px;
          color: #2d2d2d;
        }
      }
    }
  `,

  itemActions: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;
    
    .price {
      font-size: 1.1rem;
      font-weight: bold;
      color: #009223;
      white-space: nowrap;
    }
  `,

  saveBtn: css`
    padding: 10px 20px;
    background-color: #009223;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    
    &:hover {
      background-color: #007a1c;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 146, 35, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  `,
};