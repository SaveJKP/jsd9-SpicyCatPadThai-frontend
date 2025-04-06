import React from "react";

const BrownButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      className= {`bg-(--color-buttonBrown) px-4 py-2 rounded-lg  hover:bg-[#d8c2b0] cursor-pointer font-bold text-(--color-banner) ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BrownButton;