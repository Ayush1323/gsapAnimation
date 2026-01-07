import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
        // markers: true,
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
      className="max-w-170 mx-auto flex flex-col justify-center items-center py-30"
    >
      <video src={appleLockVideo} ref={poweersRefVideo} muted playsInline />
      <h3 className="text-[32px] leading-[1.1] text-center mt-4 font-semibold text-[#f5f5f7]">
        Great powers come <br /> with great privacy.
      </h3>
      <p className="text-[21px] mt-10 font-semibold text-[#86868b] leading-[1.2] text-center">
        Apple Intelligence is{" "}
        <span className="text-[#f5f5f7]">
          designed to protect your privacy at every step.
        </span>{" "}
        It’s integrated into the core of your Mac through on-device processing.
        So it’s aware of your personal information without collecting your
        personal information. And with groundbreaking Private Cloud Compute,
        Apple Intelligence can draw on larger server-based models, running on
        Apple silicon, to handle more complex requests for you while protecting
        your privacy.
      </p>
    </div>
  );
}

export default GreatPowers;
