import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import PauseIcon from "../../assets/Icons/PauseIcon";
import PlayIcon from "../../assets/Icons/PlayIcon";
import wavesVideo from "../../assets/Videos/waves-video.mp4";

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
        borderRadius: "40px",
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
          // markers: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
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
            src={wavesVideo}
            muted
            playsInline
            loop
            autoPlay
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            className="w-full h-220 object-cover"
          />

          <button
            onClick={toggleVideo}
            aria-label={isPaused ? "Play video" : "Pause video"}
            className="absolute top-5 right-5 z-30 h-10 w-10 bg-black/60 rounded-full flex items-center justify-center cursor-pointer"
          >
            {isPaused ? <PlayIcon size={20} /> : <PauseIcon size={20} />}
          </button>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 h-full w-full bg-black/20 justify-center items-center">
            <h2 className="text-[24px] font-semibold text-[#f5f5f7] leading-[1.2] text-center">
              macOS Tahoe
            </h2>
            <h3 className="text-[80px] font-semibold text-[#f5f5f7] leading-none text-center">
              Fresh faced. <br />
              Timelessly Mac.
            </h3>
          </div>
        </div>
      </section>
      <div className="mt-15 max-w-220 mx-auto">
        <p className="text-[21px]  font-semibold text-[#86868b] leading-[1.2]">
          macOS Tahoe introduces Liquid Glass,{" "}
          <span className="text-white">a refined yet familiar look.</span> With
          new ways to boost your productivity, work seamlessly with iPhone and
          get even more from Apple Intelligence, it’s the most beautiful and
          powerful version of macOS yet.
        </p>
        <p className="text-[21px] hover:underline text-[#2997ff] cursor-pointer mt-3">
          Learn more about macOS Tahoe {">"}
        </p>
      </div>
    </>
  );
}

export default FreshFaced;
