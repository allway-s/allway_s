import React, { useEffect, useState } from 'react';
// [수정] Navigate 임포트 추가 (페이지 강제 이동용)
// [필수] Navigate: 조건에 맞지 않을 때 강제로 페이지를 되돌리는 역할
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/MainPage/HomePage.jsx';

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
import { LoginSuccess } from './pages/AuthPage/LoginSuccess.jsx';
import Header from './components/header.jsx';
import MainLogo from './assets/images/MainUpperImages/MainLogo2.png';
import CommunityPage from './pages/CommunityPage/CommunityPage.jsx';
import CustomPage from './pages/order/CustomPage.jsx';
import { api, ResponseInterceptor } from './apis/config/axiosConfig.js';


function App() {
  // 토큰이 있는지 검사하여 로그인 상태 결정
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  // 토큰 유효성 검사
  useEffect(() => {
    ResponseInterceptor(navigate, setIsLoggedIn);

    const token = localStorage.getItem("accessToken");
    if (token) {
        api.get("/api/user/me").catch(() => {
          console.log("토큰 검증 완료")
        });
    }
  }, []);

  
  const [presets] = useState([
    { id: '1', title: '서브웨이클럽', likes: 150, author: 'JINHYUN1996', image: PresetImage1 },
    { id: '2', title: '비엠티 추천', likes: 90, author: 'BAEKGYUN', image: PresetImage2 },
    { id: '3', title: '토시비프 샐러드', likes: 210, author: '비건이지만고기먹습니다', image: PresetImage3 },
  ]);

  const [user] = useState({ name: '진현', id: 'jinhyeon123' });

  // 로그인 확인
  const ProtectedRoute = ({ children }) => {
    const token = !!localStorage.getItem('accessToken');

    if (!token) {
      window.alert("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다");
      return <Navigate to="/login" replace />;
    }

  return children;
};

  // 이미 로그인한 사람 접근 차단
  const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      alert("이미 로그인된 상태입니다. 메인 페이지로 이동합니다.");
      return <Navigate to="/" replace />; 
    }
    return children;
  };

  const handleLogout = () => {
    const isConfirm = window.confirm("정말 로그아웃 하시겠습니까?");
    if (isConfirm) {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다.");
      navigate('/', { replace: true });
    }
  };

  const handleStartOrder = () => console.log('주문 시작!');
  const handleNavigateCommunity = () => console.log('커뮤니티 이동!');
  const handleLike = (id) => console.log(id + '번 좋아요!');
  const handleCopy = (preset) => console.log(preset.title + ' 복사됨!');

  return (
    <>
    {/* [변경점 1] Header 컴포넌트의 위치 
        - Routes 밖에 배치하여 모든 페이지(홈, 메뉴, 마이페이지 등)에서 
          헤더가 상단에 항상 고정되도록 했습니다.*/}
      <Header 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout} 
        logoSrc={MainLogo}
      />

      <Routes>
        {/* 메인 홈페이지 */}
        <Route path="/" element={
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

        {/* [변경점 2] ProtectedRoute 범위 확장 */}
        {/* 마이페이지뿐만 아니라 '장바구니'도 로그인이 필요한 페이지로 묶었습니다. */}
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
        <Route path="/mypreset" element={<ProtectedRoute><MyPreSet isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} /></ProtectedRoute>} />
        <Route path="/recent-order" element={<ProtectedRoute><RecentOrder isLoggedIn={isLoggedIn} onLogout={handleLogout} /></ProtectedRoute>} />
        
        <Route path='/custom/:itemId' element={<ProtectedRoute><CustomPage /></ProtectedRoute>}/>

        {/* [변경점 3] PublicRoute 적용 유지 
            로그인/회원가입 페이지는 이미 로그인된 사용자가 접근할 경우 
            알림을 띄우고 메인으로 튕겨내는 '문지기' 역할을 그대로 유지
        */}
        <Route path="/login" element={<PublicRoute><Login setIsLoggedIn={setIsLoggedIn} /></PublicRoute>} />
        <Route path="/auth/signup" element={<PublicRoute><Signup setIsLoggedIn={setIsLoggedIn}/></PublicRoute>} />
        <Route path="/auth/oauth2/login/success" element={<LoginSuccess setIsLoggedIn={setIsLoggedIn} />} />

        {/* 메뉴 관련은 누구나 접근 가능 */}
        <Route path="/menu/sandwich" element={<MenuPage />} />

        {/* 커뮤니티 */}
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
        
      </Routes>
    </>
  );
}

export default App;