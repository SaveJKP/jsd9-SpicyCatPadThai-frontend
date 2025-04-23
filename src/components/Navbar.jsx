import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_katsubook_notext from "../assets/logo_katsubook_onlylogo.png";
import logo_katsubook_text from "../assets/logo_katsubook_onlytext.png";
import Hamburger from "./Hamburger";

const Layout = () => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    // Fetch cart from localStorage when the component mounts
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []); // Runs only once when the component mounts

  // Calculate total quantity
  const totalQuantity = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  const handleReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <div className="sticky top-0 z-50 bg-[var(--color-greenBackground)]">
        <div className="container__div">
          <div className="flex h-[64px] flex-row justify-between px-[24px] py-1 text-[var(--color-text)] sm:max-md:px-0">
            <div className="flex flex-row">
              {/* Hamburger Menu */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="64px"
                fill="var(--color-text)"
                href="javascript:void(0);"
                className="min-[1024px]:hidden"
                onClick={toggleHamburger}
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
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
                  className="h-[60%]"
                />
              </Link>
              <Link to="/" className="flex flex-row items-center">
                <img
                  src={logo_katsubook_notext}
                  alt="LOGO"
                  className="max-h-10 place-self-center md:hidden"
                />
              </Link>
            </div>

            <div className="flex flex-row justify-end gap-5">
              {token ? (
                <>
                  <div className="flex w-[50%] items-center sm:max-md:hidden">
                    <input
                      type="text"
                      placeholder="Search"
                      dir="ltr"
                      className="hover:border-lightgray bg-text my-[5%] h-[65%] w-full rounded-s-lg border border-none p-[12px] text-[var(--color-banner)] transition-all duration-300 focus:border-[2px] focus:border-gray-500 sm:max-[1024px]:hidden"
                    />
                    {/* search icon */}
                    <Link to={"/search"}>
                      <div dir="rtl" className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bg-text relative flex flex-col rounded-s-lg p-1 sm:max-[1024px]:hidden"
                          viewBox="0 -960 960 960"
                          width="36px"
                          fill="#d9d9d9"
                        >
                          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                      </div>
                    </Link>
                  </div>

                  <div className="flex max-w-[120px] flex-row items-center">
                    <Link to={"/user/1"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        className="items-end"
                        width="40px"
                        fill="#e3e3e3"
                      >
                        <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                      </svg>
                    </Link>
                    <Link
                      to="/user/1"
                      className="my-2 w-[10rem] p-[8px] text-[16px] min-[1024px]:block min-sm:hidden"
                    >
                      Account
                    </Link>
                  </div>
                  <Link
                    to="/order"
                    className="my-2 w-[10rem] p-[8px] text-center text-[16px] min-[1024px]:block min-sm:hidden"
                  >
                    My Orders
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="my-2 block w-[30%] justify-self-center rounded-xl bg-[var(--color-buttonBrown)] p-[8px] text-center text-[16px] hover:bg-[#bc7142cb] min-[1024px]:block min-sm:hidden"
                  >
                    Log out
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex w-[50%] items-center sm:max-md:hidden">
                    <input
                      type="text"
                      placeholder="Search"
                      dir="ltr"
                      className="hover:border-lightgray bg-text my-[5%] h-[65%] w-full rounded-s-lg border border-none p-[12px] text-[var(--color-banner)] transition-all duration-300 focus:border-[2px] focus:border-gray-500 sm:max-[1024px]:hidden"
                    />
                    {/* search icon */}
                    <Link to={"/search"}>
                      <div dir="rtl" className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bg-text relative flex flex-col rounded-s-lg p-1 sm:max-[1024px]:hidden"
                          viewBox="0 -960 960 960"
                          width="36px"
                          fill="#d9d9d9"
                        >
                          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <Link
                    to="/login"
                    className="my-2 w-30 justify-self-center rounded-xl bg-[var(--color-buttonBrown)] p-[8px] text-center text-[16px] hover:bg-[#bc7142cb] min-[1024px]:block min-sm:hidden"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="my-2 w-30 justify-self-center rounded-xl bg-[var(--color-buttonBlue)] p-[8px] text-center text-[16px] hover:bg-[#416683] min-[1024px]:block min-sm:hidden"
                  >
                    Register
                  </Link>
                </>
              )}

              <Link
                className="flex items-center"
                to={"/purchase"}
                onClick={handleReload}
              >
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

                <span className="mb-[30px] basis-4 rounded-lg bg-[var(--color-box)] px-1 text-xs">
                  {totalQuantity}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {hamburgerOpen && <Hamburger />}
    </>
  );
};

export default Layout;
