import axios from 'axios';

// Заміни цим своїм реальним ключем з кабінету themoviedb.org
const API_KEY = '9f7ed3b3aca037c542f12ef879bb8e9d'; 
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// 1. Список найпопулярніших фільмів на сьогодні (Home)
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

// 2. Пошук фільму за ключовим словом (Movies)
export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`);
  return response.data.results;
};

// 3. Запит повної інформації про фільм (MovieDetails)
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  return response.data;
};

// 4. Запит інформації про акторський склад (Cast)
export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  return response.data.cast;
};

// 5. Запит оглядів для сторінки кінофільму (Reviews)
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
  return response.data.results;
};