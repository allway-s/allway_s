import { api } from "../config/axiosConfig"

export const getIngredients = (categoryName) => {
    return api.get(`/api/menu/ingredients/${categoryName}`)
}   

export const getItems = (categoryName) => {
    return api.get(`/api/menu/items/${categoryName}`)
}   

// export const validateOrder = (orderData) => {
//     return api.post(`/api//orders/validate`, orderData)
// }

export const createOrder = (orderData) => {
    return api.post(`/api/orders/placeOrder`, orderData)
}

// export const getOrderHistory = () => {
//     return api.get(`/api//orders/history`)
// }

// export const getMyPresets = () => {
//     return api.get(`/api/list/{userId}`)
// }