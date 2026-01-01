import { useState } from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const LiquidGlassSlider = ({ slides }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <Swiper
        modules={[Navigation]}
        slidesPerView='auto'
        centeredSlides
        spaceBetween={40}
        navigation={{
          nextEl: ".apple-next",
          prevEl: ".apple-prev",
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="pl-20"
      >
        {slides.map((item, i) => {
          const isVideo = item.image.endsWith(".mp4");

          return (
            <SwiperSlide
              key={i}
              className="apple-slide !max-w-[700px] !w-auto"
            >
              {/* FIXED SIZE CONTAINER */}
              <div className="relative h-[450px] rounded-[32px] overflow-hidden bg-black">
                {isVideo ? (
                  <video
                    src={item.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* TEXT */}
              <div className="mt-6 max-w-[420px] text-white">
                <h3 className="text-base font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* APPLE ARROWS */}
      <div className="absolute bottom-10 right-10 flex gap-3 z-20">
        <button
          className={`apple-prev w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-white
            ${
              isBeginning
                ? "bg-white/5 opacity-40 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20"
            }`}
          disabled={isBeginning}
        >
          ‹
        </button>

        <button
          className={`apple-next w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-white
            ${
              isEnd
                ? "bg-white/5 opacity-40 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20"
            }`}
          disabled={isEnd}
        >
          ›
        </button>
      </div>

      {/* SCALE EFFECT */}
      <style jsx>{`
        .apple-slide {
          transform: scale(0.9);
          transition: transform 0.6s ease;
        }
        .swiper-slide-active.apple-slide {
          transform: scale(1);
        }
      `}</style>
    </section>
  );
};

export default LiquidGlassSlider;
