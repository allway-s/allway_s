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
      image: OrderImg1 // 상품 썸네일 (public 폴더 확인)
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

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleOrder = () => {
    alert("주문이 완료되었습니다!");
    navigate('/');
  };

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalPrice = subTotal + 3000;

  return (
    <div css={S.container}>
      {/* 1. 최상단 네비게이션 바: 로고 위치 확인 */}
      <nav css={S.navBar}>
        <div className="logo-section" onClick={() => navigate('/')}>
          {/* 진현님, 이 부분의 src가 실제 public 폴더의 파일명과 일치해야 합니다! */}
          <img src= {MainLogo} alt="Logo" /> 
        </div>
        <div className="title-section" onClick={() => navigate('/')}>
          ALLWAY-<span>S</span>
        </div>
        <div className="menu-section">
          <span onClick={() => navigate('/mypage')}>마이페이지</span>
          <span onClick={() => { alert('로그아웃 되었습니다.'); navigate('/'); }}>로그아웃</span>
        </div>
      </nav>

      {/* 2. 장바구니 타이틀 */}
      <header css={S.header}>
        <h1>장바구니</h1>
        <button css={S.homeButton} onClick={() => navigate('/')}>
          쇼핑 계속하기 〉
        </button>
      </header>

      <div css={S.contentWrapper}>
        {/* 3. 좌측 상품 리스트 */}
        <div css={S.cartList}>
          {cartItems.map(item => (
            <div key={item.id} css={S.cartItem}>
              <div className="left-group">
                <input type="checkbox" defaultChecked className="checkbox-custom" />
                
                {/* 각 아이템 왼쪽의 샌드위치 이미지 */}
                <div css={S.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>

                <div css={S.itemInfo}>
                  <span className="item-name">{item.name}</span>
                  <span className="item-option">재료 구성: {item.ingredientIds.length}가지</span>
                  <span className="item-price">{item.price.toLocaleString()}원</span>
                  
                  <div css={S.quantityControl}>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
              <button css={S.optionButton}>옵션변경 ∨</button>
            </div>
          ))}
        </div>

        {/* 4. 우측 주문 정보 */}
        <aside css={S.orderSidebar}>
          <h2>주문 정보</h2>
          <div css={S.infoSection}>
            <div css={S.typeSelector}>
              <div className="type-item">배달 ✅ <span>+3,000 원</span></div>
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