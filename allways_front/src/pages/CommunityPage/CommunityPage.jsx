/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { s } from './CommunityPage.styles';
import axios from 'axios';

// 1. 날짜 변환 헬퍼 함수
const toTime = (v) => {
  if (!v) return 0;
  return new Date(v).getTime();
};

// 2. 재료 표시 헬퍼 함수
const formatPick = (label, value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return `${label}: 선택 안함`;
  const text = Array.isArray(value) ? value.join(', ') : value;
  return `${label}: ${text}`;
};

function CommunityPage() {
  const navigate = useNavigate();

  // ⭐ [추가] 토큰에서 userId를 추출하는 함수 (MyPreset과 동일하게 유지)
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const decoded = JSON.parse(jsonPayload);
      return decoded.userId || decoded.id || decoded.sub;
    } catch (e) { return null; }
  };

  // ⭐ [추가] 추출한 userId를 변수에 담습니다.
  const userId = getUserIdFromToken();
  
  // --- [State 관리] ---
  const [posts, setPosts] = useState([]); 
  const [sort, setSort] = useState('latest'); 
  const [open, setOpen] = useState(false); 
  const [selectedId, setSelectedId] = useState(null); 
  const [likes, setLikes] = useState({}); 
  
  // 프리셋 중복 확인절차
  const [myPresets, setMyPresets] = useState([]);

  // ⭐ [수정] 모달이 열렸을 때 뒷배경 스크롤을 방지하여 "가만히 있게" 만듭니다.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);


  // ⭐ [추가] 내 프리셋 목록을 서버에서 가져오는 함수입니다.
  const fetchMyPresets = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/preset/list/${userId}`);
      setMyPresets(response.data || []);
    } catch (error) {
      console.error("내 프리셋 로드 실패:", error);
    }
  };

  // 1. 서버 데이터 호출
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/post/getAllPost');
      const data = response.data || [];
      console.log("서버 원본 데이터:", data);
      setPosts(data);

      const initLikes = {};
      data.forEach(item => {
        initLikes[item.postId] = { liked: false, count: item.likeCnt || 0 };
      });
      setLikes(initLikes);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  // ⭐ [수정] 페이지 로드 시 포스트와 내 프리셋 목록을 모두 가져옵니다.
  useEffect(() => { 
    fetchPosts(); 
    fetchMyPresets();
  }, []);

  // 2. 가공 로직
  const displayItems = useMemo(() => {
    return posts.map(item => {
      const ingredients = item.ingredientNames || []; 
      
      return {
        id: item.postId,
        presetId: item.presetId,
        productId: item.productId, // ⭐ 이 필드가 서버 응답에 있는지 확인 후 추가하세요!
        title: item.presetName || '맛있는 레시피',
        author: item.nickname || '익명님',
        base: item.presetName || '서브웨이 샌드위치',
        allIngredients: ingredients.length > 0 ? ingredients.join(', ') : '선택 안함',
        
        // ⭐ [수정] 모달 상세 정보 출력을 위해 재료 데이터들을 분리하여 매핑합니다.
        veggies: ingredients.filter(name => !name.includes('브레드') && !name.includes('치즈')),
        bread: ingredients.find(name => name.includes('브레드')) || '선택 안함',
        cheese: ingredients.find(name => name.includes('치즈')) || '선택 안함',
        sauce: [], // 필요 시 필터링 로직 추가
        
        imgUrl: item.imgUrl || 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
        createdAt: item.postedAt || '',
        likeCount: item.likeCnt || 0
      };
    });
  }, [posts]);


  // ⭐ [수정] 프리셋 저장 함수: 이벤트 객체(e)를 받아 전파를 막고, 실제 API를 호출합니다.
    const handleSavePreset = async (e, item) => {
      e.stopPropagation();

    // 1. 토큰 체크
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
      return;
    }

    // ⭐ [수정] productId가 아닌 presetId를 기준으로 중복을 체크합니다.
    const isDuplicate = myPresets.some(preset => preset.presetId === item.presetId);

    if (isDuplicate) {
      alert("이미 내 프리셋에 저장된 레시피입니다.");
      return; // 중복이면 여기서 함수를 종료하여 요청을 보내지 않습니다.
    }

    // 데이터 확인용 로그
    console.log("저장 시도 아이템 상세:", item);

    try {
      // 스웨거(image_9b99f8.png)에 정의된 Request Body 구조
      const requestData = {
        productId: Number(item.productId) || 1, // 스웨거 예시의 productId (기존 item에 productId가 있어야 함)
        userId: Number(userId),                      // 진현님의 user_id (image_9c95b7.png 확인)
        presetName: item.title          // 저장될 프리셋 이름
      };

      const response = await axios.post(
        'http://localhost:8080/api/preset/scrap', // ⭐ 주소 수정
        requestData,
        {
          headers: { 
            'Authorization': `Bearer ${token.trim()}`,
            'Content-Type': 'application/json'
          } // ⭐ 헤더에 토큰 추가
        }
      );
      
    // 서버 응답 메시지: "프리셋이 저장되었습니다." (image_9b9996.png)
    if (response.status === 200 || response.status === 201) {
        alert(response.data || '성공적으로 내 프리셋에 저장되었습니다!');
        setOpen(false);
        // ⭐ [갱신] 저장 성공 후 목록을 다시 불러와서 즉시 중복 체크에 반영합니다.
        fetchMyPresets();
      }
    } catch (error) {
      // 서버가 보내주는 에러 메시지를 직접 확인합니다.
      console.error("서버 응답 에러:", error.response);
      const serverMessage = error.response?.data?.message || error.response?.data || "저장 중 오류가 발생했습니다.";
      alert(`실패: ${serverMessage}`);
    }
  };

  // 3. 정렬 로직
  const sortedItems = useMemo(() => {
    const copied = [...displayItems];
    if (sort === 'latest') {
      copied.sort((a, b) => new Date(b.createdAt.replace(' ', 'T')) - new Date(a.createdAt.replace(' ', 'T')));
    } else {
      copied.sort((a, b) => (likes[b.id]?.count || 0) - (likes[a.id]?.count || 0));
    }
    return copied; // reverse()는 정렬 로직에 따라 선택
  }, [displayItems, sort, likes]);


  // 4. 모달 표시 상세 데이터
  const selected = useMemo(
    () => displayItems.find((x) => x.id === selectedId) || null,
    [selectedId, displayItems]
  );

  // 5. 좋아요 토글
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
                    // ⭐ [중요] 페이지 이동 없이 상태만 변경하여 모달을 띄웁니다.
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

      {/* 모달 영역 */}
      {open && selected && (
        <div css={s.modalOverlay} onClick={() => setOpen(false)}>
          <div css={s.modalBody} onClick={(e) => e.stopPropagation()}>
            <button css={s.modalClose} onClick={() => setOpen(false)}>×</button>

            <div css={s.menuCard}>
              {/* ⭐ [수정] '내 프리셋에 저장하기' 버튼에 클릭 이벤트 핸들러를 연결했습니다. */}
              <button 
                css={s.saveBtn} 
                onClick={(e) => handleSavePreset(e, selected)}
              >
                내 프리셋에 저장하기
              </button>
              
              <img css={s.img} src={selected.imgUrl} alt={selected.title} />
              <h2 css={s.modalTitle}>{selected.title}</h2>

              <div css={s.meta}>
                <div><span>작성자 :</span> {selected.author}</div>
                <div><span>베이스 :</span> {selected.base}</div>
                {/* ⭐ [수정] 분리된 데이터를 출력하도록 보강되었습니다. */}
                <div><span>빵 :</span> {selected.bread}</div>
                <div><span>치즈 :</span> {selected.cheese}</div>
                <div><span>야채 :</span> {Array.isArray(selected.veggies) ? selected.veggies.join(', ') : '선택 안함'}</div>
                <div><span>소스 :</span> {selected.sauce && selected.sauce.length ? selected.sauce.join(', ') : '선택 안함'}</div>
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