import { useState, useRef } from "react";
import { upgradeData } from "./upgradeData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function TimeToUpgrade() {
  const keys = Object.keys(upgradeData);
  const [activeKey, setActiveKey] = useState(keys[0]);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const active = upgradeData[activeKey];
  const { hero, intelligence, battery, display } = active.cards;

  // 🔹 Initial animation
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
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [activeKey] }
  );

  return (
    <div ref={containerRef} className="max-w-240 py-30 mx-auto">
      {/* Heading */}
      <h2 className="upgrade-heading text-[80px] font-semibold text-[#f5f5f7] text-center leading-none tracking-tight max-w-235 mx-auto">
        There’s never been a better time to upgrade.
      </h2>

      {/* Select */}
      <div className="flex justify-center mt-12">
        <div className="relative">
          <select
            value={activeKey}
            onChange={(e) => setActiveKey(e.target.value)}
            className="appearance-none bg-black border border-[#424245] text-white px-6 py-3 pr-12 rounded-full text-[17px] w-90 cursor-pointer"
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
      <div className="upgrade-subtitle text-[28px] text-[#86868b] mt-4 font-semibold text-center">
        {active.subtitle}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 mt-10">
        {/* HERO */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="row-span-2 p-10 rounded-4xl flex items-end bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${hero.bgImage})` }}
        >
          <div>
            <img src={hero.icon} alt="" />
            <p className="text-[40px] font-semibold text-[#f5f5f7] mt-2 leading-none">
              {hero.text}
            </p>
          </div>
        </div>

        {/* INTELLIGENCE */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="inline-block rounded-2xl bg-rainbow-border p-1 min-h-57.5"
        >
          <div className="bg-[#1d1d1f] rounded-2xl h-full px-10 flex items-center gap-4">
            <img src={intelligence.icon} alt="" />
            <div className="text-[28px] font-semibold text-[#f5f5f7] leading-[1.2]">
              {intelligence.title}
              <br />
              <span className="text-rainbow">{intelligence.highlight}</span>
            </div>
          </div>
        </div>

        {/* BATTERY */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="row-span-2 bg-[#1d1d1f] p-10 rounded-4xl flex flex-col justify-end gap-3 items-start"
        >
          <img src={battery.icon} alt="" />
          <p className="text-[40px] font-semibold text-[#f5f5f7] leading-[1.2]">
            {battery.text}
            <br />
            <span className="text-[#86868b] text-[24px]">{battery.sub}</span>
          </p>
        </div>

        {/* DISPLAY */}
        <div
          ref={(el) => (cardsRef.current[3] = el)}
          className="bg-[#1d1d1f] p-10 rounded-4xl flex gap-10 items-center"
        >
          <img src={display.icon} alt="" />
          <div className="text-[28px] font-semibold text-[#f5f5f7] leading-[1.2]">
            {display.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeToUpgrade;
