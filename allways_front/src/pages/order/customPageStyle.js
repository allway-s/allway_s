import { css } from "@emotion/react";

export const actionButtonStyle = css`
    padding: 6px 15px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    &:hover { background: #e0e0e0; }
`;

export const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
`;

export const cancelButtonStyle = css`
    padding: 10px 20px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { background: #cc0000; }
`;

export const cartButtonStyle = css`
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { background: #45a049; }
`;

export const progressBarStyle = css`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    overflow-x: auto;
`;

export const progressStepStyle = css`
    flex: 1;
    padding: 12px;
    background: #f0f0f0;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    color: #999;
    min-width: 80px;
`;

export const progressStepActiveStyle = css`
    background: #4CAF50;
    color: white;
`;

export const progressStepDoneStyle = css`
    background: #2196F3;
    color: white;
`;

export const progressStepSkippedStyle = css`
    background: #ddd;
    color: #aaa;
    text-decoration: line-through;
`;

export const contentStyle = css`
    flex: 1;
    margin-bottom: 20px;
`;

export const stepHeaderStyle = css`
    margin-bottom: 20px;
    text-align: center;
`;

export const ingredientsGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
`;

export const ingredientCardStyle = css`
    background: white;
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
`;

export const ingredientCardSelectedStyle = css`
    border-color: #4CAF50;
    background: #f0fff0;
`;

export const ingredientImageWrapperStyle = css`
    position: relative;
    margin-bottom: 10px;
`;

export const ingredientImageStyle = css`
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
`;

export const selectedBadgeStyle = css`
    position: absolute;
    top: 5px;
    right: 5px;
    background: #4CAF50;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
`;

export const ingredientInfoStyle = css`
    text-align: center;
`;

export const ingredientNameStyle = css`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ingredientPriceStyle = css`
    color: #4CAF50;
    font-size: 14px;
`;

export const quantitySelectorStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
`;

export const quantityControlStyle = css`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const quantityButtonStyle = css`
    width: 40px;
    height: 40px;
    border: 2px solid #4CAF50;
    background: white;
    color: #4CAF50;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    &:hover {
        background: #4CAF50;
        color: white;
    }
`;

export const quantityDisplayStyle = css`
    font-size: 24px;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
`;

export const footerStyle = css`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 2px solid #eee;
    position: sticky;
    bottom: 0;
    background: white;
`;

export const navButtonStyle = css`
    padding: 15px 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s;
`;

export const nextButtonStyle = css`
    background: #4CAF50;
    color: white;
    &:hover { background: #45a049; }
`;

export const disabledButtonStyle = css`
    background: #ccc;
    cursor: not-allowed;
    &:hover { background: #ccc; }
`;

export const summaryStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;