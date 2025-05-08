import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Hamburger() {
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setStatus(!status);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <>
      {token ? (
        <div className="relative z-10 overflow-hidden bg-[var(--color-greenBackground)] p-2 text-sm text-[var(--color-text)] min-[1024px]:hidden">
          <div className="pt-[5%] pb-[5%] leading-4 no-underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-[16px] justify-self-center min-[1024px]:hidden"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#e3e3e3"
              onClick={() => {
                handleClick(), handleSearch();
              }}
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden text-sm">
          <div className="bg-[var(--color-greenBackground)] pt-[5%] pb-[5%] leading-4 text-[var(--color-text)] no-underline">
            <Link
              to={"/login"}
              className="mx-15 mb-6 block items-center rounded-xl bg-[var(--color-buttonBrown)] p-3 text-center hover:bg-[#bc7142cb] min-[1024px]:hidden"
              onClick={handleClick}
            >
              Log in
            </Link>
            <Link
              to={"/register"}
              className="mx-15 mb-6 block rounded-xl bg-[var(--color-buttonBlue)] p-3 text-center hover:bg-[#416683] min-[1024px]:hidden"
              onClick={handleClick}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
