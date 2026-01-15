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
    badge: 'NEW',
    nameKo: '랍스터&쉬림프',
    nameEn: 'Lobster & Shrimp',
    img: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
  },
];

export function MenuPage() {

  const [category, setCategory] = useState();
  const [activeCat, setActiveCat] = useState('샌드위치');
  const navigate = useNavigate();

  const categories = [
    {id: '샌드위치', name: '샌드위치'},
    {id: '샐러드', name: '샐러드'},
    {id: '랩', name: '랩'},
  ]

  const items = useMemo(() => {
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
              <div className='cardOverlay' css={s.cardOverlay}>
                <button css={s.hoverBtnGreen}>
                  쉽고 빠르게,
                  <br />
                  썹픽! 한 번에 주문
                </button>
                <button css={s.hoverBtnYellow} onClick={() => navigate('/order')}>
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