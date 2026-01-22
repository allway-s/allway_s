/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { s } from './CommunityPage.styles';
import axios from 'axios';


// 1. [수정] 날짜 변환 헬퍼 함수: 서버의 다양한 날짜 형식을 대응합니다.
const toTime = (v) => {
  if (!v) return 0;
  return new Date(v).getTime();
};


// 2. [수정] 재료 표시 헬퍼 함수: 데이터가 없을 경우 '선택 안함'으로 깔끔하게 처리합니다.
const formatPick = (label, value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return `${label}: 선택 안함`;
  const text = Array.isArray(value) ? value.join(', ') : value;
  return `${label}: ${text}`;
};

function CommunityPage() {
  
  const navigate = useNavigate();
  // --- [State 관리] ---
  const [posts, setPosts] = useState([]); // 서버에서 받아온 원본 포스트 목록
  const [sort, setSort] = useState('latest'); // [수정] 9번 확인을 위해 기본값을 '최신순'으로 변경
  const [open, setOpen] = useState(false); // 모달 오픈 여부
  const [selectedId, setSelectedId] = useState(null); // 선택된 포스트 ID
  const [likes, setLikes] = useState({}); // 좋아요 상태 로컬 관리 { postId: { liked: false, count: 0 } }



// 1. 서버 데이터 호출
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/post/getAllPost');
      const data = response.data || [];
      console.log("서버 원본 데이터:", data); // 브라우저 콘솔에서 9번이 있는지 꼭 확인하세요!
      setPosts(data);

      const initLikes = {};
      data.forEach(item => {
        // [주의] 서버 필드명인 postId를 정확히 매핑해야 합니다.
        initLikes[item.postId] = { liked: false, count: item.likeCnt || 0 };
      });
      setLikes(initLikes);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // 2. 가공 로직 (데이터가 불완전해도 9번까지 띄우는 핵심)
  const displayItems = useMemo(() => {
    return posts.map(item => {
      // 서버 JSON 응답(image_9d0a2f.png) 구조에 맞춤
      const ingredients = item.ingredientNames || []; 
      
      return {
        id: item.postId,
        title: item.presetName || '맛있는 레시피',
        author: item.nickname || '익명님',
        base: item.presetName || '서브웨이 샌드위치',
        // 핵심: 개별 재료가 아닌 전체 재료 리스트를 하나의 문자열로 만듭니다.
        allIngredients: ingredients.length > 0 ? ingredients.join(', ') : '선택 안함',
        imgUrl: item.imgUrl || 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
        createdAt: item.postedAt || '',
        likeCount: item.likeCnt || 0
      };
    });
  }, [posts]);

  // 3. 정렬 로직 (displayItems 기반)
  const sortedItems = useMemo(() => {
    const copied = [...displayItems];
    if (sort === 'latest') {
      // 최신 날짜순 정렬 (9번이 맨 위로 오게 함)
      copied.sort((a, b) => new Date(b.createdAt.replace(' ', 'T')) - new Date(a.createdAt.replace(' ', 'T')));
    } else {
      copied.sort((a, b) => (likes[b.id]?.count || 0) - (likes[a.id]?.count || 0));
    }
    return copied.reverse(); // 최신순 정렬을 위해 reverse() 추가
  }, [displayItems, sort, likes]);

  // 6. [선택] 모달에 표시할 상세 데이터
  const selected = useMemo(
    () => displayItems.find((x) => x.id === selectedId) || null,
    [selectedId, displayItems]
  );

  // 7. [좋아요] 로컬 하트 토글 로직 (나중에 API 연결 필요)
  const toggleLike = (id) => {
    setLikes((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      const liked = !cur.liked;
      const count = liked ? cur.count + 1 : Math.max(0, cur.count - 1);
      return { ...prev, [id]: { liked, count } };
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);


return (
    <div css={s.page}>
      <div css={s.container}>
        <div css={s.controlsRow}>
          <select css={s.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="like">좋아요순</option>
            <option value="latest">최신순</option>
          </select>

          <button type="button" css={s.addBtn} onClick={() => navigate('/community/write')}>
            나의 recipe 추가하기
          </button>
        </div>

        <div css={s.feedList}>
          {sortedItems.length === 0 ? (
             <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>공유된 레시피가 없습니다. 첫 번째 주인공이 되어보세요!</div>
          ) : (
            sortedItems.map((item) => {
              const likeState = likes[item.id] ?? { liked: false, count: item.likeCount };

              return (
                <div
                  key={item.id}
                  css={s.feedItem}
                  onClick={() => {
                    setSelectedId(item.id);
                    setOpen(true);
                  }}
                >
                  <img css={s.thumb} src={item.imgUrl} alt={item.title} />

                  <div css={s.textArea}>
                    <div css={s.topRow}>
                      <h3 css={s.feedTitle}>{item.title}</h3>
                      <p css={s.feedBase}>{item.base}</p>
                    </div>

                    <div css={s.subRow}>
                      {item.author} · {item.createdAt}
                    </div>

                    <div css={s.desc}>
                      추천 조합: {item.allIngredients}
                    </div>
                  </div>

                  <div css={s.likeBox} onClick={(e) => e.stopPropagation()}>
                    <button type="button" css={s.likeBtn} onClick={() => toggleLike(item.id)}>
                      <Heart css={s.heartMini} fill={likeState.liked ? 'currentColor' : 'none'} />
                    </button>
                    <span css={s.countMini}>{likeState.count}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 모달 영역 - 데이터 바인딩 */}
      {open && selected && (
        <div css={s.modalOverlay} onClick={() => setOpen(false)}>
          <div css={s.modalBody} onClick={(e) => e.stopPropagation()}>
            <button css={s.modalClose} onClick={() => setOpen(false)}>×</button>

            <div css={s.menuCard}>
              <button css={s.saveBtn}>내 프리셋에 저장하기</button>
              <img css={s.img} src={selected.imgUrl} alt={selected.title} />
              <h2 css={s.modalTitle}>{selected.title}</h2>

              <div css={s.meta}>
                <div><span>작성자 :</span> {selected.author}</div>
                <div><span>베이스 :</span> {selected.base}</div>
                <div><span>빵 :</span> {selected.bread || '선택 안함'}</div>
                <div><span>치즈 :</span> {selected.cheese || '선택 안함'}</div>
                <div><span>야채 :</span> {selected.veggies.length ? selected.veggies.join(', ') : '선택 안함'}</div>
                <div><span>소스 :</span> {selected.sauce.length ? selected.sauce.join(', ') : '선택 안함'}</div>
              </div>

              <div css={s.modalLike}>
                <button type="button" css={s.likeBtn} onClick={() => toggleLike(selected.id)}>
                  <Heart css={s.heart} fill={likes[selected.id]?.liked ? 'currentColor' : 'none'} />
                </button>
                <span css={s.count}>{likes[selected.id]?.count}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPage;