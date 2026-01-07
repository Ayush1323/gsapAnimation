import { useState } from "react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PrevIcon from "../../assets/Icons/PrevIcon";
import NextIcon from "../../assets/Icons/NextIcon";

const LiquidGlassSlider = ({ slides }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative bg-black py-20 ">
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        slidesOffsetBefore={350}
        slidesOffsetAfter={350}
        speed={1200}
        allowTouchMove={false}
        spaceBetween={20}
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
              className="apple-slide max-w-175! w-auto! flex flex-col"
            >
              {/* MEDIA */}
              <div className="relative w-full h-[420px] bg-black overflow-hidden rounded-4xl">
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
              <div className="mt-6 ml-6 max-w-120 min-h-[120px] text-white">
                {item.content}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* APPLE ARROWS */}
      <div className="absolute -bottom-10 right-80 flex gap-3 z-20">
        <button
          className={`apple-prev w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center cursor-pointer text-white
      ${
        isBeginning
          ? "bg-white/5 cursor-not-allowed"
          : "bg-white/10 hover:bg-white/20"
      }`}
          disabled={isBeginning}
        >
          {/* PREV */}
          <PrevIcon size={22} />
        </button>

        <button
          className={`apple-next w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center cursor-pointer text-white
      ${
        isEnd
          ? "bg-white/5 cursor-not-allowed"
          : "bg-white/10 hover:bg-white/20"
      }`}
          disabled={isEnd}
        >
          {/* NEXT */}
          <NextIcon size={22} />
        </button>
      </div>
    </section>
  );
};

export default LiquidGlassSlider;
