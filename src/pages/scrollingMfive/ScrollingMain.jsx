import ScrollingFive from "./ScrollingFive";
import ScrollingMobile from "./ScrollingMobile";

function ScrollingMain() {
  return (
    <>
      <div className="md:block hidden">
        <ScrollingFive />
      </div>
      <div className="md:hidden block">
        <ScrollingMobile />
      </div>
    </>
  );
}

export default ScrollingMain;
