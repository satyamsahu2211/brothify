import URL from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(URL.reservations, { params });
const get = async (id: string) => apiClient.get(`${URL.reservations}/${id}`);
const create = async (data: any) => apiClient.post(URL.reservations, data);
const update = async (id: string, data: any) => apiClient.put(`${URL.reservations}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${URL.reservations}/${id}`);

export const reservationService = {
  list,
  get,
  create,
  update,
  remove,
};
