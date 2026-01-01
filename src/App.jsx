import "./App.css";
import BatteryLife from "./pages/batteryLife/BatteryLife";
import BornToRun from "./pages/bornToRun/BornToRun";
import BuiltForAi from "./pages/builtForAi/BuiltForAi";
import CloserLook from "./pages/closerLook/CloserLook";
import DragonLaptop from "./pages/dragonLaptop/DragonLaptop";
import FreshFaced from "./pages/freshFaced/FreshFaced";
import GreatPowers from "./pages/greatPowers/GreatPowers";
import Header from "./pages/header/Header";
import Hero from "./pages/heroSection/Hero";
import Highlights from "./pages/highlights/Highlights";
import Intelligence from "./pages/intelligence/Intelligence";
import LequidSlider from "./pages/lequidSlider/LequidSlider";
import ScrollingFive from "./pages/scrollingMfive/ScrollingFive";
import ThreeChips from "./pages/threeChips/ThreeChips";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Highlights />
      <CloserLook />
      <ScrollingFive />
      <DragonLaptop />
      <ThreeChips />
      <BuiltForAi />
      <BornToRun />
      <Intelligence />
      <GreatPowers />
      <BatteryLife />
      <FreshFaced />
      <LequidSlider />
    </>
  );
}

export default App;
