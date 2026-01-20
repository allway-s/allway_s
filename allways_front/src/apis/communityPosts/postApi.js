import { api } from "../config/axiosConfig"

export const getIngredients = (categoryValue) => {
    return api.get(`/api/ingredients`, {params: {
            categoryName: categoryValue
        }})
}   

export const getItems = (categoryValue) => {
    return api.get(`/api/items`, {params: {
            categoryName: categoryValue
        }})
}   

export const getPreset = (Value) => {
  return api.get(`/api/preset`, Value)
}