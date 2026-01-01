import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        ease: "back.out(1.4)",
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
    <div ref={aiTextRender} className="max-w-230 mx-auto">
      <p className="text-[24px] font-semibold text-[#f5f5f7]">AI</p>

      <p className="text-[80px] font-semibold text-[#f5f5f7] leading-[1.1] mt-4">
        Built for AI.
        <br /> From the silicon up.
      </p>

      <p className="text-[#86868b] font-semibold text-[21px] mt-14">
        Apple silicon, and every major subsystem that powers it, is designed for
        AI — creating a platform that comprehensively unites hardware, software
        and ecosystem. So you can{" "}
        <span className="text-white">
          run demanding on-device AI workloads with incredible power efficiency.
        </span>{" "}
        Always knowing that security and privacy are designed in, not just
        bolted on.
      </p>
    </div>
  );
}

export default BuiltForAi;
