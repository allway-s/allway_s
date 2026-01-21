import { css } from '@emotion/react';

export const S = {
  wrapper: css`
    width: 100%;
    background-color: #fff;
  `,
  header: css`
    width: 100%;
  `,
  headerInner: css`
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  logoArea: css`
    cursor: pointer;
  `,

  logoText: css`
    font-size: 1.5rem;
    font-weight: 900;
    color: #009223;
    letter-spacing: -1px;
    span { color: #ffc107; }
  `,
  navMenu: css`
    display: flex;
    gap: 25px;
    button {
      background: none;
      border: none;
      font-size: 0.9rem;
      font-weight: bold;
      color: #333;
      cursor: pointer;
    }
  `,
  activeMenu: css`
    color: #009223 !important;
  `,
  titleSection: css`
    width: 100%;
    margin-top: 60px;
    margin-bottom: 40px;
  `,

  yellowText: css`
    color: #ffc107;
  `,

  titleContainer: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    display: inline-block; 
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
  
  mainTitle: css`
    font-size: 3rem;
    font-weight: 800;
    color: #009223;
    position: relative;
    z-index: 2;
  `,
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 350px); 
    gap: 100px 75px;
    justify-content: flex-start; 
    padding: 60px 0;
  `,
  card: css`
    background: #fff;
    border-radius: 35px;
    padding: 30px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.07); 
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #f2f2f2;
    transition: transform 0.2s ease-in-out;
    &:hover { transform: translateY(-5px); }
  `,
  imageArea: css`
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    img {
      max-width: 220px;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  `,

  infoList: css`
    list-style: none;
    padding: 0;
    width: 100%;
    margin-bottom: 25px;
    li {
      background-color: hsla(223, 12%, 89%, 0.44);
      border-radius: 12px;
      padding: 10px 15px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9rem;
      color: #848484;
    }
  `,
  badge: css`
    background-color:  #00c52e;
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 5px;
    min-width: 35px;
    text-align: center;
  `,
  buttonGroup: css`
    display: flex;
    gap: 10px;
    width: 100%;
  `,

  // 공유 버튼 (노란색 계열)
  btnShare: css`
    flex: 1;
    background-color: #ffc107;
    border: none;
    border-radius: 12px;
    padding: 12px 0;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover { 
      background-color: #f8c83a; 
      opacity: 0.9;
    }
  `,

  btnOrder: css`
    flex: 1;
    background-color: #009223; /* 주문 버튼 초록색으로 강조 */
    border: none;
    border-radius: 12px;
    padding: 12px 0;
    font-weight: bold;
    cursor: pointer;

    transition: all 0.3s ease-in-out;
    color: white;
    &:hover { 
      background-color: #1e9138; 
     opacity: 0.9;
    }
  `,

  // 삭제 버튼 (다른 색상, 예: 주황색 혹은 연한 초록)
  btnDelete: css`
    flex: 1;
    background-color: #fff;
    color: red;
    border: none;
    border-radius: 12px;
    padding: 12px 0;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #1b16164b;
      opacity: 0.9;
    }
  `,

};

