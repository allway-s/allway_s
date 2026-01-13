/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './CartPage.styles.js';
import MainLogo from '../../assets/images/MainUpperImages/MainLogo.png';
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

  // ✅ 추가된 handleOrder 함수
  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다. 상품을 담아주세요!");
      return;
    }

    const confirmMessage = `${orderType}(으)로 총 ${totalPrice.toLocaleString()}원을 주문하시겠습니까?`;
    
    if (window.confirm(confirmMessage)) {
      // 실제 서비스라면 여기서 API 호출을 진행합니다.
      alert("주문이 성공적으로 접수되었습니다!");
      setCartItems([]); // 주문 완료 후 장바구니 비우기
      navigate('/'); // 메인 페이지로 이동
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

        <aside css={S.orderSidebar}>
          <h2>주문 정보</h2>
          <div css={S.infoSection}>
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
    </div>
  );
};

export default CartPage;