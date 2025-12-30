import { useEffect, useRef, useState, useCallback, memo } from "react";
import gsap from "gsap";

function Pagination({
  total,
  activeIndex,
  onChange,
  autoplayDelay = 3000,
  ref,
}) {
  const barsRef = useRef([]);
  const progressTlRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (activeIndex === total - 1 && !progressTlRef.current?.isActive()) {
      onChange(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [activeIndex, total, onChange]);

  const handleBarClick = useCallback(
    (index) => {
      if (index !== activeIndex) {
        onChange(index);
        setIsPlaying(true);
      }
    },
    [activeIndex, onChange]
  );

  useEffect(() => {
    if (!isPlaying) {
      progressTlRef.current?.pause();
      return;
    }

    const bar = barsRef.current[activeIndex];
    if (!bar) return;

    barsRef.current.forEach((b, i) => {
      if (b) gsap.set(b, { scaleX: i < activeIndex ? 1 : 0 });
    });

    progressTlRef.current?.kill();

    progressTlRef.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: autoplayDelay / 1000,
        ease: "none",
        transformOrigin: "left",
        onComplete: () => {
          if (activeIndex < total - 1) {
            onChange(activeIndex + 1);
          } else {
            setIsPlaying(false);
          }
        },
      }
    );

    return () => progressTlRef.current?.kill();
  }, [activeIndex, autoplayDelay, isPlaying, total, onChange]);

  const isFinished = activeIndex === total - 1 && !isPlaying;

  return (
    <div className="flex justify-center items-center gap-6 mt-20">
      <div ref={ref} className="flex items-center gap-4">
        <div className="bg-black/40 backdrop-blur-lg rounded-full flex items-center gap-4 py-6 px-6">
          {Array.from({ length: total }, (_, index) => (
            <button
              key={index}
              onClick={() => handleBarClick(index)}
              className={`relative overflow-hidden cursor-pointer transition-all focus:outline-none focus:ring-none rounded-full
              ${
                activeIndex === index
                  ? "w-12 h-2 bg-white/80"
                  : "w-2 h-2 bg-white/80"
              }
            `}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
            >
              <span
                ref={(el) => (barsRef.current[index] = el)}
                className="absolute inset-0 bg-white scale-x-0 rounded-full"
              />
            </button>
          ))}
        </div>
        <div className="py-4 px-6 rounded-full bg-black/40 backdrop-blur-lg">
          <button
            onClick={handlePlayPause}
            className="text-white text-sm w-6 h-6 flex items-center justify-center transition-transform focus:outline-none focus:ring-none rounded cursor-pointer"
          >
            {isFinished ? "🔄" : isPlaying ? "⏸" : "▶️"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Pagination);
