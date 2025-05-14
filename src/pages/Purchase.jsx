import { Cart } from "../components/Cart";
import { Link } from "react-router-dom";

export default function Purchase() {
  return (
    <>
      <div className="bg-[var(--color-greenBackground)] pb-[60px]">
        <section className="container__div">
          <Link
            to="/"
            className="flex items-center gap-2 pl-[16px] text-[var(--color-text)] min-[1024px]:pl-[8px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            <span className="py-5 text-base">Continue Shopping</span>
          </Link>
          <h2 className="px-[16px] py-4 text-3xl font-bold text-[var(--color-text)]">
            Your Cart
          </h2>
          <div className="grid grid-cols-1 md:flex md:flex-row md:gap-6">
            <Cart />
          </div>
        </section>
      </div>
    </>
  );
}
