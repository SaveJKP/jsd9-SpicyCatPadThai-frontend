import { Link } from "react-router-dom";
import logo_katsubook_notext from "../assets/logo_katsubook_onlylogo.png";
import logo_katsubook_text from "../assets/logo_katsubook_onlytext.png";

export default function Footer() {
  return (
    <div className="bg-[var(--color-greenBackground)] text-[var(--color-text)]">
      <div className="container__div px-[16px]">
        <div className="flex flex-col flex-wrap justify-center py-[32px] text-lg min-[1024px]:flex-row min-[1024px]:gap-5 sm:max-md:space-y-[16px]">
          <Link to="/about">
            <p>About Us</p>
          </Link>

          <Link to="#faq">
            <p>FAQ</p>
          </Link>

          <Link to="#help">
            <p>Help</p>
          </Link>

          <Link to="#privacy">
            <p>Privacy Notice</p>
          </Link>

          <Link to="#cookies">
            <p>Cookies Notice</p>
          </Link>

          <Link to="#terms">
            <p>Terms & Conditions</p>
          </Link>

          <Link to="#enquiry">
            <p>Enquiry</p>
          </Link>
        </div>
        <div className="mt-[16px] flex flex-row items-center min-[1024px]:justify-self-center">
          <img
            src={logo_katsubook_notext}
            alt="logo_bookstore"
            className="h-[30px] max-sm:hidden"
          />
          <img
            src={logo_katsubook_text}
            alt="logo_bookstore"
            className="h-[30px] max-sm:hidden"
          />
        </div>
        <p className="py-[10px] min-[1024px]:justify-self-center">
          &copy; 2025 KatsuBook. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
