import ContentBlock from "../batterTogather/ContentBlock";
import Delight from "./Delight";

function DelightHeader() {
  return (
    <div className="z-20 py-30">
      <ContentBlock
        className={"mb-14"}
        eyebrow="Delight"
        title="Let there be delight."
      />
      <Delight />
      <p className="text-[21px] font-semibold text-[#86868b] leading-[1.2] max-w-210 mx-auto">
        <span className="text-white">
          Go from the sunniest terrace to the darkest studio
        </span>{" "}
        with more ease than ever. The eye-popping Liquid Retina XDR display
        offers up to 1,600 nits peak HDR brightness. And it provides up to 1,000
        nits of brightness for SDR content in bright light so you can see what’s
        on your screen more clearly outside. In low-light situations, it dims to
        1 nit so you can work comfortably in darker spaces.
      </p>
    </div>
  );
}

export default DelightHeader;
