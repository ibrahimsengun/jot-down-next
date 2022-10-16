import React, { ReactNode, useState } from "react";

interface IButton {
  className?: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  iconRight?: boolean;
  iconLeft?: boolean;
  hoveredIcon?: ReactNode;
  variant?: "contained" | "outlined" | "borderless";
  title?: string;
}

const Button: React.FC<IButton> = ({
  className,
  text,
  onClick,
  icon,
  iconRight,
  iconLeft = iconRight ? false : true,
  hoveredIcon = icon,
  variant = "contained",
  title = text,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const _icon = isHovered ? hoveredIcon : icon;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        className && className
      } px-1 rounded-lg transition text-center overflow-hidden content-center items-center ${
        variant === "outlined"
          ? "bg-transparent outline outline-1"
          : variant === "borderless"
          ? "bg-transparent hover:none active:none"
          : "bg-stone-400/20 hover:bg-stone-400/30 active:bg-stone-400/50"
      }`}
      onClick={onClick}
      title={title}
    >
      {iconLeft && (
        <span
          className={`inline-flex items-center h-full align-middle ${
            text ? "mr-2" : ""
          }`}
        >
          {_icon}
        </span>
      )}
      {text && (
        <span className="inline-flex items-center h-full align-middle">
          {text}
        </span>
      )}
      {iconRight && (
        <span
          className={`inline-flex items-center h-full align-middle ${
            text ? "ml-2" : ""
          }`}
        >
          {_icon}
        </span>
      )}
    </button>
  );
};

export default Button;
