import React, { ReactNode } from "react";

interface IButton {
  className?: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  iconRight?: boolean;
  iconLeft?: boolean;
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
  variant = "contained",
  title = text
}) => {
  return (
    <button
      className={`${
        className && className
      } px-2 py-1 rounded-lg hover:bg-stone-400/30 active:bg-stone-400/50 transition text-center overflow-hidden content-center items-center ${
        variant === "outlined"
          ? "bg-transparent outline outline-1"
          : variant === "borderless"
          ? "bg-transparent"
          : "bg-stone-400/20"
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
          {icon}
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
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
