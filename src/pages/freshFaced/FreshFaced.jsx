import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import PauseIcon from "../../assets/Icons/PauseIcon";
import PlayIcon from "../../assets/Icons/PlayIcon";

gsap.registerPlugin(ScrollTrigger);

function FreshFaced() {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? video.play() : video.pause();
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(wrapperRef.current, {
        width: "1100px",
        borderRadius: "24px",
        overflow: "hidden",
      });

      gsap.to(wrapperRef.current, {
        width: "100%",
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "+=600",
          scrub: true,
          markers: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex justify-center items-center bg-black"
    >
      <div
        ref={wrapperRef}
        className="relative w-full flex justify-center items-center"
      >
        <video
          ref={videoRef}
          src="./src/assets/Videos/waves-video.mp4"
          muted
          playsInline
          autoPlay
          onPlay={() => setIsPaused(false)}
          onPause={() => setIsPaused(true)}
          className="w-full h-200 object-cover"
        />

        <button
          onClick={toggleVideo}
          aria-label={isPaused ? "Play video" : "Pause video"}
          className="absolute top-5 right-5 z-30 h-10 w-10 bg-black/60 rounded-full flex items-center justify-center cursor-pointer"
        >
          {isPaused ? <PlayIcon size={20} /> : <PauseIcon size={20} />}
        </button>
      </div>
    </section>
  );
}

export default FreshFaced;
