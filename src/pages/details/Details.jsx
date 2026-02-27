import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import PageNotFound from "../PageNotFound/PageNotFound";

const Details = () => {
  const { mediaType, id } = useParams();

  const validMediaTypes = ["movie", "tv"];
  const isValidRoute =
    mediaType &&
    id &&
    validMediaTypes.includes(mediaType);

  // ✅ Fetch main details once
  const { data, loading } = useFetch(
    isValidRoute ? `/${mediaType}/${id}` : null
  );

  // ✅ Fetch videos
  const { data: videosData, loading: videosLoading } =
    useFetch(
      isValidRoute
        ? `/${mediaType}/${id}/videos`
        : null
    );

  // ✅ Fetch credits
  const { data: creditsData, loading: creditsLoading } =
    useFetch(
      isValidRoute
        ? `/${mediaType}/${id}/credits`
        : null
    );

  if (!isValidRoute) {
    return <PageNotFound />;
  }

  return (
    <div>
      <DetailsBanner
        data={data}
        loading={loading}
        video={videosData?.results?.[0]}
        crew={creditsData?.crew}
      />

      <Cast
        data={creditsData?.cast}
        loading={creditsLoading}
      />

      <VideosSection
        data={videosData}
        loading={videosLoading}
      />

      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;