import { css } from '@emotion/react';

// 전체 컨테이너
export const containerStyle = css`
    min-height: 100vh;
    background: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;


export const logoStyle = css`
    margin: 0;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 2px;
`;

export const cartButtonStyle = css`
    background: #FFC600;
    color: #333;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #FFD633;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    &:active {
        transform: translateY(0);
    }
`;

// 네비게이션
export const navStyle = css`
    position: sticky;
    top: 70px;
    background: white;
    padding: 15px 40px;
    display: flex;
    justify-content: center;
    gap: 30px;
    
    z-index: 90;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const categoryButtonStyle = css`
    background: white;
    color: #333;
    border: 2px solid #ddd;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: #009223;
        color: #009223;
    }
`;

export const activeButtonStyle = css`
    background: #009223;
    color: white;
    border-color: #009223;

    &:hover {
        background: #00802b;
        color: white;
    }
`;

// 컨텐츠 영역
export const contentStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const categoryTitleStyle = css`
    font-size: 32px;
    color: #333;
    margin-bottom: 30px;
    font-weight: bold;
`;

// 메뉴 그리드
export const menuGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
`;

export const menuCardStyle = css`
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }
`;

export const imageWrapperStyle = css`
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 15px;
    background: #f9f9f9;
`;

export const menuImageStyle = css`
    width: 326.67px;
    height: 100%;
    object-fit: cover;
`;

export const itemNameStyle = css`
    font-size: 20px;
    color: #333;
    margin: 15px 0 10px 0;
    font-weight: bold;
`;

export const itemDescStyle = css`
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin: 10px 0;
    min-height: 40px;
`;

export const priceStyle = css`
    font-size: 22px;
    color: #009223;
    font-weight: bold;
    margin: 15px 0;
`;

// 버튼 그룹
export const buttonGroupStyle = css`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

export const subwayPickButtonStyle = css`
    flex: 1;
    background: #FFC600;
    color: #333;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #FFD633;
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const customButtonStyle = css`
    flex: 1;
    background: #009223;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #00802b;
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;

// 모달
export const modalOverlayStyle = css`
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
    background: rgba(0,0,0,0.6); 
    display: flex; 
    align-items: center; 
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
`;

export const modalBodyStyle = css`
    background: white; 
    padding: 40px; 
    border-radius: 20px; 
    text-align: center;
    min-width: 350px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const modalTitleStyle = css`
    font-size: 24px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: bold;
`;

export const modalItemNameStyle = css`
    font-size: 16px;
    color: #666;
    margin: 0 0 25px 0;
`;

export const modalButtonGroupStyle = css`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
`;

export const sizeButtonStyle = css`
    flex: 1;
    background: #009223;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #00802b;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const cancelButtonStyle = css`
    background: #f5f5f5;
    color: #666;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #e5e5e5;
    }
`;