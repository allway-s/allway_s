import { api } from "../config/axiosConfig";

export const getUserMe = () => api.get('/api/user/me');