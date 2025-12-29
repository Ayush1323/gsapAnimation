import { useRef, useState, useMemo } from "react";
import { HEADER_VALUE } from "../../utils/header/header";
import HoverItems from "./HoverItems";

function Header() {
  const headerRef = useRef(null);

  const [hoveredItem, setHoveredItem] = useState(null);

  const activeItem = useMemo(
    () => HEADER_VALUE.find((item) => item.id === hoveredItem),
    [hoveredItem]
  );

  return (
    <header
      className={`${
        activeItem?.hasMenu ? "bg-[#161617]" : "bg-black"
      } relative z-50`}
      ref={headerRef}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="max-w-250 m-auto flex items-center justify-between px-4 text-[12px]">
        {HEADER_VALUE.map((item) => (
          <div
            key={item.id}
            className={` ${
              hoveredItem === item.id ? "text-white" : "text-white/80"
            } cursor-pointer px-3 hover:text-white transition-colors duration-200`}
            onMouseEnter={() => setHoveredItem(item.id)}
          >
            {item.type === "logo" || item.type === "icon" ? (
              <span dangerouslySetInnerHTML={{ __html: item.icon }} />
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {activeItem?.hasMenu && <HoverItems activeItem={activeItem} />}
    </header>
  );
}

export default Header;
