import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
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
        y: 80,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: continuityRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: continuityRef }
  );

  return (
    <section
      ref={continuityRef}
      className="py-20 sm:py-24 lg:py-30 px-5 sm:px-8"
    >
      <ContentBlock
        eyebrow="Camera"
        title="The ultimate show and tell."
        description={
          <>
            The 12MP Center Stage camera helps you{" "}
            <span className="text-white">look sharp in any light.</span> Together
            with the advanced mics and speakers, it lets you take charge of the
            meeting from afar.
          </>
        }
      />

      <div className="max-w-263 mx-auto mt-0 sm:mt-16">
        <ContinuityShowcase data={UTIMATE_SHOW} />
      </div>
    </section>
  );
}

export default UltimateShow;
