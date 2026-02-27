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

        {!loading ? (
          videos.length > 0 ? (
            <div className="videos">
              {videos.map((video) => {
                if (!video?.key) return null;

                return (
                  <div
                    key={video?.id}
                    className="videoItem"
                    onClick={() => {
                      setVideoId(video.key);
                      setShow(true);
                    }}
                  >
                    <div className="videoThumbnail">
                      <Img
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
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
          ) : (
            <div className="noVideos">
              No videos available.
            </div>
          )
        ) : (
          <div className="videoSkeleton">
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <SkeletonItem key={index} />
              )
            )}
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