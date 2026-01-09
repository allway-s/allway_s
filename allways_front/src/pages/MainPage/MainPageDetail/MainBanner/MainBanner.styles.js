/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  section: css`
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    &:hover .arrow-btn { opacity: 1; }
  `,
  wrapper: css`
    display: flex;
    width: 100%;
    height: 100%;
    /* transition은 인라인 스타일에서 제어하므로 공통 값만 설정 */
  `,
  item: css`
    min-width: 100%;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `,
  content: css`
    max-width: 1200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 80px;
    gap: 40px;
    box-sizing: border-box;
  `,
  text: css`
    flex: 1;
    min-width: 500px;
    h2 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 800;
      line-height: 1.3;
      white-space: pre-line;
    }
    p { font-size: 1.25rem; opacity: 0.9; }
  `,
  imageArea: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  img: css`
    max-height: 320px;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));
  `,
  arrowButton: (side) => css`
    position: absolute;
    top: 50%;
    ${side === 'left' ? 'left: 20px;' : 'right: 20px;'}
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
    opacity: 0;
    &:hover { background: rgba(255, 255, 255, 0.4); transform: translateY(-50%) scale(1.1); }
  `,
  dots: css`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  `,
  dot: (isActive) => css`
    height: 8px;
    width: ${isActive ? '24px' : '8px'};
    background-color: ${isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  `,
};