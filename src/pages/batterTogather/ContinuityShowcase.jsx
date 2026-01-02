import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PrevIcon from "../../assets/Icons/PrevIcon";
import NextIcon from "../../assets/Icons/NextIcon";

function ContinuityShowcase({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const mediaRef = useRef(null);
  const contentRef = useRef(null);

  const tabsWrapperRef = useRef(null);
  const tabsInnerRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  const [tabsOffset, setTabsOffset] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const STEP = 180;

  /* ---------------- Media animation ---------------- */
  useGSAP(
    () => {
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [activeIndex] }
  );

  /* ---------------- Tabs scroll animation ---------------- */
  useEffect(() => {
    gsap.to(tabsInnerRef.current, {
      x: tabsOffset,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [tabsOffset]);

  /* ---------------- Moving underline ---------------- */
  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    const wrapper = tabsInnerRef.current;

    if (!currentTab || !indicator || !wrapper) return;

    const tabRect = currentTab.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    gsap.to(indicator, {
      x: tabRect.left - wrapperRect.left,
      width: tabRect.width,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [activeIndex, tabsOffset]);

  /* ---------------- Overflow detection ---------------- */
  useEffect(() => {
    const wrapper = tabsWrapperRef.current;
    const inner = tabsInnerRef.current;

    if (!wrapper || !inner) return;

    const isOverflow = inner.scrollWidth > wrapper.offsetWidth;

    setShowNext(
      isOverflow && tabsOffset > wrapper.offsetWidth - inner.scrollWidth
    );
    setShowPrev(tabsOffset < 0);

    if (!isOverflow) {
      setTabsOffset(0);
      setShowPrev(false);
      setShowNext(false);
    }
  }, [tabsOffset, data]);

  const prev = () => {
    setActiveIndex((i) => Math.max(i - 1, 0));
    setTabsOffset((v) => Math.min(v + STEP, 0));
  };

  const next = () => {
    const wrapper = tabsWrapperRef.current;
    const inner = tabsInnerRef.current;
    const maxOffset = wrapper.offsetWidth - inner.scrollWidth;

    setActiveIndex((i) => Math.min(i + 1, data.length - 1));
    setTabsOffset((v) => Math.max(v - STEP, maxOffset));
  };

  const activeItem = data[activeIndex];
  const isVideo = activeItem.image?.endsWith(".mp4");

  return (
    <section className="relative bg-black py-20 overflow-hidden">
      {/* MEDIA */}
      <div className="mb-14 relative rounded-3xl overflow-hidden">
        {isVideo ? (
          <video
            ref={mediaRef}
            src={activeItem.image}
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-3xl"
          />
        ) : (
          <img
            ref={mediaRef}
            src={activeItem.image}
            alt=""
            className="w-full rounded-3xl"
          />
        )}

        {activeItem.smallContent && (
          <div
            ref={contentRef}
            className="absolute -bottom-6 right-2 text-[#FFFFFFCC] text-[12px] text-center"
          >
            {activeItem.smallContent}
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="relative flex items-center justify-center gap-4 mb-6">
        {showPrev && (
          <button
            onClick={prev}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition"
          >
            <PrevIcon size={16} />
          </button>
        )}

        <div
          ref={tabsWrapperRef}
          className="overflow-hidden max-w-full border-b border-[#86868b]/60"
        >
          <div
            ref={tabsInnerRef}
            className="relative flex gap-8 text-[#FFFFFFCC] text-[17px] "
          >
            {data.map((item, index) => (
              <button
                key={item.tab}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setActiveIndex(index)}
                className={`pb-3 whitespace-nowrap transition-colors cursor-pointer ${
                  index === activeIndex ? "text-white" : "hover:text-white/80"
                }`}
              >
                {item.tab}
              </button>
            ))}

            {/* UNDERLINE */}
            <span
              ref={indicatorRef}
              className="absolute bottom-0 h-px bg-white"
              style={{ width: 0 }}
            />
          </div>
        </div>

        {showNext && (
          <button
            onClick={next}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition"
          >
            <NextIcon size={16} />
          </button>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-[#86868b] text-[17px] font-semibold leading-[1.2]">
          {activeItem.description}
        </p>
      </div>
    </section>
  );
}

export default ContinuityShowcase;
