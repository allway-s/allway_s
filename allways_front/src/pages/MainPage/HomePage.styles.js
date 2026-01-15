/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    min-height: 100vh;
    background-color: #f8fbf8;
  `,

  header: css`
    width: 100%;
    min-width: 1100px;
    height: 70px;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    position: fixed;
    top: 0;
    z-index: 100;
  `,

  headerInner: css`
    min-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,

  logoArea: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  utilMenu: css`
    position: absolute;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #374151;
      font-weight: 700;
      font-size: 1rem;
      
      &:hover {
        color: #009223;
      }
    }
  `,

  heroSection: css`
    padding: 8rem 1rem;
    background-color: #fff;
  `,

  heroContent: css`
    min-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    /* 🌟 버튼을 오른쪽 끝으로 밀기 위해 items를 flex-end로 설정 */
    align-items: center; 
  `,

  heroTitle: css`
    width: 100%;
    /* 🌟 글자는 다시 중앙 정렬 */
    text-align: center; 
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1.4;
    margin-bottom: 5rem;
    color: #111;
    letter-spacing: -0.04em;

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  `,

  heroTitleGreen: css`
    color: #009223;
  `,

  heroTitleYellow: css`
    color: #f5c835ff;
  `,

  orderButton: css`
    background-color: #009223;
    color: #fff;
    padding: 1.25rem 2.5rem;
    border-radius: 50px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    transition: all 0.2s;
    
    /* 🌟 부모가 flex-end이므로 자동으로 오른쪽 배치됨. 우측 여백만 시안에 맞춰 조정 */
    /* margin-right: 30.5rem;  */

    &:hover {
      background: #1e6a1a;
      color: #fff;
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      margin-right: 0;
      align-self: center; // 모바일은 중앙
    }
  `,
};