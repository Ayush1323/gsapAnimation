import { useEffect, useRef, useState, useCallback, memo } from "react";
import gsap from "gsap";
import PlayIcon from "../assets/Icons/PlayIcon";
import PauseIcon from "../assets/Icons/PauseIcon";
import RestartIcon from "../assets/Icons/RestartIcon";

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
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePlayPause = useCallback(() => {
    const tl = progressTlRef.current;

    if (activeIndex === total - 1 && isCompleted) {
      setIsCompleted(false);
      onChange(0);
      setIsPlaying(true);
      return;
    }

    if (!tl) return;

    if (isPlaying) {
      tl.pause();
    } else {
      tl.resume();
    }

    setIsPlaying((prev) => !prev);
  }, [isPlaying, activeIndex, total, onChange, isCompleted]);

  const handleBarClick = useCallback(
    (index) => {
      if (index !== activeIndex) {
        setIsCompleted(false);
        onChange(index);
        setIsPlaying(true);
      }
    },
    [activeIndex, onChange]
  );

  useEffect(() => {
    const bar = barsRef.current[activeIndex];
    if (!bar) return;

    setIsCompleted(false);

    barsRef.current.forEach((b, i) => {
      if (b) gsap.set(b, { scaleX: i < activeIndex ? 1 : 0 });
    });

    progressTlRef.current?.kill();

    const tl = gsap.timeline({
      paused: !isPlaying,
      onComplete: () => {
        if (activeIndex < total - 1) {
          onChange(activeIndex + 1);
        } else {
          setIsCompleted(true);
          setIsPlaying(false);
        }
      },
    });

    tl.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: autoplayDelay / 1000,
        ease: "none",
        transformOrigin: "left",
      }
    );

    progressTlRef.current = tl;

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, autoplayDelay, total, onChange]);

  const showRestart = activeIndex === total - 1 && isCompleted;

  return (
    <div className="flex justify-center items-center gap-6 mt-20">
      <div ref={ref} className="flex items-center gap-4">
        <div className="bg-black/40 backdrop-blur-lg rounded-full flex items-center gap-4 py-6 px-6">
          {Array.from({ length: total }, (_, index) => (
            <button
              key={index}
              onClick={() => handleBarClick(index)}
              className={`relative overflow-hidden rounded-full transition-all cursor-pointer hover:bg-white  
                ${
                  activeIndex === index
                    ? "w-12 h-2 bg-white/80"
                    : "w-2 h-2 bg-white/80"
                }`}
            >
              <span
                ref={(el) => (barsRef.current[index] = el)}
                className="absolute inset-0 bg-white scale-x-0 rounded-full"
              />
            </button>
          ))}
        </div>

        <div
          onClick={handlePlayPause}
          className="h-14 w-14 rounded-full bg-black/40 backdrop-blur-lg cursor-pointer flex items-center justify-center"
        >
          <button className="text-white  flex items-center justify-center cursor-pointer">
            {showRestart ? (
              <RestartIcon size={26} />
            ) : isPlaying ? (
              <PauseIcon size={30} />
            ) : (
              <PlayIcon size={36} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Pagination);
