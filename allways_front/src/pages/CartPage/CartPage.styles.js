/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    min-height: 100vh;
    background-color: #ffffff; 
    font-family: 'Pretendard', sans-serif;
  `,

  titleSection: css`
    width: 100%;
    margin-top: 80px;
    margin-bottom: 50px;
  `,

  titleContainer: css`
    display: inline-block;
    margin-left: calc((100% - 1200px) / 2 + 20px);
    position: relative;
    padding-bottom: 5px;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ffc107;
    }
  `,

  mainTitle: css`
    font-size: 3rem;
    font-weight: 800;
    color: #009223;
    margin: 0;
  `,

  yellowText: css`
    color: #ffc107;
  `,

  main: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 100px;
  `,

  contentWrapper: css`
    display: flex;
    gap: 40px;
    align-items: flex-start;
  `,

  cartList: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,

  /* [수정] 카드 디자인 - 마이페이지 박스와 동일한 세련된 여백 */
  cartItemCard: css`
    background: #fff;
    border-radius: 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    border: 1px solid #f2f2f2;
    overflow: hidden;

    .item-main {
      padding: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center; /* 세로 중앙 정렬 */
    }

    .info-flex {
      display: flex;
      gap: 30px;
      align-items: center;
    }

    .delete-icon-btn {
      background: #fdfdfd;
      border: 1px solid #eee;
      color: #bbbbbb;
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: #ff4d4f; color: #fff; border-color: #ff4d4f; }
    }
  `,

  itemImage: css`
    width: 180px;
    height: 130px;
    background: #f9f9f9;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img { width: 85%; height: auto; object-fit: contain; }
  `,

  /* [수정] 텍스트가 겹치지 않게 flex-direction: column 적용 */
  itemInfo: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .item-name { font-size: 1.5rem; font-weight: 800; color: #333; }
    .item-sub { color: #888; font-size: 1.05rem; }
    .item-price { font-size: 1.3rem; font-weight: 700; color: #000; margin: 4px 0; }
  `,

  quantityControl: css`
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f5f5f5;
    padding: 6px 18px;
    border-radius: 25px;
    width: fit-content;
    margin-top: 8px;
    button { border: none; background: none; cursor: pointer; font-size: 1.2rem; font-weight: bold; color: #666; }
    span { font-weight: 800; min-width: 25px; text-align: center; }
  `,

  /* [수정] 드롭다운 디자인 정돈 */
  itemOptionDropdown: css`
    border-top: 1px solid #f9f9f9;
    background: #fafafa;

    .dropdown-header {
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      color: #777;
      font-weight: 700;
      transition: background 0.2s;
      &:hover { background: #f0f0f0; }
    }

    .option-list {
      list-style: none;
      padding: 0;
      margin: 0;
      background: #fff;
      border-top: 1px solid #eee;
      li {
        padding: 15px 40px;
        font-weight: 600;
        cursor: pointer;
        &:hover { background: #f0f9f1; color: #009223; }
      }
    }
  `,

  orderSidebar: css`
    width: 400px;
    background: #fff;
    border-radius: 35px;
    padding: 40px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 40px;
    border: 1px solid #f0f0f0;
    h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 30px; color: #333; }
  `,

  typeSelector: css`
    position: relative;
    border: 1.5px solid #eee;
    border-radius: 15px;
    margin-bottom: 25px;
    .selected-item {
      padding: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-weight: 800;
      .fee-highlight { margin-left: 10px; color: #ff4d4f; background: #fff1f0; padding: 2px 8px; border-radius: 6px; font-size: 0.9rem; }
    }
    .options-list {
      position: absolute;
      width: 100%;
      top: 105%;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 15px;
      list-style: none;
      padding: 10px 0;
      z-index: 10;
      li { padding: 15px 20px; display: flex; justify-content: space-between; cursor: pointer; &:hover { background: #f0f9f1; } }
    }
  `,

  infoSection: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    .label-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      label { font-weight: 700; color: #555; }
      input { padding: 15px; border-radius: 12px; border: 1px solid #eee; background: #fafafa; font-family: inherit; font-size: 1rem; }
    }
  `,

  totalPriceArea: css`
    border-top: 2px solid #f5f5f5;
    margin-top: 35px;
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span { font-size: 1.3rem; font-weight: 700; color: #333; }
    strong { font-size: 2.2rem; color: #009223; font-weight: 900; }
  `,

  orderButton: css`
    width: 100%;
    margin-top: 30px;
    padding: 22px;
    background: #009223;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 1.4rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background: #007a1d; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0, 146, 35, 0.3); }
  `,
};