import { api } from "../config/axiosConfig"



export const getPreset = (Value) => {
  return api.get(`/api/user/preset`, Value)
}