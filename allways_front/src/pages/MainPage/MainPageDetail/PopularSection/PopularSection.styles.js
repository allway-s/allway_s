/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';



export const S = {
   section: css`
   padding: 4rem 1rem;
   background-color: #fff;

  `,



  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4rem;

  `,



  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    width: 100%;
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 0.5rem;
  `,



  title: css`
    font-size: 2.1rem;
    font-weight: 900;
    color: #000;
    letter-spacing: -0.03em;
  `,



  headerRight: css`
    display: flex;
    align-items: center;
    /* 🌟 남은 공간을 다 차지하게 해서 버튼을 끝으로 보낼 준비 */
    flex: 1;
    justify-content: flex-end;
    gap: 1rem;
  `,



  headerText: css`
    font-size: 1.1rem;
    font-weight: 700;
    color: #333;
    @media (max-width: 768px) {
      display: none;
    }

  `,



  iconButton: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid #333;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

   

    /* 🌟 글자와 딱 붙지 않게 왼쪽 여백을 최대로 밀어버림 */
    margin-left: 1rem;



    &:hover {
      background: #000;
      color: #fff;
      transform: scale(1.05);
    }

  `,



  grid: css`
    display: flex !important;
    justify-content: space-between;
    gap: 4rem;
    width: 100%;
    flex-wrap: wrap;

  `,



  cardWrapper: css`
    position: relative;
    flex: 0 1 320px;
    min-width: 280px;



    @media (max-width: 640px) {
      flex: 1 1 100%;
      max-width: 400px;

    }

  `,



  bestBadge: css`

    position: absolute;
    top: -10px;
    left: -10px;
    background: #ffc608;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  `,

};