import URL from '../utils/url';
import apiClient from '../services/baseService';

const login = async (data:any) => apiClient.post(URL.login,data);

export const authService = {
    login,
}

