function DragonLaptop() {
  return (
    <>
      <div className="bg-black w-full flex justify-center items-center relative">
        <img
          src="./src/assets/Videos/flyDragon/laptop.jpg"
          alt=""
          className="z-10"
        />
        <video
          src="./src/assets/Videos/flyDragon/fly-dragon.mp4"
          autoPlay
          muted
          loop
          className="absolute  z-20 mix-blend-screen"
        />
      </div>
      <div className="w-full flex justify-center items-center my-20">
        <p className="font-semibold text-[#86868b] max-w-220 leading-[1.2] text-[21px] text-center">
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
