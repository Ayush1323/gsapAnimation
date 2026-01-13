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
    const getResponsiveValues = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        return {
          initialWidth: "calc(100% - 32px)",
          borderRadius: "24px",
          scrollDistance: "+=300",
          startTrigger: "top 85%",
        };
      } else if (width < 768) {
        return {
          initialWidth: "90%",
          borderRadius: "28px",
          scrollDistance: "+=350",
          startTrigger: "top 82%",
        };
      } else if (width < 1024) {
        return {
          initialWidth: "85%",
          borderRadius: "32px",
          scrollDistance: "+=400",
          startTrigger: "top 80%",
        };
      } else if (width < 1280) {
        return {
          initialWidth: "900px",
          borderRadius: "36px",
          scrollDistance: "+=500",
          startTrigger: "top 80%",
        };
      } else {
        return {
          initialWidth: "1100px",
          borderRadius: "40px",
          scrollDistance: "+=600",
          startTrigger: "top 80%",
        };
      }
    };

    const values = getResponsiveValues();

    const ctx = gsap.context(() => {
      gsap.set(wrapperRef.current, {
        width: values.initialWidth,
        borderRadius: values.borderRadius,
        overflow: "hidden",
      });

      gsap.to(wrapperRef.current, {
        width: "100%",
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: values.startTrigger,
          end: values.scrollDistance,
          scrub: true,
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
            className="w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-220 object-cover"
          />

          <button
            onClick={toggleVideo}
            aria-label={isPaused ? "Play video" : "Pause video"}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-30 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95"
          >
            {isPaused ? (
              <PlayIcon size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
            ) : (
              <PauseIcon size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
            )}
          </button>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col gap-2 sm:gap-3 md:gap-4 bg-black/20 justify-center items-center px-4 sm:px-6 md:px-8">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-semibold text-[#f5f5f7] leading-[1.2] text-center">
              macOS Tahoe
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[80px] font-semibold text-[#f5f5f7] leading-[1.1] sm:leading-none text-center max-w-[90%] sm:max-w-full">
              Fresh faced. <br />
              Timelessly Mac.
            </h3>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-15 max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-220 mx-auto px-5 sm:px-6 md:px-8 lg:px-0">
        <p className="text-base sm:text-lg md:text-[19px] lg:text-[21px] font-semibold text-[#86868b] leading-[1.24] sm:leading-[1.28] md:leading-[1.2]">
          macOS Tahoe introduces Liquid Glass,{" "}
          <span className="text-white">a refined yet familiar look.</span> With
          new ways to boost your productivity, work seamlessly with iPhone and
          get even more from Apple Intelligence, it's the most beautiful and
          powerful version of macOS yet.
        </p>
        <p className="text-base sm:text-lg md:text-[19px] lg:text-[21px] hover:underline text-[#2997ff] cursor-pointer mt-2 sm:mt-3 inline-block transition-opacity hover:opacity-80">
          Learn more about macOS Tahoe {">"}
        </p>
      </div>
    </>
  );
}

export default FreshFaced;