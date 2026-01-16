/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    min-height: calc(100vh-70px);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
  `,

  // header: css`
  //   width: 100%;
  //   padding: 1.2rem 0;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   margin-bottom: 5rem;
  // `,

  logo: css`
    color: #009223;
    font-weight: 900;
    font-size: 1.6rem;
    letter-spacing: -0.05em;
    span { color: #ffc608; }
  `,

  card: css`
    width: 100%;
    max-width: 480px;
    background: #fcfcfc;
    border-radius: 12px;
    padding: 4.5rem 2rem 3rem 2rem; 
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #f0f0f0;
    position: relative;
  `,

  title: css`
    color: #8ed06c;
    font-size: 1.4rem;
    font-weight: 1000;
    margin-bottom: 3rem;
    text-transform: uppercase;
  `,

  buttonGroup: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  `,

  socialButton: (type) => css`
    width: 85%;
    margin: 0 auto;
    height: 54px;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${type === 'naver' ? '#74c35e' : '#4285f4'};
    transition: all 0.2s ease;
    &:hover { 
      opacity: 0.9;
      transform: translateY(-1px);
    }
  `,

  signupLink: css`
    position: absolute;
    top: 1.5rem; /* 상단 여백 소폭 조정 */
    right: 1.5rem; /* 오른쪽 여백 소폭 조정 */
    background-color: #fff0f3; /* 매우 연한 분홍색 배경 */
    color: #ff85a1; /* 차분한 핑크톤 글자색 */
    padding: 0.4rem 0.7rem; /* 박스 크기를 살짝 더 컴팩트하게 */
    border-radius: 20px; /* 더 둥글게 처리하여 부드러운 느낌 강조 */
    text-decoration: none;
    font-size: 0.85rem; /* 글자 크기 축소 */
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover { 
      background-color: #ffe3e8; /* 호버 시 아주 살짝만 더 진해짐 */
      color: #ff4d6d;
    }
  `
};