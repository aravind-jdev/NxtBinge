import express from "express";
import {
  getRandomMovie,
  getFilteredMovies,
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
  getMovieVideos,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/random", getRandomMovie);
router.get("/filter", getFilteredMovies);
router.get("/search", searchMovies);
router.get("/trending", getTrendingMovies);
router.get("/:id", getMovieDetails);
router.get("/:id/videos", getMovieVideos);

export default router;