import URL from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(URL.feedback, { params });
const get = async (id: string) => apiClient.get(`${URL.feedback}/${id}`);
const create = async (data: any) => apiClient.post(URL.feedback, data);
const update = async (id: string, data: any) => apiClient.put(`${URL.feedback}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${URL.feedback}/${id}`);

export const feedbackService = {
  list,
  get,
  create,
  update,
  remove,
};
