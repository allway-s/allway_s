import { api } from "../config/axiosConfig"

export const getAllPost = () => {
  return api.get(`/api/post/getAllPost`);
}

export const getIngredients = (categoryValue) => {
    return api.get(`/api/ingredients`, {params: {
            categoryName: categoryValue
        }})
}   

export const postLike = (postId, userId) =>
  api.post(`/api/post/${postId}/like`, { userId });