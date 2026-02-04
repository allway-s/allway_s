import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/MainPage/HomePage.jsx';

import Login from './pages/AuthPage/LoginPage.jsx';
import Signup from './pages/AuthPage/Signup.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import MenuPage from './pages/menu/MenuPage.jsx'; 
import { Global, css } from '@emotion/react';

import MyPreSet from './pages/MyPage/MyPreset.jsx';
import RecentOrder from './pages/MyPage/RecentOrder.jsx';
import { LoginSuccess } from './pages/AuthPage/LoginSuccess.jsx';
import Header from './components/Header.jsx';
import MainLogo from './assets/images/MainUpperImages/MainLogo2.png';
import CommunityPage from './pages/CommunityPage/CommunityPage.jsx';
import CustomPage from './pages/order/CustomPage.jsx';
import { ResponseInterceptor } from './apis/config/axiosConfig.js';
import OrderSuccess from './pages/CartPage/OrderSuccess.jsx';
import { getUserMe } from './apis/items/userApi.js';
import { getPosts } from './apis/items/communityApi.js';
import { ScrollToTop } from './utils/scrollToTop.js';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null); 
  const [presets, setPresets] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    ResponseInterceptor(navigate, setIsLoggedIn);

    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        if (token) {
          const userRes = await getUserMe(); 
          setUser(userRes.data);
        }
        
        const postRes = await getPosts();
        setPresets(postRes.data); 
        
      } catch (error) {
      }
    };

    fetchData();
  }, [isLoggedIn]);


  // 로그인 확인
  const ProtectedRoute = ({ children }) => {
    const token = !!localStorage.getItem('accessToken');

    if (!token) {
      console.log("로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다");
      return <Navigate to="/login" replace />;
    }

  return children;
};

  // 이미 로그인한 사람 접근 차단
  const PublicRoute = ({ children }) => {
    const token = !!localStorage.getItem('accessToken');

    if (token) {
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

  const globalStyles = css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        /* 전체 폰트나 배경색이 필요하다면 여기에 추가 */
      }
    `;
  return (

  //   <div>
  //     <h1>테스트 화면</h1>
  //     <p>이 글자가 보인다면 컴포넌트 연결 문제입니다.</p>
  // </div>

    <>
    {/* [변경점 1] Header 컴포넌트의 위치 
        - Routes 밖에 배치하여 모든 페이지(홈, 메뉴, 마이페이지 등)에서 
          헤더가 상단에 항상 고정되도록 했습니다.*/}
      <Global styles={globalStyles} />
      <Header 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout} 
        logoSrc={MainLogo}
      />

      <ScrollToTop />
      <Routes>
        {/* 메인 홈페이지 */}
        <Route path="/" element={
            <HomePage
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              preset={presets}
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
        <Route path='/order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}/>

        {/* [변경점 3] PublicRoute 적용 유지 
            로그인/회원가입 페이지는 이미 로그인된 사용자가 접근할 경우 
            알림을 띄우고 메인으로 튕겨내는 '문지기' 역할을 그대로 유지
        */}
        <Route path="/login" element={<PublicRoute><Login setIsLoggedIn={setIsLoggedIn} /></PublicRoute>} />
        <Route path="/auth/signup" element={<PublicRoute><Signup setIsLoggedIn={setIsLoggedIn}/></PublicRoute>} />
        <Route path="/auth/oauth2/login/success" element={<PublicRoute><LoginSuccess setIsLoggedIn={setIsLoggedIn}/></PublicRoute>} />

        {/* 메뉴 관련은 누구나 접근 가능 */}
        <Route path="/menu" element={<MenuPage />} />
        
        {/* 커뮤니티 */}
        <Route path="/community" element={<CommunityPage />} />
        
      </Routes>
    </>
  );
}

export default App;
