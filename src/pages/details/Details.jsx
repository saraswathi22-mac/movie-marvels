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

  const { data, loading } = useFetch(
    isValidRoute ? `/${mediaType}/${id}/videos` : null
  );

  const { data: credits, loading: creditsLoading } =
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
        video={data?.results?.[0]}
        crew={credits?.crew}
      />

      <Cast
        data={credits?.cast}
        loading={creditsLoading}
      />

      <VideosSection
        data={data}
        loading={loading}
      />

      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;