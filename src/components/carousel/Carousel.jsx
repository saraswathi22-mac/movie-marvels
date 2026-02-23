import React, { useRef, useState, useEffect } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "/assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data = [], loading, endpoint }) => {
  const carouselContainer = useRef(null);
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // ---------------- SCROLL NAVIGATION ----------------
  const navigation = (dir) => {
    const container = carouselContainer.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ---------------- CHECK SCROLL POSITION ----------------
  const checkScrollPosition = () => {
    const container = carouselContainer.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  // ---------------- ADD SCROLL LISTENER ----------------
  useEffect(() => {
    const container = carouselContainer.current;
    if (!container) return;

    checkScrollPosition();

    container.addEventListener("scroll", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
    };
  }, [data]);

  const SkeletonItem = () => (
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  );

  return (
    <div className="carousel">
      <ContentWrapper>
        {/* LEFT ARROW */}
        <BsFillArrowLeftCircleFill
          className={`carouselLeftNav arrow ${
            !showLeft ? "disabled" : ""
          }`}
          onClick={() => showLeft && navigation("left")}
        />

        {/* RIGHT ARROW */}
        <BsFillArrowRightCircleFill
          className={`carouselRightNav arrow ${
            !showRight ? "disabled" : ""
          }`}
          onClick={() => showRight && navigation("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data.map((item) => {
              const posterUrl = item?.poster_path
                ? url?.poster + item.poster_path
                : PosterFallback;

              const rating = item?.vote_average
                ? item.vote_average.toFixed(1)
                : "0.0";

              const genres =
                item?.genre_ids?.slice(0, 2) || [];

              const mediaType =
                item?.media_type || endpoint;

              const releaseDate =
                item?.release_date ||
                item?.first_air_date;

              return (
                <div
                  key={item?.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(
                      `/${mediaType}/${item?.id}`
                    )
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={rating} />
                    <Genres data={genres} />
                  </div>

                  <div className="textBlock">
                    <span className="title">
                      {item?.title || item?.name}
                    </span>

                    {releaseDate && (
                      <span className="date">
                        {dayjs(releaseDate).format(
                          "MMM D, YYYY"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <SkeletonItem key={index} />
              )
            )}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;