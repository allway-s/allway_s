/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './CartPage.styles.js';
import MainLogo from '../../assets/images/MainUpperImages/MainLogo2.png';
import OrderImg1 from '../../assets/images/PresetImages/PresetImage1.png';
import OrderImg2 from '../../assets/images/PresetImages/PresetImage2.png';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "안창 비프&머쉬룸", ingredientIds: [10, 22, 35], price: 19700, quantity: 1, image: OrderImg1, selectedOption: "쿠키 음료 세트" },
    { id: 2, name: "에그마요", ingredientIds: [5, 12, 40], price: 15500, quantity: 1, image: OrderImg2, selectedOption: "단품" }
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orderType, setOrderType] = useState('배달');
  const [deliveryFee, setDeliveryFee] = useState(3000);
  const [openOptionId, setOpenOptionId] = useState(null);

  const orderOptions = [
    { label: '배달', fee: 3000 },
    { label: '픽업', fee: 0 },
    { label: '매장에서 취식', fee: 0 }
  ];

  const productOptions = ["단품", "쿠키 음료 세트", "웨지 감자 세트"];


  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다. 상품을 담아주세요!");
      return;
    }

    const confirmMessage = `${orderType}(으)로 총 ${totalPrice.toLocaleString()}원을 주문하시겠습니까?`;
    
    if (window.confirm(confirmMessage)) {
      alert("주문이 성공적으로 접수되었습니다!");
      setCartItems([]); 
      navigate('/'); 
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    if (window.confirm("선택한 상품을 삭제하시겠습니까?")) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleTypeSelect = (opt) => {
    setOrderType(opt.label);
    setDeliveryFee(opt.fee);
    setIsDropdownOpen(false);
  };

  const handleOptionSelect = (itemId, option) => {
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, selectedOption: option } : item
    ));
    setOpenOptionId(null);
  };

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalPrice = cartItems.length > 0 ? subTotal + deliveryFee : 0;

  return (
    <div css={S.container}>
      {/* [추가] 마이프리셋/마이페이지와 동일한 타이틀 영역 이식 */}
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>
            Cart <span css={S.yellowText}>List</span>
          </h1>
        </div>
      </section>

  {/* [수정] 메인 컨텐츠를 S.main으로 감싸 너비(1200px)와 중앙 정렬 유지 */}
      <main css={S.main}>
        <div css={S.contentWrapper}>
          
          {/* 장바구니 상품 리스트 */}
          <div css={S.cartList}>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item.id} css={S.cartItemCard}>
                  <div className="item-main">
                    <div className="info-flex">
                      <div css={S.itemImage}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div css={S.itemInfo}>
                        <span className="item-name">{item.name}</span>
                        <span className="item-sub">{item.selectedOption}</span>
                        <span className="item-price">{(item.price * item.quantity).toLocaleString()}원</span>
                        
                        <div css={S.quantityControl}>
                          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <button className="delete-icon-btn" onClick={() => removeItem(item.id)}>삭제</button>
                  </div>

                  {/* 옵션 변경 드롭다운 영역 */}
                  <div css={S.itemOptionDropdown}>
                    <div 
                      className="dropdown-header" 
                      onClick={() => setOpenOptionId(openOptionId === item.id ? null : item.id)}
                    >
                      <span>옵션변경</span>
                      {openOptionId === item.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    
                    {openOptionId === item.id && (
                      <ul className="option-list">
                        {productOptions.map(opt => (
                          <li key={opt} onClick={() => handleOptionSelect(item.id, opt)}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#999', fontSize: '1.2rem' }}>
                장바구니가 비어있습니다.
              </div>
            )}
          </div>

          {/* 우측 주문 정보 사이드바 */}
          <aside css={S.orderSidebar}>
            <h2>주문 정보</h2>
            <div css={S.infoSection}>
              {/* 배달/픽업 선택 드롭다운 */}
              <div css={S.typeSelector}>
                <div className="selected-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div>
                    <span>{orderType}</span>
                    {deliveryFee > 0 && <span className="fee-highlight">+{deliveryFee.toLocaleString()} 원</span>}
                  </div>
                  {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {isDropdownOpen && (
                  <ul className="options-list">
                    {orderOptions.map((opt) => (
                      <li key={opt.label} onClick={() => handleTypeSelect(opt)}>
                        <span>{opt.label}</span>
                        {opt.fee > 0 && <span className="fee-text">+{opt.fee.toLocaleString()} 원</span>}
                      </li>
                    ))}
                  </ul>
                )}
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
      </main>
    </div>
  );
};

export default CartPage;