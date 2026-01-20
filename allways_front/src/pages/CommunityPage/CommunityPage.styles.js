import { css } from '@emotion/react';

export const s = {
  page: css`
    padding: 24px 0;
  `,

  /* 상단 버튼/리스트가 모두 이 컨테이너 폭을 공유함 */
  container: css`
    width: min(1100px, 100%);
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  `,

  /* ===== 상단 컨트롤 (정렬 + 작성버튼) ===== */
  controlsRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 12px 0 16px;

    /* 화면 좁으면 줄바꿈되되, 라인은 유지 */
    flex-wrap: wrap;
  `,

  sortSelect: css`
    height: 36px;
    width: 104px;
    padding: 0 36px 0 14px;
    border-radius: 14px;
    border: 1.5px solid #111;
    background: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23111' stroke-width='2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.15);
    }
  `,

  addBtn: css`
    height: 44px;
    width: 166px;
    flex-shrink: 0;
    padding: 0 18px;
    border-radius: 14px;
    border: 1px solid #111;
    background: #fff;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
    }
  `,

  /* ===== 리스트 ===== */
  feedList: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  /* 카드 내부를 3칸으로 고정: thumb / text / heart */
  feedItem: css`
    display: grid;
    grid-template-columns: 56px 1fr 72px;
    align-items: center;
    gap: 16px;

    width: 100%;
    border: 1px solid #111;
    border-radius: 22px;
    background: #fff;
    box-sizing: border-box;
    padding: 16px 18px;
    cursor: pointer;

    overflow: hidden; /* ⭐ 어떤 상황에도 하트/텍스트가 카드 밖으로 못 나감 */
  `,

  thumb: css`
    width: 56px;
    height: 56px;
    object-fit: contain;
  `,

  textArea: css`
    min-width: 0; /* ⭐ ellipsis 핵심 */
  `,

  topRow: css`
    display: flex;
    align-items: baseline;
    gap: 12px;
    min-width: 0;
  `,

  feedTitle: css`
    min-width: 0;
    margin: 0;
    font-size: 17px;
    font-weight: 600;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  feedBase: css`
    min-width: 0;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #111;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  subRow: css`
    margin-top: 4px;
    font-size: 13px;
    font-weight: 700;
    color: #666;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  desc: css`
    margin-top: 6px;
    font-size: 12px;
    color: #444;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  likeBox: css`
    justify-self: end;
    width: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  `,

  likeBtn: css`
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    line-height: 0;
  `,

  heartMini: css`
    width: 20px;
    height: 20px;
  `,

  countMini: css`
    font-size: 14px;
    font-weight: 600;
    color: #111;
  `,

  /* ===== Modal ===== */
  modalOverlay: css`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    padding: 24px;
    z-index: 9998;
  `,

  modalBody: css`
    position: relative;
    width: min(520px, 100%);
  `,

  modalClose: css`
    position: absolute;
    right: 8px;
    top: 8px;
    width: 42px;
    height: 42px;
    border-radius: 15px;
    background: #fff;
    border: 1px solid #111;
    font-size: 20px;
    font-weight: 900;
    cursor: pointer;
    z-index: 9999;
  `,

  saveBtn: css`
    position: absolute;
    left: 8px;
    top: 8px;
    height: 42px;
    border-radius: 15px;
    border: 1px solid #111;
    background-color: #fff;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    z-index: 9999;
  `,

  menuCard: css`
    position: relative;
    background: #fff;
    border: 2px solid #111;
    border-radius: 18px;
    padding: 26px;
    box-sizing: border-box;
  `,

  img: css`
    display: block;
    width: 78%;
    margin: 8px auto 24px;
    height: auto;
    object-fit: contain;
  `,

  modalTitle: css`
    margin: 0 0 14px;
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #111;
  `,

  meta: css`
    display: grid;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #444;

    span {
      font-weight: 800;
      color: #111;
    }
  `,

  modalLike: css`
    position: absolute;
    right: 16px;
    bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  `,

  heart: css`
    width: 44px;
    height: 44px;
    font-weight: 700;
  `,

  count: css`
    font-size: 24px;
    font-weight: 700;
    color: #111;
  `,
};