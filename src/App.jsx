import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
  }, [dispatch]);

  const fetchApiConfig = async () => {
    try {
      const res = await fetchDataFromApi("/configuration");

      const imageUrls = {
        backdrop: `${res.images.secure_base_url}original`,
        poster: `${res.images.secure_base_url}original`,
        profile: `${res.images.secure_base_url}original`,
      };

      dispatch(getApiConfiguration(imageUrls));
    } catch (error) {
      console.error("Failed to fetch API configuration", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const endPoints = ["tv", "movie"];

      const responses = await Promise.all(
        endPoints.map((type) => fetchDataFromApi(`/genre/${type}/list`)),
      );

      const allGenres = {};
      responses.forEach(({ genres }) => {
        genres.forEach((genre) => {
          allGenres[genre.id] = genre;
        });
      });

      dispatch(getGenres(allGenres));
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  };

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
