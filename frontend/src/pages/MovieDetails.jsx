import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getMovieDetails, getMovieVideos, getSimilarMovies } from "../api/movieApi";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const [movieData, similarData] = await Promise.all([
        getMovieDetails(id),
        getSimilarMovies(id)
      ]);
      setMovie(movieData);
      setSimilarMovies(similarData || []);
    };
    fetchDetails();
  }, [id]);

  const handleTrailer = async () => {
    const videos = await getMovieVideos(id);
    const trailer = videos.find((vid) => vid.type === "Trailer");

    if (trailer) {
      setTrailerKey(trailer.key);
      setShowTrailer(true);
    } else {
      alert("No trailer available 😢");
    }
  };

  if (!movie) {
    return <p className="p-6 text-gray-400 text-center">Loading...</p>;
  }

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* Back Button */}
      <div className="px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition text-sm font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Backdrop Hero Section */}
      {movie.backdrop && (
        <div className="relative w-full h-96 overflow-hidden">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        {/* Movie Header (Poster + Info) */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Poster */}
          <div className="md:col-span-1">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>

            {/* Rating & Year & Runtime */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-lg text-gray-300">
              <span className="flex items-center gap-1">⭐ {movie.rating?.toFixed(1)}</span>
              <span className="text-gray-600">•</span>
              <span>{movie.year}</span>
              {movie.runtime && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>{movie.runtime} min</span>
                </>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {movie.overview && (
              <p className="text-gray-300 leading-relaxed mb-6 text-base">
                {movie.overview}
              </p>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8 p-4 bg-gray-900 rounded-lg">
              {movie.budget && movie.budget > 0 && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">BUDGET</p>
                  <p className="text-lg font-bold">
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              {movie.revenue && movie.revenue > 0 && (
                <div>
                  <p className="text-gray-400 text-sm font-semibold">REVENUE</p>
                  <p className="text-lg font-bold">
                    ${(movie.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
            </div>

            {/* Watch Trailer Button */}
            <button
              onClick={handleTrailer}
              className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              ▶ Watch Trailer
            </button>
          </div>
        </div>

        {/* Production Companies */}
        {movie.productionCompanies && movie.productionCompanies.length > 0 && (
          <div className="mb-12 pb-8 border-b border-gray-800">
            <h3 className="text-2xl font-bold mb-4">PRODUCTION</h3>
            <div className="flex flex-wrap gap-4">
              {movie.productionCompanies.map((company, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm font-medium"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cast Section (Letterboxd Style) */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="mb-12 pb-8 border-b border-gray-800">
            <h3 className="text-2xl font-bold mb-6">CAST</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movie.cast.map((actor) => (
                <div key={actor.id} className="text-center group cursor-pointer">
                  {actor.profileImage ? (
                    <img
                      src={actor.profileImage}
                      alt={actor.name}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-3 shadow-lg group-hover:shadow-xl transition"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Photo</span>
                    </div>
                  )}
                  <p className="font-semibold text-sm mb-1 line-clamp-2">{actor.name}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crew Section (Directors, Writers, Producers) */}
        {movie.crew && (movie.crew.directors.length > 0 || movie.crew.writers.length > 0 || movie.crew.producers.length > 0) && (
          <div className="mb-12 pb-8 border-b border-gray-800">
            <h3 className="text-2xl font-bold mb-6">CREW</h3>

            {/* Directors */}
            {movie.crew.directors.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-red-500 mb-4">Directors</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movie.crew.directors.map((director) => (
                    <div key={director.id} className="text-center group cursor-pointer">
                      {director.profileImage ? (
                        <img
                          src={director.profileImage}
                          alt={director.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg mb-3 shadow-lg group-hover:shadow-xl transition"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">No Photo</span>
                        </div>
                      )}
                      <p className="font-semibold text-sm">{director.name}</p>
                      <p className="text-xs text-gray-400">{director.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Writers */}
            {movie.crew.writers.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-red-500 mb-4">Writers</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movie.crew.writers.map((writer) => (
                    <div key={writer.id} className="text-center group cursor-pointer">
                      {writer.profileImage ? (
                        <img
                          src={writer.profileImage}
                          alt={writer.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg mb-3 shadow-lg group-hover:shadow-xl transition"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">No Photo</span>
                        </div>
                      )}
                      <p className="font-semibold text-sm">{writer.name}</p>
                      <p className="text-xs text-gray-400">{writer.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Producers */}
            {movie.crew.producers.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-red-500 mb-4">Producers</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movie.crew.producers.map((producer) => (
                    <div key={producer.id} className="text-center group cursor-pointer">
                      {producer.profileImage ? (
                        <img
                          src={producer.profileImage}
                          alt={producer.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg mb-3 shadow-lg group-hover:shadow-xl transition"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">No Photo</span>
                        </div>
                      )}
                      <p className="font-semibold text-sm">{producer.name}</p>
                      <p className="text-xs text-gray-400">{producer.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">YOU MIGHT ALSO LIKE</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {similarMovies.slice(0, 10).map((similarMovie) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg z-10 font-bold"
            >
              ✕ Close
            </button>

            <iframe
              className="w-full aspect-video rounded-lg shadow-2xl"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
