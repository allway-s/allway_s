/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const s = {
  page: css`
    background: #ffffff;
    color: #111;
    min-width: 100%;
    min-height: 100vh;
  `,

  topBar: css`
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #ffffff;
    border-bottom: 1px solid #f3f4f6;
  `,

  topInner: css`
    max-width: 1100px;
    margin: 0 auto;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: relative;
  `,

  brandLeft: css`
    display: flex;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    /* 로고 영역의 너비를 명확히 제한하여 너무 커지지 않게 합니다 */
    width: 120px; 
  `,

  /* ✅ 로고 이미지 스타일을 더 직관적으로 수정 */
  logoImage: css`
    width: 100%;      /* brandLeft 너비인 120px에 맞춤 */
    max-height: 40px; /* 상단바 높이(60px)를 고려한 최대 높이 */
    object-fit: contain;
    display: block;
  `,

  brandCenter: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 900;
    font-size: 24px;
    letter-spacing: -0.03em;
    color: #009223;
    cursor: pointer;
    white-space: nowrap;

    & span {
      color: #f6c000;
    }
  `,

  topNav: css`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 20px;
    z-index: 10;
  `,

  topNavBtn: css`
    border: 0;
    background: transparent;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    color: #374151;
    &:hover {
      color: #009223;
    }
  `,

  midBar: css`
    width: 100%;
    background: #fff;
  `,

  lineWrap: css`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  `,

  TopLine: css`
    height: 2px;
    background: #009223;
  `,

  BottomLine: css`
    height: 2px;
    background: #f6c000;
  `,

  midContent: css`
    max-width: 1100px;
    margin: 0 auto;
    height: 100px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: relative;
  `,

  pageTitle: css`
    font-size: 40px;
    font-weight: 900;
    color: #292929;
    margin: 0;
  `,

  categoryTabs: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 30px;
    align-items: center;
  `,

  tabBtn: (active) => css`
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
    font-weight: ${active ? '900' : '500'};
    color: ${active ? '#111827' : '#b6bcc7'};
    transition: color 0.2s;
    &:hover {
      color: #111827;
    }
  `,

  tabDivider: css`
    color: #c7ccd6;
    font-size: 16px;
  `,

  main: css`
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
  `,

  grid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  `,

  card: css`
    background: #f3f4f6;
    border-radius: 12px;
    padding: 16px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
    &:hover .cardOverlay {
      opacity: 1;
      pointer-events: auto;
    }
  `,

  cardOverlay: css`
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    padding: 0 10px;
  `,

  cardInner: css`
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
  `,

  hoverBtnGreen: css`
    width: 135px;
    height: 85px;
    border: 0;
    background: #009223;
    color: #ffffff;
    font-weight: 800;
    font-size: 13px;
    padding: 8px;
    border-radius: 20px;
    cursor: pointer;
    line-height: 1.4;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break: keep-all;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    &:hover {
      background: #007a1d;
    }
  `,

  hoverBtnYellow: css`
    width: 135px;
    height: 85px;
    border: 0;
    background: #f6c000;
    color: #111;
    font-weight: 800;
    font-size: 13px;
    padding: 8px;
    border-radius: 20px;
    cursor: pointer;
    line-height: 1.4;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break: keep-all;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    &:hover {
      background: #e5b300;
    }
  `,

  badgeWrap: css`
    position: absolute;
    top: 25px;
    left: 25px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 2;
  `,

  badge: (type) => css`
    padding: 4px 12px;
    font-weight: 900;
    font-size: 11px;
    border-radius: 4px;
    color: #fff;
    background: ${type === 'NEW' ? '#f6b000' : '#009223'};
  `,

  subBadge: css`
    padding: 4px 12px;
    font-weight: 900;
    font-size: 11px;
    border-radius: 4px;
    color: #fff;
    background: #009223;
  `,

  imageArea: css`
    padding: 40px 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  image: css`
    width: 100%;
    max-width: 220px;
    height: auto;
    object-fit: contain;
  `,

  nameArea: css`
    padding: 15px 10px 25px;
    text-align: center;
  `,

  nameKo: css`
    font-size: 20px;
    font-weight: 900;
    color: #111;
    margin-bottom: 4px;
  `,

  nameEn: css`
    font-size: 14px;
    color: #9ca3af;
    font-weight: 500;
  `,
};