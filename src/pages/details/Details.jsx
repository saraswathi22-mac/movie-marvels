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

  // ✅ Validate route params
  const validMediaTypes = ["movie", "tv"];

  if (!mediaType || !id || !validMediaTypes.includes(mediaType)) {
    return <PageNotFound />;
  }

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } =
    useFetch(`/${mediaType}/${id}/credits`);

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