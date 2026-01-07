import { useRef } from "react";
import ContentBlock from "../batterTogather/ContentBlock";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import connection1 from "../../assets/Images/powerFullConnection/connections_hw_1__rboovclqj6im_large.jpg";
import connection2 from "../../assets/Images/powerFullConnection/connections_hw_2__bwc0c562jaia_large.jpg";

gsap.registerPlugin(ScrollTrigger);

function PowerfullConnection() {
  const sliderRefConnection = useRef(null);
  const imgLeftRef = useRef(null);
  const imgRightRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    gsap.set(imgLeftRef.current, { x: 1000 });
    gsap.set(imgRightRef.current, { x: -1000 });

    tl.to(
      imgLeftRef.current,
      {
        x: 0,
        duration: 5,
        ease: "power3.out",
      },
      0
    ).to(
      imgRightRef.current,
      {
        x: 0,
        duration: 5,
        ease: "power3.out",
      },
      0
    );

    ScrollTrigger.create({
      trigger: sliderRefConnection.current,
      start: "top 80%",
      onEnter: () => {
        tl.restart();
      },
      onEnterBack: () => {
        tl.restart();
      },
      onLeave: () => {
        tl.pause(0);
      },
      onLeaveBack: () => {
        tl.pause(0);
      },
      // markers: true,
    });
  }, []);

  return (
    <div className="w-full overflow-hidden py-30">
      <ContentBlock
        eyebrow="Ports and Connectivity"
        title="Make powerful connections."
        description={
          <>
            <p className="leading-[1.2]">
              MacBook Pro packs an array of ports for connecting high-speed
              peripherals, driving high-resolution displays, or directly
              offloading SDXC cards.{" "}
              <span className="text-white">
                Models with the M5 chip feature Thunderbolt 4. Models with M4
                Pro or M4 Max feature Thunderbolt 5,
              </span>{" "}
              which offers transfer speeds of up to 120Gb/s.
              <sup className="underline text-xs">51</sup>
            </p>
            <p className="mt-4 leading-[1.2]">
              MacBook Pro also supports both Wi-Fi 6E
              <sup className="underline text-xs">52</sup> and Bluetooth 5.3 to
              connect to the internet and your wireless devices.
            </p>
          </>
        }
      />
      <div
        ref={sliderRefConnection}
        className="flex flex-col gap-20 max-w-210 mx-auto pt-20"
      >
        <div ref={imgLeftRef} className="w-450">
          <img src={connection1} alt="" />
        </div>
        <div ref={imgRightRef} className="w-450 self-end">
          <img src={connection2} alt="" />
        </div>
      </div>

      <div className="grid grid-cols-2 max-w-230 mx-auto gap-10 pt-25">
        <div className="flex flex-col">
          <hr className="border-sky-gradient" />
          <ul className="text-[28px] leading-[1.1] font-semibold text-[#f5f5f7] pt-7.5">
            <li>
              Thunderbolt<sup className="underline text-base">11</sup>
            </li>
            <li>HDMI</li>
            <li>SDXC</li>
            <li>Headphone Jack</li>
            <li>MagSafe</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <hr className="border-sky-gradient" />
          <p className="text-[21px] leading-[1.2] font-semibold text-[#86868b] pt-7.5">
            <span className="text-white">Drive external displays.</span> Connect
            up to two high-resolution external displays with M5 and M4 Pro, or
            up to four high-resolution displays with M4 Max.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PowerfullConnection;
