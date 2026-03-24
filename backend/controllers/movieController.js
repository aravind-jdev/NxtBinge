import { fetchFromTMDB } from "../services/tmdbService.js";
import { getRandomPage, getRandomItem } from "../utils/random.js";

// 🎲 Random Movie
export const getRandomMovie = async (req, res) => {
  try {
    const page = getRandomPage();

    const data = await fetchFromTMDB("/discover/movie", { page });

    const movie = getRandomItem(data.results);

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🎭 Filter Movies
export const getFilteredMovies = async (req, res) => {
  try {
    const { genre, rating, year, language } = req.query;

    const page = getRandomPage();

    const params = {
      page,
      with_genres: genre,
      "vote_average.gte": rating,
      primary_release_year: year,
      with_original_language: language,
    };

    const data = await fetchFromTMDB("/discover/movie", params);

    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Search Movies
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    const data = await fetchFromTMDB("/search/movie", { query });

    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🎬 Movie Details
export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fetchFromTMDB(`/movie/${id}`);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📺 Trending Movies
export const getTrendingMovies = async (req, res) => {
  try {
    const data = await fetchFromTMDB("/trending/movie/week");

    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🎞 Movie Trailers
export const getMovieVideos = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fetchFromTMDB(`/movie/${id}/videos`);

    res.json(data.results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};