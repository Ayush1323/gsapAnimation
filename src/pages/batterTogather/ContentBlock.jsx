import clsx from "clsx";

function ContentBlock({
  eyebrow,
  title,
  description,
  linkText,
  onLinkClick,
  className,
}) {
  return (
    <div className={clsx(className, "max-w-210 mx-auto")}>
      {eyebrow && (
        <h2 className="text-[24px] font-semibold text-[#f5f5f7] leading-[1.2]">
          {eyebrow}
        </h2>
      )}

      {title && (
        <h3 className="text-[80px] font-semibold text-[#f5f5f7] leading-[1.2] mt-3">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-[21px] font-semibold text-[#86868b] leading-[1.2] mt-12">
          {description}
        </p>
      )}

      {linkText && (
        <p
          onClick={onLinkClick}
          className="text-[21px] text-blue-400 cursor-pointer mt-5"
        >
          {linkText} {">"}
        </p>
      )}
    </div>
  );
}

export default ContentBlock;
