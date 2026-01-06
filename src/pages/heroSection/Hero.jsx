import Button from "../../components/Button";
import heroVideo from "../../assets/Videos/heroVideo.mp4";

function Hero() {
  return (
    <section className="relative h-[calc(100vh-44px)] overflow-hidden text-white">
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full -mt-10"
      />

      {/* Content */}
      <div className="relative z-10 max-w-420 mx-auto h-full flex items-end pb-4">
        <div className="w-full flex items-end justify-between pb-16 px-6">
          {/* Text */}
          <h1 className="font-semibold max-w-200">
            <span className="text-[56px] leading-[1.1] inline-block bg-[linear-gradient(90deg,var(--color-apple-1),var(--color-apple-2)_31%,var(--color-apple-3)_68%,var(--color-apple-4))] bg-clip-text text-transparent">
              MacBook Pro 14″ now supercharged by M5.
            </span>
          </h1>

          {/* Button */}
          <div className="flex justify-end w-full">
            <div className="bg-[#424245B8] text-var(--sk-body-text-color) px-2 py-2 text-[17px] rounded-full flex items-center justify-between gap-8">
              <div className="font-semibold text-start leading-[1.2] ml-4">
                From ₹169900.00* <br /> or ₹26650.00/mo. for 6 mo.‡
              </div>
              <Button>Buy</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
