import {
  fetchRandomMovies,
  fetchFilteredMovies,
  fetchSearchMovies,
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieVideos,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchGenres,
  fetchLanguages,
  fetchCountries
} from "../services/tmdbService.js";

import { getRandomItem } from "../utils/random.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { formatMovie, formatMovies, formatMovieDetails } from "../utils/formatter.js";
import { getCache, setCache } from "../utils/cache.js";

// 🎲 Random Movie (with optional filters)
export const getRandomMovie = asyncHandler(async (req, res) => {
  const filters = req.query; // genre, language, country, year
  const cacheKey = `random_${JSON.stringify(filters)}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const movies = await fetchRandomMovies(filters);

  if (!movies || movies.length === 0) {
    return res.status(404).json({ success: false, message: "No movies found with those filters" });
  }

  const randomMovie = getRandomItem(movies);
  const response = {
    success: true,
    data: formatMovie(randomMovie)
  };

  setCache(cacheKey, response, 2 * 60 * 1000); // Cache for 2 mins
  res.json(response);
});

// 🎭 Filter Movies
export const getFilteredMovies = asyncHandler(async (req, res) => {
  const cacheKey = `filter_${JSON.stringify(req.query)}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const movies = await fetchFilteredMovies(req.query);
  const formatted = formatMovies(movies);

  setCache(cacheKey, formatted, 5 * 60 * 1000);

  res.json({
  success: true,
  count: formatted.length,
  data: formatted
  });
});

// 🔍 Search Movies
export const searchMovies = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  const cacheKey = `search_${query}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const movies = await fetchSearchMovies(query);
  const formatted = formatMovies(movies);

  setCache(cacheKey, formatted, 5 * 60 * 1000); // 5 mins

  res.json({
  success: true,
  count: formatted.length,
  data: formatted
  });
});

// 📺 Trending Movies
export const getTrendingMovies = asyncHandler(async (req, res) => {
  const cacheKey = "trending";

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const movies = await fetchTrendingMovies();
  const formatted = formatMovies(movies);

  setCache(cacheKey, formatted, 10 * 60 * 1000); // 10 mins

  res.json({
  success: true,
  count: formatted.length,
  data: formatted
  });
});

// 🎬 Movie Details (with cast, crew, and metadata)
export const getMovieDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `movie_details_${id}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const [movie, credits] = await Promise.all([
    fetchMovieDetails(id),
    fetchMovieCredits(id)
  ]);

  const formattedMovie = formatMovieDetails(movie, credits);
  
  setCache(cacheKey, formattedMovie, 30 * 60 * 1000); // Cache for 30 minutes
  res.json(formattedMovie);
});

// 🎯 Get Genres
export const getGenres = asyncHandler(async (req, res) => {
  const cacheKey = "genres_list";
  
  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const genres = await fetchGenres();
  const response = { success: true, data: genres };
  
  setCache(cacheKey, response, 24 * 60 * 60 * 1000); // Cache for 24 hours
  res.json(response);
});

// 🌐 Get Languages
export const getLanguages = asyncHandler(async (req, res) => {
  const cacheKey = "languages_list";
  
  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const languages = await fetchLanguages();
  const response = { success: true, data: languages };
  
  setCache(cacheKey, response, 24 * 60 * 60 * 1000); // Cache for 24 hours
  res.json(response);
});

// 🌍 Get Countries
export const getCountries = asyncHandler(async (req, res) => {
  const cacheKey = "countries_list";
  
  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const countries = await fetchCountries();
  const response = { success: true, data: countries };
  
  setCache(cacheKey, response, 24 * 60 * 60 * 1000); // Cache for 24 hours
  res.json(response);
});
export const getSimilarMovies = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `similar_${id}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const movies = await fetchSimilarMovies(id);
  const formatted = formatMovies(movies);

  setCache(cacheKey, { success: true, count: formatted.length, data: formatted }, 5 * 60 * 1000);

  res.json({
    success: true,
    count: formatted.length,
    data: formatted
  });
});


// 🎞 Movie Videos
export const getMovieVideos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `movie_videos_${id}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const videos = await fetchMovieVideos(id);
  
  setCache(cacheKey, videos, 30 * 60 * 1000); // Cache for 30 minutes
  res.json(videos);
});