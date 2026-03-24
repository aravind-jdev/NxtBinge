import {
  fetchRandomMovies,
  fetchFilteredMovies,
  fetchSearchMovies,
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieVideos
} from "../services/tmdbService.js";

import { getRandomItem } from "../utils/random.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { formatMovie, formatMovies } from "../utils/formatter.js";
import { getCache, setCache } from "../utils/cache.js";

// 🎲 Random Movie
export const getRandomMovie = asyncHandler(async (req, res) => {
  const movies = await fetchRandomMovies();

  if (!movies || movies.length === 0) {
    return res.status(404).json({ message: "No movies found" });
  }

  const randomMovie = getRandomItem(movies);
  res.json({
  success: true,
  data: formatMovie(randomMovie)
  });
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

// 🎬 Movie Details
export const getMovieDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const movie = await fetchMovieDetails(id);
  res.json(movie);
});

// 🎞 Movie Videos
export const getMovieVideos = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const videos = await fetchMovieVideos(id);
  res.json(videos);
});