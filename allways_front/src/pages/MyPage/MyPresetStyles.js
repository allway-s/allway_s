import { css } from '@emotion/react';

export const S = {
  wrapper: css`
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
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
      transition: color 0.2s;
      
      &:hover {
        color: #009223;
      }
    }
  `,
  
  activeMenu: css`
    color: #009223 !important;
  `,
  
  titleSection: css`
    width: 100%;
    margin-top: 60px;
    margin-bottom: 40px;
    background: linear-gradient(135deg, #f8fdf9 0%, #ffffff 100%);
    padding: 40px 0;
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
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(90deg, #009223 0%, #ffc107 100%);
      border-radius: 3px;
      z-index: 1;
    }
  `,
  
  mainTitle: css`
    font-size: 3rem;
    font-weight: 800;
    color: #009223;
    position: relative;
    z-index: 2;
    letter-spacing: -1px;
  `,
  
  container: css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 60px;
  `,
  
  sectionHeader: css`
    margin-bottom: 30px;
    
    h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #2d2d2d;
      margin-bottom: 8px;
    }
    
    span {
      font-size: 0.95rem;
      color: #666;
    }
  `,
  
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    padding: 20px 0;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  
  card: css`
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    border: 1px solid #f0f0f0;
    transition: all 0.3s ease;
    height: 100%;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 146, 35, 0.15);
      border-color: #009223;
    }
  `,
  
  imageArea: css`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background: #f8f8f8;
    border-radius: 12px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  `,

  presetName: css`
    font-size: 1.4rem;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 8px;
    line-height: 1.3;
  `,

  infoList: css`
    list-style: none;
    padding: 0;
    width: 100%;
    margin-bottom: 20px;
    
    li {
      background-color: #f8f9fa;
      border-radius: 10px;
      padding: 10px 15px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9rem;
      color: #666;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #e9f7ec;
      }
    }
  `,
  
  badge: css`
    background: linear-gradient(135deg, #009223 0%, #00c52e 100%);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    min-width: 40px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 146, 35, 0.2);
  `,
  
  buttonGroup: css`
    display: flex;
    gap: 10px;
    width: 100%;
    margin-top: auto;
  `,

  btnShare: css`
    flex: 1;
    background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
    border: none;
    border-radius: 10px;
    padding: 14px 0;
    font-weight: 700;
    font-size: 0.95rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      transition: left 0.3s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover { 
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  `,

  btnOrder: css`
    flex: 1;
    background: linear-gradient(135deg, #009223 0%, #00a82d 100%);
    border: none;
    border-radius: 10px;
    padding: 14px 0;
    font-weight: 700;
    font-size: 0.95rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 146, 35, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      transition: left 0.3s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover { 
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 146, 35, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  `,

  btnDelete: css`
    flex: 1;
    background: #fff;
    color: #e53935;
    border: 2px solid #e53935;
    border-radius: 10px;
    padding: 14px 0;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #e53935;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(229, 57, 53, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  `,
};