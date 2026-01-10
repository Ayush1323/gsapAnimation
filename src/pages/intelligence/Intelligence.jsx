import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
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
      {/* Content Section */}
      <div 
        ref={IntelligenceRef} 
        className="max-w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[840px] xl:max-w-220 mx-auto py-8 sm:py-10 px-5 sm:px-6 md:px-8 lg:px-0"
      >
        {/* Heading */}
        <div className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] xl:text-[56px] font-semibold tracking-tighter leading-[1.1] text-[#f5f5f7]">
          <span className="text-rainbow">Apple Intelligence.</span> <br /> 
          Task and you shall receive.
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-[19px] lg:text-[20px] xl:text-[21px] font-semibold text-[#86868b] mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 leading-[1.24] sm:leading-[1.28] md:leading-[1.2]">
          Apple Intelligence{" "}
          <span className="text-white">
            helps you write, express yourself and get things done effortlessly.
          </span>{" "}
          Turn a quick note into a polished announcement. Remove distractions
          from photos with Clean Up. Create unique images with new ChatGPT
          styles in Image Playground. And use intelligent actions in the
          Shortcuts app to create automations — like comparing an audio
          transcription to typed notes and extracting information from a PDF.
          Apple Intelligence is AI — for you and I.
          <sup className="underline">47</sup>
        </p>

        {/* Learn More Link */}
        <p className="text-base sm:text-lg md:text-[19px] lg:text-[20px] xl:text-[21px] hover:underline text-[#2997ff] cursor-pointer mt-5 sm:mt-6 md:mt-7 lg:mt-8 inline-block transition-opacity hover:opacity-80">
          Learn more about Apple Intelligence {">"}
        </p>
      </div>

      {/* Image Section */}
      <div className="pt-0 lg:pt-15 max-w-full sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1040px] xl:max-w-260 mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <img
          src={aiAppleImage}
          alt="Apple Intelligence visualization showing AI capabilities"
          className="w-full h-auto object-cover rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-none"
        />
      </div>
    </div>
  );
}

export default Intelligence;