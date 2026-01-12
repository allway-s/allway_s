/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react'; 
import { s } from './styles';

import MainLogo from '../../assets/images/MainUpperImages/MainLogo.png';

const CATEGORIES = ['샌드위치', '샐러드', '랩&기타'];

const SAMPLE_ITEMS = [
  {
    id: 1,
    badge: 'NEW',
    nameKo: '랍스터&쉬림프',
    nameEn: 'Lobster & Shrimp',
    img: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
  },
  {
    id: 2,
    badge: 'NEW',
    nameKo: '랍스터',
    nameEn: 'Lobster',
    img: 'https://www.subway.co.kr/upload/menu/1763392124489_kSN1t9.png',
  },
  {
    id: 3,
    badge: 'SUBPICK',
    nameKo: 'New머쉬룸',
    nameEn: 'New Mushroom',
    img: 'https://www.subway.co.kr/upload/menu/1757375591323_zQLUtM.png',
  },
  {
    id: 4,
    badge: 'SUBPICK',
    nameKo: '안창 비프&New머쉬룸',
    nameEn: 'Beef & New Mushroom',
    img: 'https://www.subway.co.kr/upload/menu/%EC%95%88%EC%B0%BD-%EB%B9%84%ED%94%84&%EB%A8%B8%EC%89%AC%EB%A3%B8_20240912031749239.png',
  },
  {
    id: 5,
    badge: 'SUBPICK',
    subBadge: '추천',
    nameKo: '스테이크 & 치즈',
    nameEn: 'Steak & Cheese',
    img: 'https://www.subway.co.kr/upload/menu/Steak-&-Cheese_20211231095455613.png',
  },
  {
    id: 6,
    badge: 'SUBPICK',
    subBadge: '추천',
    nameKo: '이탈리안 비엠티',
    nameEn: 'Italian B.M.T.™',
    img: 'https://www.subway.co.kr/upload/menu/Italian_B.M.T_20211231094910899.png',
  },
];

// ✅ 핵심: 부모로부터 isLoggedIn과 onLogout을 props로 전달받습니다.
export function MenuPage({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('샌드위치');

  const items = useMemo(() => {
    return SAMPLE_ITEMS;
  }, [activeCat]);

  return (
    <div css={s.page}>
      <header css={s.topBar}>
        <div css={s.topInner}>
          <div css={s.brandLeft}>
            <button onClick={() => navigate('/')} css={s.backBtn}>
              <ArrowLeft size={24} />
            </button>
            <div css={s.brandMark} onClick={() => navigate('/')}>
              <img src={MainLogo} alt="Logo" css={s.logoImage} />
            </div>
          </div>

          <div css={s.brandCenter} onClick={() => navigate('/')}>
            ALLWAY-<span>S</span>
          </div>

          <nav css={s.topNav}>
            {/* ✅ [해결] 로그인 상태에 따라 헤더 버튼을 조건부 렌더링합니다. */}
            {isLoggedIn ? (
              <>
                <button css={s.topNavBtn} onClick={() => navigate('/cart')}>장바구니</button>
                <button css={s.topNavBtn} onClick={() => navigate('/mypage')}>마이페이지</button>
                <button css={s.topNavBtn} onClick={onLogout}>로그아웃</button>
              </>
            ) : (
              <>
                <button 
                  css={s.topNavBtn} 
                  onClick={() => navigate('/login')}
                  aria-label="장바구니"
                >
                  <ShoppingCart size={20} />
                </button>
                <button css={s.topNavBtn} onClick={() => navigate('/login')}>로그인</button>
              </>
            )}
          </nav>
        </div>

        <div css={s.midBar}>
          <div css={s.lineWrap}>
            <div css={s.TopLine} />
          </div>

          <div css={s.midContent}>
            <h1 css={s.pageTitle}>Menu</h1>

            <div css={s.categoryTabs}>
              {CATEGORIES.map((c, idx) => (
                <React.Fragment key={c}>
                  <button
                    css={s.tabBtn(c === activeCat)}
                    onClick={() => setActiveCat(c)}
                  >
                    {c}
                  </button>
                  {idx !== CATEGORIES.length - 1 && (
                    <span css={s.tabDivider}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div css={s.lineWrap}>
            <div css={s.BottomLine} />
          </div>
        </div>
      </header>

      <main css={s.main}>
        <div css={s.grid}>
          {items.map((it) => (
            <article key={it.id} css={s.card}>
              <div className='cardOverlay' css={s.cardOverlay}>
                <button css={s.hoverBtnGreen}>
                  쉽고 빠르게,
                  <br />
                  썹픽! 한 번에 주문
                </button>
                <button css={s.hoverBtnYellow}>
                  내가 선택하는,
                  <br />
                  나만의 조합 주문
                </button>
              </div>

              <div css={s.cardInner}>
                {(it.badge || it.subBadge) && (
                  <div css={s.badgeWrap}>
                    {it.badge && (
                      <span css={s.badge(it.badge)}>{it.badge}</span>
                    )}
                    {it.subBadge && <span css={s.subBadge}>{it.subBadge}</span>}
                  </div>
                )}

                <div css={s.imageArea}>
                  <img css={s.image} src={it.img} alt={it.nameKo} />
                </div>

                <div css={s.nameArea}>
                  <div css={s.nameKo}>{it.nameKo}</div>
                  <div css={s.nameEn}>{it.nameEn}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MenuPage;