import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);

    const res = await fetchDataFromApi(`/search/multi?query=${query}&page=1`);

    setData(res?.results || []);
    setPageNum(2);
    setTotalPages(res?.total_pages || 1);

    setLoading(false);
  };

  const fetchNextPageData = async () => {
    const res = await fetchDataFromApi(
      `/search/multi?query=${query}&page=${pageNum}`
    );

    setData((prev) => [...prev, ...(res?.results || [])]);
    setPageNum((prev) => prev + 1);
  };

  useEffect(() => {
    setData([]);
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}

      {!loading && (
        <ContentWrapper>
          {data.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search results of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data.length}
                next={fetchNextPageData}
                hasMore={pageNum <= totalPages}
                loader={<Spinner />}
              >
                {data.map((item, index) => {
                  if (item.media_type === "person") return null;

                  return (
                    <MovieCard
                      key={`${item.id}-${index}`}
                      data={item}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;