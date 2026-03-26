import express from "express";
import {
  getRandomMovie,
  getFilteredMovies,
  searchMovies,
  getTrendingMovies,
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
  getGenres,
  getLanguages,
  getCountries
} from "../controllers/movieController.js";

const router = express.Router();

// 🎲 Random Movie
router.get("/random", getRandomMovie);

// � Genres
router.get("/genres", getGenres);

// 🌐 Languages
router.get("/languages", getLanguages);

// 🌍 Countries
router.get("/countries", getCountries);

// 🎭 Filter Movies
router.get("/filter", getFilteredMovies);

// 🔍 Search Movies
router.get("/search", searchMovies);

// 📺 Trending Movies
router.get("/trending", getTrendingMovies);

// 🎬 Movie Details
router.get("/:id", getMovieDetails);

// 🎞 Movie Trailers
router.get("/:id/videos", getMovieVideos);

// 🎯 Similar Movies
router.get("/:id/similar", getSimilarMovies);

export default router;