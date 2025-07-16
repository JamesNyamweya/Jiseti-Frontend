import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  color = "bg-[#1F2937]",
  textColor = "text-white",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-6 py-3 rounded-[20px] font-medium transition duration-300 ease-in-out hover:bg-[#6B7280] cursor-pointer",
        color,
        textColor
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
