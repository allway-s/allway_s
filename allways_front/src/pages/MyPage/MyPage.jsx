/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPage.styles.js';

export const MyPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '진현';

  return (
    <div css={S.container}>
      {/* 상단 헤더 */}
      <header css={S.header}>
        <div css={S.logo} onClick={() => navigate('/')}>
          ALLWAY-<span>S</span>
        </div>
        <nav css={S.nav}>
          <span onClick={() => navigate('/cart')}>장바구니</span>
          {/* 현재 페이지임을 나타내기 위해 마이페이지 텍스트 클릭 시 상단으로 이동하거나 유지 */}
          <span style={{ color: '#009223', cursor: 'pointer' }}>마이페이지</span>
          <span onClick={() => { 
            if(window.confirm("로그아웃 하시겠습니까?")) { 
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('userName');
              navigate('/'); 
            }
          }}>로그아웃</span>
        </nav>
      </header>

      <main css={S.main}>
        <h1 css={S.title}>My <span>Page</span></h1>

        {/* 1. 프로필 섹션 */}
        <section css={S.section}>
          <h3 css={S.sectionTitle}>프로필</h3>
          <div css={S.card}>
            <div css={S.profileInner}>
              <div css={S.avatarCircle}>S</div>
              <div css={S.infoList}>
                <p><strong>닉네임</strong> {userName}123</p>
                <p><strong>이름</strong> {userName}</p>
                <p><strong>이메일</strong> {userName}@example.com</p>
                <p><strong>주소</strong> 부산광역시 수영구 ...</p>
                <p><strong>연락처</strong> 010-1234-5678</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 프리셋 섹션 - 클릭 이벤트 연결 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>프리셋</h3>
            {/* '프리셋 관리 >' 클릭 시 세부 페이지로 이동 */}
            <span 
              css={S.moreLink} 
              onClick={() => navigate('/mypreset')} 
              style={{ cursor: 'pointer' }}
            >
              프리셋 관리 ＞
            </span>
          </div>
          <div css={S.presetGrid}>
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                css={S.presetCard} 
                onClick={() => navigate('/mypreset')} // 카드 자체를 눌러도 이동
                style={{ cursor: 'pointer' }}
              >
                <div css={S.imgBox}>샌드위치 이미지</div>
                <p style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>새우를 극상으로</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>작성자 : {userName}</p>
                {/* 주문하기 버튼은 이동하지 않고 주문 로직을 태우고 싶다면 stopPropagation이 필요할 수 있습니다 */}
                <button css={S.orderBtn} onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
                  alert('주문 페이지로 이동합니다.');
                }}>주문하기</button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 주문내역 섹션 */}
        <section css={S.section}>
          <div css={S.sectionHeader}>
            <h3 css={S.sectionTitle}>주문내역</h3>
            {/* 클릭 시 주문 내역 페이지로 이동 */}
            <span 
              css={S.moreLink} 
              onClick={() => navigate('/recent-order')}
              style={{ cursor: 'pointer' }}
            >
              최근 주문 내역 ＞
            </span>
          </div>
          <div css={S.card}>
            {[1, 2].map((i) => (
              <div key={i} css={S.orderItem}>
                <span style={{ fontWeight: 'bold' }}>스테이크 & 치즈</span>
                <span css={S.orderText}>위트 / 아메리칸 치즈 / 양파, 피망, 양상추 / 랜치, 마요 ...</span>
                <span style={{ fontWeight: 'bold' }}>183,000원</span>
                <button css={S.detailBtn}>상세 주문 내역 ＞</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPage;