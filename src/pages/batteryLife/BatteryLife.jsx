import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import BatteryImage from "./BatteryImage";

gsap.registerPlugin(ScrollTrigger);

const batteryStats = [
  {
    label: "Up to",
    value: "24 hours",
    description: (
      <>
        battery life<sup className="underline">3</sup>
      </>
    ),
  },
  {
    label: "Up to",
    value: "14 more hours",
    description: "than Intel-based MacBook Pro",
  },
];

function BatteryLife() {
  const textRef = useRef(null);

  useGSAP(
    () => {
      const children = textRef.current.children;
      
      // Different animation values for different screen sizes
      const getAnimationValues = () => {
        const width = window.innerWidth;
        if (width < 640) {
          return { y: 50, duration: 1 };
        } else if (width < 1024) {
          return { y: 70, duration: 1.2 };
        } else {
          return { y: 100, duration: 1.5 };
        }
      };

      const values = getAnimationValues();

      gsap.from(children, {
        opacity: 0,
        duration: values.duration,
        y: values.y,
        stagger: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: textRef }
  );

  return (
    <div ref={textRef} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-30 ">
      {/* Header Section */}
      <div className="max-w-full sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] px-5 sm:px-6 md:px-8 lg:px-12 xl:px-0 xl:max-w-237.5 mx-auto flex flex-col gap-0 pb-10 sm:pb-12 md:pb-16 lg:pb-20">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[24px] font-semibold text-[#f5f5f7]">
          Battery
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] font-semibold text-[#f5f5f7] leading-[1.1] mt-2 sm:mt-3">
          All-day battery life.
          <br className="hidden sm:block" /> 
          <span className="sm:hidden"> </span>
          Stay out without plugging in.
        </h3>
      </div>

      {/* Battery Image */}
      <BatteryImage />

      {/* Content Section */}
      <div className="max-w-full px-5 sm:px-6 md:px-8 lg:px-12 xl:px-0 sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-237.5 mx-auto mb-6 sm:mb-8 md:mb-10">
        <p className="text-base sm:text-lg md:text-[19px] lg:text-[21px] font-semibold text-[#86868b] py-10 sm:py-12 md:py-16 lg:py-20 leading-[1.24] sm:leading-[1.28] md:leading-[1.2]">
          MacBook Pro has the{" "}
          <span className="text-white">longest battery life ever in a Mac</span>{" "}
          — up to 24 hours — and supports fast charge, allowing it to charge up
          to 50% in just 30 minutes.<sup className="underline">48</sup> All
          models provide the same performance whether they're plugged in or not,
          so you can spend more time powering your passion, not your laptop.
        </p>

        {/* Battery Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          {batteryStats.map((item, index) => (
            <div key={index} className="w-full">
              <hr className="border-sky-gradient mb-6 sm:mb-7 md:mb-8 lg:mb-10" />

              <div className="flex flex-col">
                <p className="text-xs sm:text-[13px] md:text-[14px] text-[#f5f5f7] leading-[1.2]">
                  {item.label}
                </p>

                <p className="text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] font-semibold text-sky-gradient my-1 sm:my-2">
                  {item.value}
                </p>

                <p className="text-xs sm:text-[13px] md:text-[14px] text-[#f5f5f7] leading-[1.2]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BatteryLife;