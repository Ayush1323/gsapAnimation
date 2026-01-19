import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CHEAP_IMAGES,
  CHIP_INFORMATION,
  CHIPS,
} from "../../utils/chips/chipsInformation";
import laptopImage from "../../assets/Images/chips/performance_laptop_screen.jpg";
gsap.registerPlugin(ScrollTrigger);

function Chips() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const contentsRef = useRef([]);
  const chipsRef = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(imagesRef.current, { opacity: 0 });
        gsap.set(contentsRef.current, { opacity: 0 });
        gsap.set(imagesRef.current[0], { opacity: 1 });
        gsap.set(contentsRef.current[0], { opacity: 1 });
        gsap.set(contentsRef.current[0].children, { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
          },
        });

        CHEAP_IMAGES.forEach((_, i) => {
          tl.addLabel(`chip${i}`);

          tl.to(
            imagesRef.current[i],
            {
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            i === 0 ? "<" : "-=1"
          );

          tl.to(contentsRef.current[i].children, {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: { each: 0.15 },
          });

          tl.to(
            contentsRef.current[i],
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            "<"
          );

          if (i !== CHEAP_IMAGES.length - 1) {
            tl.to(
              imagesRef.current[i],
              {
                opacity: 0,
                duration: 1.2,
                ease: "power2.in",
              },
              "+=0.3"
            );

            tl.to(
              contentsRef.current[i].children,
              {
                opacity: 0,
                duration: 1,
                ease: "power3.in",
                stagger: { each: 0.12, from: "end" },
              },
              "-=0.8"
            );
          }
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            const index = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;

            chipsRef.current.forEach((chip, i) => {
              chip.classList.remove("bg-apple-chip", "bg-m4-pro", "bg-m4-max");
              chip.classList.add(
                i === index ? getChipBgClass(i) : "bg-[#333336]"
              );
            });
          },
        });

        function getChipBgClass(index) {
          switch (index) {
            case 0:
              return "bg-apple-chip";
            case 1:
              return "bg-m4-pro";
            case 2:
              return "bg-m4-max";
            default:
              return "bg-[#333336]";
          }
        }

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(imagesRef.current, { clearProps: "all" });
        gsap.set(contentsRef.current, { clearProps: "all" });
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="h-screen max-w-350 2xl:mx-[10%] xl:-mx-[10%] lg:-mx-[25%] tablet:-mx-[40%] md:-mx-[70%] flex items-center"
    >
      <div className="grid xl:grid-cols-[1fr_300px] grid-cols-[1fr_250px] xl:gap-x-12 gap-x-0 gap-y-20 items-start w-full mb-10">
        <div className="relative max-md:w-full max-2xl:w-250">
          <img src={laptopImage} className="w-full" alt="" loading="lazy" />
          {CHEAP_IMAGES.map((src, i) => (
            <img
              key={i}
              ref={(el) => (imagesRef.current[i] = el)}
              src={src}
              className="absolute top-0 left-0 w-full h-full object-cover mix-blend-screen "
              alt=""
              loading="lazy"
            />
          ))}
        </div>

        <div className="flex flex-col gap-6 mt-20">
          <div className="flex gap-4">
            {CHIPS.map((chip, i) => (
              <div
                key={i}
                ref={(el) => (chipsRef.current[i] = el)}
                className="w-16 h-16 rounded-2xl bg-[#333336]
      flex items-center justify-center
      transition-all duration-300
    "
              >
                <img
                  src={chip.icon}
                  alt={chip.alt}
                  className="object-contain select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="relative">
            {CHIP_INFORMATION.map((c, i) => (
              <div
                key={i}
                ref={(el) => (contentsRef.current[i] = el)}
                className="absolute top-0 left-0 w-full opacity-0"
              >
                <p className="font-semibold text-[#F5F5F7] text-[28px] max-3xl:text-[24px] max-xl:text-[22px] leading-[1.2]">
                  {c.text}
                </p>
                <p
                  className={`${c.gradientText} text-apple-gradient font-semibold text-[28px] max-3xl:text-[24px] max-xl:text-[22px] leading-[1.2] mt-4`}
                >
                  {c.available}
                </p>
                <p
                  className={`${c.gradientText} text-apple-gradient font-semibold text-[28px] max-3xl:text-[24px] max-xl:text-[22px] leading-[1.2] mt-4`}
                >
                  {c.faster}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chips;
