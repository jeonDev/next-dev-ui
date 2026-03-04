import apiClient from './apiClient';

export const fetchMyPosts = () => {
  return apiClient.get('/api/communities/mine');
};

export const createPost = (payload) => {
  return apiClient.post('/api/communities', payload);
};

// Placeholder for future feed implementation
export const fetchFeed = () => {
  return apiClient.get('/api/communities');
};
