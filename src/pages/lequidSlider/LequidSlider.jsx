import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { LIQUID_SLIDER } from "../../utils/LiquidSlider.jsx";
import LiquidGlassSlider from "./LiquidGlassSlider";

gsap.registerPlugin(ScrollTrigger);

function LequidSlider() {
  const sliderRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(sliderRef.current.children, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sliderRef }
  );

  return (
    <div ref={sliderRef} className=" py-12 sm:py-16 md:py-30">
      <LiquidGlassSlider slides={LIQUID_SLIDER} />;
    </div>
  );
}

export default LequidSlider;
