import { useRef, useState } from "react";
import PlayIcon from "../../assets/Icons/PlayIcon";
import PauseIcon from "../../assets/Icons/PauseIcon";

function FreshFaced() {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src="./src/assets/Videos/waves-video.mp4"
        muted
        playsInline
        autoPlay
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        className="w-full h-full object-cover"
      />

      <button
        onClick={toggleVideo}
        aria-label={isPaused ? "Play video" : "Pause video"}
        className="absolute top-5 right-5 z-30 h-10 w-10 bg-black/60 rounded-full flex items-center justify-center cursor-pointer"
      >
        {isPaused ? <PlayIcon size={20} /> : <PauseIcon size={20} />}
      </button>
    </div>
  );
}

export default FreshFaced;
