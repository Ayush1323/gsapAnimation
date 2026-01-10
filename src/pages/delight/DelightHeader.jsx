import ContentBlock from "../batterTogather/ContentBlock";
import Delight from "./Delight";

function DelightHeader() {
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-30 max-md:px-4">
      <ContentBlock
        className="mb-8 sm:mb-10 md:mb-12 lg:mb-14"
        eyebrow="Delight"
        title="Let there be delight."
      />
      <Delight />
      <p className="text-base sm:text-lg md:text-[19px] lg:text-[21px] font-semibold text-[#86868b] leading-[1.2] sm:leading-[1.24] md:leading-[1.28] lg:leading-[1.2] max-w-full sm:max-w-[600px] md:max-w-[720px] lg:max-w-[840px] xl:max-w-210 mx-auto px-4 sm:px-6 md:px-0">
        <span className="text-white">
          Go from the sunniest terrace to the darkest studio
        </span>{" "}
        with more ease than ever. The eye-popping Liquid Retina XDR display
        offers up to 1,600 nits peak HDR brightness. And it provides up to 1,000
        nits of brightness for SDR content in bright light so you can see what's
        on your screen more clearly outside. In low-light situations, it dims to
        1 nit so you can work comfortably in darker spaces.
      </p>
    </div>
  );
}

export default DelightHeader;