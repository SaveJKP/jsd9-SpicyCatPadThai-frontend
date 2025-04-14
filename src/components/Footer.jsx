import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gray-500">
      <div className="container__div">
      <div className="footer flex flex-col gap-5 md:pb-10 lg:flex-row">
        <div className="md:w-[60%]">
          <img
            src="/assets/logo_katsubook_onlytext.png"
            alt="logo_bookstore"
            className="max-w-50 max-sm:hidden"
          />
          <p className="py-[16px] max-md:hidden">&copy; 2025 Katsu Book</p>
        </div>
        <div className="flex flex-col gap-1 md:w-[60%]">
          <h3>Customer Service</h3>
          <Link>Help Center</Link>
          <Link>How to Buy</Link>
          <Link>Payment Methods</Link>
          <Link>Shipping & Delivery</Link>
          <Link>Return & Refund</Link>
        </div>
        <div className="md:w-[60%]">
          <Link to="/about">
            <h3>About Us</h3>
          </Link>
          <p className="w-[90%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil
            velit blanditiis rem, id officiis ipsam sed error nesciunt labore
            quia!
          </p>
        </div>
        <div className="md:w-[60%]">
          <Link to="/about">
            <h3>Contact Us</h3>
          </Link>
          <p className="w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
            quaerat?
          </p>
        </div>
        <p className="py-[16px] md:hidden">&copy; 2025 Katsu Book</p>
      </div>
      </div>
    </div>
    
  );
}