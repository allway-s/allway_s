/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {
  container: css`
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 120px;
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
    color: #009223;
    font-size: 2.5rem;
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
    background-color: #ffc107;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.05rem;
    font-weight: 700;
    align-self: center;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background-color: #e6ad02; }
    &:active {
    background-color: #c49303;
    }
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  `,

  checkMessage: (isValid) => css`
    display: block;
    width: 100%;
    height: 20px;
    font-size: 0.8rem;
    margin-top: 4px;
    color: ${isValid ? '#1890ff' : '#ff4d4f'};
  `,

  checkNickname: css`
    white-space: nowrap;
    border-radius: 10px;
    border: solid 0.5px #e7e5e5;
    background-color: #fff;
    padding: 0 8px;

    &:hover {
    background-color: #f9f9f9;
    }
    &:active {
    background-color: #f0f0f0;
    }
  `
};