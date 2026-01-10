import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import batteryHero from "../../assets/Images/battery-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

function BatteryImage() {
  const skyRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const el = skyRef.current;

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      // markers: true,

      onEnter: () =>
        gsap.fromTo(
          el,
          { scale: 1 },
          {
            scale: 1.1,
            duration: 5,
            delay: 1,
            ease: "power3.out",
          }
        ),

      onEnterBack: () =>
        gsap.fromTo(
          el,
          { scale: 1 },
          {
            scale: 1.1,
            duration: 5,
            delay: 1,
            ease: "power3.out",
          }
        ),
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="overflow-hidden rounded-none sm:rounded-lg md:rounded-xl lg:rounded-2xl mb-0 sm:mb-4 md:mb-6 lg:mb-8"
    >
      <img
        ref={skyRef}
        src={batteryHero}
        alt="MacBook Pro battery life visualization"
        className="w-full h-auto max-md:h-100 object-cover"
      />
    </div>
  );
}

export default BatteryImage;