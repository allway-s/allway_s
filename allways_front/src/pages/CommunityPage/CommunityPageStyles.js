import { css } from '@emotion/react';

export const s = {
  page: css`
    padding: 24px 0;
    background: #f8f9fa;
    min-height: 100vh;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
    border-radius: 20px;
    border: 2px solid #008c45;
    background: #fff;
    font-size: 14px;
    font-weight: 700;
    color: #111;
    cursor: pointer;
    transition: all 0.2s ease;

    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23008c45' stroke-width='2'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;

    &:hover {
      background: #f0fff0;
      box-shadow: 0 2px 8px rgba(0, 140, 69, 0.15);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 140, 69, 0.2);
    }
  `,

  addBtn: css`
    height: 44px;
    width: 166px;
    flex-shrink: 0;
    padding: 0 18px;
    border-radius: 22px;
    border: none;
    background: #008c45;
    color: white;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 140, 69, 0.2);

    &:hover {
      background: #007038;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 140, 69, 0.3);
    }

    &:active {
      transform: translateY(0);
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
    border: 2px solid #e8e8e8;
    border-radius: 16px;
    background: #fff;
    box-sizing: border-box;
    padding: 16px 18px;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;

    &:hover {
      border-color: #008c45;
      box-shadow: 0 4px 12px rgba(0, 140, 69, 0.1);
      transform: translateY(-2px);
    }
  `,

  thumb: css`
    width: 56px;
    height: 56px;
    object-fit: contain;
    background: #f9f9f9;
    border-radius: 8px;
    padding: 4px;
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
    font-weight: 700;
    color: #111;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  feedBase: css`
    min-width: 0;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #008c45;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  subRow: css`
    margin-top: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #888;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  desc: css`
    margin-top: 6px;
    font-size: 12px;
    color: #666;
    line-height: 1.4;

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
    padding: 6px;
    cursor: pointer;
    line-height: 0;
    transition: all 0.2s ease;
    border-radius: 50%;

    &:hover {
      background: #fff0f0;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  `,

  heartMini: css`
    width: 20px;
    height: 20px;
  `,

  countMini: css`
    font-size: 14px;
    font-weight: 700;
    color: #111;
  `,

  /* ===== Modal ===== */
  modalOverlay: css`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    padding: 24px;
    z-index: 9998;
    backdrop-filter: blur(4px);
  `,

  modalBody: css`
    position: relative;
    width: min(520px, 100%);
    animation: modalSlideIn 0.3s ease-out;

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  modalClose: css`
    position: absolute;
    right: 8px;
    top: 8px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #e8e8e8;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
    z-index: 9999;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;

    &:hover {
      background: #f5f5f5;
      border-color: #008c45;
      color: #008c45;
      transform: rotate(90deg);
    }
  `,

  saveBtn: css`
    position: absolute;
    left: 8px;
    top: 8px;
    height: 42px;
    padding: 0 18px;
    border-radius: 21px;
    border: 2px solid #008c45;
    background-color: #fff;
    font-size: 14px;
    font-weight: 700;
    color: #008c45;
    cursor: pointer;
    z-index: 9999;
    transition: all 0.2s ease;

    &:hover {
      background: #008c45;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 140, 69, 0.3);
    }
  `,

  menuCard: css`
    position: relative;
    background: #fff;
    border: 3px solid #e8e8e8;
    border-radius: 20px;
    padding: 26px;
    box-sizing: border-box;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  `,

  img: css`
    display: block;
    width: 78%;
    margin: 8px auto 24px;
    height: auto;
    object-fit: contain;
    background: #f9f9f9;
    border-radius: 12px;
    padding: 12px;
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
    color: #555;
    background: #f8f9fa;
    padding: 16px;
    border-radius: 12px;

    span {
      font-weight: 800;
      color: #008c45;
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