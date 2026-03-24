const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// 🎬 Format movie object
export const formatMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    rating: movie.vote_average,
    year: movie.release_date
      ? movie.release_date.split("-")[0]
      : null
  };
};

// 🎬 Format multiple movies
export const formatMovies = (movies) => {
  return movies.map(formatMovie);
};