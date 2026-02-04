import { api } from "../config/axiosConfig";

// 게시글 작성
export const createPost = (data) => api.post("/api/posts", data);

// 전체 게시글 조회
export const getPosts = () => api.get("/api/posts");

// 좋아요 토글 (body에 userId 보내던 거 삭제)
export const toggleLike = (postId) => api.post(`/api/posts/${postId}/like`);

// 프리셋 저장 (body에서 userId 삭제)
export const savePreset = (postId) => api.post("/api/presets/post", { postId: Number(postId) });

// 게시글 삭제
export const deletePost = (postId, userId) =>
  api.delete(`/api/posts/${postId}`, { params: { userId } });

// 프리셋 저장 (커뮤니티 post에서)
export const savePreset = (postId, userId) =>
  api.post("/api/presets/post", { userId, postId });

// 프리셋 삭제 (params 삭제)
export const deletePreset = (presetId) => api.delete(`/api/presets/${presetId}`);

export const deletePost = (presetId) => api.delete(`/api/posts/preset/${presetId}`)