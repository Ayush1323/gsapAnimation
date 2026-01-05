import { useRef, useState, useMemo } from "react";
import { HEADER_VALUE } from "../../utils/header/header";
import HoverItems from "./HoverItems";

function Header() {
  const headerRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const activeItem = useMemo(
    () => HEADER_VALUE.find((item) => item.id === hoveredItem),
    [hoveredItem]
  );

  const showOverlay = Boolean(activeItem?.hasMenu);

  return (
    <>
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
        <div className="max-w-250 m-auto flex items-center justify-between px-4 text-[12px]">
          {HEADER_VALUE.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer px-3 transition-colors ${
                hoveredItem === item.id
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
              onMouseEnter={() => {
                setHoveredItem(item.id);
                if (item.hasMenu) setShowMenu(true);
              }}
            >
              {item.type === "logo" || item.type === "icon" ? (
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
              ) : (
                <span>{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {showMenu && (
          <HoverItems
            activeItem={activeItem}
            show={showOverlay}
            onCloseComplete={() => setShowMenu(false)}
          />
        )}
      </header>
    </>
  );
}

export default Header;
