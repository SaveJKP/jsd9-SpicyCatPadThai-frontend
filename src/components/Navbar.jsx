import React from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-500">
      <div className="container__div">
        <nav className=" p-4 text-white shadow-md">
          <ul className="flex justify-center gap-4">
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-400">
                Register
              </Link>
            </li>
            <li>
              <Link to="/purchase" className="hover:text-yellow-400">
                Purchase
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
