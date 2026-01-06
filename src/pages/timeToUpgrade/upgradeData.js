import heroBgImage from "../../assets/Images/helmet-image.jpeg";
import appleIntelligenceIcon from "../../assets/Images/icon_apple_intelligence__f2cdmwimgiq2_large.png";
import xdrDisplayIcon from "../../assets/Images/icon_xdr_display__yb78ajay2qaa_large.png";

export const upgradeData = {
  macbook14: {
    label: "14″ MacBook Pro (M5)",
    subtitle: "Here’s what you get with the new 14″ MacBook Pro with M5.",
    cards: {
      hero: {
        bgImage: heroBgImage,
        icon: "https://www.apple.com/v/macbook-pro/av/images/overview/upgraders/icon_sparkles__crqv6fji0x26_large.png",
        text: "Fly through demanding AI tasks up to 86x faster.1",
      },
      intelligence: {
        icon: appleIntelligenceIcon,
        title: "Built for",
        highlight: "Apple Intelligence.",
      },
      battery: {
        icon: "https://www.apple.com/v/macbook-pro/av/images/overview/upgraders/icon_battery_life__erphl3wwf0sy_large.png",
        text: "Up to 14 more hours battery life.",
        sub: "(Up to 24 hours total.)",
      },
      display: {
        icon: xdrDisplayIcon,
        text: "A stunning Liquid Retina XDR display.",
      },
    },
  },

  macbook16: {
    label: "16″ MacBook Pro (M5)",
    subtitle: "Here’s what you get with the new 16″ MacBook Pro with M5.",
    cards: {
      hero: {
        bgImage: heroBgImage,
        icon: "https://www.apple.com/v/macbook-pro/av/images/overview/upgraders/icon_sparkles__crqv6fji0x26_large.png",
        text: "Extreme performance for large workflows.",
      },
      intelligence: {
        icon: appleIntelligenceIcon,
        title: "Designed for",
        highlight: "Next-gen AI.",
      },
      battery: {
        icon: "https://www.apple.com/v/macbook-pro/av/images/overview/upgraders/icon_battery_life__erphl3wwf0sy_large.png",
        text: "Up to 18 more hours battery life.",
        sub: "(Up to 26 hours total.)",
      },
      display: {
        icon: xdrDisplayIcon,
        text: "Even larger Liquid Retina XDR display.",
      },
    },
  },
};
