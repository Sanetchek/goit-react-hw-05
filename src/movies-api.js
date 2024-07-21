import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDk5NGEzYTZmMmJkYzg2MzRhM2UyMzA1MmE4Mjg3MyIsIm5iZiI6MTcyMTE1ODExNi43Nzk3OTQsInN1YiI6IjY2OTY5NTM4YjJkNTdmYjA5ZmJlNzU0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OuHEFQQyJGgUYJ0FH9cDhbxSSGd65NDfaM88PNi0ROg';

export const trendingMovies = async () => {
  const response = await axios.get('/trending/movie/day', {
    language: 'en-US'
  });
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US'
    }
  });
  return response.data;
};

export const movieDetails = async (id) => {
  const response = await axios.get(`/movie/${id}`, {
    language: 'en-US'
  });
  return response.data;
};

export const movieCredits = async (id) => {
  const response = await axios.get(`/movie/${id}/credits`, {
    language: 'en-US'
  });
  return response.data;
};

export const movieReviews = async (id) => {
  const response = await axios.get(`/movie/${id}/reviews`, {
    language: 'en-US'
  });
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`/genre/movie/list`, {
    language: 'en-US'
  });
  return response.data;
}
