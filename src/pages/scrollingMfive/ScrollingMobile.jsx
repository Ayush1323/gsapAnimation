import mobileImage from "../../assets/Images/scrollingMfive/performance_mx_chip_startframe__bfgs77zni2sy_large.jpg";
import mobileImage2 from "../../assets/Images/scrollingMfive/performance_mx_chip_endframe__btgip5rgjfhy_large.jpg";
function ScrollingMobile() {
  return (
    <div className="py-20 px-5">
      <div className="flex flex-col justify-center items-center z-10">
        <div className="text-2xl font-semibold text-[#f5f5f7]">Performance</div>
        <div className="text-[48px] text-center font-semibold inline-block text-apple-gradient leading-[1.2]">
          Happily <br /> ever faster.
        </div>
      </div>
      <div>
        <img
          src={mobileImage}
          alt=""
          className="h-105 w-105 object-cover mix-blend-screen -mt-10"
        />
        <p className="font-semibold z-10 text-[#86868b] leading-[1.2] text-[19px] text-center -mt-10">
          The M5 chip joins M4 Pro and M4 Max to create the most advanced series
          of chips ever built for a pro laptop. Each chip delivers phenomenal
          single- and multithreaded CPU performance and faster unified memory —{" "}
          <span className="text-[#f5f5f7] font-semibold">
            giving you the kind of speed you’ve never thought possible.
          </span>{" "}
          And with powerful Neural Accelerators in the M5 chip, you can fly
          through AI tasks at mind-bending speeds.
        </p>
      </div>
      <div>
        <img
          src={mobileImage2}
          alt=""
          className="h-105 w-105 object-cover mix-blend-screen -mt-10"
        />
        <p className="leading-[1.2] text-center text-2xl font-semibold text-apple-gradient -mt-18">
          Up to 6x faster AI <br /> performance than M1
          <sup className="text-apple-4 font-semibold underline text-xl">6</sup>
        </p>
        <p className="font-semibold z-10 text-[#86868b] leading-[1.2] text-[19px] text-center mt-10">
          A powerful Neural Accelerator is built into each GPU core of the M5
          chip, which{" "}
          <span className="text-[#f5f5f7] font-semibold">
            dramatically speeds up AI tasks
          </span>{" "}
          like image generation from diffusion models and large language model
          (LLM) prompt processing. The 16-core Neural Engine drives Apple
          Intelligence features, making on-device AI powerful and energy
          efficient.
        </p>
      </div>
    </div>
  );
}

export default ScrollingMobile;
