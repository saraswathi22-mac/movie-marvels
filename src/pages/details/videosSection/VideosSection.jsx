import { useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const videos = data?.results || [];

  const handleVideoClick = (key) => {
    setVideoId(key);
    setShow(true);
  };

  const SkeletonItem = () => (
    <div className="skItem">
      <div className="thumb skeleton"></div>
      <div className="row skeleton"></div>
      <div className="row2 skeleton"></div>
    </div>
  );

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">
          Official Videos
        </div>

        {loading ? (
          <div className="videoSkeleton">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </div>
        ) : !videos.length ? (
          <div className="noVideos">
            No videos available.
          </div>
        ) : (
          <div className="videos">
            {videos.map((video) => {
              if (!video?.key) return null;

              return (
                <div
                  key={video.id || video.key}
                  role="button"
                  tabIndex={0}
                  className="videoItem"
                  onClick={() => handleVideoClick(video.key)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleVideoClick(video.key)
                  }
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      loading="lazy"
                    />
                    <PlayIcon />
                  </div>

                  <div className="videoTitle">
                    {video?.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>

      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;