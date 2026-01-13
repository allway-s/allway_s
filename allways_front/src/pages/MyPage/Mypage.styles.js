/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    min-height: 100vh;
    background-color: #fff;
    font-family: 'Pretendard', sans-serif;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10%;
    border-bottom: 1px solid #eee;
  `,
  logo: css`
    cursor: pointer;
    font-weight: 900;
    font-size: 1.5rem;
    color: #009223;
    span {
      color: #ffc107;
    }
  `,
  nav: css`
    display: flex;
    gap: 20px;
    font-size: 0.9rem;
    font-weight: bold;
    span {
      cursor: pointer;
      color: #333;
      &:hover {
        color: #009223;
      }
    }
  `,
  main: css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
  `,
  title: css`
    font-size: 2.5rem;
    color: #009223;
    border-bottom: 3px solid #ffc107;
    display: inline-block;
    margin-bottom: 40px;
    span {
      color: #ffc107;
    }
  `,
  section: css`
    margin-bottom: 50px;
  `,
  sectionHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  `,
  sectionTitle: css`
    font-size: 1.3rem;
    font-weight: bold;
  `,
  card: css`
    border: 1px solid #eee;
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  `,
  profileInner: css`
    display: flex;
    align-items: center;
    gap: 50px;
  `,
  avatarCircle: css`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 5px solid #009223;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    color: #009223;
    background-color: #fff;
  `,
  infoList: css`
    line-height: 2;
    color: #333;
    p {
      margin: 0;
      strong {
        display: inline-block;
        width: 80px;
        color: #000;
      }
    }
  `,
  moreLink: css`
    font-size: 0.8rem;
    color: #009223;
    font-weight: bold;
    cursor: pointer;
    background-color: #fff;
    padding: 6px 14px;
    border-radius: 15px;
    border: 1px solid #009223;
    transition: all 0.2s;
    &:hover {
      background-color: #009223;
      color: #fff;
    }
  `,
  presetGrid: css`
    display: flex;
    gap: 20px;
  `,
  presetCard: css`
    flex: 1;
    border: 1px solid #eee;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    background-color: #fff;
    &:hover {
      transform: translateY(-8px);
      border-color: #ffc107;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  `,
  imgBox: css`
    height: 120px;
    background-color: #f9f9f9;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    margin-bottom: 15px;
    img {
      max-height: 100%;
      object-fit: contain;
    }
  `,
  orderBtn: css`
    margin-top: 15px;
    padding: 10px 24px;
    border-radius: 25px;
    border: none;
    background-color: #ffc107;
    color: #000;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.2s;
    &:hover {
      background-color: #ffdb0f;
      transform: scale(1.05);
    }
  `,
  orderItem: css`
    display: flex;
    align-items: center;
    padding: 5px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #f9f9f9;
      margin-bottom: 10px;
    }
  `,
  orderText: css`
    font-size: 0.9rem;
    color: #666;
    flex: 1;
    margin-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  detailBtn: css`
    margin-left: 20px;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid #009223;
    background: #fff;
    color: #009223;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: #009223;
      color: #fff;
    }
  `
};