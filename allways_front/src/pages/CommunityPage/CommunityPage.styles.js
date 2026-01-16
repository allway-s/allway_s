import { css } from '@emotion/react';

export const s = {
  page: css`
    padding: 24px 100px;
    margin: 0 auto;
  `,

  container: css`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  `,

  topBar: css`
    display: flex;
    justify-content: space-between; /* ⭐ 오른쪽 끝 */
    padding: 0 80px;

    margin: 12px 0 16px;
  `,
  sortSelect: css`
  height: 36px;
  padding: 0 36px 0 14px;
  border-radius: 14px;
  border: 1.5px solid #111;
  background: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  appearance: none;        /* 기본 화살표 제거 */
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23111' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.15);
  }
`,


  addBtn: css`
    height: 44px;
    padding: 0 18px;
    border-radius: 14px;
    border: 1px solid #111;
    background: #fff;
    font-weight: 900;
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
    }
  `,

  /* ===== Feed list (한 줄 목록) ===== */
  feedList: css`
    display: flex;
    flex-direction: column;
    gap: 12px;

    align-items: center; /* ⭐ 가로(좌우) 가운데 */
  `,

  feedItem: css`
    width: 100%; /* ⭐ 화면 작아지면 같이 줄어듦 */
    max-width: 900px; /* ⭐ 화면 크면 이 폭까지만 */
    display: flex;
    align-items: center;
    cursor: pointer;

    padding: 18px 22px;
    border: 2px solid #111;
    border-radius: 22px;
    background: #fff;
    gap: 16px;
    box-sizing: border-box;
  `,

  thumb: css`
    width: 56px;
    height: 56px;
    object-fit: contain;
    flex-shrink: 0;
  `,

  /* 텍스트 영역은 하트 공간을 절대 침범 못함 */
  textArea: css`
    flex: 1;
    min-width: 0; /* ⭐ 이게 ellipsis + 안밀림 핵심 */
    padding-right: 56px; /* 하트 자리 */
  `,

  topRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    min-width: 0; /* ⭐ 자식 title이 줄어들 수 있게 */
  `,

  feedTitle: css`
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  date: css`
    font-size: 13px;
    font-weight: 700;
    color: #666;
    white-space: nowrap;
    flex-shrink: 0;
  `,

  desc: css`
    margin-top: 6px;
    font-size: 14px;
    color: #444;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  /* ⭐ 하트 고정 영역 */
  likeFixed: css`
    width: 48px;
    flex-shrink: 0; /* ⭐ 절대 줄어들지 않음 */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-weight: 800;
  `,

  likeMini: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  `,

  heartMini: css`
    width: 20px;
    height: 20px;
  `,

  countMini: css`
    font-size: 14px;
    font-weight: 900;
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
    width: 500px;
    height: 400px;
    justify-content: center;
    align-items: center;
  `,

  modalClose: css`
    position: absolute;
    right: 3px;
    top: 3px;
    width: 42px;
    height: 42px;
    border-radius: 15px;
    background: #fff;
    font-size: 20px;
    font-weight: 900;
    cursor: pointer;
    z-index: 9999;
  `,

  /* ===== Card (모달 카드) ===== */
  menuCard: css`
    position: relative;
    width: 100%;
    background: #fff;
    border: 2px solid #111;
    border-radius: 15px;
    padding: 26px;
    box-sizing: border-box;
  `,

  inner: css`
    position: relative;
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
    font-size: 18px;
    font-weight: 600;
    color: #444;

    span {
      font-weight: 800;
      color: #111;
    }
  `,

  like: css`
    position: absolute;
    right: 16px;
    bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  `,

  heart: css`
    width: 44px;
    height: 44px;
  `,

  count: css`
    font-size: 24px;
    font-weight: 900;
    color: #111;
  `,
};
