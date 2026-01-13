import Button from "../../components/Button";
import heroVideo from "../../assets/Videos/heroVideo.mp4";
import NewAnimation from "../NewAnimation";

function Hero() {
  return (
    <section className="relative h-[calc(100vh-44px)] overflow-hidden text-white">
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full -mt-10 max-md:object-cover"
      />

      {/* Content */}
      <div className="relative z-10 max-w-430 mx-auto h-full flex items-end md:pb-4">
        <div className="w-full flex max-lg:flex-col lg:items-end md:justify-between justify-center lg:pb-16 md:pb-8 lg:px-6 md:px-10 max-sm:gap-4 max-lg:gap-6">
          {/* Text */}
          <h2 className="text-[21px] font-semibold lg:hidden max-md:text-center">
            MacBook Pro
          </h2>
          <h1 className="max-w-200 max-md:px-4">
            <span className="text-[56px] max-xl:text-5xl max-md:text-[32px] max-md:text-center inline-block bg-[linear-gradient(90deg,var(--color-apple-1),var(--color-apple-2)_31%,var(--color-apple-3)_68%,var(--color-apple-4))] bg-clip-text text-transparent tracking-tighter font-semibold leading-[1.2]">
              MacBook Pro 14″ now supercharged by M5.
            </span>
          </h1>

          {/* Button */}
          <div className="flex lg:justify-end w-full">
            <div className="bg-[#424245B8] text-var(--sk-body-text-color) px-2 py-2 md:text-[17px] text-base md:rounded-full flex items-center justify-between gap-8 max-md:w-full">
              <div className="font-semibold text-start leading-[1.2] ml-4">
                From ₹169900.00* <br /> or ₹26650.00/mo. for 6 mo.‡
              </div>
              <Button>Buy</Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full z-50">
          <NewAnimation />
        </div>
      </div>
    </section>
  );
}

export default Hero;
