import { css } from '@emotion/react';

export const s = {
  page: css`
    background: #ffffff;
    color: #111;
    min-width: 100%;
    min-height: 100vh;
  `,
  /* Top bar */
  topBar: css`
    position: sticky;
    top: 0;
    z-index: 1;
    background: #ffffff;
    
    
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
  `,

  topInner: css`
    position: sticky;
    min-width: 1100px;
    margin: 0 auto;
    height: 50px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
  `,
  brandLeft: css`
    display: flex;
    align-items: center;
  `,

  brandCenter: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 900;
    font-size: 28px;
    letter-spacing: -0.03em;
    color: #009223;
  `,
  topNav: css`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 18px;
  `,
  topNavBtn: css`
    border: 0;
    background: transparent;
    cursor: pointer;
    font-weight: 700;
    color: #111;

    &:hover {
      text-decoration: underline;
    }
  `,

  pageTitle: css`
    margin: 0;
    font-size: 45px;
    font-weight: 600;
    color: #009223; 
    letter-spacing: -0.03em;
  `,

  categoryTabs: css`
    position: sticky;
    justify-self: center;
    display: flex;
    gap: 22px;
    align-items: center;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #9ca3af;

    &:hover {
    }
  `,
  midBar: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-width: 1100px;
    margin-top: 70px;
  `,

  lineWrap: css`
    width: 100%;
    padding: 0 12px; 
    box-sizing: border-box;
  `,



  BottomLine: css`
    justify-content: center;
    height: 2px;
    background: #f6c000;
  `,

  midContent: css`
    position: relative;
    height: 85px;
    padding: 0 24px;
    display: flex;
    align-items: center;
  `,

  categoryTabs: css`
    justify-self: center; 
    display: flex;
    align-items: center; 
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); 
    gap: 30px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.03em;
  `,

  tabBtn: (active) => css`
    border: 0;
    background: transparent;
    cursor: pointer;
    font: inherit;
    color: ${active ? '#111827' : '#b6bcc7'};

    &:hover {
      color: #111827;
    }
  `,

  tabDivider: css`
    color: #c7ccd6;
    font-weight: 900;
  `,

  
  main: css`
    max-width: 1100px;
    margin: 0 auto;
    padding: 90px 20px 50px;
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(3, 320px);
    justify-content: center;
    min-width: 1100px;
    gap: 26px;
  `,

  card: css`
    background: #f3f4f6;
    border-radius: 2px;
    padding: 16px;

    position: relative;
    overflow: hidden; 

    &:hover .cardOverlay {
      opacity: 1;
      pointer-events: auto;
    }
  `,

  cardOverlay: css`
    position: absolute;
    inset: 0; 
    z-index: 5;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    background: rgba(0, 0, 0, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  `,

  cardInner: css`
    background: #ffffff;
    height: 280px;
    width: 100%;
    border-radius: 2px;
    position: relative;
    justify-content: center;
    display: grid;
    grid-template-rows: 1fr auto;
  `,

  hoverBtnGreen: css`
    border: 0;
    background: #009223;
    color: #ffffff;
    font-weight: 900;
    font-size: 13px;
    line-height: 1.3;
    padding: 14px 16px;
    border-radius: 18px;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  `,
  hoverBtnYellow: css`
    border: 0;
    background: #f6c000;
    color: #111;
    font-weight: 900;
    font-size: 13px;
    line-height: 1.3;
    padding: 14px 16px;
    border-radius: 18px;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  `,

  badgeWrap: css`
    position: absolute;
    top: 12px;
    display: grid;
    gap: 6px;
  `,
  badge: (type) => css`
    display: inline-block;
    padding: 4px 10px;
    font-weight: 900;
    font-size: 12px;
    border-radius: 2px;
    color: #fff;
    background: ${type === 'NEW' ? '#f6b000' : '#009223'};
  `,
  subBadge: css`
    display: inline-block;
    padding: 4px 10px;
    font-weight: 900;
    font-size: 12px;
    border-radius: 2px;
    color: #fff;
    background: #009223;
  `,

  imageArea: css`
    position: relative; 
    display: grid;
    place-items: center;
    padding: 26px 18px 8px;
  `,
  image: css`
    width: 240px;
    height: 150px;
    object-fit: contain;
  `,

  nameArea: css`
    padding: 0 18px 18px;
    text-align: center;
  `,
  nameKo: css`
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    letter-spacing: -0.03em;
  `,
  nameEn: css`
    margin-top: 6px;
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
  `,
};