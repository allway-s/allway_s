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
import { cancelOrder, createOrder, verifyPayment } from "../../apis/items/orderApi";
import { getUserIdFromToken } from "../../utils/getUserId";
import SubwayNearbyModal from '../../components/SubwayNearbyModal';
import PortOne from "@portone/browser-sdk/v2";

const CartPage = () => {
    const [cart, setCart] = useState({ orders: [] });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // ✅ [추가] 배달 주소와 상세 주소 상태 관리
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

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

    // ✅ [추가] 모달에서 주소를 선택했을 때 실행될 콜백 함수
    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
        setOpen(false); // 주소 선택 후 모달 닫기
    };

    const handleOrder = async () => {
        const currentUserId = getUserIdFromToken();

        if (!currentUserId) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        // ✅ [유효성 검사] 주소 입력 여부 확인
        if (!address) {
            alert("배달 받으실 주소를 설정해주세요. (주소 찾기 버튼 클릭)");
            setOpen(true);
            return;
        }

        setLoading(true);
        let createdOrderNumber = null;  // 추적용 주문번호
        try {
            const firstItem = cart.orders[0];
            let displayName = "";

            if (!!firstItem.setId) {
                const setName = getSetName(firstItem.setId);
                displayName = `${firstItem.itemName} ${setName}`;
            } else {
                displayName = firstItem.itemName;
            }

            const ordersLength = cart.orders.length;
            const finalPaymentName = ordersLength > 1
                ? `${displayName} 외 ${ordersLength - 1}건`
                : displayName;

            const orderData = {
                order: {
                    userId: currentUserId,
                    address: address,
                    detailAddress: detailAddress,
                    totalPrice: calculateTotalPrice()
                },
                orderDetails: cart.orders.map(item => ({
                    productId: item.productId,
                    itemId: item.itemId,
                    ingredientIds: item.ingredientIds,
                    unitPrice: item.price || item.unitPrice,
                    quantity: item.quantity,
                    setId: item.setId || null,
                    selectedDrinkId: item.selectedDrinkId || null,
                    selectedSideId: item.selectedSideId || null
                }))
            };

            // 주문 생성
            const orderResponse = await createOrder(orderData);
            const { orderNumber, totalPrice } = orderResponse.data;

            // 주문 번호 저장
            createdOrderNumber = orderNumber; 

            // V2 방식으로 결제 요청
            const paymentResponse = await PortOne.requestPayment({
                storeId: "store-b92791a0-bdc6-4d76-9331-77b569d37232",
                channelKey: "channel-key-4293ef39-5e3c-405b-b1f1-640518f9051a",
                paymentId: `payment-${orderNumber}`,
                orderName: finalPaymentName,
                totalAmount: totalPrice,
                currency: "CURRENCY_KRW",
                payMethod: "EASY_PAY",
                easyPay: {
                    easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY"
                }
            });

            // 결제 취소/실패 시 주문도 취소
            if (paymentResponse.code != null) {
                console.log("결제 취소/실패:", paymentResponse.message);
                
                // 주문 상태를 CANCELLED로 변경
                await cancelOrder(orderNumber);
                
                alert(`결제가 취소되었습니다: ${paymentResponse.message}`);
                return;
        }

            // 백엔드 검증 요청
            const verifyDto = {
                paymentId: paymentResponse.paymentId,
                orderNumber: orderNumber
            };
            
            const verifyRes = await verifyPayment(verifyDto);

            if (verifyRes.data) {
                alert("주문과 결제가 모두 완료되었습니다!");
                clearCart();
                loadCart();
                navigate('/order/success', {
                    state: {
                        fromPayment: true,
                        orderNumber: orderNumber
                    }
                });
            } else {
                alert("결제 금액이 일치하지 않습니다.");
            }

        } catch (e) {
            console.error('주문 실패:', e);

            // 에러 발생 시에도 주문 취소
            if (!!createdOrderNumber) {
                try {
                    await cancelOrder(createdOrderNumber);
                } catch (cancelError) {
                    console.error('주문 취소 실패:', cancelError);
                }
            }

            alert(e.response?.data?.message || '주문이 취소되었습니다.');
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
                                        {/* 단가 명시 표시 */}
                                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                            단가: {unitPrice.toLocaleString()}원
                                        </div>

                                        {/* 가격 상세 정보 */}
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
                    
                    {/* ✅ [추가] 배송지 정보 입력 섹션 */}
                    <div style={{ 
                        marginTop: '30px', 
                        padding: '20px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px', 
                        backgroundColor: '#fff' 
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px' }}>📍 배송지 정보</h3>
                        
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input 
                                type="text" 
                                value={address} 
                                placeholder="주소 찾기 버튼을 눌러주세요" 
                                readOnly 
                                style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }} 
                            />
                            <button 
                                onClick={() => setOpen(true)} 
                                style={{ 
                                    padding: '10px 15px', 
                                    cursor: 'pointer',
                                    backgroundColor: '#009223',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                }}
                            >
                                주소 찾기
                            </button>
                        </div>
                        
                        <input 
                            type="text" 
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                            placeholder="상세 주소를 입력해주세요 (예: 101동 102호)"
                            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
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
            
            {/* ✅ [수정] 모달에 onSelect props 전달 */}
            <SubwayNearbyModal 
                isOpen={open} 
                onClose={() => setOpen(false)} 
                onSelect={handleAddressSelect} 
            />
        </div>
    );
};

export default CartPage;