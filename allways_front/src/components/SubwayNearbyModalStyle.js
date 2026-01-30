import { css } from "@emotion/react";

export const s = {
  overlay: css`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: grid;
    place-items: center;
    z-index: 9999;
  `,

  modal: css`
    width: 560px;
    height: 720px;
    background: #fff;
    border-radius: 16px;
    padding: 14px;
    display: grid;
    grid-template-rows: auto auto auto 160px 1fr; /* header / search / status / list / map */
    gap: 10px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  `,

  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  title: css`
    font-weight: 900;
    font-size: 16px;
    letter-spacing: -0.01em;
  `,

  closeBtn: css`
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
    font-weight: 800;

    &:hover {
      background: #f8fafc;
    }
  `,

  searchRow: css`
    display: flex;
    gap: 8px;
    align-items: center;
  `,

  primaryBtn: css`
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #111;
    color: #fff;
    cursor: pointer;
    font-weight: 900;
    white-space: nowrap;

    &:hover {
      opacity: 0.92;
    }
  `,

  ghostBtn: css`
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
    font-weight: 900;
    white-space: nowrap;

    &:hover {
      background: #f8fafc;
    }
  `,

  input: css`
    flex: 1;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    outline: none;

    &:focus {
      border-color: #cbd5e1;
      box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.25);
    }
  `,

  status: css`
    font-size: 13px;
    opacity: 0.8;
    padding: 0 2px;
  `,

  listBox: css`
    border: 1px solid #eef0f3;
    border-radius: 14px;
    padding: 10px;
    overflow: auto;
    background: #fafafa;
  `,

  section: css`
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  `,

  sectionLabel: css`
    font-size: 12px;
    font-weight: 900;
    margin-bottom: 6px;
    opacity: 0.9;
  `,

  pickedCard: css`
    font-size: 13px;
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #eee;
  `,

  cards: css`
    display: grid;
    gap: 8px;
  `,

  emptyText: css`
    font-size: 13px;
    opacity: 0.7;
    padding: 8px 2px;
  `,

  cardBtn: css`
    text-align: left;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid #eee;
    background: #fff;
    cursor: pointer;
    display: grid;
    gap: 4px;

    &:hover {
      border-color: #dbe3ee;
      background: #fcfcfd;
      transform: translateY(-1px);
      transition: 140ms ease;
    }
  `,

  cardTop: css`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: baseline;
  `,

  cardTitle: css`
    font-weight: 900;
    font-size: 13px;
  `,

  cardDist: css`
    font-size: 12px;
    opacity: 0.7;
    font-weight: 800;
    white-space: nowrap;
  `,

  cardAddr: css`
    font-size: 12px;
    opacity: 0.8;
    line-height: 1.35;
  `,

  map: css`
    width: 100%;
    height: 400px;
    min-height: 320px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #eef0f3;
    cursor: pointer;
  `,
};
