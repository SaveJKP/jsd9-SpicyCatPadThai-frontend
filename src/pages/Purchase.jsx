import React from "react";
import { Cart } from "../components/Cart";

export default function Purchase() {
  return (
    <>
      <div className="bg-[var(--color-greenBackground)] pb-[60px]">
        <section className="container__div">
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
