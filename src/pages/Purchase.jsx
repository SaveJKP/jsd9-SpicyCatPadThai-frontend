import React from "react";
import { useState } from "react";
import { Cart } from "../components/Cart";

export default function Purchase() {
  const [cart, setCart] = useState([]);

  const updateCartQuantity = (itemId, newQuantity) => {
    console.log(`Update item ${itemId} to quantity ${newQuantity}`);
    // Add logic to update cart state
  };

  const removeFromCart = (itemId) => {
    console.log(`Remove item ${itemId} from cart`);
    // Add logic to update cart state
  };

  return (
    <>
      <div className="mb-[60px] h-full bg-[var(--color-greenBackground)]">
        <section class="container__div">
          <h2 class="py-4 text-3xl font-bold text-[var(--color-text)]">
            My Cart
          </h2>
          <div className="grid grid-cols-1 md:flex md:flex-row md:gap-6">
            <Cart
              cart={cart}
              setCart={setCart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        </section>
      </div>
    </>
  );
}
