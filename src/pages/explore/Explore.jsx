import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import PageNotFound from "../PageNotFound/PageNotFound";

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const { mediaType } = useParams();

  // ✅ Validate route param
  const validMediaTypes = ["movie", "tv"];
  if (!validMediaTypes.includes(mediaType)) {
    return <PageNotFound />;
  }

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);

  const filtersRef = useRef({});

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const res = await fetchDataFromApi(
        `/discover/${mediaType}`,
        filtersRef.current
      );

      setData(res);
      setPageNum(2);
    } catch (err) {
      console.error("Explore Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const res = await fetchDataFromApi(
        `/discover/${mediaType}`,
        { ...filtersRef.current, page: pageNum }
      );

      setData((prev) => ({
        ...prev,
        results: [...(prev?.results || []), ...res.results],
      }));

      setPageNum((prev) => prev + 1);
    } catch (err) {
      console.error("Pagination Error:", err);
    }
  };

  useEffect(() => {
    filtersRef.current = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);

      if (action.action !== "clear") {
        filtersRef.current.sort_by = selectedItems.value;
      } else {
        delete filtersRef.current.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);

      if (action.action !== "clear") {
        const genreId = selectedItems.map((g) => g.id).join(",");
        filtersRef.current.with_genres = genreId;
      } else {
        delete filtersRef.current.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv"
              ? "Explore TV Shows"
              : "Explore Movies"}
          </div>

          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />

            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {loading && <Spinner initial />}

        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item) => (
                  <MovieCard
                    key={item.id}
                    data={item}
                    mediaType={mediaType}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;