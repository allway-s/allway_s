/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    min-height: 100vh;
    background-color: #fff;
    font-family: 'Pretendard', sans-serif;
  `,

  /* 1. 타이틀 섹션: MyPreSet과 동일한 상단 여백 설정 */
  titleSection: css`
    width: 100%;
    margin-top: 60px;   /* 헤더와의 간격 통일 */
    margin-bottom: 40px;
  `,

  /* 2. 타이틀 컨테이너: 1200px 그리드 시작점에 제목을 맞추는 핵심 공식 */
  titleContainer: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    display: inline-block; 
    /* MyPreSet과 동일한 좌측 정렬 계산식 */
    margin-left: calc((100% - 1200px) / 2 + 20px);

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #ffc107;
      z-index: 1;
    }
  `,

  /* 3. 메인 타이틀: 폰트 크기 3rem으로 통일 */
  mainTitle: css`
    font-size: 3rem;
    font-weight: 800;
    color: #009223;
    position: relative;
    z-index: 2;
    margin: 0;
  `,

  yellowText: css`
    color: #ffc107;
  `,

  /* 4. 메인 컨텐츠 영역: 너비를 1000px에서 1200px로 확장 */
  main: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  `,

  section: css`
    margin-bottom: 60px;
  `,

  sectionHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,

  sectionTitle: css`
    font-size: 1.5rem; /* 가독성을 위해 살짝 키움 */
    font-weight: bold;
    color: #333;
  `,

  card: css`
    border: 1px solid #eee;
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    background-color: #fff;
  `,

  profileInner: css`
    display: flex;
    align-items: center;
    gap: 60px; /* 프로필 이미지와 정보 사이 간격 확대 */
  `,

  avatarCircle: css`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 5px solid #009223;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.5rem;
    font-weight: bold;
    color: #009223;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  `,

  infoList: css`
    line-height: 2.2;
    color: #333;
    p {
      margin: 0;
      font-size: 1.05rem;
      strong {
        display: inline-block;
        width: 100px; /* 라벨 너비 고정으로 깔끔하게 정렬 */
        color: #000;
      }
    }
  `,

  moreLink: css`
    font-size: 0.85rem;
    color: #009223;
    font-weight: bold;
    cursor: pointer;
    background-color: #fff;
    padding: 6px 16px;
    border-radius: 20px;
    border: 1.5px solid #009223;
    transition: all 0.2s;
    &:hover {
      background-color: #009223;
      color: #fff;
    }
  `,

  presetGrid: css`
    display: flex;
    gap: 25px;
  `,

  presetCard: css`
    flex: 1;
    border: 1px solid #eee;
    border-radius: 25px;
    padding: 25px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    background-color: #fff;
    &:hover {
      transform: translateY(-8px);
      border-color: #ffc107;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }
  `,

  imgBox: css`
    height: 140px; /* 이미지 영역 높이 조정 */
    background-color: #f9f9f9;
    border-radius: 20px;
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
    padding: 12px 24px;
    border-radius: 25px;
    border: none;
    background-color: #ffc107;
    color: #000;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: bold;
    transition: all 0.2s;
    width: 100%; /* 버튼 너비 확장 */
    &:hover {
      background-color: #ffdb0f;
      transform: scale(1.02);
    }
  `,

  orderItem: css`
    display: flex;
    align-items: center;
    padding: 15px 0; /* 간격 확대 */
    &:not(:last-child) {
      border-bottom: 1px solid #f1f1f1;
    }
  `,

  orderText: css`
    font-size: 0.95rem;
    color: #666;
    flex: 1;
    margin-left: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  detailBtn: css`
    margin-left: 20px;
    padding: 8px 18px;
    border-radius: 12px;
    border: 1.5px solid #009223;
    background: #fff;
    color: #009223;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: #009223;
      color: #fff;
    }
  `
};