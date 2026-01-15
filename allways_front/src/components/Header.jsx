/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { s } from './Header.styles';
import MainLogo from '../assets/images/MainUpperImages/MainLogo2.png'; 

export default function Header({ onLogout, logoSrc }) {
  const navigate = useNavigate();

  // [추가] 로그인 상태 체크: 토큰이 있으면 로그인된 것으로 간주
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <header css={s.topBar}>
      <div css={s.topInner}>
        <div css={s.brandLeft}>
          <div className="logo-section" onClick={() => navigate('/')}>
            <img src={logoSrc || MainLogo} alt="Logo" style={{ height: '55px' }} />
          </div>
        </div>

        <div
          css={s.brandCenter}
          onClick={() => navigate('/')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
        >
          <h2 css={s.brandTitle}>
            ALLWAY<span css={s.brandDash}>-</span>
            <span css={s.brandS}>S</span>
          </h2>
        </div>

        <nav css={s.topNav}>
          {isLoggedIn ? (
            /* 1. 로그인 상태일 때 보여줄 버튼들 */
            <>
              <button onClick={() => navigate('/cart')} css={s.topNavBtn}>
                장바구니
              </button>
              <button onClick={() => navigate('/mypage')} css={s.topNavBtn}>
                마이페이지
              </button>
              <button
                onClick={onLogout ?? (() => {
                  localStorage.removeItem('accessToken'); // 로그아웃 시 토큰 삭제
                  navigate('/');
                })}
                css={s.topNavBtn}
              >
                로그아웃
              </button>
            </>
          ) : (
            /* 2. 로그인 이전(로그아웃 상태)일 때 보여줄 버튼들 */
            <>
              <button onClick={() => navigate('/cart')} css={s.topNavBtn}>
                장바구니
              </button>
              <button onClick={() => navigate('/login')} css={s.topNavBtn}>
                로그인
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}