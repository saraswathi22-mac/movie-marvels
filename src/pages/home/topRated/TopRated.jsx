import CarouselSection from "../../../components/carouselSection/CarouselSection";

const TopRated = () => {
  return (
    <CarouselSection
      title="Top Rated"
      tabs={["Movies", "TV Shows"]}
      defaultValue="movie"
      endpointType="media"
      fetchPath={(endpoint) =>
        `/${endpoint}/top_rated`
      }
    />
  );
};

export default TopRated;
