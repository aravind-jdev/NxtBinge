import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies, searchMovies } from "../api/movieApi";

function Home() {
const [movies, setMovies] = useState([]);
const [query, setQuery] = useState("");

useEffect(() => {
const fetchMovies = async () => {
const data = await getTrendingMovies();
setMovies(data);
};
fetchMovies();
}, []);

useEffect(() => {
const fetchSearch = async () => {
if (query.trim() === "") {
const data = await getTrendingMovies();
setMovies(data);
} else {
const data = await searchMovies(query);
setMovies(data);
}
};


fetchSearch();


}, [query]);

return (
<> <Navbar setQuery={setQuery} />


  <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))
    ) : (
      <p>No movies found...</p>
    )}
  </div>
</>

);
}

export default Home;
