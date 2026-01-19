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
import SubwayNearby from '../../components/SubwayNearby.jsx';

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

  // ✅ [추가] + 버튼 클릭 시 실행될 실제 로직
  const handleCopy = (preset) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      navigate('/login');
      return;
    }

  // 만약 부모(App.jsx)에게도 알리고 싶다면 호출
    if (onCopy) onCopy(preset);
  

  // 사용자에게 알림을 보여주고 페이지 이동
    alert(`'${preset.title}' 레시피가 내 프리셋에 저장되었습니다!`);
    navigate('/mypreset'); // 마이프리셋 세부페이지로 이동
  };

  // ✅ 비로그인 상태에서도 메뉴 이동은 허용
  // 단, 이동한 페이지에서도 isLoggedIn props를 전달받아 헤더를 그려야 모순이 없습니다.
  const handleOrderClick = () => {
    navigate('/menu');
  };

  return (
    <div css={styles.wrapper}>
      <MainBanner items={BANNER_ITEMS} />

      <section css={styles.heroSection}>
        <div css={styles.heroContent}>
          <h1 css={styles.heroTitle}>
            나만의 <span css={styles.heroTitleGreen}>Recipe</span> 를 만들고<br />
            <span css={styles.heroTitleGreen}>Recipe</span><span css={styles.heroTitleBlack}>-</span><span css={styles.heroTitleYellow}>s</span> 에 공유하세요!
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
        // onCopy={onCopy}
        onCopy={handleCopy} // 👈 여기서 기존 onCopy 대신 새로 만든 handleCopy를 넣어줍니다!
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