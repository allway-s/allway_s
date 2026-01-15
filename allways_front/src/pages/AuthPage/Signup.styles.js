/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  header: css`
    width: 100%;
    padding: 1.2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3.5rem;
  `,

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
    padding: 2.5rem 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    border: 1px solid #f0f0f0;
  `,

  title: css`
    text-align: center;
    color: #8ed06c; /* 시안의 연두색 텍스트 */
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 2rem;
  `,

  inputList: css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 2.5rem;
  `,

  input: css`
    width: 100%;
    height: 48px;
    background-color: #eee;
    border: none;
    border-radius: 4px;
    padding: 0 1rem;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    transition: all 0.2s;
    &::placeholder { color: #aaa; }
    &:focus { background-color: #e5e5e5; box-shadow: inset 0 0 0 1px #8ed06c; }
  `,

  submitButton: css`
    width: 140px;
    height: 44px;
    background-color: #8ed06c;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.05rem;
    font-weight: 700;
    align-self: center;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background-color: #009223; transform: translateY(-1px); }
  `
};