/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


export const S = css`
  /* 전체 레이아웃: 마이페이지 S.main과 동일하게 설정 */
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Pretendard', sans-serif;

  /* 페이지 제목: 마이페이지 S.title 스타일 이식 */
  .page-title {
    font-size: 2.5rem;
    color: #009223;
    border-bottom: 3px solid #ffc107;
    display: inline-block;
    margin-bottom: 40px;
    font-weight: 900;
  }

  /* 단계 표시 및 카테고리명 */
  .step-info {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 25px;
    color: #333;
  }

  /* 재료 리스트 그리드 */
  .ingredients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }

  /* 재료 아이템 버튼: 마이페이지 presetCard 스타일 활용 */
  .ingredient-item {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);

    &:hover {
      transform: translateY(-5px);
      border-color: #009223;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    img {
      width: 100%;
      height: 100px;
      object-fit: contain;
      margin-bottom: 10px;
      border-radius: 10px;
      background: #f9f9f9;
    }

    .item-name {
      display: block;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 5px;
    }

    .item-price {
      display: block;
      color: #666;
      font-size: 0.9rem;
    }
  }

  /* 하단 네비게이션 버튼 구역 */
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .nav-btn {
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .prev-btn {
    background: #f5f5f5;
    color: #666;
    &:hover:not(:disabled) { background: #e0e0e0; }
    &:disabled { cursor: not-allowed; opacity: 0.5; }
  }

  .next-btn {
    background: #009223;
    color: #fff;
    &:hover { background: #007a1d; }
  }
`;