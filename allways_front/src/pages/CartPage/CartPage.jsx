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
import { createOrder, verifyPayment } from "../../apis/items/orderApi";
import { getUserIdFromToken } from "../../utils/getUserId";
import SubwayNearbyModal from '../../components/SubwayNearbyModal';

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
        try {
            // 첫 번째 메뉴만 표시
            const firstItem = cart.orders[0];
            let displayName = "";

            // 세트 여부 표시
            if (!!firstItem.setId) {
                const setName = getSetName(firstItem.setId);
                displayName = `${firstItem.itemName} ${setName}`;
            } else {
                displayName = firstItem.itemName;
            }

            // [첫 번째 메뉴]외 ~건 표시
            const ordersLength = cart.orders.length;
            const finalPaymentName = ordersLength > 1
                ? `${displayName} 외 ${ordersLength - 1}건`
                : displayName;

            // ✅ [수정] order 객체에 address와 detailAddress 포함
            const orderData = {
                order: {
                    userId: currentUserId,
                    address: address,             // 사용자가 선택한 주소
                    detailAddress: detailAddress, // 사용자가 입력한 상세 주소
                    totalPrice: calculateTotalPrice()
                },
                orderDetails: cart.orders.map(item => ({
                    productId: item.productId,
                    itemId: item.itemId,           // 상품 생성을 위해 필수
                    ingredientIds: item.ingredientIds,
                    unitPrice: item.price || item.unitPrice,
                    quantity: item.quantity,
                    setId: item.setId || null,
                    selectedDrinkId: item.selectedDrinkId || null,
                    selectedSideId: item.selectedSideId || null
                }))
            };

            const response = await createOrder(orderData);

            const { orderNumber, totalPrice } = response.data;

            const { IMP } = window;
            IMP.init("imp30286060");

            const paymentParam = {
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: orderNumber,
                name: finalPaymentName,
                amount: totalPrice,
            };

            IMP.request_pay(paymentParam, async (rsp) => {
                if (rsp.success) {
                    // 결제 성공 시 검증 api 호출
                    try {
                        const verifyData = {
                            impUid: rsp.imp_uid,
                            orderNumber: orderNumber
                        };

                        await verifyPayment(verifyData);

                        alert('결제가 완료되었습니다!');
                        clearCart();
                        loadCart();
                        // 성공 페이지로 이동 (state에 주문번호 전달)
                        navigate('/order/success', { state: { fromPayment: true, orderNumber } });
                    } catch (verifyErr) {
                        console.error('검증 실패:', verifyErr);
                        alert('결제 검증 중 오류가 발생했습니다.');
                    }
                } else {
                    alert(`결제 실패: ${rsp.error_msg}`);
                }
            });

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