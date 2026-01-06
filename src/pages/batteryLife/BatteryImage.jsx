import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import batteryHero from "../../assets/Images/battery-hero.jpg"; // import the image

gsap.registerPlugin(ScrollTrigger);
function BatteryImage() {
  const skyRef = useRef(null);

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
    <div className="overflow-hidden">
      <img
        ref={skyRef}
        src={batteryHero}
        alt="Battery Hero"
        className="w-full h-full"
      />
    </div>
  );
}

export default BatteryImage;
