/** @jsxImportSource @emotion/react */
import * as s from "./cartPageStyles.js";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart
} from '../../utils/cartStore';
import { createOrder } from "../../apis/items/orderApi";
import { getUserIdFromToken } from "../../utils/getUserId";
import SubwayNearbyModal from '../../components/SubwayNearbyModal';


const CartPage = () => {
    const [cart, setCart] = useState({ orders: [] });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        setCart(getCart());
    };

    const calculateTotalPrice = () => {
        return cart.orders.reduce((total, item) => {
            const unitPrice = item.price !== undefined ? item.price : (item.unitPrice || 0);
            const itemTotal = unitPrice * item.quantity;
            console.log(`${item.itemName}: ${unitPrice} × ${item.quantity} = ${itemTotal}`);
            return total + itemTotal;
        }, 0);
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return; 
        updateCartItemQuantity(index, newQuantity);
        loadCart();
    };

    const handleOrder = async () => {
        const currentUserId = getUserIdFromToken(); 

        if (!currentUserId) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                order: {
                    userId: currentUserId,
                    address: "주소", // TODO: 사용자 입력값 연동
                    detailAddress: "상세주소", // TODO: 사용자 입력값 연동
                    totalPrice: calculateTotalPrice()
                },
                orderDetails: cart.orders.map(item => ({
                    productId: item.productId,
                    itemId: item.itemId,           // ✅ 추가: 상품 생성을 위해 필수
                    ingredientIds: item.ingredientIds,
                    unitPrice: item.price || item.unitPrice,
                    quantity: item.quantity,
                    setId: item.setId || null,
                    selectedDrinkId: item.selectedDrinkId || null,
                    selectedSideId: item.selectedSideId || null
                }))
            };

            console.log("📦 전송될 주문 데이터:", orderData);

            await createOrder(orderData);
            alert('주문이 완료되었습니다!');
            clearCart();
            loadCart(); // 카트 상태 초기화
            navigate('/menu'); 
        } catch (err) {
            console.error('❌ 주문 실패:', err);
            alert(err.response?.data?.message || '주문 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

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

    // ✅ [추가] 가격 상세 정보 표시 (선택사항)
    const renderPriceDetail = (item) => {
        const hasDetails = item.basePrice !== undefined || 
                          item.ingredientPrice !== undefined || 
                          item.setPrice !== undefined ||
                          item.drinkPrice !== undefined ||
                          item.sidePrice !== undefined;

        if (!hasDetails) return null;

        return (
            <div style={{ 
                fontSize: '12px', 
                color: '#888', 
                marginTop: '5px',
                padding: '5px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
            }}>
                <div>기본: {(item.basePrice || 0).toLocaleString()}원</div>
                {(item.ingredientPrice || 0) > 0 && <div>재료: +{item.ingredientPrice.toLocaleString()}원</div>}
                {(item.setPrice || 0) > 0 && <div>세트: +{item.setPrice.toLocaleString()}원</div>}
                {(item.drinkPrice || 0) > 0 && <div>음료: +{item.drinkPrice.toLocaleString()}원</div>}
                {(item.sidePrice || 0) > 0 && <div>사이드: +{item.sidePrice.toLocaleString()}원</div>}
            </div>
        );
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
                        {cart.orders.map((item, index) => {
                            const unitPrice = item.price !== undefined ? item.price : (item.unitPrice || 0);
                            const itemTotal = unitPrice * item.quantity;

                            return (
                                <div key={index} css={s.cartItemStyle}>
                                    <img src={item.imgUrl} alt={item.itemName} css={s.itemImgStyle} />

                                    <div css={s.itemInfoStyle}>
                                        <h3>
                                            {item.itemName}
                                            {item.size > 0 && <span> ({item.size}cm)</span>}
                                        </h3>

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
                                        {/* ✅ [추가] 단가 명시 표시 */}
                                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                            단가: {unitPrice.toLocaleString()}원
                                        </div>

                                        {/* ✅ [추가] 가격 상세 정보 */}
                                        {renderPriceDetail(item)}

                                        <p css={s.priceStyle}>
                                            {itemTotal.toLocaleString()}원
                                        </p>
                                    </div>

                                    <div css={s.sideControlStyle}>
                                        <div css={s.qtyControlStyle}>
                                            <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                                        </div>
                                        <button css={s.removeButtonStyle} onClick={() => {
                                            if (confirm('삭제하시겠습니까?')) { 
                                                removeFromCart(index); 
                                                loadCart(); 
                                            }
                                        }}>삭제</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div css={s.totalSectionStyle}>
                        <div css={s.totalInfoStyle}>
                            <span>총 주문 금액</span>
                            <strong>{calculateTotalPrice().toLocaleString()}원</strong>
                        </div>
                        <div css={s.buttonGroupStyle}>
                            <button css={s.clearButtonStyle} onClick={() => {
                                if (confirm('전체 비우시겠습니까?')) { 
                                    clearCart(); 
                                    loadCart(); 
                                }
                            }}>전체 삭제</button>
                            <button css={s.orderButtonStyle} onClick={handleOrder} disabled={loading}>
                                {loading ? "처리 중..." : "주문하기"}
                            </button>   
                        </div>
                    </div>
                </>
            )}
            <button css={s.backButtonStyle} onClick={() => navigate('/menu')}>+ 메뉴 추가하기</button>
            <button onClick={() => setOpen(true)}>서브웨이 찾기 열기</button>
            <SubwayNearbyModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default CartPage;