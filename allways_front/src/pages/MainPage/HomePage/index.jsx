/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './HomePage.styles.js'; 
import { ArrowRight, ShoppingCart } from 'lucide-react'; 

import { MainBanner } from '../MainPageDetail/MainBanner/MainBanner.jsx';
import { PopularSection } from '../MainPageDetail/PopularSection/PopularSection.jsx';
import { FeatureSection } from '../MainPageDetail/FeatureSection/FeatureSection.jsx';

import { BANNER_ITEMS } from './constants.js'; 
import { HomeMenu } from '../HomeMenu/HomeMenu.jsx';

export function HomePage({ 
  isLoggedIn, 
  onLogout,
  communityPreSets = [], 
  onStartOrder, 
  onNavigateToCommunity, 
  onLike, 
  onCopy, 
  user 
}) {
  const navigate = useNavigate();
  
  return (
    <div css={styles.wrapper}>
      <header css={styles.header}>
        <div css={styles.headerInner}>
          <div css={styles.logoArea} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <h2 style={{ color: '#009223', fontWeight: 900, margin: 0, fontSize: '1.5rem' }}>
              ALLWAY-<span style={{ color: '#ffc107' }}>S</span>
            </h2>
          </div>

          <div css={styles.utilMenu}>
            {isLoggedIn ? (
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button onClick={() => navigate('/cart')} style={textButtonStyle}>장바구니</button>
                <button onClick={() => navigate('/mypage')} style={textButtonStyle}>마이페이지</button>
                <button onClick={onLogout} style={textButtonStyle}>로그아웃</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button aria-label="장바구니" onClick={() => navigate('/login')}>
                  <ShoppingCart size={22} />
                </button>
                <button onClick={() => navigate('/login')} style={textButtonStyle}>로그인</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <MainBanner items={BANNER_ITEMS} />

      <section css={styles.heroSection}>
        <div css={styles.heroContent}>
          <h1 css={styles.heroTitle}>
            나만의 <span css={styles.heroTitleGreen}>Recipe</span> 를 만들고<br />
            <span css={styles.heroTitleGreen}>Recipe</span><span css={styles.heroTitleYellow}>-s</span> 에 공유하세요!
          </h1>
          <button onClick={onStartOrder} css={styles.orderButton}>
            지금 주문하기 <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <HomeMenu />

      <PopularSection 
        presets={communityPreSets} 
        onNavigate={onNavigateToCommunity}
        onLike={onLike}
        onCopy={onCopy}
        user={user}
      />
    </div>
  );
}

const textButtonStyle = {
  background: 'none',
  border: 'none',
  padding: '5px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  color: '#333'
};