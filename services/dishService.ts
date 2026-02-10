import endpoints from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(endpoints.dish, { params });
const get = async (id: string) => apiClient.get(`${endpoints.dish}/${id}`);
const create = async (data: any) => {
	// Support both JSON and FormData
	if (data instanceof FormData) {
		return apiClient.post(endpoints.dish, data);
	}
	return apiClient.post(endpoints.dish, data);
};
const update = async (id: string, data: any) => {
	// Support both JSON and FormData
	if (data instanceof FormData) {
		return apiClient.put(`${endpoints.dish}/${id}`, data);
	}
	return apiClient.put(`${endpoints.dish}/${id}`, data);
};
const remove = async (id: string) => apiClient.delete(`${endpoints.dish}/${id}`);

export const dishService = {
	list,
	get,
	create,
	update,
	remove,
};
