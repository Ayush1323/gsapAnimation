import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HEADER_VALUE } from "../../utils/header/header";
import NextIcon from "../../assets/Icons/NextIcon";

function MobileMenu({ open, onClose }) {
  const menuRef = useRef(null);
  const submenuRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = HEADER_VALUE.filter((item) => item.hasMenu);

  useGSAP(() => {
    gsap.set(menuRef.current, {
      y: "-100%",
    });
  }, []);

  useGSAP(() => {
    gsap.to(menuRef.current, {
      y: open ? "0%" : "-100%",
      duration: 1,
      ease: "power4.out",
    });
  }, [open]);

  const openSubMenu = (item) => {
    setActiveItem(item);

    requestAnimationFrame(() => {
      gsap.fromTo(
        submenuRef.current,
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        }
      );
    });
  };

  const handleBack = () => {
    gsap.to(submenuRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => setActiveItem(null),
    });
  };

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-999 bg-[#1d1d1f] text-white px-6 py-5"
    >
      {/* HEADER */}
      <div className="flex justify-end items-center mb-8">
        <button onClick={onClose}>✕</button>
      </div>

      {/* MAIN MENU */}
      {!activeItem && (
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="text-[28px] cursor-pointer flex justify-between items-center font-semibold"
              onClick={() => openSubMenu(item)}
            >
              {item.label}
              <span ref={item.refNext} className="opacity-70">
                <NextIcon />
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* SUB MENU */}
      {activeItem && (
        <div ref={submenuRef} className="absolute inset-0 bg-black px-6 py-5">
          <button
            className="mb-6 text-sm opacity-80 flex items-center gap-1"
            onClick={handleBack}
          >
            ← Back
          </button>

          <h3 className="text-xl mb-5">{activeItem.label}</h3>

          <ul className="space-y-3">
            {activeItem.menu.map((sub, i) => (
              <li key={i} className="text-base opacity-90">
                {sub}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
