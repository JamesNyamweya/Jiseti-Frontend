import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-[#E5E7EB] rounded-[20px] p-6 shadow-md">{children}</div>
  );
};

export default Card;