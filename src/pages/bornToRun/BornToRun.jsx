import { CARDS_DATA } from "../../utils/bornToAi/cards";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function BornToRun() {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current.children, {
        opacity: 0,
        duration: 1.5,
        y: 100,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 60%",
          // markers: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="grid grid-cols-2 max-w-315 mx-auto gap-4 pt-35 pb-25 items-center"
    >
      {CARDS_DATA.map(({ title, text, image, imageAlign }, index) => (
        <div key={index} className="rounded-3xl bg-[#1d1d1f] overflow-hidden">
          <p className="text-[19px] font-semibold text-[#86868b] p-8">
            <span className="text-[#f5f5f7]">{title}</span> {text}
          </p>

          <div
            className={`flex ${
              imageAlign === "end" ? "justify-end" : "justify-start"
            }`}
          >
            <img src={image} alt={title} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BornToRun;
