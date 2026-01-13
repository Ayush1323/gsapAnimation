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
        // markers: true,
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
        slidesPerView={1.05}
        centeredSlides={false}
        spaceBetween={20}
        allowTouchMove={true}
        slidesOffsetAfter={16}
        slidesOffsetBefore={16}
        slideToClickedSlide
        speed={1000}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          1200: {
            slidesPerView: 1.5,
            allowTouchMove: false,
            centeredSlides: true,
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
          },
        }}
      >
        {SLIDER_DATA.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative cursor-pointer">
            {slide.video ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                poster={slide.poster}
                muted
                playsInline
                preload="metadata"
                className="w-full rounded-4xl object-cover max-xl:h-155 max-lg:h-167.5 max-md:h-120"
              >
                {/* Mobile video */}
                <source
                  src={slide.videoMobile}
                  media="(max-width: 767px)"
                  type="video/mp4"
                />

                {/* Desktop video */}
                <source
                  src={slide.video}
                  media="(min-width: 768px)"
                  type="video/mp4"
                />
              </video>
            ) : (
              <div className="w-full rounded-4xl overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full  rounded-4xl max-md:h-120 max-xl:object-cover max-xl:h-155 max-lg:h-167.5 ${
                    slide.scale && activeIndex === index
                      ? "transition-all scale-110 ease-in-out duration-2500 delay-700"
                      : ""
                  }`}
                />
              </div>
            )}

            <div className="absolute md:top-10 top-2 md:left-10 left-2 max-md:m-4 pointer-events-none">
              <h2
                ref={(el) => (titleRefs.current[index] = el)}
                className={`md:text-[28px] text-base max-w-160 font-semibold leading-[1.2] ${
                  index === 2 ? "text-black" : "text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sticky bottom-8 z-10 md:my-20">
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
