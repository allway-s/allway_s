import { api } from "../config/axiosConfig"

export const getIngredients = (categoryValue) => {
    return api.get(`/api/menu/ingredients/{categoryName}`, {params: {
            categoryName: categoryValue
        }})
}   

export const getItems = (categoryValue) => {
    return api.get(`/api/menu/items/{categoryName}`, {params: {
            categoryName: categoryValue
        }})
}   

export const getPreset = (Value) => {
  return api.get(`/api/user/preset`, Value)
}