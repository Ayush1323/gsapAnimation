import { useState, useRef } from "react";
import gsap from "gsap";
import { CLOSER_LOOK_OPTIONS } from "../../utils/closerLook/closerLook";
import CloserLookVideo from "../../assets/Videos/lookMobile.mp4";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_MEDIA = CloserLookVideo;

export default function MobileCloserLook() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const mediaRef = useRef(null);
  const bubbleRef = useRef(null);
  const optionsRef = useRef(null);
  const mainOptionsRef = useRef(null);

  const item = CLOSER_LOOK_OPTIONS[index];
  const media = active ? item?.image : DEFAULT_MEDIA;
  const isVideo = media?.endsWith(".mp4");

  useGSAP(() => {
    if (!mediaRef.current) return;

    const startX = 80 * direction;

    gsap.fromTo(
      mediaRef.current,
      { x: startX, scale: 1.04, opacity: 0 },
      { x: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    if (active && bubbleRef.current) {
      gsap.fromTo(
        bubbleRef.current,
        { x: startX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [index, active, direction]);

  const handleSelect = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setActive(true);

    gsap.to(optionsRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.25,
      onComplete: () => {
        optionsRef.current.style.display = "none";
      },
    });
  };

  const close = () => {
    setActive(false);

    optionsRef.current.style.display = "flex";
    gsap.fromTo(
      optionsRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.35 }
    );
  };

  return (
    <section
      ref={mainOptionsRef}
      className="relative h-130 bg-linear-to-b from-black via-[#0b0b0c] to-[#1c1c1e] overflow-hidden"
    >
      {/* Media */}
      {isVideo ? (
        <video
          ref={mediaRef}
          key={media}
          src={media}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          ref={mediaRef}
          key={media}
          src={media}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Apple dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Close */}
      {active && (
        <button
          onClick={close}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center"
        >
          ✕
        </button>
      )}

      {/* Bottom Content Row */}
      {active && (
        <div className="absolute bottom-4 left-0 w-full z-30 px-4">
          <div className="relative flex items-end gap-10">
            {/* LEFT EDGE BUTTON */}
            {index > 0 && (
              <button
                onClick={() => {
                  setDirection(-1);
                  setIndex(index - 1);
                }}
                className="
            absolute -left-6
            w-10 h-13
            rounded-r-full
            bg-[#1c1c1e]/95
            backdrop-blur-2xl
            shadow-[0_10px_30px_rgba(0,0,0,.7)]
            flex items-center justify-center
            text-white text-2xl
            border border-white/5
          "
              >
                ‹
              </button>
            )}

            {/* GLASS BUBBLE */}
            <div
              ref={bubbleRef}
              className="
          w-full
          mx-6
          bg-[#1c1c1e]/95
          backdrop-blur-2xl
          rounded-[28px]
          shadow-[0_30px_60px_rgba(0,0,0,.7)]
          border border-white/5
          flex items-center
        "
            >
              <div className="w-full overflow-y-auto p-4 apple-scroll">
                <p className="text-[14px] leading-4.5 text-white/90">
                  <span className="font-semibold text-white">
                    {item.label}.
                  </span>{" "}
                  {item.content}
                </p>
              </div>
            </div>

            {/* RIGHT EDGE BUTTON */}
            {index < CLOSER_LOOK_OPTIONS.length - 1 && (
              <button
                onClick={() => {
                  setDirection(1);
                  setIndex(index + 1);
                }}
                className="
            absolute -right-6
            w-10 h-13
            rounded-l-full
            bg-[#1c1c1e]/95
            backdrop-blur-2xl
            shadow-[0_10px_30px_rgba(0,0,0,.7)]
            flex items-center justify-center
            text-white text-2xl
            border border-white/5
          "
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}

      {/* Options (default) */}
      <div
        ref={optionsRef}
        className="absolute bottom-6 left-0 w-full px-4 flex gap-2 z-20 element overflow-auto"
      >
        {CLOSER_LOOK_OPTIONS.map((o, i) => (
          <button
            key={o.id}
            onClick={() => handleSelect(i)}
            className="shrink-0 px-5 py-3 rounded-full bg-[#1c1c1e]/90 backdrop-blur-xl text-white text-[16px] font-medium"
          >
            {o.label}
          </button>
        ))}
      </div>
    </section>
  );
}
