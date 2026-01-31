/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { s } from './CommunityPageStyles.js';
import { getPosts,savePreset,toggleLike } from '../../apis/items/communityApi';

// 빵, 치즈
const pickOne = (ingredients, cid) =>
  ingredients?.find((x) => x.categoryId === cid)?.ingredientName ??
  '선택안함';

// 야채, 소스
const pickMany = (ingredients, cid) =>
  ingredients
    ?.filter((x) => x.categoryId === cid)
    .map((x) => x.ingredientName)
    .join(', ') ?? '선택안함';

const formatDate = (iso) => (iso ? String(iso).slice(0, 10) : '');
const toTime = (v) => (v ? new Date(v).getTime() : 0);

/** 토큰에서 userId 꺼내기 */
const getUserIdFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
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

  // 인기순, 최신순 정렬
  const [sort, setSort] = useState('like');

  // 모달
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const userId = useMemo(() => getUserIdFromToken(), []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts(userId);

      setPosts(res?.data ?? []);
      console.log('posts:', res?.data);
    } catch (e) {
      console.error('getAllPost error:', e);
      console.error('status:', e?.response?.status);
      console.error('data:', e?.response?.data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onClickLike = async (e, postId) => {
    e.stopPropagation();
    try {
      await toggleLike(postId, userId);
      await fetchPosts();
    } catch (err) {
      console.error('좋아요 실패', err);
    }
  };
  
  const onClickSave = async (postId) => {
    try {
      await savePreset(postId, userId);
      navigate('/mypreset');
    } catch (err) {
      console.log('저장 실패', err)
    }
  };

  /** ---------------------------
   * selected + sorting
  ----------------------------*/

  const sortedItems = useMemo(() => {
    const copied = [...posts];

    if (sort === 'latest') {
      copied.sort((a, b) => toTime(b.postedAt) - toTime(a.postedAt));
      return copied;
    }

    copied.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0));
    return copied;
  }, [sort, posts]);

    const selected = useMemo(
    () => posts.find((x) => x.postId === selectedId) || null,
    [posts, selectedId],
  );
  /* ESC로 모달 닫기 */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div css={s.page}>
      <div css={s.container}>
        {/* 상단 컨트롤 */}
        <div css={s.controlsRow}>
          <select
            css={s.sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value='like'>인기순</option>
            <option value='latest'>최신순</option>
          </select>
          <button
            type='button'
            css={s.addBtn}
            onClick={() => navigate('/mypreset')}
          >
            나의 recipe 추가하기
          </button>
        </div>

        {/* 리스트 */}
        <div css={s.feedList}>
          {sortedItems.map((item) => (
            <div
              key={item.postId}
              css={s.feedItem}
              onClick={() => {
                setSelectedId(item.postId);
                setOpen(true);
              }}
            >
              <img css={s.thumb} src={item.imgUrl} alt={item.presetName} />

              <div css={s.textArea}>
                <div css={s.topRow}>
                  <h3 css={s.feedTitle}>{item.presetName}</h3>
                  <p css={s.feedBase}>{item.itemName ?? '베이스 없음'}</p>
                </div>

                <div css={s.subRow}>
                  {item.nickname ?? '작성자'} {formatDate(item.postedAt)}
                </div>

                <div css={s.desc}>
                  빵: {pickOne(item.ingredients, 4)} · 치즈:{' '}
                  {pickOne(item.ingredients, 5)} · 야채:{' '}
                  {pickMany(item.ingredients, 6)} · 소스:{' '}
                  {pickMany(item.ingredients, 7)}
                </div>
              </div>

              {/* 좋아요 */}
              <div css={s.likeBox} onClick={(e) => e.stopPropagation()}>
                <button
                  type='button'
                  css={s.likeBtn}
                  aria-label='좋아요'
                  onClick={(e) => onClickLike(e, item.postId)}
                >
                  {/* ✅ 여기서 item.liked로 fill 처리 */}
                  <Heart
                    css={s.heartMini}
                    fill={item.liked ? '#ff4d4f' : 'none'}
                    // 테두리
                    stroke={item.liked ? '#ff4d4f' : 'currentColor'}
                  />
                </button>
                <span css={s.countMini}>{item.likeCount ?? 0}</span>
              </div>
            </div>
          ))}

          {!sortedItems.length && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              아직 게시글이 없어요.
            </div>
          )}
        </div>
      </div>

      {/* 모달 */}
      {open && selected && (
        <div
          css={s.modalOverlay}
          onClick={() => {
            setOpen(false);
            setSelectedId(null);
          }}
        >
          <div css={s.modalBody} onClick={(e) => e.stopPropagation()}>
            <button
              css={s.modalClose}
              onClick={() => {
                setOpen(false);
                setSelectedId(null);
              }}
              aria-label='닫기'
            >
              ×
            </button>

            <div css={s.menuCard}>
              {userId !== selected.userId && (
                <button css={s.saveBtn} onClick={() => onClickSave(selected.postId)}>내 프리셋에 저장하기</button>
              )}
              <img
                css={s.img}
                src={selected.imgUrl}
                alt={selected.presetName}
              />
              <h2 css={s.modalTitle}>{selected.presetName}</h2>

              <div css={s.meta}>
                <div>
                  <span>작성자 :</span> {selected.nickname ?? '작성자'}
                </div>
                <div>
                  <span>베이스 :</span> {selected.itemName ?? '선택 안함'}
                </div>
                <div>
                  <span>빵 :</span> {pickOne(selected.ingredients, 4)}
                </div>
                <div>
                  <span>치즈 :</span> {pickOne(selected.ingredients, 5)}
                </div>
                <div>
                  <span>야채 :</span> {pickMany(selected.ingredients, 6)}
                </div>
                <div>
                  <span>소스 :</span> {pickMany(selected.ingredients, 7)}
                </div>
              </div>

              <div css={s.modalLike}>
                <button
                  type='button'
                  css={s.likeBtn}
                  aria-label='좋아요'
                  onClick={(e) => onClickLike(e, selected.postId)}
                >
                  <Heart
                    css={s.heart}
                    fill={selected.liked ? '#ff4d4f' : 'none'}
                    // 테두리
                    stroke={selected.liked ? '#ff4d4f' : 'currentColor'}
                  />
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
