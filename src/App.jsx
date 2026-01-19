import { lazy, Fragment, Suspense } from "react";
import "./App.css";
import GsapLoader from "./components/GsapLoader";
const Header = lazy(() => import("./pages/header/Header"));
const Hero = lazy(() => import("./pages/heroSection/Hero"));
const Highlights = lazy(() => import("./pages/highlights/Highlights"));
const CloserLook = lazy(() => import("./pages/closerLook/CloserLook"));
const ScrollingMain = lazy(() =>
  import("./pages/scrollingMfive/ScrollingMain")
);
const DragonLaptop = lazy(() => import("./pages/dragonLaptop/DragonLaptop"));
const ThreeChips = lazy(() => import("./pages/threeChips/ThreeChips"));
const BuiltForAi = lazy(() => import("./pages/builtForAi/BuiltForAi"));
const BornToRun = lazy(() => import("./pages/bornToRun/BornToRun"));
const Intelligence = lazy(() => import("./pages/intelligence/Intelligence"));
const GreatPowers = lazy(() => import("./pages/greatPowers/GreatPowers"));
const BatteryLife = lazy(() => import("./pages/batteryLife/BatteryLife"));
const FreshFaced = lazy(() => import("./pages/freshFaced/FreshFaced"));
const LequidSlider = lazy(() => import("./pages/lequidSlider/LequidSlider"));
const BatterTogather = lazy(() =>
  import("./pages/batterTogather/BatterTogather")
);
const YourAmbitions = lazy(() => import("./pages/yourAmbitions/YourAmbitions"));
const DelightHeader = lazy(() => import("./pages/delight/DelightHeader"));
const NanoTexture = lazy(() => import("./pages/nanoTexture/NanoTexture"));
const UltimateShow = lazy(() => import("./pages/ultimateShow/UltimateShow"));
const PowerfullConnection = lazy(() =>
  import("./pages/powerfullConnection/PowerfullConnection")
);
const NoCompromise = lazy(() => import("./pages/noCompromise/NoCompromise"));
const TimeToUpgrade = lazy(() => import("./pages/timeToUpgrade/TimeToUpgrade"));
function App() {
  return (
    <Suspense fallback={<GsapLoader />}>
      <Header />
      <Hero />
      <Highlights />
      <CloserLook />
      <ScrollingMain />
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
      <DelightHeader />
      <NanoTexture />
      <UltimateShow />
      <PowerfullConnection />
      <NoCompromise />
      <TimeToUpgrade />
    </Suspense>
  );
}

export default App;
