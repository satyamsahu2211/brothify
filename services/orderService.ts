import endpoints from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(endpoints.orders, { params });
const get = async (id: string) => apiClient.get(`${endpoints.orders}/${id}`);
const create = async (data: any) => apiClient.post(endpoints.orders, data);
const update = async (id: string, data: any) => apiClient.put(`${endpoints.orders}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${endpoints.orders}/${id}`);

export const orderService = {
  list,
  get,
  create,
  update,
  remove,
};
