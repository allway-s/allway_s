/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PresetCard } from '../../../components/PresetCard.jsx';
import { S } from './PopularSectionStyles.js';
import { getPosts, toggleLike } from '../../../apis/items/communityApi.js';

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
      console.log('PopularSection item:', posts[0]);
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
