import React from "react";
import { Cart } from "../components/Cart";

export default function Purchase() {
  return (
    <>
      <div className="mb-[60px] h-full bg-[var(--color-greenBackground)]">
        <section class="container__div">
          <h2 class="px-[16px] py-4 text-3xl font-bold text-[var(--color-text)]">
            My Cart
          </h2>
          <div className="grid grid-cols-1 md:flex md:flex-row md:gap-6">
            <Cart />
          </div>
        </section>
      </div>
    </>
  );
}
