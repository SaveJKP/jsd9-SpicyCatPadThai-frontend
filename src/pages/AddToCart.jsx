"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allProducts } from "../data/AddToCart";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AddToCart() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  let [cart, setCart] = useState([]);

  const { id } = useParams();
  const data = allProducts.find((p) => p.product_id === parseInt(id));

  // Fetch product by ID from mock data
  useEffect(() => {
    setProduct(data);
    setCategories(data.categories);
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []);

  // // Load cart from localStorage when the app initializes
  // const totalPrice = product ? product.price * quantity : 0;

  // const handleAdd = () => setQuantity((x) => x + 1);
  // const handleRemove = () => setQuantity((x) => (x > 1 ? x - 1 : 1));

  // const handleAddToCart = () => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.id);

  //     if (existingItem) {
  //       cart = prevCart.map((item) =>
  //         item.id === product.id
  //           ? {
  //               ...item,
  //               quantity: item.quantity + quantity,
  //               total: item.total + totalPrice,
  //             }
  //           : item,
  //       );
  //     } else {
  //       cart = [
  //         ...prevCart,
  //         {
  //           ...product,
  //           quantity,
  //           total: totalPrice,
  //         },
  //       ];
  //     }
  //     // Save the updated cart to localStorage
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     setCart(cart); // Now update the state
  //     setQuantity(1);
  //   });
  // };

  // if (!product) {
  //   return <div className="p-10 text-xl text-red-500">Product not found</div>;
  // }

  const genreTags = categories.map((category, index) => (
    <span
      key={`${category}-${index}`}
      className="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm"
    >
      {category.category_name}
    </span>
  ));

  // const handleReload = () => {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  // const excludeId = id;

  // const getRandomBooks = (books, category) => {
  //   // Filter products by checking if the category exists in the product's category array
  //   const filteredBooks = books.filter(
  //     (product) =>
  //       Array.isArray(product.category) && product.category.includes(category),
  //   );

  //   // Shuffle and pick random ones
  //   return filteredBooks
  //     .sort(() => Math.random())
  //     .filter((item) => item.id !== excludeId);
  // };

  // const similarBooks = product.category
  //   .flatMap((category) => getRandomBooks(allProducts, category))
  //   .slice(0, 4) // Limit total results to four
  //   .map((book, index) => (
  //     <div key={index} className="flex flex-col items-center">
  //       <Link to={`/add-to-cart/${book.id}`}>
  //         <img
  //           src={book.img}
  //           alt={book.title}
  //           className="mb-2.5 shadow-xl md:max-w-[50%] md:place-self-center"
  //           onClick={() => {
  //             if (quantity > 1) {
  //               handleReload(); // Call handleReload if quantity > 1
  //             }
  //           }}
  //         />
  //       </Link>
  //       <p className="flex flex-col justify-center md:text-center">
  //         <span>{book.title}</span>
  //         <span>{book.author}</span>
  //         <span>฿{book.price}</span>
  //       </p>
  //     </div>
  //   ));

  return (
    <div className="bg-[var(--color-greenBackground)]">
      <div className="container__div text-[var(--color-text)]">
        <div className="grid grid-cols-1 gap-4 min-[1024px]:grid-cols-2 md:gap-10 md:p-10 md:px-20">
          {/* Product image */}
          <div className="w-[60%] place-self-center">
            <img
              src={product.picture || "https://placehold.co/200x250"}
              alt="book-cover"
              className="max-w-[100%] place-self-center shadow-lg"
            />
          </div>
          {/* Product info */}
          <div className="space-y-2 rounded-[10px] bg-[var(--color-buttonBrown)] p-[32px] py-12 text-[var(--cls-white)] max-sm:pt-[30px]">
            <p className="text-2xl font-bold md:text-3xl">{product.name}</p>
            <p className="text-2xl">{product.author}</p>
            <p className="py-5 text-3xl md:text-5xl">฿{product.price}</p>

            <div className="flex flex-row space-x-8 pb-15 md:items-center md:py-5">
              <p className="text-xl md:text-2xl">Quantity</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
                className="bg-[#939393]"
                // onClick={handleRemove}
              >
                <path d="M200-440v-80h560v80H200Z" />
              </svg>
              <span className="place-self-center md:text-2xl">{quantity}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
                className="bg-[#939393]"
                // onClick={handleAdd}
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>

            <button
              className="mb-4 rounded-lg bg-[var(--color-buttonBlue)] px-4 py-2 text-lg text-white shadow hover:bg-[#2e648ecc] md:mt-10 md:text-2xl"
              onClick={() => {
                handleAddToCart();
                handleReload();
                toast("Added to cart!");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="container__div space-y-10 text-[var(--color-text)] min-[1024px]:px-[72px]">
          {/* Product description */}
          <div className="mt-[16px] rounded-[10px] bg-[var(--color-box)] px-[24px] py-[32px] text-[var(--cls-white)] md:mb-[50px]">
            <h3 className="text-xl font-bold">Description</h3>
            <p className="mb-5">{product.description}</p>
            <h4 className="mb-4 text-lg font-bold">Genre</h4>
            <div className="flex flex-row flex-wrap gap-2">{genreTags}</div>
          </div>

          {/* Similar books */}
          <div className="mb-[50px] flex flex-col gap-3 space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[16px] text-[var(--cls-white)] md:pt-[18px]">
            <h3>Other books you may like:</h3>
            <div className="grid grid-cols-1 place-content-between md:flex md:flex-row md:py-5">
              similarbooks
            </div>
          </div>
        </div>
      </div>
      {/* Sticky AddToCart Bar */}
      <div className="sticky bottom-0 overflow-hidden border-t-1 border-[#eef1f34d] bg-[var(--color-greenBackground)] text-[var(--color-text)]">
        <div className="container__div flex w-full flex-row justify-between px-[16px]">
          <p className="p-2 text-2xl">฿totalPrice</p>
          <button
            className="my-1 rounded-lg bg-[var(--color-buttonBlue)] px-4 text-lg shadow hover:bg-[#2e648ecc]"
            onClick={() => {
              handleAddToCart();
              handleReload();
              toast("Added to cart!");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
