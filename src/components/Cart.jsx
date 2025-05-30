import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/userContext";
import axios from "axios";
import { RadioGroupPayment } from "./RadioGroupPayment";

export const Cart = () => {
  const { cart, setCart } = useCart();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const [showCheckout, setShowCheckout] = useState(false);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );
  const totalPriceFinal = cart.reduce(
    (total, item) => total + (item?.price || 0) * (item?.quantity || 0),
    0,
  );

  const removeFromCart = (id) => {
    const item = cart.find((item) => item._id === id);
    if (window.confirm(`Are you sure you want to remove ${item.name_vol}?`)) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    }
  };

  const updateCartQuantity = (id, newQuantity) => {
    cart.find((item) => item._id === id);
    if (newQuantity < 1) {
      removeFromCart(id);
    }
    if (newQuantity >= 1) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const postOrder = async () => {
    try {
      const orderItems = cart.map((item) => ({
        product_id: item._id,
        quantity: item.quantity,
        subtotal_price: item.price * item.quantity,
      }));
      const payload = {
        user_id: user._id,
        total_price: totalPriceFinal,
        items: orderItems,
      };
      await axios.post(
        "https://katsubook-backend.onrender.com/api/create-order",
        payload,
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 2,
      behavior: "smooth",
    });
  };
  const handleCheckoutComplete = () => {
    setMessage("Processing your order...");
    setTimeout(() => {
      setCart([]); // Clear the cart after checkout
      postOrder();
      scrollToTop();
      setShowCheckout(true);
    }, 3000);
  };

  if (showCheckout) {
    return (
      <div className="flex flex-col items-center space-y-10 py-[100px] md:w-[100%]">
        <p className="text-center text-xl leading-12 text-white">
          Thank you for shopping with us! <br />
          Your order has been placed.
        </p>
        <Link
          to={`/orders/${user?._id}`}
          className="bg-buttonBlue rounded-2xl px-[58px] py-2 text-xl text-[var(--color-white)] hover:bg-[#7aaed6]"
        >
          See your order history
        </Link>
        <Link
          to="/"
          className="rounded-2xl bg-[var(--color-buttonBrown)] px-[58px] py-2 text-xl text-[var(--color-white)] hover:bg-[#bc71427e]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <>
      {Array.isArray(cart) && cart.length === 0 ? (
        <div className="flex flex-col items-center space-y-10 py-[100px] text-2xl md:w-[100%]">
          <p className="p-4 text-center text-white">Your cart is empty.</p>
          <Link
            to="/"
            className="rounded-2xl bg-[var(--color-buttonBrown)] px-[58px] py-2 text-xl text-[var(--color-white)] hover:bg-[#bc71427e]"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="= bg-[var(--color-text)] max-sm:rounded-t-2xl md:w-[60%] md:rounded-2xl">
          <h2 className="py-[32px] pl-[16px] text-2xl font-bold min-[768px]:hidden">
            Order Summary
          </h2>
          {cart.map((item) => (
            <div key={item._id} className="my-[32px] flex flex-col">
              <div className="flex flex-row justify-center">
                <div className="max-h-[200px] max-w-[150px]">
                  <img
                    src={item.picture}
                    className="object-contain px-[8px]"
                    alt={item.name_vol}
                  />
                </div>
                <div className="flex w-[55%] flex-col px-[8px]">
                  <h3 className="pb-[8px] text-xl font-bold">
                    {item.name_vol}
                  </h3>
                  <p className="pb-[8px]">Vol. {item.volume_no}</p>
                  <p className="pb-[8px]">{item.author_id?.author_name}</p>
                  <p className="pb-[8px]">฿{item.price.toFixed(2)} </p>

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
                          updateCartQuantity(item._id, item.quantity - 1);
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
                          updateCartQuantity(item._id, item.quantity + 1);
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
                          removeFromCart(item._id);
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
        <div className="bg-[#ffff] pb-3 max-sm:rounded-b-2xl md:h-[45%] md:w-[45%] md:rounded-2xl md:py-[50px]">
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
              <span>฿{totalPriceFinal.toFixed(2)}</span>
            </p>
            <form>
              <RadioGroupPayment className="py-10" />
            </form>
            {error ? (
              <div className="mb-4 rounded bg-red-100 px-4 py-2 text-center text-red-700">
                {error}
              </div>
            ) : (
              message && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-center text-green-700">
                  {message}
                </div>
              )
            )}
            <button
              className="flex w-full justify-center rounded-2xl bg-[var(--color-buttonBrown)] p-2 text-xl text-[var(--color-white)] hover:cursor-pointer hover:bg-[#bc71427e] md:mt-[200px]"
              onClick={() => {
                handleCheckoutComplete();
              }}
            >
              Check out
            </button>
            <Link
              to="/"
              className="flex justify-center py-10 font-bold text-[var(--color-greenBackground)] hover:cursor-pointer hover:text-[var(--color-banner)] hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
