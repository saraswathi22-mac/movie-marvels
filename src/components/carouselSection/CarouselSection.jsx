import { useState, useCallback } from "react";
import Carousel from "../carousel/Carousel";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";
import useFetch from "../../hooks/useFetch";

const CarouselSection = ({
  title,
  fetchPath,      // function that returns API path
  tabs = [],
  defaultValue,
  endpointType    // "media" | "time"
}) => {
  const [endpoint, setEndpoint] = useState(defaultValue);

  const { data, loading } = useFetch(fetchPath(endpoint));

  const onTabChange = useCallback(
    (tab) => {
      if (endpointType === "time") {
        setEndpoint(tab.toLowerCase());
      } else {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
      }
    },
    [endpointType]
  );

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="carouselHeader">
          <span className="carouselTitle">{title}</span>

          {tabs.length > 0 && (
            <SwitchTabs
              data={tabs}
              onTabChange={onTabChange}
            />
          )}
        </div>
      </ContentWrapper>

      <Carousel
        data={data?.results || []}
        loading={loading}
        endpoint={endpointType === "media" ? endpoint : "movie"}
      />
    </div>
  );
};

export default CarouselSection;
