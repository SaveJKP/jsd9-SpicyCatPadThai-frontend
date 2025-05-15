const GreenButton = ({ text, onClick, className = "", children }) => {
  return (
    <button
      className={`cursor-pointer rounded-lg bg-(--color-greenBackground) px-4 py-2 font-bold text-white hover:bg-[#060f0b] ${className}`}
      onClick={onClick}
    >
      {children || text}
    </button>
  );
};

export default GreenButton;
