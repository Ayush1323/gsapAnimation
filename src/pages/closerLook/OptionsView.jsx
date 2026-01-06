import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { useRef, useState } from "react";
import { CLOSER_LOOK_OPTIONS } from "../../utils/closerLook/closerLook";
import CloserLookVideo from "../../assets/Videos/closerLook.mp4";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_MEDIA = CloserLookVideo;

function OptionsView() {
  const containerRef = useRef(null);
  const mainCircleRef = useRef(null);
  const itemsRef = useRef(null);
  const contentRefs = useRef([]);
  const mediaRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.set(itemsRef.current.children, {
        opacity: 0,
        scale: 0.85,
        width: 0,
        transformOrigin: "left center",
      });

      gsap.set(mainCircleRef.current, {
        opacity: 0,
        scale: 1.4,
        x: -80,
      });

      tl.to(mainCircleRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.1,
        ease: "bounce.out",
      })
        .to(mainCircleRef.current, { opacity: 0, duration: 0.15 })
        .to(itemsRef.current.children, {
          opacity: 1,
          scale: 1,
          width: "fit-content",
          duration: 0.8,
          ease: "back.out(1.4)",
        });
    },
    { scope: containerRef }
  );

  const animateMedia = (nextMedia) => {
    if (!mediaRef.current) return;

    const tl = gsap.timeline();

    tl.to(mediaRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setMediaIndex(nextMedia);
      },
    }).to(mediaRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const animateNavButtons = (show) => {
    if (!prevBtnRef.current || !nextBtnRef.current) return;

    if (show) {
      gsap.fromTo(
        [prevBtnRef.current, nextBtnRef.current],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to([prevBtnRef.current, nextBtnRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  const switchContent = (newIndex) => {
    const items = itemsRef.current.children;
    const oldContent = contentRefs.current[expandedIndex];
    const newContent = contentRefs.current[newIndex];

    gsap.to(oldContent, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setExpandedIndex(newIndex);
        animateMedia(newIndex);

        gsap.fromTo(
          newContent,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      },
    });

    [...items].forEach((item, i) => {
      if (i === newIndex) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(item, {
          opacity: 0.5,
          scale: 0.97,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  const handlePrev = () => {
    if (expandedIndex > 0) {
      switchContent(expandedIndex - 1);
    }
  };

  const handleNext = () => {
    if (expandedIndex < CLOSER_LOOK_OPTIONS.length - 1) {
      switchContent(expandedIndex + 1);
    }
  };

  const handleClick = (index) => {
    setIsActive(true);
    animateMedia(index);
    animateNavButtons(true);

    const items = itemsRef.current.children;

    [...items].forEach((item, i) => {
      const content = contentRefs.current[i];

      if (i === index) {
        gsap.to(item, {
          opacity: 0.7,
          scale: 0.98,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            setExpandedIndex(index);

            gsap.to(item, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.fromTo(
              content,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.1,
              }
            );
          },
        });
      } else {
        gsap.to(item, {
          opacity: 0.5,
          scale: 0.97,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  const handleClose = () => {
    setIsActive(false);
    animateNavButtons(false);

    const items = itemsRef.current.children;

    if (expandedIndex !== null) {
      gsap.to(contentRefs.current[expandedIndex], {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
      });
    }

    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.05,
      onComplete: () => {
        setExpandedIndex(null);
      },
    });

    if (mediaRef.current) {
      gsap.to(mediaRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setMediaIndex(null);
          gsap.to(mediaRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const activeMedia =
    mediaIndex !== null
      ? CLOSER_LOOK_OPTIONS[mediaIndex]?.image
      : DEFAULT_MEDIA;

  const isVideo = activeMedia?.endsWith(".mp4");
  const isPrevDisabled = expandedIndex === 0;
  const isNextDisabled = expandedIndex === CLOSER_LOOK_OPTIONS.length - 1;

  return (
    <div ref={containerRef} className="relative max-w-350 h-184.5">
      <div className="relative overflow-hidden rounded-4xl">
        {isVideo ? (
          <video
            ref={mediaRef}
            key={activeMedia}
            src={activeMedia}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            ref={mediaRef}
            key={activeMedia}
            src={activeMedia}
            alt=""
            className="w-full h-full object-cover"
          />
        )}

        <div
          ref={mainCircleRef}
          className="absolute top-1/2 left-30 -translate-y-1/2 bg-[#272729] w-14 h-14 rounded-full z-10"
        />

        {isActive && (
          <>
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white cursor-pointer flex items-center justify-center z-30 transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Navigation Buttons - Centered Vertically on Right Side */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
              <button
                ref={prevBtnRef}
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className={`w-11 h-11 rounded-full backdrop-blur-md text-white cursor-pointer flex items-center justify-center transition-all ${
                  isPrevDisabled
                    ? "bg-white/5 opacity-30 cursor-not-allowed"
                    : "bg-white/10 hover:scale-110 hover:bg-white/20 active:scale-95"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>

              <button
                ref={nextBtnRef}
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`w-11 h-11 rounded-full backdrop-blur-md text-white cursor-pointer flex items-center justify-center transition-all ${
                  isNextDisabled
                    ? "bg-white/5 opacity-30 cursor-not-allowed"
                    : "bg-white/10 hover:scale-110 hover:bg-white/20 active:scale-95"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div
        ref={itemsRef}
        className="absolute top-1/2 left-30 -translate-y-1/2 flex flex-col gap-4 z-20"
      >
        {CLOSER_LOOK_OPTIONS.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleClick(index)}
            className={`${
              expandedIndex === index
                ? "bg-[#272729]/60 backdrop-blur-2xl p-8"
                : "bg-[#272729] p-4"
            } rounded-4xl w-fit text-white cursor-pointer overflow-hidden transition-all duration-300`}
          >
            {expandedIndex !== index && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center transition-transform hover:scale-110">
                  +
                </div>
                <div>{item.label}</div>
              </div>
            )}

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className={`w-100 ${
                expandedIndex === index ? "block" : "hidden"
              }`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsView;
