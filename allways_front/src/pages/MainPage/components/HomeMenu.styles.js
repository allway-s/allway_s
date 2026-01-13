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
    padding: 2rem 0; // 패딩 살짝 조절
    animation: fadeIn 0.4s ease-out;

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,

  // ✅ 메뉴들을 바둑판 모양으로 정렬하는 Grid
  menuGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 한 줄에 3개씩 고정 (혹은 auto-fill 사용)
    gap: 2rem;
    width: 100%;
  `,

  // ✅ 개별 메뉴 카드 스타일
  menuCard: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      transform: translateY(-8px);
      border-color: #009223;
    }
  `,

  // ✅ 이미지 영역 (이미지가 없을 때를 대비한 기본 배경)
  imageArea: css`
    width: 100%;
    height: 160px;
    background-color: #f8f8f8;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    overflow: hidden;

    img {
      width: 80%;
      height: auto;
      object-fit: contain;
    }
  `,

  // ✅ 텍스트 정보 영역
  infoArea: css`
    text-align: center;
    
    strong {
      display: block;
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      font-size: 0.9rem;
      color: #888;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    span {
      font-size: 1.1rem;
      color: #009223;
      font-weight: 800;
    }
  `,
};