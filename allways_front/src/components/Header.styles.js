import { css } from '@emotion/react';

export const s = {
  topBar: css`
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: #ffffff;
    border-bottom: 1px solid #f3f4f6;

    display: block;           
    transform: translateZ(0); 
    backface-visibility: hidden; 
    margin-bottom: 50px;
  `,

  topInner: css`
    width: 100%;
    max-width: 95%;
    margin: 0 auto;
    height: 70px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: relative; 
    box-sizing: border-box;
  `,

  brandLeft: css`
    display: flex;
    align-items: center;
  `,

  brandCenter: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    user-select: none;
  `,

  brandTitle: css`
    margin: 0;
    color: #009223;
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: -0.03em;
  `,

  brandDash: css`
    color: #000000;
  `,

  brandS: css`
    color: #ffc107;
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
    font-weight: 600;
    color: #111;

    &:hover {
      text-decoration: underline;
    }
  `,

  
  logoSection: css`
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      height: 50px;
      width: auto;
      object-fit: contain;
      transform: translateY(3px);
    }
  `,
};


