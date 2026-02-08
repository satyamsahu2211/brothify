import URL from '../utils/url';
import apiClient from '../services/baseService';

const list = async () => apiClient.get(URL.categories);
const get = async (id: string) => apiClient.get(`${URL.categories}/${id}`);
const create = async (data: any) => apiClient.post(URL.categories, data);
const update = async (id: string, data: any) => apiClient.put(`${URL.categories}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${URL.categories}/${id}`);

export const categoryService = {
	list,
	get,
	create,
	update,
	remove,
};
