import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function AddToCart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Fetch product by ID from mock data

  useEffect(() => {
    const fetchMockProduct = () => {
      const data = products.find((p) => p.id === id);
      setProduct(data);
    };
    fetchMockProduct();
  }, [id]);

  // Load cart from localStorage when the app initializes
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalPrice = product ? product.price * quantity : 0;

  const handleAdd = () => setQuantity((x) => x + 1);
  const handleRemove = () => setQuantity((x) => (x > 1 ? x - 1 : 1));

  const handleAddToCart = () => {
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) {
        console.error("Cart is not an array:", prevCart);
        return [];
      }
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: item.total + totalPrice,
              }
            : item,
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            ...product,
            quantity,
            total: totalPrice,
          },
        ];
      }

      return updatedCart;
    });

    setQuantity(1);
  };

  useEffect(() => {
    console.log("Updated cart:", cart);
  }, [cart]);

  if (!product) {
    return <div className="p-10 text-xl text-red-500">Product not found</div>;
  }

  const genreTags = Array.isArray(product.category)
    ? product.category.map((category, index) => (
        <span
          key={`${category}-${index}`}
          className="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm"
        >
          {category}
        </span>
      ))
    : [];

  const getRandomBooks = (products, category) => {
    // Filter products by checking if the category exists in the product's category array
    const filteredBooks = products.filter(
      (product) =>
        Array.isArray(product.category) && product.category.includes(category),
    );

    // Shuffle and pick random ones
    return filteredBooks.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const similarBooks = product.category
    .flatMap((category) => getRandomBooks(products, category))
    .slice(0, 3) // Limit total results to three
    .map((book, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={book.img}
          alt={book.title}
          className="mb-2.5 shadow-xl md:max-w-[50%] md:place-self-center"
        />
        <p className="flex flex-col justify-center md:text-center">
          <span>{book.title}</span>
          <span>{book.author}</span>
          <span>฿{book.price}</span>
        </p>
      </div>
    ));

  return (
    <div className="bg-[var(--color-greenBackground)]">
      <div className="container__div text-[var(--color-text)]">
        <div className="grid grid-cols-1 gap-4 min-[1024px]:grid-cols-2 md:gap-10 md:p-10 md:px-20">
          {/* Product image */}
          <div className="grid grid-cols-1">
            <img
              src={product.img || "https://placehold.co/200x250"}
              alt="book-cover"
              className="max-w-[100%] place-self-center object-cover shadow-lg"
            />
          </div>

          {/* Product info */}
          <div className="space-y-2 rounded-[10px] bg-[var(--color-buttonBrown)] p-[32px] py-12 text-[var(--cls-white)] max-sm:pt-[30px]">
            <p className="text-2xl font-bold md:text-3xl">{product.title}</p>
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
                className="bg-[#939393]"
                onClick={handleAdd}
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>

            <button
              className="mb-4 rounded-lg bg-[var(--color-buttonBlue)] px-4 py-2 text-lg text-white shadow hover:bg-[#2e648ecc] md:mt-10 md:text-2xl"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Product description */}
          <div className="space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[32px] text-[var(--cls-white)] md:mb-[50px]">
            <h3 className="text-xl font-bold">Description</h3>
            <p className="mb-5">{product.description}</p>
            <h4 className="mb-4 text-lg font-bold">Genre</h4>
            <div className="flex flex-row flex-wrap gap-2">{genreTags}</div>
          </div>

          {/* Similar books */}
          <div className="mb-[50px] flex flex-col gap-3 space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[16px] text-[var(--cls-white)] md:pt-[18px]">
            <h3>Other books you may like:</h3>
            <div className="grid grid-cols-1 place-content-between md:flex md:flex-row md:py-5">
              {similarBooks}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky AddToCart Bar */}
      <div className="sticky bottom-0 overflow-hidden border-t-1 border-[#eef1f34d] bg-[var(--color-greenBackground)] text-[var(--color-text)]">
        <div className="container__div flex w-full flex-row justify-between px-[16px]">
          <p className="p-2 text-2xl">฿{totalPrice}</p>
          <button
            className="my-1 rounded-lg bg-[var(--color-buttonBlue)] px-4 text-lg shadow hover:bg-[#2e648ecc]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
