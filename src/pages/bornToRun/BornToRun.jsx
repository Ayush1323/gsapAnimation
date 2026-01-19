import { CARDS_DATA } from "../../utils/bornToAi/cards";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function BornToRun() {
  const cardRef = useRef(null);
  const manVideoRef = useRef(null);

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
          start: "top 70%",
          onEnter: () => {
            if (manVideoRef.current) {
              manVideoRef.current.play();
            }
          },
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="grid md:grid-cols-2 grid-cols-1 max-w-315 mx-auto gap-5 pb-25 items-center max-xl:px-4"
    >
      {CARDS_DATA.map(({ title, text, image, video, imageAlign }, index) => (
        <div key={index} className="rounded-3xl bg-[#1d1d1f] overflow-hidden h-full flex flex-col justify-between">
          <p className="text-[19px] font-semibold text-[#86868b] md:p-8 p-7 leading-[1.2]">
            <span className="text-[#f5f5f7]">{title}</span> {text}
          </p>

          <div
            className={`flex ${
              imageAlign === "end" ? "justify-end" : "justify-start"
            }`}
          >
            {video ? (
              <video ref={manVideoRef} src={video} autoPlay muted playsInline loading="lazy" />
            ) : (
              <img src={image} alt={title} loading="lazy" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BornToRun;
