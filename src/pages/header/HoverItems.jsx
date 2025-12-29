import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function HoverItems({ activeItem }) {
  const menuRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
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
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [activeItem]);

  return (
    <div
      ref={menuRef}
      className="bg-[#161617] text-white overflow-hidden absolute w-full left-0"
    >
      <div className="max-w-250 m-auto flex justify-center gap-6 py-4">
        {activeItem.menu?.map((menuItem, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            {menuItem}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HoverItems;
