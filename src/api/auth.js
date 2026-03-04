import apiClient from './apiClient';

export const login = (loginId, password) => {
  return apiClient.post('/api/members/login', { loginId, password });
};

export const signUp = (payload) => {
  return apiClient.post('/api/members/signup', payload);
};

export const validateToken = () => {
  return apiClient.get('/api/members/token/validate');
};
