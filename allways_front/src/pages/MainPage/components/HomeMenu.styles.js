/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  section: css`
    padding: 2rem 0;
    background-color: #fff;
  `,
  container: css`
    max-width: 1100px;
    min-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  menuTabList: css`
    display: flex;
    justify-content: space-around;
    gap: 3rem; // 텍스트 사이 간격
    margin-bottom: 1rem;
    border-bottom: 2px solid #eee; // 전체 하단 라인
    width: 100%;
    max-width: 800px;
  `,
  tabItem: (isActive) => css`
    padding: 1rem 0.5rem;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    // 선택 시 하단에 초록색 바(Bar) 표시
    &::after {
      content: '';
      position: absolute;
      bottom: -2px; // border-bottom 위치와 맞춤
      left: 0;
      width: 100%;
      height: 4px;
      background-color: ${isActive ? '#009223' : 'transparent'};
      border-radius: 2px;
    }

    & > span {
      font-size: 1.25rem;
      color: ${isActive ? '#009223' : '#666'};
      font-weight: ${isActive ? '900' : '600'};
      transition: color 0.2s;
    }

    &:hover > span {
      color: #009223;
    }
  `,
  menuName: css`
    display: block;
  `,
  detailPanel: css`
    width: 100%;
    max-width: 1060px;
    padding: 3rem 0;
    animation: fadeIn 0.4s ease-out;

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  detailTitle: css`
    display: none; // 이미 탭에서 강조되고 있으므로 타이틀은 숨겨도 깔끔합니다.
  `,
  menuListPlaceholder: css`
    min-height: 300px;
    background-color: #fcfcfc;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bbb;
    border: 1px solid #f0f0f0;
  `,
};