/** @jsxImportSource @emotion/react */
import  * as s  from "./cartPageStyles";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart
} from '../../utils/cartStore';
import { createOrder } from "../../apis/items/orderApi";

const CartPage = () => {
    const [cart, setCart] = useState({ orders: [] });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        setCart(getCart());
    };

    const calculateTotalPrice = () => {
        return cart.orders.reduce((total, item) => {
            const unitPrice = item.price || 0;
            return total + (unitPrice * item.quantity);
        }, 0);
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return; 
        updateCartItemQuantity(index, newQuantity);
        loadCart();
    };

    const handleOrder = async () => {
        if (cart.orders.length === 0) return alert('장바구니가 비어있습니다.');
        if (!window.confirm('주문을 진행하시겠습니까?')) return;

        setLoading(true);
        try {
            await createOrder(cart);
            alert('주문이 완료되었습니다!');
            clearCart();
            navigate('/menu'); 
        } catch (err) {
            console.error('주문 실패:', err);
            alert(err.response?.data?.message || '주문 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div css={s.containerStyle}>
            <h2 css={s.titleStyle}>🛒 장바구니</h2>

            {cart.orders.length === 0 ? (
                <div css={s.emptyContainerStyle}>
                    <p>장바구니가 비어있습니다.</p>
                    <button onClick={() => navigate('/menu')}>메뉴 보러가기</button>
                </div>
            ) : (
                <>
                    <div css={s.cartListStyle}>
                        {cart.orders.map((item, index) => (
                            <div key={index} css={s.cartItemStyle}>
                                <img src={item.imgUrl} alt={item.itemName} css={s.itemImgStyle} />

                                <div css={s.itemInfoStyle}>
                                    <h3>
                                        {item.itemName}
                                        {/* [해결] size가 0보다 클 때만 cm 단위를 붙여서 표시합니다. */}
                                        {item.size > 0 && <span> ({item.size}cm)</span>}
                                    </h3>

                                    <div css={s.ingredientListStyle}>
                                        <strong>재료:</strong> {
                                            item.ingredientName?.length > 0
                                                ? item.ingredientName.join(", ")
                                                : "기본 구성"
                                        }
                                    </div>

                                    <p css={s.priceStyle}>
                                        {(item.price * item.quantity).toLocaleString()}원
                                    </p>
                                </div>

                                <div css={s.sideControlStyle}>
                                    <div css={s.qtyControlStyle}>
                                        <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                                    </div>
                                    <button css={s.removeButtonStyle} onClick={() => {
                                        if (confirm('삭제하시겠습니까?')) { removeFromCart(index); loadCart(); }
                                    }}>삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div css={s.totalSectionStyle}>
                        <div css={s.totalInfoStyle}>
                            <span>총 주문 금액</span>
                            <strong>{calculateTotalPrice().toLocaleString()}원</strong>
                        </div>
                        <div css={s.buttonGroupStyle}>
                            <button css={s.clearButtonStyle} onClick={() => {
                                if (confirm('전체 비우시겠습니까?')) { clearCart(); loadCart(); }
                            }}>전체 삭제</button>
                            <button css={s.orderButtonStyle} onClick={handleOrder} disabled={loading}>
                                {loading ? "처리 중..." : "주문하기"}
                            </button>
                        </div>
                    </div>
                </>
            )}
            <button css={s.backButtonStyle} onClick={() => navigate('/menu')}>+ 메뉴 추가하기</button>
        </div>
    );
};




export default CartPage;