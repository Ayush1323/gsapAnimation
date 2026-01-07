import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UTIMATE_SHOW } from "../../utils/ContinuityData";
import ContentBlock from "../batterTogather/ContentBlock";
import ContinuityShowcase from "../batterTogather/ContinuityShowcase";

gsap.registerPlugin(ScrollTrigger);

function UltimateShow() {
  const continuityRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(continuityRef.current.children, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: continuityRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: continuityRef }
  );

  return (
    <div className="py-30" ref={continuityRef}>
      <ContentBlock
        eyebrow="Camera"
        title="The ultimate show and tell."
        description={
          <>
            The 12MP Center Stage camera helps you{" "}
            <span className="text-white">look sharp in any light.</span>
            Together with the advanced mics and speakers, it lets you take
            charge of the meeting from afar.
          </>
        }
      />

      <div className="max-w-263 mx-auto">
        <ContinuityShowcase data={UTIMATE_SHOW} />
      </div>
    </div>
  );
}

export default UltimateShow;
