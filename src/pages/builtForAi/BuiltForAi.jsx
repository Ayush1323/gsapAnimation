import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import ContentBlock from "../batterTogather/ContentBlock";

gsap.registerPlugin(ScrollTrigger);

function BuiltForAi() {
  const aiTextRender = useRef(null);

  useGSAP(
    () => {
      const items = aiTextRender.current.children;

      gsap.from(items, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: aiTextRender.current,
          start: "top 80%",
        },
      });
    },
    { scope: aiTextRender }
  );

  return (
    <div ref={aiTextRender} className="sm:py-24 lg:py-30 py-16 max-lg:px-4">
      <ContentBlock
        eyebrow="AI"
        title={
          <>
            Built for AI. <br />
            From the silicon up.
          </>
        }
        description={
          <>
            Apple silicon, and every major subsystem that powers it, is designed
            for AI — creating a platform that comprehensively unites hardware,
            software and ecosystem. So you can{" "}
            <span className="text-white">
              run demanding on-device AI workloads with incredible power
              efficiency.
            </span>{" "}
            Always knowing that security and privacy are designed in, not just
            bolted on.
          </>
        }
      />
    </div>
  );
}

export default BuiltForAi;
