import axios from 'axios';

const API_KEY = '9f7ed3b3aca037c542f12ef879bb8e9d'; 
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
  return response.data.results;
};