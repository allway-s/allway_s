import { css } from '@emotion/react';

export const containerStyle = css`
    min-height: 100vh;
    background: #f5f5f5;
`;

export const headerStyle = css`
    background: white;
    padding: 20px 40px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const backButtonStyle = css`
    background: #008C45;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { background: #006633; }
`;

export const titleStyle = css`
    margin: 0;
    font-size: 28px;
    color: #333;
`;

export const spacerStyle = css`
    width: 120px;
`;

export const errorBoxStyle = css`
    background: #fee;
    color: #c00;
    padding: 15px;
    margin: 20px 40px;
    border-radius: 5px;
    border: 1px solid #fcc;
`;

export const successBoxStyle = css`
    background: #efe;
    padding: 20px;
    margin: 20px 40px;
    border-radius: 5px;
    border: 1px solid #cfc;
`;

export const successTitleStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: #060;
    margin-bottom: 10px;
`;

export const successDetailStyle = css`
    color: #060;
    line-height: 1.6;
`;

export const contentStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const emptyCartStyle = css`
    text-align: center;
    padding: 100px 20px;
`;

export const emptyIconStyle = css`
    font-size: 80px;
    margin-bottom: 20px;
`;

export const goMenuButtonStyle = css`
    background: #008C45;
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    &:hover { background: #006633; }
`;

export const cartHeaderStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const clearButtonStyle = css`
    background: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover { background: #cc0000; }
`;

export const cartListStyle = css`
    background: white;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
`;

export const cartItemStyle = css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    &:last-child {
        border-bottom: none;
    }
`;

export const itemDetailsStyle = css`
    flex: 1;
`;

export const itemNameStyle = css`
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
`;

export const ingredientsListStyle = css`
    margin: 10px 0;
    font-size: 14px;
`;

export const ingredientTagsStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
`;

export const ingredientTagStyle = css`
    background: #e8f5e9;
    color: #2e7d32;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
`;

export const itemInfoTextStyle = css`
    color: #666;
    font-size: 14px;
    margin-top: 10px;
`;

export const itemActionsStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
`;

export const quantityControlStyle = css`
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
`;

export const qtyButtonStyle = css`
    background: white;
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    color: #008C45;
    &:hover { background: #f0f0f0; }
`;

export const qtyDisplayStyle = css`
    min-width: 30px;
    text-align: center;
    font-weight: bold;
`;

export const removeButtonStyle = css`
    background: #ff4444;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    &:hover { background: #cc0000; }
`;

export const summaryBoxStyle = css`
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const summaryRowStyle = css`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
`;

export const noteStyle = css`
    color: #666;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
`;

export const actionButtonsStyle = css`
    display: flex;
    gap: 15px;
`;

export const orderButtonStyle = css`
    flex: 1;
    background: #008C45;
    color: white;
    border: none;
    padding: 18px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    &:hover { background: #006633; }
    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;
