import URL from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(URL.orders, { params });
const get = async (id: string) => apiClient.get(`${URL.orders}/${id}`);
const create = async (data: any) => apiClient.post(URL.orders, data);
const update = async (id: string, data: any) => apiClient.put(`${URL.orders}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${URL.orders}/${id}`);

export const orderService = {
  list,
  get,
  create,
  update,
  remove,
};
