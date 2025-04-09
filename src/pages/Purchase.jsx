import React from "react";
import { Cart } from "../components/Cart";

export default function Purchase() {
  return (
    <>
      <div className="h-full bg-[var(--color-greenBackground)]">
        <section class="container__div">
          <h2 class="py-4 text-3xl font-bold text-[var(--color-text)]">
            My Cart
          </h2>
          <Cart />
        </section>
      </div>
    </>
  );
}
