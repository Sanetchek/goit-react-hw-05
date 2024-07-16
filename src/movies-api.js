import axios from "axios";

axios.defaults.baseURL = 'https://api.example.com';
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const searchMovies = async () => {
  const response = await axios.get('/');
  return response.data;
};
