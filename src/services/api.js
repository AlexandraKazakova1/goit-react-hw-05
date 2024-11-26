import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const ACCESS_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmE2MDU1ZTY3ZWNkNTZiNTBlOWFkOWI0MmM3NWQ3ZiIsIm5iZiI6MTczMjM2ODg1NS4wNTA2MTUsInN1YiI6IjY3NDFhMjllMzJhOWFhZjQzZDk2YWE4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NF8VQr24MnIxObf3QdrXZEm25wyfZSAoTo1NM2O7sdU';

const options = {
  headers: {
    Authorization: ACCESS_TOKEN,
  },
};

const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      ...options,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    throw error;
  }
};

const getTrendingMovies = async () => {
  return fetchData('/trending/movie/day');
};

const searchMovies = async (query) => {
  return fetchData('/search/movie', {
    query,
    include_adult: false,
    language: 'en-US',
    page: 1,
  });
};

const getMovieDetails = async (movieId) => {
  return fetchData(`/movie/${movieId}`);
};

const getMovieCredits = async (movieId) => {
  return fetchData(`/movie/${movieId}/credits`);
};

const getMovieReviews = async (movieId) => {
  return fetchData(`/movie/${movieId}/reviews`);
};

export default {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};
