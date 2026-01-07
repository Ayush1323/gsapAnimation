import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function StickyHeadingChip() {
  const stickyRef = useRef(null);
  const childrenRef = useRef([]);

  useGSAP(
    () => {
      // children hidden initially
      gsap.set(childrenRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top 80%",
          //   markers: true,
        },
      });

      // parent animation
      tl.from(stickyRef.current, {
        opacity: 0,
        y: 200,
        width: 0,
        duration: 1,
        ease: "back.out(2)",
      });

      // children appear AFTER parent animation
      tl.to(childrenRef.current, {
        opacity: 1,
        duration: 0.6,
        width: "auto",
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: stickyRef }
  );

  return (
    <div
      ref={stickyRef}
      className="bg-[#1E1E20]/60 backdrop-blur-3xl p-2 rounded-full text-white font-semibold flex items-center justify-center overflow-hidden"
    >
      <span ref={(el) => (childrenRef.current[0] = el)} className="ml-7">
        Explore the family of chips
      </span>

      <button className="ml-4 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

export default StickyHeadingChip;
