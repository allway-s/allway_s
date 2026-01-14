/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './HomePage.styles.js';
import { ArrowRight, ShoppingCart } from 'lucide-react';

import { MainBanner } from './components/MainBanner.jsx';
import { PopularSection } from './components/PopularSection.jsx';
import { FeatureSection } from './components/FeatureSection.jsx';

import { BANNER_ITEMS } from './constants.js';
import { HomeMenu } from './components/HomeMenu.jsx';

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

  // ✅ 비로그인 상태에서도 메뉴 이동은 허용
  // 단, 이동한 페이지에서도 isLoggedIn props를 전달받아 헤더를 그려야 모순이 없습니다.
  const handleOrderClick = () => {
    navigate('/menu/sandwich');
  };

  return (
    <div css={styles.wrapper}>
      
      <MainBanner items={BANNER_ITEMS} />

      <section css={styles.heroSection}>
        <div css={styles.heroContent}>
          <h1 css={styles.heroTitle}>
            나만의 <span css={styles.heroTitleGreen}>Recipe</span> 를 만들고<br />
            <span css={styles.heroTitleGreen}>Recipe</span><span css={styles.heroTitleYellow}>-s</span> 에 공유하세요!
          </h1>

          {/* ✅ 비로그인 상태로 주문하기를 눌러도 isLoggedIn 상태가 유지된 채 이동합니다. */}
          <button onClick={handleOrderClick} css={styles.orderButton}>
            지금 주문하기 <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <HomeMenu />

      {/* ✅ 인기 섹션 역시 로그인 여부에 따라 문구를 자동 전환합니다. */}
      <PopularSection
        presets={communityPreSets}
        onNavigate={onNavigateToCommunity}
        onLike={onLike}
        onCopy={onCopy}
        user={isLoggedIn ? user : null}
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