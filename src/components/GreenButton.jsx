import React from "react";

const GreenButton = ({ text, onClick, className = "" }) => {
  return (

    <button
      className= {`bg-(--color-greenBackground) px-4 py-2 rounded-lg  hover:bg-[#060f0b] cursor-pointer font-bold text-white ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GreenButton;