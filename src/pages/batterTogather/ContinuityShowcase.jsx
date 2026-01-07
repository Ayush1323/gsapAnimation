import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PrevIcon from "../../assets/Icons/PrevIcon";
import NextIcon from "../../assets/Icons/NextIcon";

function ContinuityShowcase({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  // Multiple refs for stacked media
  const mediaRefs = useRef([]);
  const contentRef = useRef(null);

  const tabsWrapperRef = useRef(null);
  const tabsInnerRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  const [tabsOffset, setTabsOffset] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const STEP = 180;

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(
        mediaRefs.current[prevIndex],
        {
          opacity: 0,
          duration: 1.2,
          ease: "power2.in",
        },
        "-=0.7"
      );

      tl.to(
        mediaRefs.current[activeIndex],
        {
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [activeIndex] }
  );

  useEffect(() => {
    gsap.to(tabsInnerRef.current, {
      x: tabsOffset,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [tabsOffset]);

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

  const handleIndexChange = (newIndex) => {
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
  };

  const prev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    handleIndexChange(newIndex);
    setTabsOffset((v) => Math.min(v + STEP, 0));
  };

  const next = () => {
    const wrapper = tabsWrapperRef.current;
    const inner = tabsInnerRef.current;
    const maxOffset = wrapper.offsetWidth - inner.scrollWidth;

    const newIndex = Math.min(activeIndex + 1, data.length - 1);
    handleIndexChange(newIndex);
    setTabsOffset((v) => Math.max(v - STEP, maxOffset));
  };

  return (
    <section className="relative bg-black pt-20 overflow-hidden">
      <div className="mb-14 relative rounded-3xl w-263 h-155">
        {data.map((item, index) => {
          const isVideo = item.image?.endsWith(".mp4");
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              ref={(el) => (mediaRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: index === 0 && prevIndex === null ? 1 : 0,
                zIndex: isActive ? 2 : 1,
              }}
            >
              {isVideo ? (
                <video
                  src={item.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full rounded-3xl"
                />
              ) : (
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full rounded-3xl"
                />
              )}
            </div>
          );
        })}

        {/* Small content overlay */}
        {data[activeIndex].smallContent && (
          <div
            ref={contentRef}
            className="absolute -bottom-6 right-2 text-[#FFFFFFCC] text-[12px] text-center z-10"
          >
            {data[activeIndex].smallContent}
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
            className="relative flex gap-8 text-[#FFFFFFCC] text-[17px]"
          >
            {data.map((item, index) => (
              <button
                key={item.tab}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => handleIndexChange(index)}
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
      <div ref={contentRef} className="text-center max-w-3xl mx-auto">
        <p className="text-[#86868b] text-[17px] font-semibold leading-[1.2]">
          {data[activeIndex].description}
        </p>
      </div>
    </section>
  );
}

export default ContinuityShowcase;
