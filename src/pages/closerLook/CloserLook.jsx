import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import OptionsView from "./OptionsView";
import MobileMediaViewer from "./MobileMediaViewer";

gsap.registerPlugin(ScrollTrigger);

function CloserLook() {
  const closerSectionref = useRef(null);
  const closerSectionTitleref = useRef(null);

  useGSAP(
    () => {
      gsap.from(closerSectionTitleref.current, {
        opacity: 0,
        duration: 1.5,
        y: 100,
        ease: "power3.out",
        scrollTrigger: {
          trigger: closerSectionref.current,
          start: "top 80%",
        },
      });
    },
    { scope: closerSectionref }
  );

  return (
    <section ref={closerSectionref} className="bg-[#1d1d1f] py-20 text-white">
      <div
        ref={closerSectionTitleref}
        className="max-w-315 mx-auto text-white md:text-[56px] text-[28px] font-semibold leading-tight lg:px-0 px-4"
      >
        <span className="inline-block mr-3">Take a closer look.</span>
      </div>
      <div className="relative z-10 max-w-350 mx-auto h-full bg-black lg:rounded-4xl mt-20 max-md:overflow-hidden md:block hidden">
        <OptionsView />
      </div>
      <div className="md:hidden mt-10">
        <MobileMediaViewer />
      </div>
    </section>
  );
}

export default CloserLook;
