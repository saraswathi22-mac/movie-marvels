import { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        hidePopup();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Lock scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto"; // Restore scroll
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="videoPopup visible"
      role="dialog"
      aria-modal="true"
    >
      <div className="opacityLayer" onClick={hidePopup}></div>

      <div className="videoPlayer">
        <button
          className="closeBtn"
          onClick={hidePopup}
          aria-label="Close video"
        >
          ✕
        </button>

        {videoId && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            playing
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
};

export default VideoPopup;