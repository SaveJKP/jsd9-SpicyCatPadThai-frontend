import { useEffect } from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + (item?.price || 0) * (item?.quantity || 0),
    0,
  );

  const totalQuantity = cart.reduce(
    (total, item) => total + (item?.quantity || 0),
    0,
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100); // Reload page
  };
  const handleCheckoutComplete = () => {
    setCart([]); // Clear the cart after checkout
    setShowCheckout(true);
  };

  if (showCheckout) {
    return (
      <div className="flex flex-col items-center space-y-10 md:w-[100%]">
        <p className="pt-10 text-center text-2xl text-white">
          Thank you for shopping with us! Your order has been processed.
        </p>

        <Link
          to="/"
          className="rounded-2xl bg-[var(--color-buttonBrown)] px-[58px] py-2 text-xl text-[var(--color-white)] hover:bg-[#bc71427e]"
          onClick={handleReload}
        >
          Go to Home
        </Link>
      </div>
    );
  }
  return (
    <>
      {Array.isArray(cart) && cart.length === 0 ? (
        <div className="md:w-[100%]">
          <p className="p-4 text-center text-white">Your cart is empty.</p>
        </div>
      ) : (
        <div className="= bg-[var(--color-text)] max-sm:rounded-t-2xl md:w-[60%] md:rounded-2xl">
          {cart.map((item) => (
            <div key={item.id} className="my-[32px] flex flex-col">
              <div className="flex flex-row justify-center">
                <img
                  src={item.img}
                  className="max-w-[40%] object-contain object-top px-[8px]"
                  alt={item.title}
                />
                <div className="flex w-[55%] flex-col px-[8px]">
                  <h3 className="pb-[8px] text-xl font-bold">{item.title}</h3>
                  <p className="pb-[8px]">{item.price.toFixed(2)}</p>
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
                        onClick={() => {
                          updateCartQuantity(item.id, item.quantity - 1);
                          handleReload();
                        }}
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
                        onClick={() => {
                          updateCartQuantity(item.id, item.quantity + 1);
                          handleReload();
                        }}
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
                        onClick={() => {
                          removeFromCart(item.id);
                          handleReload();
                        }}
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {Array.isArray(cart) && cart.length > 0 && (
        <div className="bg-[#F5F5F5] pb-3 max-sm:rounded-b-2xl md:h-[45%] md:w-[45%] md:rounded-2xl md:py-[50px]">
          <div className="mx-8 text-xl leading-10 max-sm:mx-4">
            <h2 className="text-4xl font-bold sm:max-md:hidden md:mb-14">
              Order Summary
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
              onClick={() => {
                handleCheckoutComplete();
              }}
            >
              Check out
            </button>
          </div>
        </div>
      )}
    </>
  );
};
