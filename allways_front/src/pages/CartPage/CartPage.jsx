/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './CartPage.styles.js';
import MainLogo from '../../assets/images/MainUpperImages/MainLogo.png';
import OrderImg1 from '../../assets/images/PresetImages/PresetImage1.png';
import OrderImg2 from '../../assets/images/PresetImages/PresetImage2.png';

const CartPage = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: "안창 비프&머쉬룸", 
      ingredientIds: [10, 22, 35], 
      price: 19700, 
      quantity: 1,
      image: OrderImg1 
    },
    { 
      id: 2, 
      name: "에그마요", 
      ingredientIds: [5, 12, 40], 
      price: 15500, 
      quantity: 1,
      image: OrderImg2 
    }
  ]);

  // 수량 변경 함수
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // 삭제 기능: 확인 후 삭제 완료 팝업
  const removeItem = (id) => {
    if (window.confirm("선택한 상품을 삭제하시겠습니까?")) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      alert("상품이 장바구니에서 삭제되었습니다.");
    }
  };

// ✅ 주문하기 로직: 확인 -> 초기화 -> 완료 알림 -> 이동
  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    // 1. 주문 의사 확인
    if (window.confirm("주문하시겠습니까?")) {
      
      // 2. 장바구니 상태 초기화 (백엔드 연결 시 여기서 API 호출)
      setCartItems([]); 

      // 3. 최종 완료 알림
      alert("주문이 완료되었습니다!");
      
      // 4. 메인 페이지로 이동
      navigate('/');
    }
  };

  // 금액 계산 로직
  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 3000 : 0;
  const totalPrice = subTotal + deliveryFee;

  return (
    <div css={S.container}>
      <nav css={S.navBar}>
        <div className="logo-section" onClick={() => navigate('/')}>
          <img src={MainLogo} alt="Logo" /> 
        </div>
        <div className="title-section" onClick={() => navigate('/')}>
          ALLWAY-<span>S</span>
        </div>
        <div className="menu-section">
          <span onClick={() => navigate('/mypage')}>마이페이지</span>
          <span onClick={() => { alert('로그아웃 되었습니다.'); navigate('/'); }}>로그아웃</span>
        </div>
      </nav>

      <header css={S.header}>
        <h1>장바구니</h1>
        <button css={S.homeButton} onClick={() => navigate('/')}>
          쇼핑 계속하기 〉
        </button>
      </header>

      <div css={S.contentWrapper}>
        <div css={S.cartList}>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} css={S.cartItem}>
                <div className="left-group">
                  <div css={S.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div css={S.itemInfo}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-option">재료 구성: {item.ingredientIds.length}가지</span>
                    <span className="item-price">{(item.price * item.quantity).toLocaleString()}원</span>
                    <div css={S.quantityControl}>
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="right-group">
                  <button css={S.deleteButton} onClick={() => removeItem(item.id)}>삭제</button>
                  <button css={S.optionButton}>옵션변경 ∨</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#999', fontSize: '1.1rem' }}>
              장바구니에 담긴 상품이 없습니다.
            </div>
          )}
        </div>

        <aside css={S.orderSidebar}>
          <h2>주문 정보</h2>
          <div css={S.infoSection}>
            <div css={S.typeSelector}>
              <div className="type-item">배달 ✅ <span>+{deliveryFee.toLocaleString()} 원</span></div>
            </div>
            <div className="label-group">
              <label>연락처</label>
              <input type="text" value="010-1234-5678" readOnly />
            </div>
            <div className="label-group">
              <label>주소</label>
              <input type="text" value="경남 김해시 장유3동" readOnly />
            </div>
          </div>
          <div css={S.totalPriceArea}>
            <span>총 금액</span>
            <strong>{totalPrice.toLocaleString()} 원</strong>
          </div>
          <button css={S.orderButton} onClick={handleOrder}>
            {totalPrice.toLocaleString()}원 주문하기
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;