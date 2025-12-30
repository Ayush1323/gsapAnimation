import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { useRef, useState } from "react";
import { CLOSER_LOOK_OPTIONS } from "../../utils/closerLook/closerLook";

gsap.registerPlugin(ScrollTrigger);

function OptionsView() {
  const containerRef = useRef(null);
  const mainCircleRef = useRef(null);
  const itemsRef = useRef(null);
  const contentRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        once: true,
      },
    });

    gsap.set(itemsRef.current.children, {
      opacity: 0,
      scale: 0.85,
      width: 0,
      transformOrigin: "left center",
    });

    gsap.set(mainCircleRef.current, {
      opacity: 0,
      scale: 1.4,
      x: -80,
    });

    tl.to(mainCircleRef.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 1.1,
      ease: "bounce.out",
    })
      .to(mainCircleRef.current, { opacity: 0, duration: 0.15 })
      .to(itemsRef.current.children, {
        opacity: 1,
        scale: 1,
        width: "fit-content",
        duration: 0.8,
        ease: "back.out(1.4)",
      });
  }, { scope: containerRef });

  const handleClick = (index) => {
    const items = itemsRef.current.children;

    [...items].forEach((item, i) => {
      const content = contentRefs.current[i];

      if (i === index) {
        gsap.set(content, { opacity: 0});

        const tl = gsap.timeline({
          onComplete: () => {
            setExpandedIndex(index);

            gsap.to(content, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });

        tl.fromTo(
          item,
          { height: "auto" },
          {
            width: 420,
            height: "fit-content",
            duration: 0.1,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(item, {
          width: "fit-content",
          height: "fit-content",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <video
        src="./src/assets/Videos/closerLook.mp4"
        autoPlay
        muted
        playsInline
        className="rounded-4xl w-full h-full"
      />

      <div
        ref={mainCircleRef}
        className="absolute top-1/2 left-30 -translate-y-1/2 bg-[#272729] w-14 h-14 rounded-full z-10"
      />

      <div
        ref={itemsRef}
        className="absolute top-1/2 left-30 -translate-y-1/2 flex flex-col gap-4 z-20"
      >
        {CLOSER_LOOK_OPTIONS.map((item, index) => (
          <div
            key={item.id}
            className={`${index === expandedIndex ? "bg-[#272729]/60 backdrop-blur-2xl p-8" : "bg-[#272729] p-4"} rounded-3xl   w-fit text-white cursor-pointer overflow-hidden`}
            onClick={() => handleClick(index)}
          >
            {/* COLLAPSED */}
            {expandedIndex !== index && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
                  +
                </div>
                <div>{item.label}</div>
              </div>
            )}

            {/* EXPANDED */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className={expandedIndex === index ? "block" : "hidden"}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsView;
