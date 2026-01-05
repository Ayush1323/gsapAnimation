import { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SLIDER_DATA } from "../../utils/slider/Slider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Pagination from "../../components/Pagination";

gsap.registerPlugin(ScrollTrigger);

function Slider() {
  const titleRefs = useRef([]);
  const videoRefs = useRef([]);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const paginationRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  const playActiveVideo = useCallback(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
  }, []);

  useEffect(() => {
    const current = titleRefs.current[activeIndex];
    const prev = titleRefs.current[prevIndexRef.current];

    if (current) {
      const direction = activeIndex > prevIndexRef.current ? 550 : -550;

      gsap.fromTo(
        current,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    if (prev && prev !== current) {
      gsap.to(prev, {
        opacity: 0,
        x: activeIndex > prevIndexRef.current ? -150 : 150,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: playActiveVideo,
        onEnterBack: playActiveVideo,
        onLeave: pauseAllVideos,
        onLeaveBack: pauseAllVideos,
        markers: true,
      });

      gsap.from(paginationRef.current, {
        opacity: 0,
        y: 200,
        duration: 1.6,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 61%",
        },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    playActiveVideo();
  }, [playActiveVideo]);

  return (
    <div ref={sectionRef}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        slidesPerView={1.5}
        centeredSlides
        spaceBetween={20}
        allowTouchMove={false}
        slideToClickedSlide
        speed={1000}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {SLIDER_DATA.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative cursor-pointer">
            {slide.video ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={slide.video}
                poster={slide.poster}
                muted
                playsInline
                preload="metadata"
                className="w-full rounded-4xl object-cover"
              />
            ) : (
              <div className="w-full rounded-4xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full rounded-4xl ${
                    slide.scale && activeIndex === index
                      ? "transition-all scale-110 ease-in-out duration-2500 delay-700"
                      : ""
                  }`}
                />
              </div>
            )}

            <div className="absolute top-10 left-10 pointer-events-none">
              <h2
                ref={(el) => (titleRefs.current[index] = el)}
                className={`text-[28px] max-w-160 font-semibold leading-[1.2] ${
                  index === 2 ? "text-black" : "text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sticky bottom-8 z-10 my-20">
        <Pagination
          ref={paginationRef}
          total={SLIDER_DATA.length}
          activeIndex={activeIndex}
          onChange={(index) => swiperRef.current.slideTo(index)}
          autoplayDelay={5000}
        />
      </div>
    </div>
  );
}

export default Slider;
