import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
function ContentBlock({
  eyebrow,
  title,
  description,
  linkText,
  onLinkClick,
  className,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from(ref.current.children, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={clsx(
        "max-w-210 mx-auto sm:px-0",
        className
      )}
    >
      {eyebrow && (
        <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-[#f5f5f7] leading-[1.2]">
          {eyebrow}
        </h2>
      )}

      {title && (
        <h3 className="text-[40px] sm:text-[56px] lg:text-[80px] font-semibold text-[#f5f5f7] leading-[1.05] mt-3">
          {title}
        </h3>
      )}

      {description && (
        <div className="text-[16px] sm:text-[18px] lg:text-[21px] font-semibold text-[#86868b] leading-[1.35] mt-8 sm:mt-12">
          {description}
        </div>
      )}

      {linkText && (
        <p
          onClick={onLinkClick}
          className="text-[16px] sm:text-[18px] lg:text-[21px] text-blue-400 cursor-pointer mt-5"
        >
          {linkText} {">"}
        </p>
      )}
    </div>
  );
}


export default ContentBlock;
