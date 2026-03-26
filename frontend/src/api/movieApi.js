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

/* 🎞 Get Movie Trailers */
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

/* 🎬 Get Similar Movies */
export const getSimilarMovies = async (id) => {
try {
const response = await axios.get(`${BASE_URL}/${id}/similar`);
console.log("SIMILAR:", response.data);
return response.data.data || [];
} catch (error) {
console.error("Error fetching similar movies:", error);
return [];
}
};

/* 🎲 Get Random Movie (with optional filters) */
export const getRandomMovie = async (filters = {}) => {
try {
const params = new URLSearchParams();
if (filters.genre) params.append("genre", filters.genre);
if (filters.language) params.append("language", filters.language);
if (filters.country) params.append("country", filters.country);
if (filters.year) params.append("year", filters.year);

const queryString = params.toString();
const url = queryString ? `${BASE_URL}/random?${queryString}` : `${BASE_URL}/random`;

const response = await axios.get(url);
console.log("RANDOM:", response.data);
return response.data.data;
} catch (error) {
console.error("Error fetching random movie:", error);
return null;
}
};

/* 🎭 Get Genres */
export const getGenres = async () => {
try {
const response = await axios.get(`${BASE_URL}/genres`);
console.log("GENRES:", response.data);
return response.data.data || [];
} catch (error) {
console.error("Error fetching genres:", error);
return [];
}
};

/* 🌐 Get Languages */
export const getLanguages = async () => {
try {
const response = await axios.get(`${BASE_URL}/languages`);
console.log("LANGUAGES:", response.data);
return response.data.data || [];
} catch (error) {
console.error("Error fetching languages:", error);
return [];
}
};

/* 🌍 Get Countries */
export const getCountries = async () => {
try {
const response = await axios.get(`${BASE_URL}/countries`);
console.log("COUNTRIES:", response.data);
return response.data.data || [];
} catch (error) {
console.error("Error fetching countries:", error);
return [];
}
};
