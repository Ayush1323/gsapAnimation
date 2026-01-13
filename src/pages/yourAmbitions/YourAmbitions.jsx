import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { YOUR_AMBISION } from "../../utils/ContinuityData";
import ContentBlock from "../batterTogather/ContentBlock";
import ContinuityShowcase from "../batterTogather/ContinuityShowcase";

gsap.registerPlugin(ScrollTrigger);

function YourAmbitions() {
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
    <div className="py-20 sm:py-24 lg:py-30 px-4 sm:px-8" ref={continuityRef}>
      <ContentBlock
        eyebrow="Apps"
        title="Your ambitions. There’s an app for that."
        description={
          <>
            <span className="text-white">
              Tens of thousands of apps are optimised for Apple silicon{" "}
            </span>
            — from your go-to productivity apps to your favourite games and
            hardest-working pro apps. With MacBook Pro, they all soar.
          </>
        }
        className={"max-w-225 mx-auto"}
      />

      <div className="max-w-263 mx-auto mt-0 sm:mt-16 ">
        <ContinuityShowcase data={YOUR_AMBISION} />
      </div>
    </div>
  );
}

export default YourAmbitions;
