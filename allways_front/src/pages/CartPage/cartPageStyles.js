import { css } from "@emotion/react";

export const containerStyle = css` 
    max-width: 800px; 
    margin: 0 auto; 
    padding: 40px 20px; 
    font-family: 'Pretendard', sans-serif; 
`;

export const titleStyle = css` 
    border-bottom: 2px solid #333; 
    padding-bottom: 15px; 
    margin-bottom: 25px; 
`;

export const cartListStyle = css` 
    display: flex; 
    flex-direction: column; 
    gap: 15px; 
`;

export const cartItemStyle = css` 
    display: flex; 
    padding: 20px; 
    border: 1px solid #f0f0f0; 
    border-radius: 12px; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.05); 
    gap: 15px; 
`;

export const itemImgStyle = css` 
    width: 90px; 
    height: 60px; 
    object-fit: contain;
    background: #f9f9f9; 
    border-radius: 8px; 
`;

export const itemInfoStyle = css` 
    flex: 1; 
        h3 { 
            font-size: 18px; 
            margin: 0 0 8px 0; 
        span { 
            font-size: 14px; 
            color: #888; 
            font-weight: normal; }} 
`;

export const ingredientListStyle = css` 
    font-size: 13px; 
    color: #777; 
    margin-bottom: 10px; 
    line-height: 1.4; 
`;

export const priceStyle = css` 
    font-weight: bold; 
    color: #008c45; 
    font-size: 16px; 
`;

export const sideControlStyle = css` 
    display: flex; 
    flex-direction: column; 
    align-items: flex-end; 
    justify-content: space-between; 
`;

export const qtyControlStyle = css` 
    display: flex; 
    align-items: center; 
    background: #f1f1f1; 
    border-radius: 20px; 
    padding: 2px;
        button { 
            width: 28px; 
            height: 28px; 
            border: none; 
            background: white; 
            border-radius: 50%; 
            cursor: pointer; 
            font-weight: bold; 
        } 
        span { 
            margin: 0 12px; 
            font-weight: bold; 
            font-size: 14px;
        } 
`;

export const removeButtonStyle = css` 
    background: none; 
    border: none; 
    color: #bbb; 
    text-decoration: underline; 
    font-size: 12px; 
    cursor: pointer; 
    &:hover { color: #ff4444; } 
`;

export const totalSectionStyle = css` 
    margin-top: 40px; 
    padding: 25px; 
    background: #f8f9fa; 
    border-radius: 15px;
`;

export const totalInfoStyle = css` 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 20px; 
        span { 
            font-size: 16px; 
            color: #555; 
        } 
        strong { 
            font-size: 24px; 
            color: #333; 
        } 
`;

export const buttonGroupStyle = css` 
    display: flex;
    gap: 10px; 
`;

export const orderButtonStyle = css` 
    flex: 2; 
    padding: 18px; 
    background: #008c45; 
    color: white; 
    border: none; 
    border-radius: 10px; 
    font-size: 18px; 
    font-weight: bold; 
    cursor: pointer; 
    &:disabled { background: #ccc; } 
`;

export const clearButtonStyle = css` 
    flex: 1; 
    background: #eee; 
    border: none; 
    border-radius: 10px; 
    color: #666; 
    cursor: pointer; 
`;

export const backButtonStyle = css` 
    width: 100%; 
    margin-top: 15px; 
    padding: 15px; 
    background: none; 
    border: 1px dashed #ccc; 
    border-radius: 10px; 
    color: #888; 
    cursor: pointer; 
    &:hover { background: #fcfcfc; } 
`;

export const emptyContainerStyle = css` 
    text-align: center; 
    padding: 80px 0; 
        p { 
            color: #999; 
            margin-bottom: 20px; 
        } 
        button { 
            padding: 10px 25px; 
            background: #008c45; 
            color: white; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
        } 
`;