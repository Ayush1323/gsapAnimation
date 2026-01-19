import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import displayHero from "../../assets/Images/display_hero.jpg";

gsap.registerPlugin(ScrollTrigger);

function Delight() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const linesWrapRef = useRef(null);
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
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      tl.set(imageWrapRef.current, { width: "100%" });
      tl.set(imageRef.current, { scale: 1.3 });

      tl.to(overlayRef.current, {
        opacity: 0.4,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(
        linesRef.current,
        {
          y: 300,
          opacity: 0,
          stagger: 0.25,
          duration: 2.5,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.to(linesRef.current, {
        y: -300,
        opacity: 0,
        stagger: 0.2,
        duration: 2.5,
        ease: "power3.inOut",
      });

      tl.to(overlayRef.current, { opacity: 0, duration: 0.8 });

      tl.to(imageRef.current, {
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
      });

      tl.to(
        imageWrapRef.current,
        {
          width: "900px",
          marginInline: "auto",
          duration: 1.2,
          ease: "power3.out",
        },
        "<"
      );
    });

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
        },
      });

      tl.set(imageWrapRef.current, { width: "100%" });
      tl.set(imageRef.current, { scale: 3.5 });

      tl.to(overlayRef.current, {
        opacity: 0.35,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(
        linesRef.current,
        {
          y: 260,
          opacity: 0,
          stagger: 0.25,
          duration: 2.2,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.to(linesRef.current, {
        y: -260,
        opacity: 0,
        stagger: 0.2,
        duration: 2.2,
        ease: "power3.inOut",
      });

      tl.to(overlayRef.current, { opacity: 0, duration: 0.8 });

      tl.to(imageRef.current, {
        scale: 1.05,
        duration: 1.2,
        ease: "power3.out",
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(imageRef.current, { scale: 1 });
      gsap.set(overlayRef.current, { opacity: 0 });
    });

    return () => mm.revert();
  }, []);
  return (
    <>
      {/* IMAGE SECTION */}
      <section
        ref={sectionRef}
        className="relative bg-black overflow-hidden md:h-screen flex items-center justify-center"
      >
        <div ref={imageWrapRef} className="relative w-full">
          <img
            ref={imageRef}
            src={displayHero}
            alt="Display Hero"
            className="w-full lg:h-auto md:h-auto max-lg:object-cover"
            loading="lazy"
          />
        </div>

        {/* OVERLAY (DESKTOP ONLY) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0 pointer-events-none hidden md:block"
        />

        {/* TEXT OVER IMAGE (DESKTOP ONLY) */}
        <div className="absolute inset-0 z-20 hidden md:flex items-end justify-center pb-32 pointer-events-none">
          <div ref={linesWrapRef} className="space-y-8 text-center">
            {lines.map((text, i) => (
              <p
                key={i}
                ref={(el) => (linesRef.current[i] = el)}
                className="text-white text-[42px] font-semibold"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE CONTENT BELOW IMAGE */}
      <section className="bg-black md:px-6 px-1 md:py-14 py-4 md:hidden">
        <div className="space-y-1 text-start">
          {lines.map((text, i) => (
            <p
              key={i}
              className="text-white text-lg font-semibold leading-[1.5]"
            >
              {text}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

export default Delight;
