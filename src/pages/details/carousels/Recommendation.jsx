import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  const results = data?.results || [];

  // Don't render section if no recommendations
  if (!loading && results.length === 0) {
    return null;
  }

  return (
    <Carousel
      data={results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;