import CarouselSection from "../../../components/carouselSection/CarouselSection";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/similar`
  );

  const results = data?.results || [];

  const title =
    mediaType === "tv"
      ? "Similar TV Shows"
      : "Similar Movies";

  if (!loading && results.length === 0) {
    return null;
  }

  return (
    <CarouselSection
      title={title}
      fetchPath={() => `/${mediaType}/${id}/similar`}
      defaultValue=""
      tabs={[]}
      endpointType="media"
    />
  );
};

export default Similar;