import CarouselSection from "../../../components/carouselSection/CarouselSection";

const Trending = () => {
  return (
    <CarouselSection
      title="Trending"
      tabs={["Day", "Week"]}
      defaultValue="day"
      endpointType="time"
      fetchPath={(endpoint) =>
        `/trending/movie/${endpoint}`
      }
    />
  );
};

export default Trending;
