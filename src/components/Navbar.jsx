import React from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
      <nav className="bg-teal-500 p-4 text-white shadow-md">
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
  );
};

export default Layout;
