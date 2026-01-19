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

export const validateOrder = (orderData) => {
    return api.post(`/api/v1/orders/validate`, orderData)
}

export const createOrder = (orderData) => {
    return api.post(`/api/v1/orders`, orderData)
}

export const getOrderHistory = () => {
    return api.get(`/api/v1/orders/history`)
}