/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { s } from './MenuPage.styles.js';
import MainLogo from '../../assets/images/MainUpperImages/MainLogo2.png';

const CATEGORIES = ['샌드위치', '샐러드', '랩&기타'];

const CATEGORY_PATH = {
  샌드위치: 'sandwich',
  샐러드: 'salad',
  '랩&기타': 'wrap',
};
const SAMPLE_ITEMS = [
  {
    id: 1,
    badge: '',
    nameKo: '스테이크 & 치즈 아보카도 랩',
    nameEn: 'Steak & Cheese Avocado Wrap',
    img: 'https://www.subway.co.kr/upload/menu/steak_n_cheese_avocado_wrap_20210315105638140.jpg',
  },
  {
    id: 2,
    badge: '',
    nameKo: '쉬림프 에그마요 랩',
    nameEn: 'Shrimp Egg Mayo Wrap',
    img: 'https://www.subway.co.kr/upload/menu/shrimp_egg_mayo_wrap_20210315105650669.jpg',
  },
  {
    id: 3,
    badge: '',
    nameKo: '치킨 베이컨 미니 랩',
    nameEn: 'Chicken Bacon Mini Wrap',
    img: 'https://www.subway.co.kr/upload/menu/chicken_bacon_mini_wrap_20210315105919945.jpg',
  },
];

export function MenuPage() {
  const [activeCat, setActiveCat] = useState('랩&기타');
  const navigate = useNavigate();

  const items = useMemo(() => {
    // 실제론 activeCat에 따라 필터링
    return SAMPLE_ITEMS;
  }, [activeCat]);

  return (
    <div css={s.page}>
      {/* 1) Top bar */}

      {/* <header css={s.topBar}>
        <div css={s.topInner}>
          <div css={s.brandLeft}>
            <div className='logo-section' onClick={() => navigate('/')}>
              <img src={MainLogo} alt='Logo' />
            </div>
          </div>

          <div
            css={s.brandCenter}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <h2
              style={{
                color: '#009223',
                fontWeight: 900,
                margin: 0,
                fontSize: '1.5rem',
              }}
            >
              ALLWAY<span style={{ color: '#000000' }}>-</span>
              <span style={{ color: '#ffc107' }}>S</span>
            </h2>
          </div>

          <nav css={s.topNav}>
            <button onClick={() => navigate('/cart')} css={s.topNavBtn}>
              장바구니
            </button>
            <button onClick={() => navigate('/mypage')} css={s.topNavBtn}>
              마이페이지
            </button>
            <button onClick={() => navigate('/')} css={s.topNavBtn}>
              로그아웃
            </button>
          </nav>
        </div> */}

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
                    onClick={() => {
                      setActiveCat(c);
                      navigate(`/menu/${CATEGORY_PATH[c]}`);
                    }}
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

      {/* </header> */}

      {/* 3) Grid */}
      <main css={s.main}>
        <div css={s.grid}>
          {items.map((it) => (
            <article key={it.id} css={s.card}>
              {/* ✅ 회색까지 덮는 overlay */}
              <div className='cardOverlay' css={s.cardOverlay}>
                <button css={s.hoverBtnYellow}>주문하기</button>
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