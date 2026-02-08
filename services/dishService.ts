import URL from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(URL.dish, { params });
const get = async (id: string) => apiClient.get(`${URL.dish}/${id}`);
const create = async (data: any) => apiClient.post(URL.dish, data);
const update = async (id: string, data: any) => apiClient.put(`${URL.dish}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${URL.dish}/${id}`);

export const dishService = {
	list,
	get,
	create,
	update,
	remove,
};
