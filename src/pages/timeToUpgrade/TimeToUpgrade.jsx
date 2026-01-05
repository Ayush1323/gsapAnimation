import { useState } from "react";
import { upgradeData } from "./upgradeData";

function TimeToUpgrade() {
  const keys = Object.keys(upgradeData);
  const [activeKey, setActiveKey] = useState(keys[0]);

  // const activeCards = upgradeData[activeKey].cards;

  return (
    <div className="max-w-235 py-30 mx-auto">
      {/* Heading */}
      <h2 className="text-[80px] font-semibold text-[#f5f5f7] text-center leading-none tracking-tight">
        There’s never been a better time to upgrade.
      </h2>

      {/* Apple-style Select */}
      <div className="flex justify-center mt-12">
        <div className="relative">
          <select
            value={activeKey}
            onChange={(e) => setActiveKey(e.target.value)}
            className="
              appearance-none
              bg-black
              border border-[#424245]
              text-white
              px-6 py-3 pr-12
              rounded-full
              text-[17px]
              focus:outline-none
              focus:border-[#0071e3]
               w-90
               cursor-pointer
            "
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
      <div className="text-[28px] text-[#86868b] mt-4 font-semibold text-center">
        Here’s what you get with the new 14″ MacBook Pro with M5.
      </div>
      <div className="grid grid-cols-2 gap-4 mt-20">
        <div className="bg-[url('./src/assets/Images/helmet-image.jpeg')] bg-center bg-no-repeat row-span-2 p-10 h-full min-h-95 rounded-4xl flex items-end">
          <div>
            <img
              src="https://www.apple.com/v/macbook-pro/av/images/overview/upgraders/icon_sparkles__crqv6fji0x26_large.png"
              alt=""
            />
            <p className="text-[40px] font-semibold text-[#f5f5f7] mt-2 leading-none">
              Fly through demanding AI tasks up to 86x faster.1
            </p>
          </div>
        </div>
        <div className="inline-block rounded-2xl bg-rainbow-border">
          {/* INNER CONTAINER */}
         
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default TimeToUpgrade;
