import ChipsInMobile from "../delight/ChipsInMobile";
import Chips from "./Chips";
import StickyHeadingChip from "./StickyHeadingChip";

function ThreeChips() {
  return (
    <div className="pt-20 relative">
      <div className="max-w-200 mx-auto px-4">
        <h2 className="text-[56px] max-xl:text-5xl max-md:text-[32px] font-semibold text-[#f5f5f7] leading-[1.2] max-md:text-center">
          Three chips.
          <br /> Second to none.
        </h2>
      </div>
      <div>
        <div className="overflow-x-hidden md:block hidden">
          <Chips />
        </div>
        <div className="md:hidden px-6">
          <ChipsInMobile />
        </div>
        <div className="flex items-center justify-center sticky bottom-10 md:-mt-20 mt-10">
          <StickyHeadingChip />
        </div>
      </div>
    </div>
  );
}

export default ThreeChips;
