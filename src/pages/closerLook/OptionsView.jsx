import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { CLOSER_LOOK_OPTIONS } from "../../utils/closerLook/closerLook";
import ScrollTrigger from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

function OptionsView() {
  const containerRef = useRef(null);
  const mainCircleRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none",
          once: true,
          markers: true,
        },
      });

      gsap.set(itemsRef.current.children, {
        opacity: 0,
        scale: 0.85,
        width: 0,
        transformOrigin: "left center",
      });

      gsap.set(mainCircleRef.current, {
        opacity: 0,
        scale: 1.4,
        x: -80,
      });

      tl.to(mainCircleRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "bounce.out",
      });

      tl.to(mainCircleRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.15,
      });

      tl.to(itemsRef.current.children, {
        opacity: 1,
        scale: 1,
        width: "fit-content",
        duration: 0.9,
        ease: "back.out(1.4)",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      <video
        src="./src/assets/Videos/closerLook.mp4"
        autoPlay
        muted
        playsInline
        className="rounded-4xl w-full h-full"
      />

      <div
        ref={mainCircleRef}
        className="absolute top-1/2 left-30 -translate-y-1/2 bg-[#272729] w-14 h-14 rounded-full z-10"
      />

      <div
        ref={itemsRef}
        className="absolute top-1/2 left-30 -translate-y-1/2 flex flex-col  z-20 gap-4"
      >
        {CLOSER_LOOK_OPTIONS.map((item) => (
          <div
            key={item.id}
            className=" bg-[#272729] p-4 rounded-full w-fit flex items-center gap-2 cursor-pointer"
          >
            <div className="w-6 h-6 border border-white rounded-full flex justify-center items-center text-2xl">
              +
            </div>
            <div className="whitespace-nowrap">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsView;
