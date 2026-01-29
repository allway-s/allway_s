/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const S = {

  section: css`
    padding: 5rem 1rem;
    background-color: #fff;
  `,
  grid: css`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-cols: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
  `,

  item: css`
    padding: 2.5rem;
    background: #f8fbf8;
    border-radius: 30px;
    transition: border-color 0.3s;
    border: 1px solid transparent;

    &:hover {
      border-color: #009223;
    }
  `,
  iconBox: css`
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  `,
  number: css`
    color: #009223;
    font-weight: 900;
    font-size: 1.5rem;
  `,

  title: css`
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #111827;
  `,
  
  desc: css`
    color: #4b5563;
    line-height: 1.6;
    font-size: 1rem;
  `
};