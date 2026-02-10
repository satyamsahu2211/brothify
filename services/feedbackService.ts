import endpoints from '../utils/url';
import apiClient from '../services/baseService';

const list = async (params?: any) => apiClient.get(endpoints.feedback, { params });
const get = async (id: string) => apiClient.get(`${endpoints.feedback}/${id}`);
const create = async (data: any) => apiClient.post(endpoints.feedback, data);
const update = async (id: string, data: any) => apiClient.put(`${endpoints.feedback}/${id}`, data);
const remove = async (id: string) => apiClient.delete(`${endpoints.feedback}/${id}`);

export const feedbackService = {
  list,
  get,
  create,
  update,
  remove,
};
