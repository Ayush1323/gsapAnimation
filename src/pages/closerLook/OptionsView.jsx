import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { useRef, useState } from "react";
import { CLOSER_LOOK_OPTIONS } from "../../utils/closerLook/closerLook";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_MEDIA = "./src/assets/Videos/closerLook.mp4";

function OptionsView() {
  const containerRef = useRef(null);
  const mainCircleRef = useRef(null);
  const itemsRef = useRef(null);
  const contentRefs = useRef([]);
  const mediaRef = useRef(null);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);

  /* ================= ENTRY ================= */
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

  /* ================= MEDIA ANIMATION ================= */
  const animateMedia = (nextMedia) => {
    if (!mediaRef.current) return;

    const tl = gsap.timeline();

    tl.to(mediaRef.current, {
      x: -120,
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        setMediaIndex(nextMedia);
      },
    })
      .set(mediaRef.current, { x: 120 })
      .to(mediaRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
  };

  /* ================= OPTION CLICK ================= */
  const handleClick = (index) => {
    setIsActive(true);
    animateMedia(index);

    const items = itemsRef.current.children;
    // console.log(items);

    [...items].forEach((item, i) => {
      // console.log(item);
      const content = contentRefs.current[i];
      console.log(content);

      if (i === index) {
        console.log(i === index);
        // gsap.set(content, { opacity: 0 });
        gsap.set(item, { opacity: 0, width: 0 });

        gsap.to(item, {
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            setExpandedIndex(index);
            gsap.to(content, {
              opacity: 1,
              duration: 0.1,
            });
            gsap.to(item, {
              duration: 0.1,
              ease: "power2.out",
              width: "fit-content",
              onComplete: () => {
                gsap.to(item, {
                  width: "100%",
                  opacity: 1,
                  duration: 0.15,
                });
              },
            });
          },
        });
      } else {
        gsap.to(item, {
          width: "fit-content",
          duration: 0.3,
        });
      }
    });
  };

  const handleClose = () => {
    setIsActive(false);
    setExpandedIndex(null);

    gsap.to(itemsRef.current.children, {
      width: "fit-content",
      duration: 0.3,
      ease: "power2.out",
    });

    if (mediaRef.current) {
      gsap.to(mediaRef.current, {
        x: 120,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setMediaIndex(null);
          gsap.fromTo(
            mediaRef.current,
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45 }
          );
        },
      });
    }
  };

  const activeMedia =
    mediaIndex !== null
      ? CLOSER_LOOK_OPTIONS[mediaIndex]?.image
      : DEFAULT_MEDIA;

  const isVideo = activeMedia?.endsWith(".mp4");

  return (
    <div ref={containerRef} className="relative max-w-350 h-184.5 ">
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
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#272729] text-white cursor-pointer flex items-center justify-center z-30"
          >
            ✕
          </button>
        )}
      </div>

      {/* ============== OPTIONS ============== */}
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
            } rounded-4xl w-fit text-white cursor-pointer overflow-hidden`}
          >
            {expandedIndex !== index && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
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
