/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PresetCard } from '../../../components/PresetCard.jsx';
import { S } from './PopularSectionStyles.js';
import { getPosts, toggleLike } from '../../../apis/items/communityApi.js';
import { getUserIdFromToken } from '../../../utils/getUserId.js';


export function PopularSection({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userId = useMemo(() => getUserIdFromToken(), []);

  // 로그인 여부 판단
  const isLoggedInUser =
    user && (user.id || user.name || Object.keys(user).length > 0);

  // 🔹 게시글 조회
  const fetchPosts = async () => {
    try {
      const res = await getPosts(userId);

      setPosts(res?.data ?? []);
    } catch (e) {
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 인기순 최대 3개만 추출
  const bestPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0))
      .slice(0, 3);
  }, [posts]);

  // 🔹 좋아요 클릭
  const onClickLike = async (e, postId) => {
    e.stopPropagation();
    if (!isLoggedInUser) {
      navigate('/login');
      return;
    }

    try {
      await toggleLike(postId, userId);
      fetchPosts(); // 다시 불러서 좋아요 반영
    } catch (err) {
      console.error('좋아요 실패', err);
    }
  };
  useEffect(() => {
    if (posts.length > 0) {
    }
  }, [posts]);

  return (
    <section css={S.section}>
      <div css={S.container}>
        {/* ================= 헤더 ================= */}
        <div css={S.header}>
          <h2 css={S.title}>Recipe-s</h2>

          <div css={S.headerRight}>
            {!isLoggedInUser ? (
              <span css={S.headerText}>
                로그인 후 최신 꿀조합을 확인하세요!
              </span>
            ) : (
              <span css={S.headerText}>
                {user.name || '회원'}님을 위한 최신 레시피예요!
              </span>
            )}

            <button css={S.iconButton} onClick={() => navigate('/community')}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* ================= 카드 영역 ================= */}
        <div css={S.grid}>
          {/* 비로그인 블러 버튼 */}
          {!isLoggedInUser && (
            <button css={S.blurMessage} onClick={() => navigate('/login')}>
              로그인하고 레시피 보기
            </button>
          )}

          {bestPosts.map((item, index) => (
            <div key={item.postId} css={S.cardWrapper(!isLoggedInUser)}>
              {/* 첫 번째 카드 NEW 뱃지 */}
              {index === 0 && <div css={S.bestBadge}>Best</div>}

              <PresetCard item={item} onClick={() => navigate('/community')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
