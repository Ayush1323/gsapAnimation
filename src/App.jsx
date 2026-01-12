import "./App.css";
import BatterTogather from "./pages/batterTogather/BatterTogather";
import BatteryLife from "./pages/batteryLife/BatteryLife";
import BornToRun from "./pages/bornToRun/BornToRun";
import BuiltForAi from "./pages/builtForAi/BuiltForAi";
import DragonLaptop from "./pages/dragonLaptop/DragonLaptop";
import FreshFaced from "./pages/freshFaced/FreshFaced";
import GreatPowers from "./pages/greatPowers/GreatPowers";
import Header from "./pages/header/Header";
import Hero from "./pages/heroSection/Hero";
import Highlights from "./pages/highlights/Highlights";
import Intelligence from "./pages/intelligence/Intelligence";
import LequidSlider from "./pages/lequidSlider/LequidSlider";
import NanoTexture from "./pages/nanoTexture/NanoTexture";
import NoCompromise from "./pages/noCompromise/NoCompromise";
import PowerfullConnection from "./pages/powerfullConnection/PowerfullConnection";
import ScrollingFive from "./pages/scrollingMfive/ScrollingFive";
import ThreeChips from "./pages/threeChips/ThreeChips";
import TimeToUpgrade from "./pages/timeToUpgrade/TimeToUpgrade";
import UltimateShow from "./pages/ultimateShow/UltimateShow";
import YourAmbitions from "./pages/yourAmbitions/YourAmbitions";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Highlights />
      {/*<CloserLook />*/}
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
      <BatterTogather />
      <YourAmbitions />
      {/* Niche vadu baki chhe */}
      {/* <DelightHeader />  */}
      <NanoTexture />
      <UltimateShow />
      <PowerfullConnection />
      <NoCompromise />
      <TimeToUpgrade />
    </>
  );
}

export default App;
