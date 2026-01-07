import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FLAIR_IMAGES } from "../utils/newAnimation";

function NewAnimation() {
  const itemsRef = useRef([]);
  const indexRef = useRef(0);

  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();

      const dx = Math.abs(e.clientX - lastXRef.current);
      lastXRef.current = e.clientX;

      const throttle = dx > 40 ? 50 : 440;

      if (now - lastTimeRef.current < throttle) return;
      lastTimeRef.current = now;

      const item = itemsRef.current[indexRef.current];
      if (!item) return;

      gsap.killTweensOf(item);

      gsap.set(item, {
        x: e.clientX,
        y: e.clientY,
        scale: 0.3,
        opacity: 0,
      });

      const tl = gsap.timeline();

      tl.to(item, {
        opacity: 1,
        scale: 1,
        x: "+=50",
        rotate: "+=360",
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      tl.to(item, {
        duration: 0.3,
      });

      tl.to(item, {
        y: "+=400",
        scale: 0.8,
        rotate: "+=360",
        opacity: 0,
        duration: 1.2,
        ease: "power3.in",
      });

      indexRef.current = (indexRef.current + 1) % itemsRef.current.length;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none z-50">
      {FLAIR_IMAGES.map((image, index) => (
        <img
          key={index}
          ref={(el) => (itemsRef.current[index] = el)}
          src={image}
          alt=""
          className="absolute h-14 w-14 opacity-0"
        />
      ))}
    </div>
  );
}

export default NewAnimation;
