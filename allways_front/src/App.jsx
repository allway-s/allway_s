import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/MainPage/HomePage/index.jsx';
import  Signup  from './pages/AuthPage/SignupPage/Signup.jsx';
import  Login  from './pages/AuthPage/LoginPage/Login.jsx';

function App() {

  return (
    <Router>
      <Routes>
        {/* 메인 주소(/)로 들어오면 HomePage 컴포넌트를 보여줌 */}
        <Route path="/" element={<HomePage />} />
        {/* 나중에 상세 페이지나 커뮤니티 페이지 라우트를 여기에 추가하면 됩니다 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;