"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allProducts } from "../data/AddToCart";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AddToCart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  let [cart, setCart] = useState([]);

  const { id } = useParams();
  const data = allProducts.find((p) => p.product_id === parseInt(id));

  // Fetch product by ID from mock data
  useEffect(() => {
    const getProduct = products.find((p) => p.product_id === parseInt(id));
    if (getProduct) {
      setProduct(getProduct);
      setCategory(getProduct.categories);
    }
  }, [id]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []);

  // // Load cart from localStorage when the app initializes
  const totalPrice = product ? product.price * quantity : 0;

  const handleAdd = () => setQuantity((x) => x + 1);
  const handleRemove = () => setQuantity((x) => (x > 1 ? x - 1 : 1));

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product_id === product.product_id,
      );

      if (existingItem) {
        cart = prevCart.map((item) =>
          item.product_id === product.product_id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: item.total + totalPrice,
              }
            : item,
        );
      } else {
        cart = [
          ...prevCart,
          {
            ...product,
            quantity,
            total: totalPrice,
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      setQuantity(1);
    });
  };

  if (!product) {
    return (
      <div className="flex h-full flex-col items-center space-y-10 bg-[var(--color-greenBackground)] py-15 text-2xl md:w-[100%]">
        <p className="p-4 text-center text-white">Product not found.</p>
        <Link
          to="/"
          className="rounded-2xl bg-[var(--color-buttonBrown)] px-[58px] py-2 text-xl text-[var(--color-white)] hover:bg-[#bc71427e]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const genreTags = category.map((category, index) => (
    <span
      key={`${category}-${index}`}
      className="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm"
    >
      {category.category_name}
    </span>
  ));

  const handleReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Get random books from the same category
  const getRandomBooks = (products, categoryName, excludeId) => {
    const filteredBooks = products.filter((product) =>
      product.categories?.some((cat) => cat.category_name === categoryName),
    );

    return filteredBooks
      .filter((item) => item.product_id !== excludeId)
      .sort(() => Math.random() - 0.5);
  };

  const similarBooks = category
    ?.flatMap((cat) =>
      getRandomBooks(products, cat.category_name, product.product_id),
    )
    .slice(0, 4)
    .map((book, index) => (
      <div
        key={book.product_id || index}
        className="flex w-[100%] flex-col items-center text-center"
      >
        <Link to={`/add-to-cart/${book.product_id}`}>
          <img
            src={book.img || "https://placehold.co/200x250"}
            alt={book.title}
            className="mb-2.5 shadow-xl md:max-w-[50%] md:place-self-center"
            onClick={() => {
              if (quantity > 1) {
                handleReload();
              }
            }}
          />

          <p className="flex flex-col justify-center md:text-center">
            <span>{book.name}</span>
            <span>Vol. {book.volume}</span>
            <span>{book.author}</span>
            <span>฿{book.price}</span>
          </p>
        </Link>
      </div>
    )); */

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
            <p className="text-xl font-bold md:text-2xl">
              Vol. {product.volume}
            </p>
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
                className="bg-[#939393] hover:cursor-pointer"
                onClick={handleRemove}
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
                className="bg-[#939393] hover:cursor-pointer"
                onClick={handleAdd}
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>

            <button
              className="mb-4 rounded-lg bg-[var(--color-buttonBlue)] px-4 py-2 text-lg text-white shadow hover:cursor-pointer hover:bg-[#2e648ecc] md:mt-10 md:text-2xl"
              onClick={() => {
                handleAddToCart();
                handleReload();
                toast("Added to Cart!");
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
      <div className="sticky bottom-0 overflow-hidden border-t-1 border-[#eef1f34d] bg-[var(--color-greenBackground)] text-[var(--color-text)] min-[1024px]:hidden">
        <div className="container__div flex w-full flex-row justify-between px-[16px]">
          <p className="p-2 text-2xl">฿totalPrice</p>
          <button
            className="my-1 rounded-lg bg-[var(--color-buttonBlue)] px-4 text-lg shadow hover:cursor-pointer hover:bg-[#2e648ecc]"
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
