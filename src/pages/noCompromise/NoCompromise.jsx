import ContentBlock from "../batterTogather/ContentBlock";

function NoCompromise() {
  const securityFeatures = [
    {
      id: 1,
      image:
        "./src/assets/Images/noCompromise/security_icon_touchid__esgl4qj1ylkm_large.png",
      title: "Touch ID.",
      description:
        "Unlock your Mac and sign in to apps with your fingertip. The Secure Enclave keeps your fingerprint data safe.",
    },
    {
      id: 2,
      image:
        "./src/assets/Images/noCompromise/security_icon_findmy__edciyxehqsa6_large.png",
      title: "Find My.",
      description:
        "Locate your misplaced MacBook Pro and remotely lock or erase it if needed.",
    },
    {
      id: 3,
      image:
        "./src/assets/Images/noCompromise/security_icon_privacy__vf4d2pc74v6i_large.png",
      title: "FileVault.",
      description:
        "Encrypt and protect your files and data without having to think about it.",
    },
  ];

  return (
    <div className="py-30 relative">
      <ContentBlock
        eyebrow="Security"
        title="No compromises."
        className={"max-w-230! mb-20"}
      />
      <div className="max-w-270 mx-auto">
        <img
          src="./src/assets/Images/security_hero__f06nvgwd8eye_large.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-230 mx-auto">
        <p className="text-[21px] font-semibold text-[#86868b] leading-[1.2] mt-15">
          <span className="text-white">Security starts with Apple silicon</span>{" "}
          and extends to the macOS architecture. This deep integration of
          hardware and software along with automatic software updates helps keep
          MacBook Pro stable and protected for the long term. The security
          architecture also powers features such as Touch ID, Find My and
          advanced defences that protect against viruses and malware.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-12">
          {securityFeatures.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} />

              <p className="text-[17px] font-semibold text-[#86868b] leading-[1.2] mt-5">
                <span className="text-white">{item.title}</span>{" "}
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoCompromise;
