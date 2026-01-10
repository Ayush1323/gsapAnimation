import "./App.css";
import DelightHeader from "./pages/delight/DelightHeader";
import Header from "./pages/header/Header";
import Hero from "./pages/heroSection/Hero";
import Highlights from "./pages/highlights/Highlights";
import NanoTexture from "./pages/nanoTexture/NanoTexture";
import NoCompromise from "./pages/noCompromise/NoCompromise";
import PowerfullConnection from "./pages/powerfullConnection/PowerfullConnection";
import TimeToUpgrade from "./pages/timeToUpgrade/TimeToUpgrade";
import UltimateShow from "./pages/ultimateShow/UltimateShow";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Highlights />
      {/*<CloserLook />
      <ScrollingFive />
      <DragonLaptop />
      <ThreeChips />
      <BuiltForAi />
      <BornToRun />
      <Intelligence />
      <GreatPowers />
      <BatteryLife />
      <FreshFaced />*/}
      {/* <LequidSlider /> */}
      {/* <BatterTogather /> */}
      {/* <YourAmbitions /> */}
     <DelightHeader />
  <NanoTexture />
      <UltimateShow />
      <PowerfullConnection />
      <NoCompromise />
      <TimeToUpgrade />
    </>
  );
}

export default App;
