/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    getCart, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart
} from '../../utils/cartStore';

const CartPage = () => {
    const [cart, setCart] = useState({ orders: [] });
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        setCart(getCart());
    };

const calculateTotalPrice = () => {
        return cart.orders.reduce((total, item) => {
            // item.price가 undefined일 경우를 대비해 0 처리
            const unitPrice = item.price || 0;
            return total + (unitPrice * item.quantity);
        }, 0);
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1 || newQuantity > 100) return;
        updateCartItemQuantity(index, newQuantity);
        loadCart();
    };

    return (
        <div css={containerStyle}>
            <h2>장바구니</h2>
            {cart.orders.length === 0 ? (
                <p css={emptyMsgStyle}>장바구니가 비어있습니다.</p>
            ) : (
                <>
                    <div css={cartListStyle}>
                        {cart.orders.map((item, index) => (
                            <div key={index} css={cartItemStyle}>
                                <img src={item.imgUrl} alt={item.itemName} css={itemImgStyle} />
                                <div css={itemInfoStyle}>
                                    <h3>{item.itemName}</h3>
                                    
                                    <div css={ingredientListStyle}>
                                        <strong>선택 재료:</strong> {
                                            item.ingredientName?.length > 0 
                                            ? item.ingredientName.join(", ") 
                                            : "선택된 재료 없음"
                                            }
                                    </div>

                                    <p css={priceStyle}>
                                        가격: {(calculateTotalPrice() * item.quantity).toLocaleString()}원
                                    </p>
                                </div>
                                <div css={qtyControlStyle}>
                                    <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                                    <button css={removeButtonStyle} onClick={() => {
                                        if(window.confirm('삭제하시겠습니까?')) {
                                            removeFromCart(index);
                                            loadCart();
                                        }
                                    }}>삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div css={totalSectionStyle}>
                        <h3>총 결제 임시 금액: {calculateTotalPrice().toLocaleString()}원</h3>
                        <button css={orderButtonStyle}>주문하기</button>
                        <button css={clearButtonStyle} onClick={() => {
                            if(window.confirm('전체 비우시겠습니까?')) {
                                clearCart();
                                loadCart();
                            }
                        }}>전체 삭제</button>
                    </div>
                </>
            )}
            <button css={backButtonStyle} onClick={() => navigate('/menu')}>메뉴 추가하기</button>
        </div>
    );
};

// --- 스타일 정의 (필요한 부분만 추가/수정) ---
const containerStyle = css` max-width: 800px; margin: 0 auto; padding: 20px; `;
const cartListStyle = css` display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; `;
const cartItemStyle = css` display: flex; align-items: center; padding: 15px; border: 1px solid #eee; border-radius: 10px; gap: 20px; `;
const itemImgStyle = css` width: 100px; height: 70px; object-fit: cover; `;
const itemInfoStyle = css` flex: 1; h3 { margin: 0 0 10px 0; } `;

// [추가] 재료 이름 표시 스타일
const ingredientListStyle = css`
    font-size: 13px;
    color: #666;
    margin-bottom: 5px;
    line-height: 1.4;
`;

const priceStyle = css` font-weight: bold; color: #4CAF50; `;
const qtyControlStyle = css` display: flex; align-items: center; gap: 10px; button { padding: 5px 10px; cursor: pointer; } `;
const removeButtonStyle = css` background: #ff4444; color: white; border: none; border-radius: 4px; `;
const totalSectionStyle = css` text-align: right; padding: 20px; border-top: 2px solid #eee; `;
const orderButtonStyle = css` padding: 15px 30px; background: #008C45; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; margin-right: 10px; `;
const clearButtonStyle = css` padding: 15px 30px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer; `;
const backButtonStyle = css` width: 100%; padding: 15px; margin-top: 10px; background: white; border: 1px solid #ddd; cursor: pointer; `;
const emptyMsgStyle = css` text-align: center; padding: 50px; color: #999; `;

export default CartPage;