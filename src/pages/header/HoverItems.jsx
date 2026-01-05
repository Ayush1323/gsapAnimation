import { useEffect, useRef } from "react";
import gsap from "gsap";

function HoverItems({ activeItem, show, onCloseComplete }) {
  const menuRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current.fromTo(
      menuRef.current,
      {
        height: 0,
        opacity: 0,
        y: -10,
      },
      {
        height: 450,
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }
    );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (show) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse().eventCallback("onReverseComplete", () => {
        onCloseComplete();
      });
    }
  }, [show, onCloseComplete]);

  return (
    <div
      ref={menuRef}
      className="bg-[#161617] text-white overflow-hidden absolute w-full left-0"
    >
      <div className="max-w-250 m-auto flex justify-center gap-6 py-4">
        {activeItem?.menu?.map((menuItem, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            {menuItem}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HoverItems;
