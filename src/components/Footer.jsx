import { Link } from "react-router-dom";
import logo_katsubook_notext from "../assets/logo_katsubook_onlylogo.png";
import logo_katsubook_text from "../assets/logo_katsubook_onlytext.png";

export default function Footer() {
  return (
    <div className="bg-[var(--color-greenBackground)] text-[var(--color-text)]">
      <div className="container__div px-[16px]">
        <div className="flex-wrp flex flex-col justify-center space-y-[16px] py-[16px] min-[1024px]:flex-row min-[1024px]:gap-5 md:pb-10">
          <Link to="/about">
            <h3>About Us</h3>
          </Link>

          <Link to="#faq">
            <h3>FAQ</h3>
          </Link>

          <Link to="#help">
            <h3>Help</h3>
          </Link>

          <Link to="#privacy">
            <h3>Privacy Notice</h3>
          </Link>

          <Link to="#cookies">
            <h3>Cookies Notice</h3>
          </Link>

          <Link to="#terms">
            <h3>Terms & Conditions</h3>
          </Link>

          <Link to="#enquiry">
            <h3>Enquiry</h3>
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