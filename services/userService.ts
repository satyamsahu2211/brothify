import endpoints from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(endpoints.users, { params });
const get = async (id: string) => apiClient.get(`${endpoints.users}/${id}`);
const create = async (data: any) => apiClient.post(endpoints.users, data);
const update = async (id: string, data: any) => apiClient.put(`${endpoints.users}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${endpoints.users}/${id}`);

export const userService = {
  list,
  get,
  create,
  update,
  remove,
};
