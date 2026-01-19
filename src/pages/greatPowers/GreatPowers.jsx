import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import appleLockVideo from "../../assets/Videos/apple-lock.mp4";

gsap.registerPlugin(ScrollTrigger);

function GreatPowers() {
  const poweersRef = useRef(null);
  const poweersRefVideo = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: poweersRef.current,
        start: "top 70%",
        toggleActions: "restart none restart none",
      },
    });

    tl.call(() => {
      poweersRefVideo.current.currentTime = 0;
      poweersRefVideo.current.play();
    });
  });

  return (
    <div
      ref={poweersRef}
      className="max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[680px] xl:max-w-170 mx-auto flex flex-col justify-center items-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-30 px-5 sm:px-6 md:px-8 lg:px-0"
    >
      {/* Video */}
      <video 
        src={appleLockVideo} 
        ref={poweersRefVideo} 
        muted 
        playsInline 
        className="h-auto max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-none"
        loading="lazy"
        alt="Apple Lock Video"
      />
      
      {/* Heading */}
      <h3 className="text-2xl sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[1.1] text-center mt-3 sm:mt-4 font-semibold text-[#f5f5f7] px-4 sm:px-0">
        Great powers come <br /> with great privacy.
      </h3>
      
      {/* Description */}
      <p className="text-base sm:text-lg md:text-[19px] lg:text-[20px] xl:text-[21px] mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 font-semibold text-[#86868b] leading-[1.24] sm:leading-[1.28] md:leading-[1.2] text-center px-4 sm:px-6 md:px-0">
        Apple Intelligence is{" "}
        <span className="text-[#f5f5f7]">
          designed to protect your privacy at every step.
        </span>{" "}
        It's integrated into the core of your Mac through on-device processing.
        So it's aware of your personal information without collecting your
        personal information. And with groundbreaking Private Cloud Compute,
        Apple Intelligence can draw on larger server-based models, running on
        Apple silicon, to handle more complex requests for you while protecting
        your privacy.
      </p>
    </div>
  );
}

export default GreatPowers;