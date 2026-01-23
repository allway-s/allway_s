/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { s } from './CommunityPage.styles';
import { getAllPost, postLike } from '../../apis/communityPosts/postApi';

const pickOne = (ingredients, cid) =>
  ingredients?.find((x) => x.ingredientCategoryId === cid)?.ingredientName ??
  '선택안함';

const pickMany = (ingredients, cid) =>
  ingredients
    ?.filter((x) => x.ingredientCategoryId === cid)
    .map((x) => x.ingredientName)
    .join(', ') ?? '선택안함';

// ✅ 날짜 표시 (2026-01-20T15:43:28 -> 2026-01-20)
const formatDate = (iso) => (iso ? String(iso).slice(0, 10) : '');

const toTime = (v) => (v ? new Date(v).getTime() : 0);

function CommunityPage() {
  const navigate = useNavigate();

  // ✅ DB posts
  const [posts, setPosts] = useState([]);

  // 정렬 상태
  const [sort, setSort] = useState('like');

  // 모달
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      const decoded = JSON.parse(jsonPayload);
      console.log('토큰 내부 실제 데이터:', decoded);

      return decoded.userId || decoded.id || decoded.sub;
    } catch (e) {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPost();
        setPosts(res.data ?? []);
        console.log('posts:', res.data);
      } catch (e) {
        console.error('getAllPost error:', e);
      }
    })();
  }, []);

  const onClickLike = async (e, postId) => {
    e.stopPropagation(); // 카드 클릭(모달 열림) 막고, 하트만 동작
    try {
      await postLike(postId, userId);
      console.log('좋아요 토글 완료');
    } catch (err) {
      console.error('좋아요 실패', err);
    }
  };

  // ✅ selected도 DB posts 기준으로 찾기
  const selected = useMemo(() => {
    return posts.find((x) => x.postId === selectedId) || null;
  }, [posts, selectedId]);

  // ✅ 최신/좋아요 정렬 (DB likeCnt 사용)
  const sortedItems = useMemo(() => {
    const copied = [...posts];

    if (sort === 'latest') {
      copied.sort((a, b) => toTime(b.postedAt) - toTime(a.postedAt));
      return copied;
    }

    copied.sort((a, b) => (b.likeCnt ?? 0) - (a.likeCnt ?? 0));
    return copied;
  }, [sort, posts]);

  // ESC로 모달 닫기
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
            <option value='like'>좋아요순</option>
            <option value='latest'>최신순</option>
          </select>

          <button
            type='button'
            css={s.addBtn}
            onClick={() => navigate('/community/write')}
          >
            나의 recipe 추가하기
          </button>
        </div>

        {/* ✅ 리스트 */}
        <div css={s.feedList}>
          {sortedItems.map((item) => (
            <div
              key={item.postId} // ✅ key 꼭 유니크
              css={s.feedItem}
              onClick={() => {
                setSelectedId(item.postId);
                setOpen(true);
              }}
            >
              {/* 이미지 */}
              <img css={s.thumb} src={item.imgUrl} alt={item.presetName} />

              {/* 텍스트 */}
              <div css={s.textArea}>
                <div css={s.topRow}>
                  <h3 css={s.feedTitle}>{item.presetName}</h3>
                  {/* baseName이 DB에 없으면 일단 "베이스 없음" */}
                  <p css={s.feedBase}>{item.itemName ?? '베이스 없음'}</p>
                </div>

                {/* 작성자/날짜: authorName이 없으면 "작성자" */}
                <div css={s.subRow}>
                  {item.nickname ?? '작성자'} {formatDate(item.postedAt)}
                </div>

                {/* ✅ 빵/치즈/야채/소스: categoryId로 분류 */}
                <div css={s.desc}>
                  빵: {pickOne(item.ingredients, 1)} · 치즈:{' '}
                  {pickOne(item.ingredients, 2)} · 야채:{' '}
                  {pickMany(item.ingredients, 3)} · 소스:{' '}
                  {pickMany(item.ingredients, 4)}
                </div>
              </div>

              {/* ✅ 좋아요 수: DB likeCnt 그대로 */}
              <div css={s.likeBox}>
                <button
                  onClick={(e) => onClickLike(e, item.postId)}
                  type='button'
                  css={s.likeBtn}
                  aria-label='좋아요'
                >
                  <Heart css={s.heartMini} />
                </button>
                <span css={s.countMini}>{item.likeCnt ?? 0}</span>
              </div>
            </div>
          ))}

          {/* 아무것도 없을 때 */}
          {!sortedItems.length && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              아직 게시글이 없어요.
            </div>
          )}
        </div>
      </div>

      {/* ✅ 모달(DB 기반) */}
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
              <button css={s.saveBtn}>내 프리셋에 저장하기</button>

              <img
                css={s.img}
                src={selected.imgUrl}
                alt={selected.presetName}
              />
              <h2 css={s.modalTitle}>{selected.presetName}</h2>

              <div css={s.meta}>
                <div>
                  <span>작성자 :</span> {selected.authorName ?? '작성자'}
                </div>
                <div>
                  <span>베이스 :</span> {selected.baseName ?? '선택 안함'}
                </div>
                <div>
                  <span>빵 :</span> {pickOne(selected.ingredients, 1)}
                </div>
                <div>
                  <span>치즈 :</span> {pickOne(selected.ingredients, 2)}
                </div>
                <div>
                  <span>야채 :</span> {pickMany(selected.ingredients, 3)}
                </div>
                <div>
                  <span>소스 :</span> {pickMany(selected.ingredients, 4)}
                </div>
              </div>

              {/* 좋아요(일단 UI만, count는 DB값) */}
              <div css={s.modalLike}>
                <button type='button' css={s.likeBtn} aria-label='좋아요'>
                  <Heart css={s.heart} />
                </button>
                <span css={s.count}>{selected.likeCnt ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPage;
