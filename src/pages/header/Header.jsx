/* eslint-disable react-hooks/preserve-manual-memoization */
import { useRef, useState, useMemo } from "react";
import { HEADER_VALUE } from "../../utils/header/header";
import HoverItems from "./HoverItems";
import MobileMenu from "./MobileMenu";

function Header() {
  const headerRef = useRef(null);

  const [hoveredItem, setHoveredItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ------------------ DATA GROUPING ------------------ */
  const leftItems = HEADER_VALUE.filter((item) => item.type === "logo");

  const centerItems = HEADER_VALUE.filter((item) => !item.type && item.hasMenu);

  const rightItems = HEADER_VALUE.filter(
    (item) => item.type === "menu" || item.type === "icon"
  );

  /* ------------------ ACTIVE DESKTOP ITEM ------------------ */
  const activeItem = useMemo(() => {
    return centerItems.find((item) => item.id === hoveredItem);
  }, [hoveredItem, centerItems]);

  const showOverlay = Boolean(activeItem?.hasMenu);

  return (
    <>
      {/* DESKTOP OVERLAY (UNCHANGED) */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setHoveredItem(null)}
        />
      )}

      <header
        ref={headerRef}
        className={`relative z-50 transition-colors ${
          showOverlay ? "bg-[#161617]" : "bg-black"
        }`}
      >
        <div className="max-w-260 mx-auto flex items-center px-4 h-11 text-[12px] gap-6 max-lg:justify-between lg:w-fit">
          {/* LEFT : APPLE LOGO */}
          <div className="flex items-center">
            {leftItems.map((item) => (
              <span
                key={item.id}
                className="text-white flex items-center"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
            ))}
          </div>

          {/* CENTER : DESKTOP MENU (UNCHANGED) */}
          <div className="hidden lg:flex items-center gap-2">
            {centerItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer px-3 last:pr-0 transition-colors whitespace-nowrap ${
                  hoveredItem === item.id
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
                onMouseEnter={() => {
                  setHoveredItem(item.id);
                  if (item.hasMenu) setShowMenu(true);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* RIGHT : ICONS + MOBILE MENU */}
          <div className="flex items-center lg:gap-2">
            {rightItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer px-3 text-white flex items-center last:pr-0 ${
                  item.type === "menu" ? "lg:hidden" : ""
                }`}
                onClick={() => {
                  if (item.type === "menu") {
                    setIsMobileMenuOpen(true);
                  }
                }}
              >
                <span
                  className="flex items-center"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP HOVER MENU (UNCHANGED) */}
        {showMenu && (
          <HoverItems
            activeItem={activeItem}
            show={showOverlay}
            onCloseComplete={() => setShowMenu(false)}
          />
        )}
      </header>

      {/* MOBILE MENU */}
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Header;
