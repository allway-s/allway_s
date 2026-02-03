/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { s } from './CommunityPageStyles.js';
import { getPosts, savePreset, toggleLike, getMyPresets, deletePost } from '../../apis/items/communityApi';

// 헬퍼 함수들
const pickOne = (ingredients, cid) => ingredients?.find((x) => x.categoryId === cid)?.ingredientName ?? '선택안함';
const pickMany = (ingredients, cid) => ingredients?.filter((x) => x.categoryId === cid).map((x) => x.ingredientName).join(', ') || '선택안함';
const formatDate = (iso) => (iso ? String(iso).slice(0, 10) : '');
const toTime = (v) => (v ? new Date(v).getTime() : 0);

/** 토큰에서 userId 꺼내기 */
const getUserIdFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    const decoded = JSON.parse(jsonPayload);
    return decoded.userId ?? null;
  } catch (e) {
    console.error('토큰 파싱 실패', e);
    return null;
  }
};

export default function CommunityPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('like');
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const userId = useMemo(() => getUserIdFromToken(), []);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await getPosts(userId);
      setPosts(res?.data ?? []);
    } catch (e) {
      console.error('게시글 로드 실패:', e);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onClickLike = async (e, postId) => {
    e.stopPropagation();
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      await toggleLike(postId, userId);
      await fetchPosts();
    } catch (err) {
      console.error('좋아요 실패', err);
    }
  };

  const onClickSave = async (selectedPost) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    try {
      const myPresetsRes = await getMyPresets(userId); 
      const myPresets = myPresetsRes.data || [];

      const isAlreadySaved = myPresets.some(p => 
        Number(p.productId) === Number(selectedPost.productId)
      );

      if (isAlreadySaved) {
        alert("이미 내 프리셋에 등록된 레시피입니다.");
        return;
      }

      if (!window.confirm(`'${selectedPost.presetName}' 레시피를 내 프리셋에 저장하시겠습니까?`)) return;

      await savePreset(selectedPost.postId, userId); 
      
      alert("성공적으로 저장되었습니다.");
      navigate('/mypreset');
    } catch (err) {
      console.error('저장 실패 상세:', err);
      if (err.response?.status === 401) {
        alert("인증 정보가 유효하지 않습니다. 다시 로그인해주세요.");
        navigate('/login');
      } else {
        alert("저장 중 오류가 발생했습니다. 네트워크 탭을 확인해주세요.");
      }
    }
  };

  const sortedItems = useMemo(() => {
    const copied = [...posts];
    if (sort === 'latest') {
      return copied.sort((a, b) => toTime(b.postedAt) - toTime(a.postedAt));
    }
    return copied.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
  }, [sort, posts]);

  // ✅ [충돌 해결 부분]: 지저분한 표식들을 지우고 하나로 정리했습니다.
  const selected = useMemo(
    () => posts.find((x) => x.postId === selectedId) || null,
    [posts, selectedId]
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);
  
    const onClickDelete = async (postId) => {
    try {
      await deletePost(postId, userId);
    } catch (err) {
      console.log('삭제 실패', err);
    }
  };
  return (
    <div css={s.page}>
      <div css={s.container}>
        <div css={s.controlsRow}>
          <select css={s.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='like'>인기순</option>
            <option value='latest'>최신순</option>
          </select>
          <button type='button' css={s.addBtn} onClick={() => navigate('/mypreset')}>
            나의 recipe 추가하기
          </button>
        </div>

        <div css={s.feedList}>
          {sortedItems.map((item) => (
            <div key={item.postId} css={s.feedItem} onClick={() => { setSelectedId(item.postId); setOpen(true); }}>
              <img css={s.thumb} src={item.imgUrl} alt={item.presetName} />
              <div css={s.textArea}>
                <div css={s.topRow}>
                  <h3 css={s.feedTitle}>{item.presetName}</h3>
                  <p css={s.feedBase}>{item.itemName ?? '베이스 없음'}</p>
                </div>
                <div css={s.subRow}>{item.nickname ?? '작성자'} {formatDate(item.postedAt)}</div>
                <div css={s.desc}>
                  빵: {pickOne(item.ingredients, 4)} · 치즈: {pickOne(item.ingredients, 5)} · 
                  야채: {pickMany(item.ingredients, 6)} · 소스: {pickMany(item.ingredients, 7)}
                </div>
              </div>
              <div css={s.likeBox} onClick={(e) => e.stopPropagation()}>
                <button type='button' css={s.likeBtn} onClick={(e) => onClickLike(e, item.postId)}>
                  <Heart css={s.heartMini} fill={item.liked ? '#ff4d4f' : 'none'} stroke={item.liked ? '#ff4d4f' : 'currentColor'} />
                </button>
                <span css={s.countMini}>{item.likeCount ?? 0}</span>
              </div>
            </div>
          ))}
          {!sortedItems.length && <div style={{ padding: 24, textAlign: 'center' }}>아직 게시글이 없어요.</div>}
        </div>
      </div>

      {open && selected && (
        <div css={s.modalOverlay} onClick={() => { setOpen(false); setSelectedId(null); }}>
          <div css={s.modalBody} onClick={(e) => e.stopPropagation()}>
            <button css={s.modalClose} onClick={() => { setOpen(false); setSelectedId(null); }}>×</button>
            <div css={s.menuCard}>
              {/* ✅ 본인이 쓴 글이 아닐 때만 저장 버튼 노출 */}
                {userId !== selected.userId ? (
                <button
                  css={s.saveBtn}
                  onClick={() => onClickSave(selected.postId)}
                >
                  내 프리셋에 저장하기
                </button>
              ) : (
                <button
                  css={s.saveBtn}
                  onClick={() => onClickDelete(selected.postId)}
                >
                  게시글 삭제
                </button>
              )}
              
              <img css={s.img} src={selected.imgUrl} alt={selected.presetName} />
              <h2 css={s.modalTitle}>{selected.presetName}</h2>
              <div css={s.meta}>
                <div><span>작성자 :</span> {selected.nickname ?? '작성자'}</div>
                <div><span>베이스 :</span> {selected.itemName ?? '선택 안함'}</div>
                <div><span>빵 :</span> {pickOne(selected.ingredients, 4)}</div>
                <div><span>치즈 :</span> {pickOne(selected.ingredients, 5)}</div>
                <div><span>야채 :</span> {pickMany(selected.ingredients, 6)}</div>
                <div><span>소스 :</span> {pickMany(selected.ingredients, 7)}</div>
              </div>
              <div css={s.modalLike}>
                <button type='button' css={s.likeBtn} onClick={(e) => onClickLike(e, selected.postId)}>
                  <Heart css={s.heart} fill={selected.liked ? '#ff4d4f' : 'none'} stroke={selected.liked ? '#ff4d4f' : 'currentColor'} />
                </button>
                <span css={s.count}>{selected.likeCount ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
