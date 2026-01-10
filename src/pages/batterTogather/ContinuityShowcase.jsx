import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import NextIcon from "../../assets/Icons/NextIcon";
import PrevIcon from "../../assets/Icons/PrevIcon";

function ContinuityShowcase({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

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

      if (prevIndex !== null) {
        tl.to(mediaRefs.current[prevIndex], {
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        });
      }

      tl.to(
        mediaRefs.current[activeIndex],
        {
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.7"
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    },
    { dependencies: [activeIndex] }
  );

  useEffect(() => {
    gsap.to(tabsInnerRef.current, {
      x: tabsOffset,
      duration: 0.6,
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
      duration: 0.5,
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
    handleIndexChange(Math.max(activeIndex - 1, 0));
    setTabsOffset((v) => Math.min(v + STEP, 0));
  };

  const next = () => {
    const wrapper = tabsWrapperRef.current;
    const inner = tabsInnerRef.current;
    const maxOffset = wrapper.offsetWidth - inner.scrollWidth;

    handleIndexChange(Math.min(activeIndex + 1, data.length - 1));
    setTabsOffset((v) => Math.max(v - STEP, maxOffset));
  };

  return (
    <section className="relative bg-black pt-14 sm:pt-20 overflow-hidden">
      {/* MEDIA */}
      <div className="relative mx-auto mb-12 w-full sm:w-263 h-[220px] sm:h-155 rounded-3xl">
        {data.map((item, index) => {
          const isVideo = item.image?.endsWith(".mp4");
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              ref={(el) => (mediaRefs.current[index] = el)}
              className="absolute inset-0"
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
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover rounded-3xl"
                />
              )}
            </div>
          );
        })}

        {data[activeIndex].smallContent && (
          <div className="absolute -bottom-5 right-2 text-[11px] sm:text-[12px] text-[#FFFFFFCC] text-center">
            {data[activeIndex].smallContent}
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="relative flex items-center justify-center gap-3 mb-6 px-3">
        {showPrev && (
          <button onClick={prev} className="text-white/70 hover:text-white">
            <PrevIcon size={16} />
          </button>
        )}

        <div
          ref={tabsWrapperRef}
          className="overflow-hidden border-b border-[#86868b]/60 max-w-full"
        >
          <div
            ref={tabsInnerRef}
            className="relative flex gap-6 sm:gap-8 text-[14px] sm:text-[17px] text-[#FFFFFFCC]"
          >
            {data.map((item, index) => (
              <button
                key={item.tab}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => handleIndexChange(index)}
                className={`pb-3 whitespace-nowrap transition ${
                  index === activeIndex
                    ? "text-white"
                    : "hover:text-white/80"
                }`}
              >
                {item.tab}
              </button>
            ))}

            <span
              ref={indicatorRef}
              className="absolute bottom-0 h-px bg-white"
              style={{ width: 0 }}
            />
          </div>
        </div>

        {showNext && (
          <button onClick={next} className="text-white/70 hover:text-white">
            <NextIcon size={16} />
          </button>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <p className="text-[#86868b] text-[14px] sm:text-[16px] lg:text-[17px] font-semibold leading-[1.35]">
          {data[activeIndex].description}
        </p>
      </div>
    </section>
  );
}

export default ContinuityShowcase;
