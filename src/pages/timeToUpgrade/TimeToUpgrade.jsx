import { useState } from "react";
import { upgradeData } from "./upgradeData";

function TimeToUpgrade() {
  const keys = Object.keys(upgradeData);
  const [activeKey, setActiveKey] = useState(keys[0]);

  const activeCards = upgradeData[activeKey].cards;

  return (
    <div className="max-w-[1245px] py-30 mx-auto">
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
               w-112.5
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

      {/* Cards */}
      <div className="grid grid-cols-2 gap-6 mt-20">
        {/* {activeCards.map((card) => (
          <UpgradeCard key={card.id} card={card} />
        ))} */}
      </div>
    </div>
  );
}

export default TimeToUpgrade;
