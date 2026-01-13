import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/MainPage/HomePage.jsx';

// [수정] MenuPage 하나로 통합하기 위해 2, 3 임포트 제거
import Login from './pages/AuthPage/LoginPage.jsx';
import Signup from './pages/AuthPage/Signup.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import MenuPage from './pages/menu/MenuPage.jsx'; 

import PresetImage1 from './assets/images/PresetImages/PresetImage1.png';
import PresetImage2 from './assets/images/PresetImages/PresetImage2.png';
import PresetImage3 from './assets/images/PresetImages/PresetImage3.png';
import MyPreSet from './pages/MyPage/MyPreset.jsx';
import RecentOrder from './pages/MyPage/RecentOrder.jsx';

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
        {/* 메인 홈페이지 */}
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

        {/* 인증 관련 */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />

        {/* 마이페이지 및 기본 기능 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ [중요] 모든 메뉴 경로를 MenuPage 하나로 통합 */}
        {/* 이렇게 하면 MenuPage 내부의 로고 수정 사항이 모든 탭에 공통 적용됩니다 */}
        <Route
          path="/menu"
          element={<MenuPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route
          path="/menu/sandwich"
          element={<MenuPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route 
          path="/menu/salad" 
          element={<MenuPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} 
        />
        <Route 
          path="/menu/wrap" 
          element={<MenuPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} 
        />

        {/* 프리셋 및 최근 주문 내역 */}
        <Route 
          path="/mypreset" 
          element={
            <MyPreSet 
              isLoggedIn={isLoggedIn} 
              onLogout={handleLogout} 
              user={user} 
            />
          } 
        />

        <Route 
          path="/recent-order" 
          element={
            <RecentOrder
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