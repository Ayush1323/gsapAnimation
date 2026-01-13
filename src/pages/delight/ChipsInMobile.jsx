import { CHIP_INFORMATION } from "../../utils/chips/chipsInformation";
import laptopImage from "../../assets/Images/chips/performance_laptop_screen.jpg";

function ChipsInMobile() {
  return (
    <div className="flex flex-col gap-14 mt-12">
      {CHIP_INFORMATION.map((c, i) => (
        <div key={i}>
          <div className="relative">
            <img src={laptopImage} className="w-full" alt="" />

            <img
              src={c.image}
              alt=""
              className="absolute top-0 left-0 w-full h-full object-cover mix-blend-screen"
            />
          </div>
          <div className="w-full flex justify-center mt-7 mb-5">
            <div
              key={i}
              className={`w-16 h-16 rounded-2xl ${c.bg}
      flex items-center justify-center
      transition-all duration-300
    `}
            >
              <img
                src={c.icon}
                alt={c.alt}
                className="object-contain select-none pointer-events-none"
              />
            </div>
          </div>
          <p className="font-semibold text-[#F5F5F7] text-[21px] leading-[1.2] text-center">
            {c.text}
          </p>
          <p
            className={`${c.gradientText} text-apple-gradient font-semibold text-[21px] leading-[1.2] mt-4 text-center`}
          >
            {c.available}
          </p>
          <p
            className={`${c.gradientText} text-apple-gradient font-semibold text-[21px] leading-[1.2] mt-1 text-center`}
          >
            {c.faster}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChipsInMobile;
