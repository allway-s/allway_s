const CART_STORAGE_KEY = 'subwayCart';

export const getCart = () => {
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : { orders: [] };
    } catch (error) {
        console.error('장바구니 불러오기 실패:', error);
        return { orders: [] };
    }
};

export const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        return true;
    } catch (error) {
        console.error('장바구니 저장 실패:', error);
        return false;
    }
};

/**
 * ✅ [개선] 장바구니에 상품 추가
 * - 중복 체크: itemId, setId, ingredientIds 기반
 * - 중복이면 수량만 증가
 * - 새 상품이면 전체 정보 저장
 * - 가격 정보 필수 검증
 */
export const addToCart = (orderItem) => {
    // ✅ [검증] 필수 정보 확인
    if (!orderItem.itemId || orderItem.price === undefined) {
        console.error('❌ 필수 정보 누락:', orderItem);
        alert('상품 정보가 불완전합니다. 다시 시도해주세요.');
        return null;
    }

    const cart = getCart();
    
    // 중복 체크: itemId, setId, ingredientIds가 모두 같아야 동일 상품으로 처리
    const existingIndex = cart.orders.findIndex(item => 
        item.itemId === orderItem.itemId &&
        item.setId === orderItem.setId &&
        JSON.stringify([...(item.ingredientIds || [])].sort()) === 
        JSON.stringify([...(orderItem.ingredientIds || [])].sort())
    );

    if (existingIndex !== -1) {
        // ✅ [기존 상품] 수량만 증가, 가격은 유지
        const oldQuantity = cart.orders[existingIndex].quantity || 1;
        cart.orders[existingIndex].quantity = oldQuantity + (orderItem.quantity || 1);
        
        console.log(`📦 상품 수량 증가: ${orderItem.itemName} (${oldQuantity} → ${cart.orders[existingIndex].quantity})`);
    } else {
        // ✅ [새 상품] 모든 정보 저장
        const newItem = {
            ...orderItem,
            quantity: orderItem.quantity || 1,
            // price 속성 명시 (price와 unitPrice 모두 저장하여 호환성 확보)
            price: orderItem.price,
            unitPrice: orderItem.unitPrice || orderItem.price,
        };
        
        cart.orders.push(newItem);
        
        console.log(`✅ 신규 상품 추가:`, {
            상품명: newItem.itemName,
            기본가격: newItem.basePrice,
            재료가격: newItem.ingredientPrice,
            세트가격: newItem.setPrice,
            음료가격: newItem.drinkPrice,
            사이드가격: newItem.sidePrice,
            최종단가: newItem.price,
            수량: newItem.quantity
        });
    }

    saveCart(cart);
    return cart;
};

/**
 * ✅ [개선] 장바구니 항목 수량 변경
 */
export const updateCartItemQuantity = (index, quantity) => {
    const cart = getCart();
    
    if (cart.orders[index]) {
        const validQuantity = Math.max(1, Math.min(100, quantity));
        cart.orders[index].quantity = validQuantity;
        
        console.log(`📝 수량 변경: ${cart.orders[index].itemName} → ${validQuantity}개`);
        
        saveCart(cart);
    }
    
    return cart;
};

/**
 * ✅ 단일 항목 삭제
 */
export const removeFromCart = (index) => {
    const cart = getCart();
    
    if (cart.orders[index]) {
        const removedItem = cart.orders[index];
        cart.orders.splice(index, 1);
        
        console.log(`🗑️ 항목 삭제: ${removedItem.itemName}`);
        
        saveCart(cart);
    }
    
    return cart;
};

/**
 * ✅ 장바구니 전체 비우기
 */
export const clearCart = () => {
    const emptyCart = { orders: [] };
    saveCart(emptyCart);
    console.log('🔄 장바구니 비우기 완료');
    return emptyCart;
};

/**
 * ✅ [추가] 장바구니 총 가격 계산 (컴포넌트 외부에서도 사용 가능)
 */
export const calculateCartTotal = () => {
    const cart = getCart();
    return cart.orders.reduce((total, item) => {
        const unitPrice = item.price !== undefined ? item.price : (item.unitPrice || 0);
        return total + (unitPrice * (item.quantity || 1));
    }, 0);
};

/**
 * ✅ [추가] 디버그: 현재 장바구니 상태 로그
 */
export const debugCart = () => {
    const cart = getCart();
    console.log("📊 === 장바구니 상태 디버그 ===");
    console.log("총 아이템 수:", cart.orders.length);
    cart.orders.forEach((item, idx) => {
        const unitPrice = item.price !== undefined ? item.price : (item.unitPrice || 0);
        console.log(`[${idx}] ${item.itemName}`, {
            단가: unitPrice,
            수량: item.quantity || 1,
            소계: unitPrice * (item.quantity || 1),
            재료: item.ingredientName?.join(", ") || "기본"
        });
    });
    console.log("총 금액:", calculateCartTotal());
};