import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SLIDER_DATA } from "../../utils/slider/Slider";
import gsap from "gsap";
import Pagination from "../../components/Pagination";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Slider() {
  const titleRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    titleRefs.current.forEach((title, index) => {
      if (!title) return;

      if (index === activeIndex) {
        const direction = activeIndex > prevIndexRef.current ? 550 : -550;

        gsap.fromTo(
          title,
          { opacity: 0, x: direction },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(title, {
          opacity: 0,
          x: index < activeIndex ? -150 : 150,
          duration: 0.6,
          ease: "power3.inOut",
        });
      }
    });

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  useGSAP(
    () => {
      gsap.from(paginationRef.current, {
        opacity: 0,
        y: 200,
        duration: 2,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 61%",
          // markers: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1.5}
        centeredSlides
        spaceBetween={20}
        allowTouchMove={false}
        slideToClickedSlide
        pagination={{ clickable: true }}
        speed={1500}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {SLIDER_DATA.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative cursor-pointer">
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full rounded-4xl ${
                slide.scale &&
                activeIndex === index &&
                "transition-all scale-110 ease-in-out duration-2500 delay-700"
              }`}
            />

            <div className="absolute top-10 left-10 pointer-events-none">
              <h2
                ref={(el) => (titleRefs.current[index] = el)}
                className={`text-[28px] max-w-160 font-semibold mb-2 leading-[1.2] ${
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
          total={SLIDER_DATA.length}
          activeIndex={activeIndex}
          onChange={(index) => swiperRef.current.slideTo(index)}
          autoplayDelay={5000}
          ref={paginationRef}
        />
      </div>
    </div>
  );
}

export default Slider;
