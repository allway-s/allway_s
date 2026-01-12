import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/MainPage/HomePage/index.jsx';
import Login from './pages/AuthPage/LoginPage/Login';
import Signup from './pages/AuthPage/SignupPage/Signup';
import MyPage from './pages/MyPage/MyPage.jsx'; // [추가] 마이페이지 임포트

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

  // 로그아웃 핸들러 (확인 팝업 추가)
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
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        {/* 마이페이지 경로 연결 */}
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;