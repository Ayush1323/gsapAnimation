import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import findMyIcon from "../../assets/Images/noCompromise/security_icon_findmy__edciyxehqsa6_large.png";
import fileVaultIcon from "../../assets/Images/noCompromise/security_icon_privacy__vf4d2pc74v6i_large.png";
import touchIdIcon from "../../assets/Images/noCompromise/security_icon_touchid__esgl4qj1ylkm_large.png";
import securityHero from "../../assets/Images/security_hero__f06nvgwd8eye_large.jpg";
import ContentBlock from "../batterTogather/ContentBlock";

gsap.registerPlugin(ScrollTrigger);

function NoCompromise() {
  const securityFeatureRef = useRef(null);

  const securityFeatures = [
    {
      id: 1,
      image: touchIdIcon,
      title: "Touch ID.",
      description:
        "Unlock your Mac and sign in to apps with your fingertip. The Secure Enclave keeps your fingerprint data safe.",
    },
    {
      id: 2,
      image: findMyIcon,
      title: "Find My.",
      description:
        "Locate your misplaced MacBook Pro and remotely lock or erase it if needed.",
    },
    {
      id: 3,
      image: fileVaultIcon,
      title: "FileVault.",
      description:
        "Encrypt and protect your files and data without having to think about it.",
    },
  ];

  useGSAP(
    () => {
      gsap.from(securityFeatureRef.current.children, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: securityFeatureRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: securityFeatureRef }
  );

  return (
    <section className="py-20 sm:py-24 lg:py-30 relative px-4 sm:px-8">
      <ContentBlock
        eyebrow="Security"
        title="No compromises."
        className="max-w-230! mb-14 sm:mb-20"
      />

      {/* Hero Image */}
      <div ref={securityFeatureRef} className="max-w-270 mx-auto">
        <img
          src={securityHero}
          alt=""
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>

      {/* Content */}
      <div
        ref={securityFeatureRef}
        className="max-w-230 mx-auto mt-12 sm:mt-15"
      >
        <p className="text-[19px] lg:text-[21px] font-semibold text-[#86868b] leading-[1.35]">
          <span className="text-white">
            Security starts with Apple silicon
          </span>{" "}
          and extends to the macOS architecture. This deep integration of
          hardware and software along with automatic software updates helps keep
          MacBook Pro stable and protected for the long term.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {securityFeatures.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-10 sm:w-12"
              />
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-[#86868b] leading-[1.35]">
                <span className="text-white">{item.title}</span>{" "}
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NoCompromise;
