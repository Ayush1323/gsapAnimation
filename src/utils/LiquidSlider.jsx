// Images & videos
import lqOne from "../assets/Images/liquidslider/lq-one.jpg";
import lqTwoVideo from "../assets/Images/liquidslider/lq-two.mp4";
import lqThree from "../assets/Images/liquidslider/lq-three.jpg";
import lqFour from "../assets/Images/liquidslider/lq-four.jpg";

import nanoOne from "../assets/Images/nanoTexture/display_nano_texture__gq6yjr1q2x26_large.jpg";
import nanoTwo from "../assets/Images/nanoTexture/display_edr__fqoq4jhrvvyq_large.jpg";
import nanoThree from "../assets/Images/nanoTexture/display_promotion__c6mui8cg7tkm_large.jpg";
import nanoFour from "../assets/Images/nanoTexture/display_multiple__cdia69mhqe82_large.jpg";

export const LIQUID_SLIDER = [
  {
    image: lqOne,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white">Liquid Glass. Clearly inspired.</span>A
        stunning new design makes the display feel even larger and unlocks more
        ways to personalise your experience. Take your icons from light to dark,
        or choose an alluring clear look.
      </p>
    ),
  },
  {
    image: lqTwoVideo,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white">Spotlight helps you act fast. </span>
        Perform hundreds of actions in Spotlight — from sending a message to
        taking down a note — without lifting your hands off the keyboard.
      </p>
    ),
  },
  {
    image: lqThree,
    content: (
      <>
        <p className="max-w-95 text-[17px] text-[#86868b] leading-[1.2] font-semibold">
          <span className="text-white">
            Live Translation speaks your language.{" "}
          </span>
          Automatically translate texts in Messages, display live translated
          captions in FaceTime and get spoken translations for calls in the
          Phone app.<sup className="underline">49</sup>
        </p>
        <p className="text-[12px] mt-4 text-[#86868b] leading-[1.2]">
          Available in selected languages.
        </p>
      </>
    ),
  },
  {
    image: lqFour,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white"> Run shortcuts automagically.</span>
        Boost your productivity by automatically running shortcuts at a certain
        time of day or when you take specific actions — like organising images
        based on their content.
      </p>
    ),
  },
];

export const NANO_TEXTURE = [
  {
    image: nanoOne,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white">
          Nano-texture display. Fewer reflections. More clarity.
        </span>
        For those who work in particularly bright spaces — whether inside or out
        — the nano-texture option reduces reflections to eliminate distractions
        while maintaining an excellent viewing experience.
      </p>
    ),
  },
  {
    image: nanoTwo,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white">
          Exceptional contrast with Extreme Dynamic Range.
        </span>
        MacBook Pro can maintain extreme brightness for HDR content, delivering
        outstanding contrast between the brightest brights and the blackest
        blacks.
      </p>
    ),
  },
  {
    image: nanoThree,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white">ProMotion. A smooth operator.</span>
        ProMotion makes everything from scrolling to gaming superfluid and
        responsive, automatically adjusting to match the movement of content —
        with refresh rates up to 120Hz. Video editors can even choose a fixed
        refresh rate that precisely aligns with footage.
      </p>
    ),
  },
  {
    image: nanoFour,
    content: (
      <p className="text-[17px] text-[#86868b] leading-[1.2] font-semibold">
        <span className="text-white">
          Multiple displays. Why limit yourself to one?
        </span>
        If a project calls for larger canvases, you can connect up to two
        displays with M5 and M4 Pro or up to four displays with M4 Max. The
        brilliant Studio Display pairs beautifully with MacBook Pro, and its
        68.29 cm (27”) 5K display makes all your work look stunning.
      </p>
    ),
  },
];
