const BrownButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      className={`cursor-pointer rounded-lg bg-(--color-buttonBrown) px-4 py-2 font-bold text-black hover:bg-[#d8c2b0] ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BrownButton;
