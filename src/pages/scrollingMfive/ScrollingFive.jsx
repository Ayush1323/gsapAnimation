import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import PauseIcon from "../../assets/Icons/PauseIcon";
import PlayIcon from "../../assets/Icons/PlayIcon";
import bubbleVideo from "../../assets/Videos/scrollingMfive/bubble.mp4";
import bubbleInnerVideo from "../../assets/Images/scrollingMfive/video.mp4";

gsap.registerPlugin(ScrollTrigger);

function ScrollingFive() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const imageRef = useRef(null);
  const videoRefInner = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const paragraphRef2 = useRef(null);
  const paragraphRef3 = useRef(null);
  const buttonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !svgRef.current ||
      !videoRef.current ||
      !videoRefInner.current
    )
      return;

    const mainVideo = videoRef.current;
    const innerVideo = videoRefInner.current;
    gsap.set(buttonRef.current, {
      opacity: 1,
    });

    innerVideo.pause();

    gsap.set(innerVideo, {
      opacity: 0,
      pointerEvents: "none",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2400",
        scrub: true,
        pin: true,
      },
    });

    tl.to(mainVideo, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "none",
    });

    tl.from(buttonRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    tl.fromTo(
      svgRef.current,
      {
        scale: 400,
        x: "-50%",
        y: "-50%",
      },
      {
        scale: 1,
        x: "0%",
        y: "0%",
        duration: 3,
        ease: "power2.out",
      }
    );

    tl.to(buttonRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    tl.to(innerVideo, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "none",
    });

    tl.addLabel("innerPhase");

    tl.to(
      {},
      {
        duration: 7,
        ease: "none",
        onUpdate: () => {
          if (!innerVideo.duration) return;

          const st = tl.scrollTrigger;
          const progress = st.progress;

          const videoStart = 0.4;
          const videoProgress = Math.max(
            0,
            (progress - videoStart) / (1 - videoStart)
          );

          innerVideo.currentTime = videoProgress * innerVideo.duration;
        },
      },
      "innerPhase"
    );

    tl.fromTo(
      textRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2.5,
        ease: "power3.out",
      },
      "innerPhase"
    );

    tl.fromTo(
      paragraphRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 5,
        ease: "power3.out",
      },
      "innerPhase+=1"
    );

    tl.fromTo(
      paragraphRef2.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 7,
        ease: "power3.out",
      },
      "innerPhase+=4"
    );

    tl.to(paragraphRef.current, { duration: 2 }, "innerPhase+=4");

    tl.to(
      paragraphRef.current,
      {
        opacity: 0,
        duration: 0.1,
        ease: "power3.inOut",
      },
      "innerPhase+=6"
    );

    tl.fromTo(
      paragraphRef3.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 5,
        ease: "power3.out",
      },
      "innerPhase+=6.5"
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div ref={sectionRef} className="relative w-full h-screen">
        {/* Video */}
        <video
          ref={videoRef}
          src={bubbleVideo}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        />

        {/* Play / Pause Button */}
        <button
          ref={buttonRef}
          onClick={togglePlay}
          className="absolute top-5 right-5 z-10 bg-black/40 backdrop-blur-md p-2.5 rounded-full hover:bg-black/60 transition cursor-pointer"
        >
          {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </button>

        {/* Big SVG Text */}
        <svg
          ref={svgRef}
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <g>
            <path d="M1676,0H0v1080h1920V0h-244ZM1014.246,551.146h10.213l.041.294c.886,5.107,5.529,9.033,11.946,9.033,7.259,0,12.282-4.981,12.282-12.113v-.084c0-6.965-5.107-11.946-12.24-11.946-3.46,0-6.459,1.056-8.78,2.997-1.139.928-2.153,2.11-2.871,3.46h-9.497l2.913-35.413h37.396v8.906h-28.702l-1.688,18.36h.211c2.66-4.093,7.681-6.5,13.802-6.5,11.607,0,19.965,8.4,19.965,19.965v.084h0c0,12.535-9.413,21.146-22.876,21.146-12.662,0-21.273-7.556-22.075-17.644l.002.004-.041-.55ZM993.013,524.979l-17.558,43.305h-7.387l-17.558-43.305h-.294v43.305h-9.835v-60.907h12.578l18.655,46.512h.294l18.655-46.512h12.578v60.907h-9.79v-43.305h-.338ZM899.318,492.808c2.977-3.502,7.941-6.115,12.069-6.27.105.469.156,1.045.156,1.62,0,4.233-1.829,8.464-4.337,11.495-2.768,3.344-7.419,5.852-11.128,5.852v-.002c-.419,0-.837-.052-1.097-.105-.052-.209-.156-.837-.156-1.462,0-4.283,2.143-8.464,4.493-11.128h0ZM895.661,510.152c3.186,0,8.255-3.762,14.472-3.762,2.299,0,10.71.209,16.248,8.15-.469.365-8.83,5.12-8.83,15.674,0,12.174,10.605,16.511,10.972,16.613-.105.26-1.725,5.903-5.643,11.651h0c-3.5,5.016-7.21,10.136-12.748,10.136s-7.053-3.291-13.48-3.291-8.569,3.396-13.636,3.396-8.673-4.702-12.748-10.449c-4.755-6.791-8.621-17.292-8.621-27.219,0-15.988,10.396-24.452,20.637-24.452,5.38,0,9.927,3.553,13.375,3.553Z"></path>
          </g>
        </svg>

        <div ref={imageRef} className="w-full flex justify-center">
          <div
            ref={textRef}
            className="flex flex-col justify-center items-center absolute xl2:top-[10%] xl:top-[17%] top-[20%] left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="text-2xl font-semibold text-[#f5f5f7]">
              Performance
            </div>
            <div className="2xl:text-[80px] xl2:text-[70px] xl:text-[60px] text-[64px] whitespace-nowrap font-semibold inline-block bg-[linear-gradient(90deg,var(--color-apple-1),var(--color-apple-2)_31%,var(--color-apple-3)_68%,var(--color-apple-4))] bg-clip-text text-transparent">
              Happily ever faster.
            </div>
          </div>
          <video
            ref={videoRefInner}
            src={bubbleInnerVideo}
            alt=""
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            autoPlay
            muted
            playsInline
          />
          <p
            ref={paragraphRef}
            className="absolute 2xl:bottom-35 lg:bottom-20 bottom-35 font-semibold left-1/2 transform -translate-x-1/2 z-10 text-[#86868b] lg:max-w-220 w-full lg:px-0 px-10 leading-[1.2] text-[21px] text-center"
          >
            The M5 chip joins M4 Pro and M4 Max to create the most advanced
            series of chips ever built for a pro laptop. Each chip delivers
            phenomenal single- and multithreaded CPU performance and faster
            unified memory —{" "}
            <span className="text-[#f5f5f7] font-semibold">
              giving you the kind of speed you’ve never thought possible.
            </span>{" "}
            And with powerful Neural Accelerators in the M5 chip, you can fly
            through AI tasks at mind-bending speeds.
          </p>
          <p
            ref={paragraphRef2}
            className="absolute top-1/2 right-5 lg:right-10 xl:right-[10%] 2xl:right-[20%] 3xl:-translate-x-1/2 transform -translate-y-1/2 z-10 leading-[1.2] max-w-60 2xl:text-[32px] lg:text-3xl text-2xl max-lg:max-w-45 font-semibold inline-block bg-[linear-gradient(90deg,var(--color-apple-1),var(--color-apple-2)_31%,var(--color-apple-3)_68%,var(--color-apple-4))] bg-clip-text text-transparent"
          >
            Up to 6x faster AI performance than M1
            <sup className="text-apple-4 font-semibold underline text-xl">
              6
            </sup>
          </p>
          <p
            ref={paragraphRef3}
            className="absolute 2xl:bottom-40 lg:bottom-25 bottom-40 font-semibold left-1/2 transform -translate-x-1/2 z-10 text-[#86868b] lg:max-w-220 w-full lg:px-0 px-10 leading-[1.2] text-[21px] text-center"
          >
            A powerful Neural Accelerator is built into each GPU core of the M5
            chip, which{" "}
            <span className="text-[#f5f5f7] font-semibold">
              dramatically speeds up AI tasks
            </span>{" "}
            like image generation from diffusion models and large language model
            (LLM) prompt processing. The 16-core Neural Engine drives Apple
            Intelligence features, making on-device AI powerful and energy
            efficient.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScrollingFive;
