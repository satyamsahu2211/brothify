import endpoints from '../utils/url';
import apiClient from '../services/baseService';

const list = async () => apiClient.get(endpoints.categories);
const get = async (id: string) => apiClient.get(`${endpoints.categories}/${id}`);
const create = async (data: any) => apiClient.post(endpoints.categories, data);
const update = async (id: string, data: any) => apiClient.put(`${endpoints.categories}/${id}`, data);
const patch = async (id: string, data: any) => apiClient.patch(`${endpoints.categories}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${endpoints.categories}/${id}`);

export const categoryService = {
	list,
	get,
	create,
	update,
	patch,
	remove,
};
