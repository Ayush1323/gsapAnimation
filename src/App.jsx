import "./App.css";
import CloserLook from "./pages/closerLook/CloserLook";
import DragonLaptop from "./pages/dragonLaptop/DragonLaptop";
import Header from "./pages/header/Header";
import Hero from "./pages/heroSection/Hero";
import Highlights from "./pages/highlights/Highlights";
import ScrollingFive from "./pages/scrollingMfive/ScrollingFive";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Highlights />
      <CloserLook />
      <ScrollingFive />
      <DragonLaptop />
    </>
  );
}

export default App;
