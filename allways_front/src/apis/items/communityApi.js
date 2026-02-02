import { api } from "../config/axiosConfig";

// 전체 게시글 조회
export const getPosts = (userId) => api.get("/api/posts", { params: { userId } });

// 게시글 작성
export const createPost = (data) => api.post("/api/posts", data);

// 좋아요 토글
export const toggleLike = (postId, userId) => api.post(`/api/posts/${postId}/like`, { userId });

// 프리셋 저장 (커뮤니티 post에서)
// communityApi.js (이렇게 되어있는지 확인)
export const savePreset = (postId, userId) => 
  api.post("/api/presets/post", { 
    userId: Number(userId), // 숫자로 강제 변환
    postId: Number(postId)  // 숫자로 강제 변환
  });

// 내 프리셋 목록 조회
export const getMyPresets = (userId) => api.get("/api/presets", { params: { userId } });

// 프리셋 삭제
export const deletePreset = (presetId, userId) => api.delete(`/api/presets/${presetId}`, { params: { userId } });