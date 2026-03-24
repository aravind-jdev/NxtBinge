import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.BASE_URL;

export const fetchFromTMDB = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });

    return response.data;
  } catch (error) {
  console.error("FULL ERROR OBJECT:", error);
  console.error("ERROR MESSAGE:", error.message);
  console.error("ERROR CODE:", error.code);
  console.error("ERROR CONFIG:", error.config?.url);

  throw new Error("TMDB Error");
}
};