import axios from "axios";
import { BASE_URL, TMDB_API_KEY } from "../config/env.js";

// 🎲 Fetch Random Movies with optional filters
export const fetchRandomMovies = async (filters = {}) => {
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const params = {
    api_key: TMDB_API_KEY,
    page: randomPage
  };

  // Add filters if provided
  if (filters.genre) {
    params.with_genres = filters.genre;
  }
  if (filters.language) {
    params.with_original_language = filters.language;
  }
  if (filters.country) {
    params.with_origin_country = filters.country;
  }
  if (filters.year) {
    params.primary_release_year = filters.year;
  }

  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params
  });

  return response.data.results;
};

// � Fetch Genres
export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data.genres;
};

// 🌐 Fetch Languages
export const fetchLanguages = async () => {
  const response = await axios.get(`${BASE_URL}/configuration/languages`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data;
};

// 🌍 Fetch Countries
export const fetchCountries = async () => {
  const response = await axios.get(`${BASE_URL}/configuration/countries`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data;
};
export const fetchFilteredMovies = async (filters) => {
  const params = {
    api_key: TMDB_API_KEY
  };

  // 🧼 Add only if exists
  if (filters.genre) {
    params.with_genres = filters.genre;
  }

  if (filters.rating) {
    params["vote_average.gte"] = filters.rating;
  }

  if (filters.year) {
    params.primary_release_year = filters.year;
  }

  if (filters.language) {
    params.with_original_language = filters.language;
  }

  if (filters.country) {
    params.with_origin_country = filters.country;
  }

  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params
  });

  return response.data.results;
};
// 🔍 Search Movies
export const fetchSearchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query
    }
  });

  return response.data.results;
};

// 📺 Trending Movies
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data.results;
};

// 🎬 Movie Details
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data;
};

// 🎞 Movie Videos (Trailers)
export const fetchMovieVideos = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data.results;
};

// 👥 Movie Credits (Cast & Crew)
export const fetchMovieCredits = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: {
      api_key: TMDB_API_KEY
    }
  });

  return response.data;
};

// 🎯 Similar Movies
export const fetchSimilarMovies = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
    params: {
      api_key: TMDB_API_KEY,
      page: 1
    }
  });

  return response.data.results;
};