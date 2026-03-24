import express from "express";
import {
  getRandomMovie,
  getFilteredMovies,
  searchMovies,
  getTrendingMovies,
  getMovieDetails,
  getMovieVideos
} from "../controllers/movieController.js";

const router = express.Router();

// 🎲 Random Movie
router.get("/random", getRandomMovie);

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

export default router;