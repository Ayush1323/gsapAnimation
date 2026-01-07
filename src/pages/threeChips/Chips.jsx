import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  CHEAP_IMAGES,
  CHIP_INFORMATION,
} from "../../utils/chips/chipsInformation";
import StickyHeadingChip from "./StickyHeadingChip";
import laptopImage from "../../assets/Images/chips/performance_laptop_screen.jpg";
import iconM5 from "../../assets/Images/chips/performance_icon_m5__dk75oifli58i_large.png";
import iconM4Pro from "../../assets/Images/chips/performance_icon_m4pro__ez04pndyaq6a_large.png";
import iconM4Max from "../../assets/Images/chips/performance_icon_m4max__getmf50wffqm_large.png";
gsap.registerPlugin(ScrollTrigger);

function Chips() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const contentsRef = useRef([]);
  const chipsRef = useRef([]);
  const chips = [
    { icon: iconM5, alt: "M5 chip" },
    { icon: iconM4Pro, alt: "M4 Pro chip" },
    { icon: iconM4Max, alt: "M4 Max chip" },
  ];
  useGSAP(
    () => {
      gsap.set(imagesRef.current, { opacity: 0 });
      gsap.set(contentsRef.current, { opacity: 0, y: 50 });
      gsap.set(imagesRef.current[0], { opacity: 1 });
      gsap.set(contentsRef.current[0], { opacity: 1, y: 0 });

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
        tl.to(
          imagesRef.current[i],
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "<"
        );

        tl.to(contentsRef.current[i], {
          opacity: 1,
          stagger: 0.2,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });

        tl.to({}, { duration: 1.5 });

        if (i !== CHEAP_IMAGES.length - 1) {
          tl.to(imagesRef.current[i], {
            opacity: 0,
            duration: 1.2,
            ease: "power2.in",
          });
          tl.to(
            contentsRef.current[i],
            { opacity: 0, y: -30, duration: 1.2, ease: "power2.in" },
            "<"
          );
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let index = 0;
          if (progress < 0.33) index = 0;
          else if (progress < 0.66) index = 1;
          else index = 2;

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
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="h-screen max-w-350 mx-auto flex items-center"
      >
        <div className="grid grid-cols-[1fr_300px] gap-12 items-start w-full">
          <div className="relative">
            <img src={laptopImage} className="w-full" alt="" />
            {CHEAP_IMAGES.map((src, i) => (
              <img
                key={i}
                ref={(el) => (imagesRef.current[i] = el)}
                src={src}
                className="absolute top-0 left-0 w-full h-full object-cover mix-blend-screen"
                alt=""
              />
            ))}
          </div>

          <div className="flex flex-col gap-6 mt-20">
            <div className="flex gap-4">
              {chips.map((chip, i) => (
                <div
                  key={i}
                  ref={(el) => (chipsRef.current[i] = el)}
                  className="
      w-16 h-16
      rounded-2xl
      bg-[#333336]
      flex items-center justify-center
      transition-all duration-300
    "
                >
                  <img
                    src={chip.icon}
                    alt={chip.alt}
                    className="object-contain select-none pointer-events-none"
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
                  <p className="font-semibold text-[#F5F5F7] text-[28px] leading-[1.2]">
                    {c.text}
                  </p>
                  <p
                    className={`${c.gradientText} text-apple-gradient font-semibold text-[28px] leading-[1.2] mt-4`}
                  >
                    {c.available}
                  </p>
                  <p
                    className={`${c.gradientText} text-apple-gradient font-semibold text-[28px] leading-[1.2] mt-4`}
                  >
                    {c.faster}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center sticky bottom-10 col-span-2">
            <StickyHeadingChip />
          </div>
        </div>
      </section>
    </>
  );
}

export default Chips;
