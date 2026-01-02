import ContentBlock from "../batterTogather/ContentBlock";

function PowerfullConnection() {
  return (
    <div>
      <ContentBlock
        eyebrow="Ports and Connectivity"
        title="Make powerful connections."
        description={
          <>
            <p>
              MacBook Pro packs an array of ports for connecting high-speed
              peripherals, driving high-resolution displays, or directly
              offloading SDXC cards.{" "}
              <span className="text-white">
                Models with the M5 chip feature Thunderbolt 4. Models with M4
                Pro or M4 Max feature Thunderbolt 5,
              </span>{" "}
              which offers transfer speeds of up to 120Gb/s.51
            </p>
          </>
        }
      />
    </div>
  );
}

export default PowerfullConnection;
