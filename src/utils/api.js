import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

if (!TMDB_TOKEN) {
  throw new Error("TMDB token is missing. Check your .env file.");
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchDataFromApi = async (url, params = {}) => {
  try {
    const { data } = await api.get(url, { params });
    return data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
