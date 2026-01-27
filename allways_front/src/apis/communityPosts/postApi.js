import { api } from "../config/axiosConfig"

export const getAllPost = (userId) => {
  return api.get(`/api/community/posts`, { params: { userId } });
}

export const postLike = (postId, userId) =>
  api.post(`/api/community/post/${postId}/like`, { userId });
