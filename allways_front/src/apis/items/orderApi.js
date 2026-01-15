import { api } from "../config/axiosConfig"

export const getIngredients = (categoryValue) => {
    return api.get(`/api/ingredients`, {params: {
            categoryName: categoryValue
        }})
}   
