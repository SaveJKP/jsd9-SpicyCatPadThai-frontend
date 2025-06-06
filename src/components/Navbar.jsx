import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_katsubook_notext from "/logo_katsubook_onlylogo.png";
import { useCart } from "../context/CartContext";
import logo_katsubook_text from "/logo_katsubook_onlytext.png";
import { UserPopover } from "./UserPopOver";
import { LoginPopover } from "./LoginPopOver";
import { useAuth } from "../context/userContext";
import axios from "axios";

export const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const [categories, setCategories] = useState([]);

  const { user } = useAuth();
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://katsubook-backend.onrender.com/api/category/get-all",
      );
      setCategories(response.data.category);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = () => {
    const textTrimmed = searchText.trim();
    if (textTrimmed !== "") {
      navigate(`/search?query=${encodeURIComponent(textTrimmed)}`);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-[var(--color-greenBackground)] py-4">
        <div className="container__div">
          <div className="flex h-[64px] flex-row justify-between gap-1 px-[24px] py-1 text-[var(--color-text)] sm:max-md:px-[10px]">
            <div className="flex flex-row">
              <Link
                to="/"
                className="flex flex-row items-center sm:max-md:hidden"
              >
                <img
                  src={logo_katsubook_notext}
                  alt="onlyLogo"
                  className="h-[70%]"
                />
                <img
                  src={logo_katsubook_text}
                  alt="onlyLogoText"
                  className="h-[60%] sm:max-[815px]:hidden"
                />
              </Link>
              <Link to="/" className="flex flex-row items-center">
                <img
                  src={logo_katsubook_notext}
                  alt="LOGO"
                  className="max-h-10 place-self-center md:hidden"
                />
              </Link>
              {/* search icon */}
              <Link to={"/search"} className="py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-[1024px]:hidden"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#e3e3e3"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </Link>
            </div>

            <div className="flex w-[30%] items-center sm:max-md:hidden">
              <input
                type="text"
                placeholder="Search by title, author, description, or category"
                className="hover:border-lightgray bg-text relative left-10 my-[5%] h-[65%] w-full rounded-lg border border-none p-[12px] text-[var(--color-banner)] transition-all duration-300 focus:border-[2px] focus:border-gray-500 sm:max-[815px]:hidden"
                onClick={() => navigate("/search")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              {/* search icon */}
              <Link to={"/search"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-4 mt-4 sm:max-[815px]:hidden"
                  viewBox="0 -960 960 960"
                  width="32px"
                  fill="#d9d9d9"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-row justify-end gap-5">
              {user ? (
                <UserPopover />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="my-2 w-30 justify-self-center rounded-xl bg-[var(--color-buttonBrown)] p-[8px] text-center text-[16px] hover:bg-[#bc7142cb] min-[1024px]:block sm:max-[815px]:hidden"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="my-2 w-30 justify-self-center rounded-xl bg-[var(--color-buttonBlue)] p-[8px] text-center text-[16px] hover:bg-[#416683] min-[1024px]:block sm:max-[815px]:hidden"
                  >
                    Register
                  </Link>
                  <LoginPopover />
                </>
              )}

              <Link className="flex items-center" to={"/purchase"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-auto w-12"
                  viewBox="0 0 24 24"
                  fill="var(--color-text)"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 3C1 2.44772 1.44772 2 2 2C3.62481 2 5.06733 3.03971 5.58114 4.58114L5.72076 5L18.03 5C18.6859 4.99998 19.2437 4.99996 19.6951 5.04029C20.165 5.08226 20.6347 5.17512 21.064 5.43584C21.6667 5.80183 22.1211 6.36838 22.3477 7.03605C22.5091 7.51168 22.4978 7.99036 22.4369 8.45816C22.3783 8.90755 22.2573 9.45209 22.115 10.0924L21.8088 11.4704C21.664 12.1218 21.5435 12.6641 21.4106 13.1043C21.2716 13.5649 21.1006 13.9803 20.8231 14.36C20.4058 14.931 19.8446 15.3812 19.1967 15.6646C18.7658 15.8532 18.3232 15.93 17.8434 15.9658C17.3849 16 16.8295 16 16.1621 16H10.8379C10.1705 16 9.61512 16 9.15656 15.9658C8.67678 15.93 8.23421 15.8532 7.80328 15.6646C7.15536 15.3812 6.59418 14.931 6.17692 14.36C5.89941 13.9803 5.72844 13.5649 5.58939 13.1043C5.45649 12.6641 5.33602 12.1219 5.19125 11.4704L4.035 6.26729L3.68377 5.21359C3.44219 4.48885 2.76395 4 2 4C1.44772 4 1 3.55228 1 3ZM6.24662 7L7.13569 11.0008C7.29042 11.6971 7.39528 12.166 7.50404 12.5263C7.60908 12.8742 7.69899 13.0531 7.79172 13.18C8.00035 13.4655 8.28094 13.6906 8.6049 13.8323C8.74888 13.8953 8.94301 13.9443 9.30546 13.9713C9.68076 13.9994 10.1612 14 10.8745 14H16.1255C16.8388 14 17.3192 13.9994 17.6945 13.9713C18.057 13.9443 18.2511 13.8953 18.3951 13.8323C18.7191 13.6906 18.9997 13.4655 19.2083 13.18C19.301 13.0531 19.3909 12.8742 19.496 12.5263C19.6047 12.166 19.7096 11.6971 19.8643 11.0008L20.153 9.70159C20.3075 9.00651 20.408 8.54985 20.4536 8.19974C20.4982 7.858 20.4722 7.73312 20.4537 7.67868C20.3782 7.45613 20.2267 7.26728 20.0259 7.14528C19.9767 7.11544 19.8605 7.06302 19.5172 7.03235C19.1655 7.00094 18.6979 7 17.9859 7H6.24662Z"
                    fill="auto"
                  />
                  <path
                    d="M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z"
                    fill="auto"
                  />
                  <path
                    d="M18 21C19.1046 21 20 20.1046 20 19C20 17.8954 19.1046 17 18 17C16.8954 17 16 17.8954 16 19C16 20.1046 16.8954 21 18 21Z"
                    fill="auto"
                  />
                </svg>
                {totalQuantity > 0 ? (
                  <span className="mb-[30px] basis-4 rounded-lg bg-[var(--color-box)] px-1 text-xs">
                    {totalQuantity}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
