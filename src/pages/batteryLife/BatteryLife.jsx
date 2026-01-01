import { useRef } from "react";
import BatteryImage from "./BatteryImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function BatteryLife() {
  const textRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(textRef.current.children, {
        opacity: 0,
        duration: 1.5,
        y: 100,
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
    <div ref={textRef} className="py-30">
      <div className="max-w-237.5 mx-auto flex flex-col gap-0 pb-20">
        <h2 className="text-[24px] font-semibold text-[#f5f5f7]">Battery</h2>
        <h3 className="text-[80px] font-semibold text-[#f5f5f7] leading-[1.1] mt-3">
          All-day battery life.
          <br /> Stay out without plugging in.
        </h3>
      </div>
      <BatteryImage />
      <div className="max-w-237.5 mx-auto">
        <p className="text-[21px] font-semibold text-[#86868b] py-20">
          MacBook Pro has the{" "}
          <span className="text-white">longest battery life ever in a Mac</span>{" "}
          — up to 24 hours — and supports fast charge, allowing it to charge up
          to 50% in just 30 minutes.48 All models provide the same performance
          whether they’re plugged in or not, so you can spend more time powering
          your passion, not your laptop.
        </p>
      </div>
    </div>
  );
}

export default BatteryLife;
