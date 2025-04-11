import { useEffect } from "react";
import React, { useState } from "react";

export const Cart = ({ cart, setCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove the item from the cart if the quantity is less than 1
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      return;
    }

    // Update the quantity for the matching item
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = (Array.isArray(cart) ? cart : []).reduce(
    (total, item) => total + (item?.price || 0) * (item?.quantity || 0),
    0,
  );
  console.log("Total price:", totalPrice);

  const totalQuantity = (Array.isArray(cart) ? cart : []).reduce(
    (total, item) => total + (item?.quantity || 0),
    0,
  );
  console.log("Total quantity:", totalQuantity);

  const handleCheckoutComplete = () => {
    setCart([]); // Clear the cart after checkout
    setShowCheckout(false); // Hide the checkout form
    alert("Thank you for your purchase!");
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);
  useEffect(() => {
    const clearCart = () => {
      if (Array.isArray(cart) && cart.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    };

    clearCart(); // Call the function inside useEffect
  }, [cart]); // Dependency array ensures this runs whenever `cart` changes
  return (
    <>
      {Array.isArray(cart) && cart.length === 0 ? (
        <div className="md:w-[100%]">
          <p className="p-4 text-center text-white">Your cart is empty.</p>
        </div>
      ) : (
        cart.map((item) => (
          <div className="bg-[#e2e2e2] max-sm:rounded-t-2xl md:w-[60%] md:rounded-2xl">
            <div key={item.id} className="my-[32px] flex flex-col px-[32px]">
              <div className="flex flex-row">
                <img
                  src={item.img}
                  className="h-auto w-[50%] object-contain object-top px-[8px]"
                  alt={item.title}
                />
                <div className="flex w-[55%] flex-col px-[8px]">
                  <h3 className="pb-[8px] text-sm font-bold">{item.title}</h3>
                  <p className="pb-[8px]">
                    {item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <p>฿{(item.price * item.quantity).toFixed(2)}</p>
                  <div className="grid grid-cols-2 place-content-between py-4">
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#e3e3e3"
                        className="cursor-pointer bg-[#939393]"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <path d="M200-440v-80h560v80H200Z" />
                      </svg>
                      <p className="place-self-center text-sm">
                        {item.quantity}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#e3e3e3"
                        className="cursor-pointer bg-[#939393]"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                      </svg>
                    </div>
                    <div className="flex justify-end pr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="25px"
                        fill="#1e1e1e"
                        className="cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {Array.isArray(cart) && cart.length > 0 && (
        <div className="bg-[#F5F5F5] pb-3 max-sm:rounded-b-2xl md:w-[45%] md:rounded-2xl md:py-[50px]">
          <div className="mx-8 text-xl leading-10 max-sm:mx-4">
            <h2 className="text-4xl font-bold max-sm:hidden md:mb-14">
              Order List
            </h2>
            <p className="flex justify-between">
              Quantity
              <span>{totalQuantity}</span>
            </p>
            <p className="flex justify-between py-4 text-2xl font-bold">
              Total
              <span>฿{totalPrice.toFixed(2)}</span>
            </p>
            <button
              className="flex w-full justify-center rounded-2xl bg-[var(--color-buttonBrown)] p-2 text-xl text-[var(--color-white)] hover:bg-[#bc71427e] md:mt-[200px]"
              onClick={() => setShowCheckout(true)}
            >
              Check out
            </button>
            {showCheckout && (
              <div className="mt-6 w-full max-w-5xl">
                <Checkout
                  cart={cart}
                  totalPrice={totalPrice}
                  onCheckoutComplete={handleCheckoutComplete}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
