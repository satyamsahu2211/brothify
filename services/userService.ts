import URL from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(URL.users, { params });
const get = async (id: string) => apiClient.get(`${URL.users}/${id}`);
const create = async (data: any) => apiClient.post(URL.users, data);
const update = async (id: string, data: any) => apiClient.put(`${URL.users}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${URL.users}/${id}`);

export const userService = {
  list,
  get,
  create,
  update,
  remove,
};
