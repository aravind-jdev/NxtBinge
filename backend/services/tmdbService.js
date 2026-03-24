import axios from "axios";
import { BASE_URL, TMDB_API_KEY } from "../config/env.js";

// 🎲 Fetch Random Movies (via random page)
export const fetchRandomMovies = async () => {
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      page: randomPage
    }
  });

  return response.data.results;
};

// 🎭 Fetch Filtered Movies
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