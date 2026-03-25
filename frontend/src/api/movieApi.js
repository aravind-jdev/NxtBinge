import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/movies";

/* 🎬 Get Trending Movies */
export const getTrendingMovies = async () => {
try {
const response = await axios.get(`${BASE_URL}/trending`);
console.log("TRENDING:", response.data);
return response.data || [];
} catch (error) {
console.error("Error fetching trending movies:", error);
return [];
}
};

/* 🔍 Search Movies */
export const searchMovies = async (query) => {
try {
const response = await axios.get(
`${BASE_URL}/search?query=${query}`
);
console.log("SEARCH:", response.data);
return response.data || [];
} catch (error) {
console.error("Error searching movies:", error);
return [];
}
};

/* 🎬 Get Movie Details */
export const getMovieDetails = async (id) => {
try {
const response = await axios.get(`${BASE_URL}/${id}`);
console.log("DETAILS:", response.data);
return response.data;
} catch (error) {
console.error("Error fetching movie details:", error);
return null;
}
};

/* 🎞 Get Movie Trailers (for next step 😉) */
export const getMovieVideos = async (id) => {
try {
const response = await axios.get(`${BASE_URL}/${id}/videos`);
console.log("VIDEOS:", response.data);
return response.data || [];
} catch (error) {
console.error("Error fetching movie videos:", error);
return [];
}
};
