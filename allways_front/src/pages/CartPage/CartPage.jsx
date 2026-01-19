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
import { createOrder } from '../../apis/items/orderApi';

const CartPage = () => {
    const [cart, setCart] = useState({ orders: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        setCart(getCart());
    };

    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1 || newQuantity > 100) return;
        updateCartItemQuantity(index, newQuantity);
        loadCart();
    };

    const handleRemoveItem = (index) => {
        if (window.confirm('이 상품을 삭제하시겠습니까?')) {
            removeFromCart(index);
            loadCart();
        }
    };

    const handleClearCart = () => {
        if (window.confirm('장바구니를 비우시겠습니까?')) {
            clearCart();
            loadCart();
        }
    };

    const getTotalQuantity = () => {
        return cart.orders.reduce((sum, item) => sum + item.quantity, 0);
    };

    const handleOrder = async () => {
        if (cart.orders.length === 0) {
            alert('장바구니가 비어있습니다.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // 백엔드로 장바구니 데이터 그대로 전송
            const response = await createOrder(cart);
            
            setSuccess({
                message: '주문이 완료되었습니다!',
                orderId: response.data.orderId,
                totalPrice: response.data.totalPrice,
                orderedAt: response.data.orderedAt
            });

            // 장바구니 비우기
            clearCart();
            loadCart();

            // 3초 후 메인 페이지로 이동
            setTimeout(() => {
                navigate('/menu');
            }, 3000);

        } catch (err) {
            console.error('주문 실패:', err);
            
            if (err.response?.status === 401) {
                setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(err.response?.data?.message || '주문 처리 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div css={containerStyle}>
            <header css={headerStyle}>
                <button css={backButtonStyle} onClick={() => navigate('/menu')}>
                    ← 메뉴로 돌아가기
                </button>
                <h1 css={titleStyle}>장바구니</h1>
                <div css={spacerStyle} />
            </header>

            {error && (
                <div css={errorBoxStyle}>
                    ⚠️ {error}
                </div>
            )}

            {success && (
                <div css={successBoxStyle}>
                    <div css={successTitleStyle}>✅ {success.message}</div>
                    <div css={successDetailStyle}>
                        주문번호: {success.orderId}<br/>
                        결제금액: {success.totalPrice?.toLocaleString()}원
                    </div>
                </div>
            )}

            <div css={contentStyle}>
                {cart.orders.length === 0 ? (
                    <div css={emptyCartStyle}>
                        <div css={emptyIconStyle}>🛒</div>
                        <h2>장바구니가 비어있습니다</h2>
                        <button css={goMenuButtonStyle} onClick={() => navigate('/menu')}>
                            메뉴 보러가기
                        </button>
                    </div>
                ) : (
                    <>
                        <div css={cartHeaderStyle}>
                            <h2>주문 내역 ({cart.orders.length}개 상품)</h2>
                            <button css={clearButtonStyle} onClick={handleClearCart}>
                                전체 삭제
                            </button>
                        </div>

                        <div css={cartListStyle}>
                            {cart.orders.map((item, index) => (
                                <div key={index} css={cartItemStyle}>
                                    <div css={itemDetailsStyle}>
                                        <h3 css={itemNameStyle}>
                                            상품 ID: {item.itemId}
                                        </h3>
                                        
                                        {item.ingredientIds && item.ingredientIds.length > 0 && (
                                            <div css={ingredientsListStyle}>
                                                <strong>재료 ID:</strong>
                                                <div css={ingredientTagsStyle}>
                                                    {item.ingredientIds.map((ingId, i) => (
                                                        <span key={i} css={ingredientTagStyle}>
                                                            {ingId}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div css={itemInfoTextStyle}>
                                            수량: {item.quantity}개
                                        </div>
                                    </div>

                                    <div css={itemActionsStyle}>
                                        <div css={quantityControlStyle}>
                                            <button 
                                                css={qtyButtonStyle}
                                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                                disabled={loading}
                                            >
                                                -
                                            </button>
                                            <span css={qtyDisplayStyle}>{item.quantity}</span>
                                            <button 
                                                css={qtyButtonStyle}
                                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                                disabled={loading}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            css={removeButtonStyle}
                                            onClick={() => handleRemoveItem(index)}
                                            disabled={loading}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div css={summaryBoxStyle}>
                            <div css={summaryRowStyle}>
                                <span>총 상품 개수</span>
                                <span>{getTotalQuantity()}개</span>
                            </div>
                            <div css={noteStyle}>
                                * 최종 금액은 주문 시 서버에서 계산됩니다
                            </div>
                        </div>

                        <div css={actionButtonsStyle}>
                            <button 
                                css={orderButtonStyle}
                                onClick={handleOrder}
                                disabled={loading}
                            >
                                {loading ? '주문 처리 중...' : '주문하기'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// 스타일 정의
const containerStyle = css`
    min-height: 100vh;
    background: #f5f5f5;
`;

const headerStyle = css`
    background: white;
    padding: 20px 40px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const backButtonStyle = css`
    background: #008C45;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { background: #006633; }
`;

const titleStyle = css`
    margin: 0;
    font-size: 28px;
    color: #333;
`;

const spacerStyle = css`
    width: 120px;
`;

const errorBoxStyle = css`
    background: #fee;
    color: #c00;
    padding: 15px;
    margin: 20px 40px;
    border-radius: 5px;
    border: 1px solid #fcc;
`;

const successBoxStyle = css`
    background: #efe;
    padding: 20px;
    margin: 20px 40px;
    border-radius: 5px;
    border: 1px solid #cfc;
`;

const successTitleStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: #060;
    margin-bottom: 10px;
`;

const successDetailStyle = css`
    color: #060;
    line-height: 1.6;
`;

const contentStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

const emptyCartStyle = css`
    text-align: center;
    padding: 100px 20px;
`;

const emptyIconStyle = css`
    font-size: 80px;
    margin-bottom: 20px;
`;

const goMenuButtonStyle = css`
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

const cartHeaderStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const clearButtonStyle = css`
    background: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover { background: #cc0000; }
`;

const cartListStyle = css`
    background: white;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
`;

const cartItemStyle = css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    &:last-child {
        border-bottom: none;
    }
`;

const itemDetailsStyle = css`
    flex: 1;
`;

const itemNameStyle = css`
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
`;

const ingredientsListStyle = css`
    margin: 10px 0;
    font-size: 14px;
`;

const ingredientTagsStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
`;

const ingredientTagStyle = css`
    background: #e8f5e9;
    color: #2e7d32;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
`;

const itemInfoTextStyle = css`
    color: #666;
    font-size: 14px;
    margin-top: 10px;
`;

const itemActionsStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
`;

const quantityControlStyle = css`
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
`;

const qtyButtonStyle = css`
    background: white;
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    color: #008C45;
    &:hover { background: #f0f0f0; }
`;

const qtyDisplayStyle = css`
    min-width: 30px;
    text-align: center;
    font-weight: bold;
`;

const removeButtonStyle = css`
    background: #ff4444;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    &:hover { background: #cc0000; }
`;

const summaryBoxStyle = css`
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const summaryRowStyle = css`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 18px;
    font-weight: bold;
`;

const noteStyle = css`
    color: #666;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
`;

const actionButtonsStyle = css`
    display: flex;
    gap: 15px;
`;

const orderButtonStyle = css`
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

export default CartPage;