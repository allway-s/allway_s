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
    margin-bottom: 20px;

    .logo-section {
      display: flex;
      align-items: center;
      cursor: pointer;
      img { height: 50px; width: auto; object-fit: contain; }
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
    h1 { font-size: 2.2rem; font-weight: 800; color: #2da950; margin: 0; }
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
    gap: 25px;
  `,


  cartItemCard: css`
    background: #fff;
    border-radius: 25px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
    overflow: hidden;
    position: relative;

    .item-main {
      padding: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .info-flex {
      display: flex;
      gap: 25px;
      align-items: center;
    }

    
    .delete-icon-btn {
      background: #fffbe6;
      border: 1px solid #ffe58f;
      color: #d48806;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: #fff1b8; }
    }
  `,

  itemImage: css`
    width: 140px;
    height: 100px;
    background: #f9f9f9;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    img { width: 90%; height: 90%; object-fit: contain; }
  `,

  itemInfo: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    .item-name { font-size: 1.3rem; font-weight: 800; color: #333; }
    .item-sub { color: #888; font-size: 0.95rem; }
    .item-price { font-size: 1.2rem; font-weight: 700; color: #000; margin: 4px 0; }
  `,

  quantityControl: css`
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f5f5f5;
    padding: 5px 15px;
    border-radius: 20px;
    width: fit-content;
    button { border: none; background: none; cursor: pointer; font-size: 1.1rem; font-weight: bold; color: #666; }
    span { font-weight: 700; min-width: 20px; text-align: center; }
  `,


  itemOptionDropdown: css`
    border-top: 1px solid #f5f5f5;
    background: #fafafa;

    .dropdown-header {
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #555;
      font-weight: 700;
      font-size: 0.95rem;
      transition: background 0.2s;
      &:hover { background: #f0f0f0; }
    }

    .option-list {
      list-style: none;
      padding: 5px 0;
      margin: 0;
      background: #fff;
      border-top: 1px solid #eee;
      animation: slideDown 0.2s ease-out;

      @keyframes slideDown {
        from { opacity: 0; max-height: 0; }
        to { opacity: 1; max-height: 200px; }
      }

      li {
        padding: 12px 30px;
        font-size: 0.95rem;
        font-weight: 600;
        border-bottom: 1px solid #f9f9f9;
        cursor: pointer;
        &:hover {
          background: #f0f9f1;
          color: #009223;
        }
        &:last-child { border-bottom: none; }
      }
    }
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
      input { 
        padding: 12px; 
        border: 1px solid #f0f0f0; 
        background: #fafafa; 
        border-radius: 10px; 
        font-family: inherit;
        color: #333;
      }
    }
  `,

  typeSelector: css`
    position: relative;
    border: 1.5px solid #eee;
    border-radius: 12px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover { border-color: #009223; }

    .selected-item {
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      padding: 16px;
      font-weight: 800;
      font-size: 1.05rem;
      .fee-highlight {
        color: #ff4d4f;
        margin-left: 10px;
        background: #fff1f0;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 0.9rem;
      }
    }

    .options-list {
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      right: 0;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 12px;
      list-style: none;
      padding: 8px 0;
      margin: 0;
      z-index: 100;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      overflow: hidden;
      li {
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        font-weight: 600;
        color: #555;
        &:hover { background: #f0f9f1; color: #009223; }
        .fee-text { color: #ff4d4f; font-weight: 700; font-size: 0.9rem; }
      }
    }
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
      color: #009223; 
      background: #f0f9f1; 
      padding: 5px 15px; 
      border-radius: 10px;
      transition: all 0.3s ease;
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
    transition: all 0.2s;
    &:hover { 
      background: #007a1d; 
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 146, 35, 0.3);
    }
  `,
};