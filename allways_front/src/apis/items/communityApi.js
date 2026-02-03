import { api } from "../config/axiosConfig";

// 게시글 작성
export const createPost = (data) => api.post("/api/posts", data);

// 전체 게시글 조회 (로그인 안 해도 볼 수 있게 백엔드 처리했으니 파라미터 삭제)
export const getPosts = () => api.get("/api/posts");

// 좋아요 토글 (body에 userId 보내던 거 삭제)
export const toggleLike = (postId) => api.post(`/api/posts/${postId}/like`);

// 프리셋 저장 (body에서 userId 삭제)
export const savePreset = (postId) => api.post("/api/presets/post", { postId: Number(postId) });

// 내 프리셋 목록 조회 (params 삭제)
export const getMyPresets = () => api.get("/api/presets");

// 프리셋 삭제 (params 삭제)
export const deletePreset = (presetId) => api.delete(`/api/presets/${presetId}`);