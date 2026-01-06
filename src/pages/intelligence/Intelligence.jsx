import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import aiAppleImage from "../../assets/Images/Intelligence/ai_apple_intelligence.jpg";

gsap.registerPlugin(ScrollTrigger);

function Intelligence() {
  const IntelligenceRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(IntelligenceRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.25,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: IntelligenceRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: IntelligenceRef }
  );

  return (
    <div>
      <div ref={IntelligenceRef} className="max-w-225 mx-auto py-10">
        <div className="text-[56px] font-semibold leading-[1.1] text-[#f5f5f7]">
          <span className="text-rainbow">Apple Intelligence.</span> <br /> Task
          and you shall receive.
        </div>
        <p className="text-[21px] font-semibold text-[#86868b] mt-10 leading-[1.2]">
          Apple Intelligence helps you write, express yourself and get things
          done effortlessly. Turn a quick note into a polished announcement.
          Remove distractions from photos with Clean Up. Create unique images
          with new ChatGPT styles in Image Playground. And use intelligent
          actions in the Shortcuts app to create automations — like comparing an
          audio transcription to typed notes and extracting information from a
          PDF. Apple Intelligence is AI — for you and I.
          <sup className="underline">47</sup>
        </p>
        <p className="text-[21px] underline text-blue-500 cursor-pointer mt-10">
          Learn more about Apple Intelligence {">"}
        </p>
      </div>
      <div className="py-25 max-w-280 mx-auto">
        <img
          src={aiAppleImage}
          alt="Apple Intelligence"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Intelligence;
