import Chips from "./Chips";

function ThreeChips() {
  return (
    <div className="pt-20">
      <div className="max-w-200 mx-auto">
        <h2 className="text-[56px] font-semibold text-[#f5f5f7] leading-[1.2]">
          Three chips.
          <br /> Second to none.
        </h2>
      </div>
      <div>
        <Chips />
      </div>
    </div>
  );
}

export default ThreeChips;
