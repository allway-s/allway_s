/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 40px;
    font-family: 'Pretendard', sans-serif;
  `,

  navBar: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;

    .logo-section {
      display: flex;
      align-items: center;
      cursor: pointer;
      img { 
        height: 50px; 
        width: auto;
        object-fit: contain;
      }
    }

    .title-section {
      font-size: 1.8rem;
      font-weight: 900;
      color: #009223;
      cursor: pointer;
      span { color: #ffce32; }
    }

    .menu-section {
      display: flex;
      gap: 20px;
      span {
        font-size: 0.9rem;
        font-weight: 600;
        color: #333;
        cursor: pointer;
        &:hover { color: #009223; }
      }
    }
  `,
  
  header: css`
    border-bottom: 2px solid #009223;
    padding-bottom: 15px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    h1 { font-size: 2.2rem; font-weight: 800; color: #333; margin: 0; }
  `,

  homeButton: css`
    background: none;
    border: none;
    color: #666;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    &:hover { color: #009223; text-decoration: underline; }
  `,

  contentWrapper: css`
    display: flex;
    gap: 40px;
    align-items: flex-start;
    @media (max-width: 960px) { flex-direction: column; }
  `,

  cartList: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  cartItem: css`
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #f0f0f0;

    .left-group {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .checkbox-custom {
      width: 20px;
      height: 20px;
      accent-color: #009223;
      cursor: pointer;
    }
  `,

  // [중요] 진현님의 JSX <div css={S.itemImage}>와 일치하도록 수정
  itemImage: css`
    width: 120px;  /* 이미지 박스 가로 크기 고정 */
    height: 90px;  /* 이미지 박스 세로 크기 고정 */
    background: #f8f8f8;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;    /* 박스 너비에 맞춤 */
      height: 100%;   /* 박스 높이에 맞춤 */
      object-fit: contain; /* 비율 유지하며 박스 안에 쏙 들어감 */
    }
  `,

  itemInfo: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    .item-name { font-size: 1.2rem; font-weight: 700; color: #333; }
    .item-option { color: #888; font-size: 0.9rem; }
    .item-price { font-size: 1.1rem; font-weight: 700; color: #000; }
  `,

  quantityControl: css`
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f5f5f5;
    padding: 6px 15px;
    border-radius: 30px;
    margin-top: 10px;
    width: fit-content;
    button { border: none; background: none; cursor: pointer; font-size: 1.2rem; font-weight: bold; color: #666; }
    span { font-weight: 700; min-width: 20px; text-align: center; }
  `,

  optionButton: css`
    border: 1px solid #eee;
    background: #f8f9fa;
    padding: 8px 15px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: #f1f1f1; }
  `,

  orderSidebar: css`
    width: 380px;
    background: #fff;
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 20px;
    border: 1px solid #f0f0f0;
    h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 25px; }
  `,

  infoSection: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      label { font-weight: 700; font-size: 1rem; }
      input { padding: 12px; border: 1px solid #f0f0f0; background: #fafafa; border-radius: 10px; }
    }
  `,

  typeSelector: css`
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 15px;
    .type-item { display: flex; justify-content: space-between; font-weight: 600; }
  `,

  totalPriceArea: css`
    border-top: 1px solid #eee;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span { font-size: 1.2rem; font-weight: 700; }
    strong { 
      font-size: 1.8rem; 
      color: #4facfe; 
      background: #fdf2f2; 
      padding: 5px 15px; 
      border-radius: 10px; 
    }
  `,

  orderButton: css`
    width: 100%;
    margin-top: 30px;
    padding: 18px;
    background: #009223;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: 800;
    cursor: pointer;
    transition: background 0.2s;
    &:hover { background: #007a1d; }
    &:active { transform: scale(0.98); }
  `,
};