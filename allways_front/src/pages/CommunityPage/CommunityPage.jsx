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

      // ⭐ 여기서 찍어보는 로그가 가장 중요합니다!
      console.log("토큰 내부 실제 데이터:", decoded);


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
        base: item.itemName || '서브웨이 샌드위치',
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



  // ⭐ [수정] 프리셋 저장 함수
  const handleSavePreset = async (e, item) => {
    e.stopPropagation();

  // ⭐ 확인용: 함수 진입 직후에 바로 찍어보기
  console.log("함수 진입 성공! 클릭한 아이템:", item);

  // 1. 토큰 가져오기 (비어있어도 일단 진행하여 백엔드 판단에 맡김)
  const token = localStorage.getItem("accessToken")?.replace(/['"]+/g, '').trim();
  
  // ⭐ [여기서 정의!] 서버 DTO(PresetScrapReqDto) 규격에 맞게 객체를 생성합니다.
    const requestData = {
      userId: Number(userId),                      // 토큰에서 추출한 진현님의 ID
      productId: Number(item.productId) || 1,      // 게시글의 상품 ID
      presetName: `${item.title} (by ${item.author})` // 원본 정보를 포함한 이름
    };

    // 3. ⭐ 이제 주석을 풀어도 에러가 나지 않습니다!
    console.log("추출된 userId:", userId); 
    console.log("전송될 데이터(requestData):", requestData);
  
    // 2. 중복 체크 (이미 저장된 경우 차단)
  const isDuplicate = myPresets.some(preset => 
  Number(preset.productId) === Number(item.productId));

  if (isDuplicate) {
    alert(`이미 보관함에 동일한 구성(상품 ID: ${item.productId})의 레시피가 존재합니다.`);
    return; // 서버로 전송하지 않고 여기서 종료
  }


    try {
    const requestData = {
      productId: Number(item.productId) || 1, 
      userId: Number(userId), // 현재 로그인한 '진현님'의 ID
      // ⭐ 원본 작성자의 이름을 포함하여 저장 (원본 데이터 보존)
      presetName: `${item.title} (by ${item.author})` 
    };

    const response = await axios.post(
      'http://localhost:8080/api/preset/scrap',
      requestData,
      {
        // ⭐ 토큰이 있을 때만 헤더를 넣고, 없으면 빈 객체로 보냄 (의존도 감소)
        headers: token ? { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } : { 'Content-Type': 'application/json' }
      }
    );
      
    if (response.status === 200 || response.status === 201) {
      alert('내 프리셋에 성공적으로 저장되었습니다!');
      setOpen(false);
      fetchMyPresets(); 
    }
      } catch (error) {
        console.error("저장 실패:", error.response);
        
        // ⭐ [수정] 백엔드에서 보내준 상세 에러 메시지(message)가 있는지 먼저 확인합니다.
        const serverErrorMessage = error.response?.data?.message || error.response?.data;
        
        let userFriendlyMessage = "";

        if (error.response?.status === 401) {
          userFriendlyMessage = "인증 세션이 만료되었습니다. 다시 로그인해주세요.";
        } else if (serverErrorMessage) {
          // 백엔드에서 보낸 "이미 동일한 상품 구성의..." 메시지를 여기서 출력!
          userFriendlyMessage = serverErrorMessage; 
        } else {
          userFriendlyMessage = "저장 중 오류가 발생했습니다.";
        }

        alert(userFriendlyMessage);
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