import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import displayHero from "../../assets/Images/display_hero.jpg";

gsap.registerPlugin(ScrollTrigger);

function Delight() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const linesRef = useRef([]);

  const lines = [
    "Up to 1,600 nits peak HDR brightness",
    "1,000 nits sustained HDR brightness",
    "10,00,000:1 contrast ratio",
    "Down to 1 nit brightness in dark environments",
    "Up to 1,000 nits SDR brightness outdoors",
    "1,00,00,00,000 colours",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    tl.set(imageWrapRef.current, {
      width: "100%",
    });

    tl.set(imageRef.current, {
      scale: 1.3,
    });

    tl.to(overlayRef.current, {
      opacity: 0.4,
      duration: 1,
      ease: "power2.out",
    });

    tl.from(
      linesRef.current,
      {
        y: 420,
        opacity: 0,
        stagger: 0.3,
        duration: 3,
        ease: "power3.out",
      },
      "-=0.3"
    );

    tl.to(linesRef.current, {
      y: -420,
      opacity: 0,
      stagger: 0.2,
      duration: 3,
      ease: "power3.inOut",
    });

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
    });

    tl.to(imageRef.current, {
      scale: 1.1,
      duration: 1.2,
      ease: "power3.out",
    });

    tl.to(
      imageWrapRef.current,
      {
        width: "900px",
        marginLeft: "auto",
        marginRight: "auto",
        duration: 1.2,
        ease: "power3.out",
      },
      "<"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden h-screen flex items-center justify-center"
    >
      <div ref={imageWrapRef} className="relative mx-auto">
        <img
          ref={imageRef}
          src={displayHero}
          alt=""
          className="w-full h-auto block"
        />
      </div>

      {/* BLACK OVERLAY */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none"
      />

      {/* TEXT */}
      <div className="absolute inset-0 z-20 flex items-end justify-center pb-32 pointer-events-none">
        <div ref={linesRef} className="space-y-10 text-center">
          {lines.map((text, i) => (
            <p key={i} className="text-white text-[48px] font-semibold">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Delight;
