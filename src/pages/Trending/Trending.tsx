import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">Trending Movies</div>
    </div>
  );
};

export default Trending;
