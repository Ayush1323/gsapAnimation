import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "./Slider";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  const sectionRef = useRef(null);
  const textRef = useRef([]);

  useGSAP(
    () => {
      gsap.from(textRef.current, {
        rotationX: -10,
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          markers: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#1d1d1f] pt-30 pb-1 relative">
      <div
        ref={(el) => (textRef.current[0] = el)}
        className="max-w-315 mx-auto text-white text-[56px] font-semibold leading-tight"
      >
        <span className="inline-block mr-3">Get the highlights.</span>
      </div>
      <div ref={(el) => (textRef.current[1] = el)} className="mt-20">
        <Slider />
      </div>
    </section>
  );
};

export default Highlights;
