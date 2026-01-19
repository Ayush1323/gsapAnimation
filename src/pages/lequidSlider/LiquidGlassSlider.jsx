import { useState } from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NextIcon from "../../assets/Icons/NextIcon";
import PrevIcon from "../../assets/Icons/PrevIcon";

const LiquidGlassSlider = ({ slides }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-20">
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        // Responsive offsets
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        speed={1200}
        allowTouchMove={true} // Enable touch on mobile
        spaceBetween={16}
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
        breakpoints={{
          // Mobile
          320: {
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
            spaceBetween: 12,
          },
          // Tablet
          640: {
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 40,
            spaceBetween: 16,
          },
          // Desktop small
          1024: {
            slidesOffsetBefore: 80,
            slidesOffsetAfter: 80,
            spaceBetween: 20,
          },
          // Desktop medium
          1280: {
            slidesOffsetBefore: 200,
            slidesOffsetAfter: 200,
            spaceBetween: 20,
          },
          // Desktop large
          1536: {
            slidesOffsetBefore: 350,
            slidesOffsetAfter: 350,
            spaceBetween: 20,
            allowTouchMove: false,
          },
        }}
        className="px-5 sm:px-0"
      >
        {slides.map((item, i) => {
          const isVideo = item.image.endsWith(".mp4");

          return (
            <SwiperSlide
              key={i}
              className="apple-slide !w-[280px] sm:!w-[320px] md:!w-[400px] lg:!w-[500px] xl:!w-auto flex flex-col"
            >
              {/* MEDIA */}
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] bg-black shadow-2xl">
                {isVideo ? (
                  <video
                    src={item.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-2xl sm:rounded-3xl lg:rounded-4xl"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-2xl sm:rounded-3xl lg:rounded-4xl"
                    loading="lazy"
                  />
                )}
              </div>

              {/* TEXT */}
              <div className="mt-4 sm:mt-5 md:mt-6 px-2 sm:px-4 md:px-6 max-w-full md:max-w-[90%] lg:max-w-[480px] min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-white text-sm sm:text-base">
                {item.content}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* NAVIGATION BUTTONS */}
      <div className="absolute -bottom-4 sm:bottom-6 md:-bottom-10 right-5 sm:right-10 md:right-20 lg:right-40 xl:right-80 flex gap-2 sm:gap-3 z-20">
        <button
          className={`apple-prev cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 text-white
            ${
              isBeginning
                ? "bg-white/5 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 active:scale-95"
            }`}
          disabled={isBeginning}
          aria-label="Previous slide"
        >
          <PrevIcon size={18} className="sm:w-[22px] sm:h-[22px]" />
        </button>

        <button
          className={`apple-next cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 text-white
            ${
              isEnd
                ? "bg-white/5 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 active:scale-95"
            }`}
          disabled={isEnd}
          aria-label="Next slide"
        >
          <NextIcon size={18} className="sm:w-[22px] sm:h-[22px]" />
        </button>
      </div>
    </section>
  );
};

export default LiquidGlassSlider;