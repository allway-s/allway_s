import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/MainPage/HomePage.jsx';

// [해결] 서버의 .jsx 확장자 경로와 진현님의 MyPage 임포트를 합칩니다.
import Login from './pages/AuthPage/LoginPage.jsx';
import Signup from './pages/AuthPage/Signup.jsx';
import MyPage from './pages/MyPage/MyPage.jsx'; 
import CartPage from './pages/CartPage/CartPage.jsx';
import MenuPage from './pages/menu/MenuPage.jsx';

import PresetImage1 from './assets/images/PresetImages/PresetImage1.png';
import PresetImage2 from './assets/images/PresetImages/PresetImage2.png';
import PresetImage3 from './assets/images/PresetImages/PresetImage3.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [presets] = useState([
    { id: '1', title: '서브웨이클럽', likes: 150, author: 'JINHYUN1996', image: PresetImage1 },
    { id: '2', title: '비엠티 추천', likes: 90, author: 'BAEKGYUN', image: PresetImage2 },
    { id: '3', title: '토시비프 샐러드', likes: 210, author: '비건이지만고기먹습니다', image: PresetImage3 },
  ]);

  const [user] = useState({ name: '진현', id: 'jinhyeon123' });

  // 로그아웃 핸들러
  const handleLogout = () => {
    const isConfirm = window.confirm("정말 로그아웃 하시겠습니까?");
    if (isConfirm) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
      window.location.href = '/'; 
    }
  };

  const handleStartOrder = () => console.log('주문 시작!');
  const handleNavigateCommunity = () => console.log('커뮤니티 이동!');
  const handleLike = (id) => console.log(id + '번 좋아요!');
  const handleCopy = (preset) => console.log(preset.title + ' 복사됨!');

  return (
    <Router>
      <Routes>
        {/* [해결] Props가 모두 포함된 진현님의 HomePage 루트를 선택합니다 */}
        <Route 
          path="/" 
          element={
            <HomePage 
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              communityPreSets={presets}
              onStartOrder={handleStartOrder}
              onNavigateToCommunity={handleNavigateCommunity}
              onLike={handleLike}
              onCopy={handleCopy}
              user={user}
            />
          } 
        />
        {/* [해결] 로그인 상태 변경 함수를 전달하는 진현님의 경로를 선택합니다 */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* [해결] 마이페이지 경로를 최종 유지합니다 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ [여기입니다!] MenuPage에 상태값과 로그아웃 함수를 전달해야 합니다 */}
        <Route 
          path="/menu" 
          element={
            <MenuPage 
              isLoggedIn={isLoggedIn} 
              onLogout={handleLogout} 
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;