/** @jsxImportSource @emotion/react */
import * as s from "./cartPageStyles";
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
            // API 요청 형식에 맞게 데이터 변환
            const orderData = {
                order: {
                    userId: 0, // 실제 userId로 변경 필요
                    address: "주소", // 실제 주소 입력 필요
                    detailAddress: "상세주소", // 실제 상세주소 입력 필요
                    totalPrice: calculateTotalPrice()
                },
                orderDetails: cart.orders.map(item => ({
                    productId: item.productId,
                    unitPrice: item.unitPrice,
                    quantity: item.quantity,
                    setId: item.setId || null,
                    selectedDrinkId: item.selectedDrinkId || null,
                    selectedSideId: item.selectedSideId || null
                }))
            };

            await createOrder(orderData);
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

    // 세트 이름 가져오기 (옵션)
    const getSetName = (setId) => {
        const setNames = {
            1: '단품',
            2: '웨지감자 세트',
            3: '칩 세트',
            4: '쿠키 세트',
            5: '수프 세트'
        };
        return setNames[setId] || '단품';
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
                                        {item.size > 0 && <span> ({item.size}cm)</span>}
                                    </h3>

                                    {/* 세트 정보 표시 */}
                                    {item.setId && (
                                        <div css={s.setInfoStyle}>
                                            <strong>세트:</strong> {getSetName(item.setId)}
                                        </div>
                                    )}

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