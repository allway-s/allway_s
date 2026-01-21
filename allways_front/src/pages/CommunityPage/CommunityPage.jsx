/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { s } from './CommunityPage.styles';

const TEST_CASES = [
  {
    id: 1,
    title: '새우를 극상으로',
    author: '새우돌이',
    base: '쉬림프',
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
    base: '에그마요',
    bread: '허니오트',
    cheese: '슈레드 치즈',
    veggies: [],
    sauce: ['후추', '소금'],
    likeCount: 87,
    imgUrl: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
    createdAt: '2026-01-13',
  },
  {
    id: 3,
    title: '야채whRk',
    author: '고기가온나',
    base: '스테이크&치즈',
    bread: '허니오트',
    cheese: '슈레드 치즈',
    veggies: ['양상추'],
    sauce: ['후추', '소금'],
    likeCount: 40,
    imgUrl: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png',
    createdAt: '2026-01-09',
  },
];

const toTime = (v) => {
  if (!v) return 0;
  return new Date(String(v).replace(" ", "T")).getTime();
};

const formatPick = (label, value) => {
  if (value == null) return `${label}: 선택 안함`;
  if (Array.isArray(value)) return `${label}: ${value.length ? value.join(', ') : '선택 안함'}`;
  const s = String(value).trim();
  return `${label}: ${s ? s : '선택 안함'}`;
};

function CommunityPage() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const [sort, setSort] = useState('like');
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // likes[id] = { liked, count }
  const [likes, setLikes] = useState(() => {
    const init = {};
    for (const item of TEST_CASES) {
      init[item.id] = { liked: false, count: item.likeCount };
    }
    return init;
  });

  const selected = useMemo(
    () => TEST_CASES.find((x) => x.id === selectedId) || null,
    [selectedId]
  );

  const toggleLike = (id) => {
    setLikes((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      const liked = !cur.liked;
      const count = liked ? cur.count + 1 : Math.max(0, cur.count - 1);
      return { ...prev, [id]: { liked, count } };
    });
  };

  const sortedItems = useMemo(() => {
    const copied = [...TEST_CASES];

    if (sort === 'latest') {
      copied.sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt));
      return copied;
    }

    copied.sort((a, b) => {
      const aCount = likes[a.id]?.count ?? a.likeCount;
      const bCount = likes[b.id]?.count ?? b.likeCount;
      return bCount - aCount;
    });

    return copied;
  }, [sort, likes]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div css={s.page}>
      <div css={s.container}>
        {/* 상단 컨트롤: 리스트 카드와 같은 폭 규칙 */}
        <div css={s.controlsRow}>
          <select css={s.sortSelect} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="like">좋아요순</option>
            <option value="latest">최신순</option>
          </select>

          <button type="button" css={s.addBtn} onClick={() => navigate('/community/write')}>
            나의 recipe 추가하기
          </button>
        </div>

        {/* 리스트 */}
        <div css={s.feedList}>
          {sortedItems.map((item) => {
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
                    {item.author} {item.createdAt}
                  </div>

                  <div css={s.desc}>
                    {formatPick('빵', item.bread)} · {formatPick('치즈', item.cheese)} ·{' '}
                    {formatPick('야채', item.veggies)} · {formatPick('소스', item.sauce)}
                  </div>
                </div>

                {/* 하트는 카드 내부 고정 칸 */}
                <div css={s.likeBox} onClick={(e) => e.stopPropagation()}>
                  <button type="button" css={s.likeBtn} onClick={() => toggleLike(item.id)} aria-label="좋아요">
                    <Heart css={s.heartMini} fill={likeState.liked ? 'currentColor' : 'none'} />
                  </button>
                  <span css={s.countMini}>{likeState.count}</span>
                </div>
              </div>
            );
          })}
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
              aria-label="닫기"
            >
              ×
            </button>

            <div css={s.menuCard}>
              <button css={s.saveBtn}>내 프리셋에 저장하기</button>
              <img css={s.img} src={selected.imgUrl} alt={selected.title} />
              <h2 css={s.modalTitle}>{selected.title}</h2>

              <div css={s.meta}>
                <div>
                  <span>작성자 :</span> {selected.author}
                </div>
                <div>
                  <span>베이스 :</span> {selected.base ?? '선택 안함'}
                </div>
                <div>
                  <span>빵 :</span> {selected.bread ?? '선택 안함'}
                </div>
                <div>
                  <span>치즈 :</span> {selected.cheese ?? '선택 안함'}
                </div>
                <div>
                  <span>야채 :</span>{' '}
                  {Array.isArray(selected.veggies) && selected.veggies.length
                    ? selected.veggies.join(', ')
                    : '선택 안함'}
                </div>
                <div>
                  <span>소스 :</span>{' '}
                  {Array.isArray(selected.sauce) && selected.sauce.length
                    ? selected.sauce.join(', ')
                    : '선택 안함'}
                </div>
              </div>

              <div css={s.modalLike}>
                <button type="button" css={s.likeBtn} onClick={() => toggleLike(selected.id)} aria-label="좋아요">
                  <Heart css={s.heart} fill={likes[selected.id]?.liked ? 'currentColor' : 'none'} />
                </button>
                <span css={s.count}>{likes[selected.id]?.count ?? selected.likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPage;