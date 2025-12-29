import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { SLIDER_DATA } from "../../utils/slider/Slider";
import gsap from "gsap";

function Slider() {
  const titleRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

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

  return (
    <Swiper
      slidesPerView={1.5}
      centeredSlides
      spaceBetween={20}
      allowTouchMove={false}
      slideToClickedSlide
      pagination={{ clickable: true }}
      speed={1500}
      modules={[Pagination]}
      className="mySwiper"
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
    >
      {SLIDER_DATA.map((slide, index) => (
        <SwiperSlide
          key={slide.id}
          className="rounded-4xl overflow-hidden relative cursor-pointer"
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full ${
              slide.scale &&
              activeIndex === index &&
              "transition-all scale-110 ease-in-out duration-2500 delay-700"
            }`}
          />

          {/* Title (always mounted) */}
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
  );
}

export default Slider;
