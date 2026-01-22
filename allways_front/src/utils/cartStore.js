
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

export const addToCart = (orderItem) => {
    const cart = getCart();
    
    const existingIndex = cart.orders.findIndex(item => 
        item.itemId === orderItem.itemId &&
        JSON.stringify([...item.ingredientIds].sort()) === JSON.stringify([...orderItem.ingredientIds].sort())
    );

    if (existingIndex !== -1) {
        cart.orders[existingIndex].quantity += orderItem.quantity || 1;
    } else {
        cart.orders.push({
            itemId: orderItem.itemId,
            ingredientIds: orderItem.ingredientIds || [],
            ingredientName: orderItem.ingredientName || [], 
            quantity: orderItem.quantity || 1,
            itemName: orderItem.itemName,
            imgUrl: orderItem.imgUrl,
            price: orderItem.price, 
            size: orderItem.size,
        });
    }
    saveCart(cart);
    return cart;
};

// 수량 변경
export const updateCartItemQuantity = (index, quantity) => {
    const cart = getCart();
    if (cart.orders[index]) {
        cart.orders[index].quantity = Math.max(1, Math.min(100, quantity));
        saveCart(cart);
    }
    return cart;
};

// 항목 삭제
export const removeFromCart = (index) => {
    const cart = getCart();
    cart.orders.splice(index, 1);
    saveCart(cart);
    return cart;
};

// 장바구니 비우기
export const clearCart = () => {
    const emptyCart = { orders: [] };
    saveCart(emptyCart);
    return emptyCart;
};

// 장바구니 아이템 개수
export const getCartItemCount = () => {
    const cart = getCart();
    return cart.orders.reduce((count, item) => count + item.quantity, 0);
};