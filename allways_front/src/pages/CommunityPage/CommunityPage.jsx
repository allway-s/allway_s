/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { s } from './CommunityPage.styles';
import { Heart } from 'lucide-react';

const TEST_CASES = [
  {
    id: 1,
    title: '새우를 극상으로',
    author: '새우돌이',
    bread: '위트',
    cheese: '아메리칸 치즈',
    veggies: ['양상추', '토마토', '오이', '피망'],
    sauce: ['랜치', '후추'],
    likeCount: 234,
    imgUrl: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
    createdAt: '2026-01-10',
  },
  {
    id: 2,
    title: '야채 존나 처먹어',
    author: '비건이지만 고기 먹음',
    bread: '허니오트',
    cheese: '슈레드 치즈',
    veggies: ['양상추', '토마토', '오이', '양파', '피망', '올리브', '할라피뇨', '피클'],
    sauce: ['후추', '소금'],
    likeCount: 87,
    imgUrl: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
    createdAt: '2026-01-13',
  },
];

function CommunityPage() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sort, setSort] = useState('latest');
  const navigate = useNavigate();

  // likes[id] = { liked: boolean, count: number }
  const [likes, setLikes] = useState(() => {
    const init = {};
    TEST_CASES.forEach((item) => {
      init[item.id] = { liked: false, count: item.likeCount };
    });
    return init;
  });

  const selected = useMemo(
    () => TEST_CASES.find((x) => x.id === selectedId) || null,
    [selectedId]
  );

  const openModal = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedId(null);
  };

  // ✅ 하트 토글(리스트/모달 공통)
  const toggleLike = (id) => {
    setLikes((prev) => {
      const cur = prev[id];
      if (!cur) return prev;

      const nextLiked = !cur.liked;
      const nextCount = nextLiked ? cur.count + 1 : Math.max(0, cur.count - 1);

      return {
        ...prev,
        [id]: { liked: nextLiked, count: nextCount },
      };
    });
  };

  // ✅ 정렬된 리스트 만들기 (핵심)
  const sortedItems = useMemo(() => {
    const copied = [...TEST_CASES];

    if (sort === 'latest') {
      copied.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return copied;
    }

    // 좋아요순: 현재 likes 상태(count) 기준으로 정렬
    copied.sort((a, b) => {
      const aCount = likes[a.id]?.count ?? a.likeCount;
      const bCount = likes[b.id]?.count ?? b.likeCount;
      return bCount - aCount;
    });

    return copied;
  }, [sort, likes]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div css={s.page}>
      <div css={s.container}>
        <div css={s.topBar}>
          <div css={s.sortWrap} onClick={(e) => e.stopPropagation()}>
            <select
              css={s.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value='latest'>최신순</option>
              <option value='like'>좋아요순</option>
            </select>
          </div>

          <button
            type='button'
            css={s.addBtn}
            onClick={() => navigate('/community/write')}
          >
            나의 recipe 추가하기
          </button>
        </div>

        {/* ✅ feedList는 container 안에 두는 게 가운데 정렬 유지에 유리 */}
        <div css={s.feedList}>
          {sortedItems.map((item) => {
            const likeState = likes[item.id] || {
              liked: false,
              count: item.likeCount,
            };

            return (
              <div
                key={item.id}
                css={s.feedItem}
                onClick={() => openModal(item.id)}
              >
                <img css={s.thumb} src={item.imgUrl} alt={item.title} />

                <div css={s.textArea}>
                  <div css={s.topRow}>
                    <h3 css={s.feedTitle}>{item.title}</h3>
                  </div>

                  <span css={s.date}>
                    {item.author} {item.createdAt}
                  </span>

                  <div css={s.desc}>
                    빵: {item.bread} · 치즈: {item.cheese} · 야채:{' '}
                    {item.veggies.join(', ')} · 소스: {item.sauce.join(', ')}
                  </div>
                </div>

                {/* ✅ 리스트 하트 (클릭해도 모달 안 열리게 stopPropagation) */}
                <div css={s.likeMini}>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                    aria-label='좋아요'
                  >
                    <Heart
                      css={s.heartMini}
                      aria-hidden='true'
                      fill={likeState.liked ? 'currentColor' : 'none'}
                    />
                  </button>
                  <span css={s.countMini}>{likeState.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Modal ===== */}
      {open && selected && (
        <div css={s.modalOverlay} onClick={closeModal}>
          <div css={s.modalBody} onClick={(e) => e.stopPropagation()}>
            <button css={s.modalClose} onClick={closeModal} aria-label='닫기'>
              ×
            </button>

            <div css={s.menuCard}>
              <div css={s.inner}>
                <img css={s.img} src={selected.imgUrl} alt={selected.title} />

                <h2 css={s.modalTitle}>{selected.title}</h2>

                <div css={s.meta}>
                  <div>
                    <span>작성자 :</span> {selected.author}
                  </div>
                  <div>
                    <span>빵 :</span> {selected.bread}
                  </div>
                  <div>
                    <span>치즈 :</span> {selected.cheese}
                  </div>
                  <div>
                    <span>야채 :</span> {selected.veggies.join(', ')}
                  </div>
                </div>

                {/* ✅ 모달 하트 (리스트와 동일 state 사용) */}
                <div css={s.like}>
                  <button
                    type='button'
                    onClick={() => toggleLike(selected.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                    aria-label='좋아요'
                  >
                    <Heart
                      css={s.heart}
                      aria-hidden='true'
                      fill={likes[selected.id]?.liked ? 'currentColor' : 'none'}
                    />
                  </button>
                  <span css={s.count}>
                    {likes[selected.id]?.count ?? selected.likeCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPage;
