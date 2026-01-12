import laptopImage from "../../assets/Videos/flyDragon/laptop.jpg";
import flyDragonVideo from "../../assets/Videos/flyDragon/fly-dragon.mp4";

function DragonLaptop() {
  return (
    <>
      <div className="bg-black w-full flex justify-center px-4">
        <div className="relative w-full max-w-300 aspect-16/10">
          {/* Laptop Image */}
          <img
            src={laptopImage}
            alt="Laptop"
            className="absolute inset-0 w-full h-full object-contain z-10"
          />

          {/* Dragon Video */}
          <video
            src={flyDragonVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-contain z-20 mix-blend-screen pointer-events-none"
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center md:my-20 mt-10">
        <p className="font-semibold text-[#86868b] px-4 lg:max-w-215.5 md:max-w-120 w-full leading-[1.2] md:text-[21px] text-[19px] md:text-center">
          Run graphics-intensive workflows with responsiveness that keeps up
          with your imagination. M5 features a GPU with enhanced shader cores
          and a third-generation ray‑tracing engine, so{" "}
          <span className="text-[#f5f5f7] font-semibold">
            gaming feels more immersive and realistic.
          </span>{" "}
          And Dynamic Caching optimises on-chip memory to significantly increase
          GPU utilisation — driving huge performance boosts for pro apps and
          games.
        </p>
      </div>
    </>
  );
}

export default DragonLaptop;
