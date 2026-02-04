import { api } from "../config/axiosConfig";

// 게시글 작성 (userId와 presetId 필요)
export const createPost = (data) => api.post("/api/posts", data);

// 게시글 목록 조회 (userId optional)
export const getPosts = (userId) => 
  api.get("/api/posts", { params: userId ? { userId } : {} });

// 프리셋 저장 
export const savePreset = (postId, userId) =>
  api.post("/api/presets/posts", { postId, userId });

// 좋아요 토글
export const toggleLike = (postId, userId) => 
  api.post(`/api/posts/${postId}/like`, { userId });
// 프리셋 저장 (body에서 userId 삭제)
export const savePreset = (presetReqDto) => api.post("/api/presets/save", presetReqDto);

// 내 프리셋 목록 조회
export const getMyPresets = () => 
  api.get("/api/presets");
// 게시글 삭제
export const deletePost = (postId, userId) =>
  api.delete(`/api/posts/${postId}`, { params: { userId } });

// 프리셋 삭제
export const deletePreset = (presetId, userId) => 
  api.delete(`/api/presets/${presetId}`, { params: { userId } });