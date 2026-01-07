import clsx from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
        y: 100,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 100%",
          // markers: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={clsx(className, "max-w-210 mx-auto")}>
      {eyebrow && (
        <h2 className="text-[24px] font-semibold text-[#f5f5f7] leading-[1.2]">
          {eyebrow}
        </h2>
      )}

      {title && (
        <h3 className="text-[80px] font-semibold text-[#f5f5f7] leading-[1.2] mt-3">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-[21px] font-semibold text-[#86868b] leading-[1.2] mt-12">
          {description}
        </p>
      )}

      {linkText && (
        <p
          onClick={onLinkClick}
          className="text-[21px] text-blue-400 cursor-pointer mt-5"
        >
          {linkText} {">"}
        </p>
      )}
    </div>
  );
}

export default ContentBlock;
