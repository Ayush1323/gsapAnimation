import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NANO_TEXTURE } from "../../utils/LiquidSlider";
import LiquidGlassSlider from "../lequidSlider/LiquidGlassSlider";

gsap.registerPlugin(ScrollTrigger);

function NanoTexture() {
  const sliderRefNano = useRef(null);

  useGSAP(
    () => {
      gsap.from(sliderRefNano.current.children, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sliderRefNano.current,
          start: "top 80%",
        },
      });
    },
    { scope: sliderRefNano }
  );

  return (
    <div ref={sliderRefNano}  >
      <LiquidGlassSlider slides={NANO_TEXTURE} />;
    </div>
  );
}

export default NanoTexture;
