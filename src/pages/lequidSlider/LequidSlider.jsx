import React from 'react';
import LiquidGlassSlider from './LiquidGlassSlider';

function LequidSlider() {

    const liquidSliderData = [
        {
          image: "./src/assets/Images/liquidslider/lq-one.jpg",
          title: "Liquid Glass. Clearly inspired.",
          description:
            "A stunning new design makes the display feel even larger and unlocks more ways to personalise your experience.",
        },
        {
          image: "./src/assets/Images/liquidslider/lq-two.mp4",
          title: "Spotlight helps you act fast.",
          description:
            "Perform hundreds of actions — from sending a message to taking down a note — without lifting your hands.",
        },
        {
          image: "./src/assets/Images/liquidslider/lq-three.jpg",
          title: "Live Translation",
          description:
            "Automatically translate conversations in real time during calls and messages.",
        },
        {
            image: "./src/assets/Images/liquidslider/lq-two.mp4",
            title: "Spotlight helps you act fast.",
            description:
              "Perform hundreds of actions — from sending a message to taking down a note — without lifting your hands.",
          },
      ];
      
  return (
    <div>
        <LiquidGlassSlider slides={liquidSliderData} />;
    </div>
  )
}

export default LequidSlider