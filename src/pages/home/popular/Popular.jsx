import CarouselSection from "../../../components/carouselSection/CarouselSection";

const Popular = () => {
  return (
    <CarouselSection
      title="What's Popular"
      tabs={["Movies", "TV Shows"]}
      defaultValue="movie"
      endpointType="media"
      fetchPath={(endpoint) =>
        `/${endpoint}/popular`
      }
    />
  );
};

export default Popular;
