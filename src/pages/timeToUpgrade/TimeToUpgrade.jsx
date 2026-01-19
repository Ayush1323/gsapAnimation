import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { upgradeData } from "./upgradeData";

function TimeToUpgrade() {
  const keys = Object.keys(upgradeData);
  const [activeKey, setActiveKey] = useState(keys[0]);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const active = upgradeData[activeKey];
  const { hero, intelligence, battery, display } = active.cards;

  useGSAP(() => {
    gsap.from(".upgrade-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".upgrade-subtitle", {
      y: 30,
      opacity: 0,
      delay: 0.3,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power3.out" }
      );
    },
    { dependencies: [activeKey] }
  );

  return (
    <section
      ref={containerRef}
      className="max-w-240 mx-auto px-4 sm:px-8 lg:px-10 py-20 lg:py-30"
    >
      {/* Heading */}
      <h2 className="upgrade-heading text-[40px] sm:text-[56px] lg:text-[80px] font-semibold text-[#f5f5f7] text-center leading-[1.05] tracking-tight max-w-6xl mx-auto">
        There’s never been a better time to upgrade.
      </h2>

      {/* Select */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <select
            value={activeKey}
            onChange={(e) => setActiveKey(e.target.value)}
            className="w-full appearance-none bg-black border border-[#424245] text-white px-6 py-3 pr-12 rounded-full text-[16px] sm:text-[17px] cursor-pointer"
          >
            {keys.map((key) => (
              <option key={key} value={key}>
                {upgradeData[key].label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#86868b]">
            ▼
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <p className="upgrade-subtitle text-[18px] sm:text-[22px] lg:text-[28px] text-[#86868b] mt-5 font-semibold text-center mx-auto">
        {active.subtitle}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {/* HERO */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="md:row-span-2 p-6 sm:p-8 lg:p-10 rounded-3xl lg:rounded-4xl flex items-end bg-center bg-cover min-h-[160px] sm:min-h-[320px]"
          style={{ backgroundImage: `url(${hero.bgImage})` }}
        >
          <div>
            <img
              src={hero.icon}
              alt=""
              className="w-10 sm:w-12"
              loading="lazy"
            />
            <p className="text-[26px] sm:text-[32px] lg:text-[40px] font-semibold text-[#f5f5f7] mt-3 leading-tight">
              {hero.text}
            </p>
          </div>
        </div>

        {/* INTELLIGENCE */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="rounded-2xl bg-rainbow-border p-1 md:min-h-[180px] min-h-[160px]"
        >
          <div className="bg-[#1d1d1f] rounded-2xl h-full px-6 sm:px-8 lg:px-10 flex items-center gap-4">
            <img
              src={intelligence.icon}
              alt=""
              className="w-8 sm:w-10"
              loading="lazy"
            />
            <div className="text-[18px] sm:text-[22px] lg:text-[28px] font-semibold text-[#f5f5f7] leading-tight">
              {intelligence.title}
              <br />
              <span className="text-rainbow">{intelligence.highlight}</span>
            </div>
          </div>
        </div>

        {/* BATTERY */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="md:row-span-2 bg-[#1d1d1f] p-6 sm:p-8 lg:p-10 rounded-3xl lg:rounded-4xl flex flex-col justify-end gap-3 md:min-h-[260px]"
        >
          <img
            src={battery.icon}
            alt=""
            className="w-10 sm:w-12"
            loading="lazy"
          />
          <p className="text-[26px] sm:text-[32px] lg:text-[40px] font-semibold text-[#f5f5f7] leading-tight">
            {battery.text}
            <span className="text-[#86868b] text-[32px]">{battery.sub}</span>
          </p>
        </div>

        {/* DISPLAY */}
        <div
          ref={(el) => (cardsRef.current[3] = el)}
          className="bg-[#1d1d1f] p-6 sm:p-8 lg:p-10 rounded-3xl lg:rounded-4xl flex gap-6 items-center max-md:min-h-[160px]"
        >
          <img
            src={display.icon}
            alt=""
            className="w-10 sm:w-12"
            loading="lazy"
          />
          <div className="text-[18px] sm:text-[22px] lg:text-[28px] font-semibold text-[#f5f5f7] leading-tight">
            {display.text}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimeToUpgrade;
