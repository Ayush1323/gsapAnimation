import { useEffect, useRef } from "react";
import gsap from "gsap";

const TEXT = "MacBook Pro";

export default function GsapLoader() {
  const charsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl.fromTo(
      charsRef.current,
      {
        opacity: 0,
        x: () => gsap.utils.random(-window.innerWidth, window.innerWidth),
        y: () => gsap.utils.random(-window.innerHeight, window.innerHeight),
        scale: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        stagger: {
          each: 0.08,
          from: "random",
        },
      }
    ).to(
      charsRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: {
          each: 0.05,
          from: "center",
        },
      },
      "+=0.4"
    );
  }, []);

  return (
    <div className="gsap-loader">
      <h1 className="loader-word">
        {TEXT.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (charsRef.current[i] = el)}
            className="loader-char"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}
