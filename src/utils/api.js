import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

if (!TMDB_TOKEN) {
  throw new Error("TMDB token is missing. Check your .env file.");
}

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchDataFromApi = async (url, params = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, {
      headers,
      params,
      timeout: 10000,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
