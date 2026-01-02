import ContentBlock from "./ContentBlock";
import ContinuityShowcase from "./ContinuityShowcase";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTINUITY_DATA } from "../../utils/ContinuityData";

gsap.registerPlugin(ScrollTrigger);

function BatterTogather() {
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
    <div ref={continuityRef}>
      <ContentBlock
        eyebrow="Mac + iPhone"
        title="Even better together."
        description={
          <>
            Mac and iPhone are incredible on their own. But when you use them
            together, they work wonders. Thanks to Continuity, you can{" "}
            <span className="text-white">move seamlessly across devices</span>{" "}
            to share files and photos, hand off tasks and even control your
            iPhone from your Mac.
          </>
        }
        linkText="Learn more about macOS Tahoe"
      />

      <div className="max-w-263 mx-auto">
        <ContinuityShowcase data={CONTINUITY_DATA} />
      </div>
    </div>
  );
}

export default BatterTogather;
