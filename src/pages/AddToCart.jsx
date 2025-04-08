import React, { useState, useEffect } from "react";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  // Example product for adding to the cart
  const product = {
    id: 1,
    title: "Sample Book",
    author: "John Doe",
    price: 160,
    img: "https://placehold.co/350x450",
    description: "Sample description",
    genre: ["Fiction", "Adventure", "Fantasy"],
  };

  const totalPrice = product.price * quantity;

  // Increase quantity
  const handleAdd = () => {
    setQuantity((x) => x + 1);
  };

  // Decrease quantity
  const handleRemove = () => {
    setQuantity((x) => (x > 1 ? x - 1 : 1));
  };

  // Add product to cart
  const handleAddToCart = () => {
    setCartItems((x) => {
      const existingItem = x.find((item) => item.id === product.id);

      let updatedCart = [];
      if (existingItem) {
        updatedCart = x.map((item) =>
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
          ...x,
          {
            ...product,
            quantity: quantity,
            total: totalPrice,
          },
        ];
      }
      return updatedCart;
    });

    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  useEffect(() => {
    console.log("Updated cart:", cartItems);
  }, [cartItems]);

  const genreTags = product.genre.map((genre, index) => (
    <span
      key={index}
      className="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm"
    >
      {genre}
    </span>
  ));

  const similarBooks = [
    {
      title: "Similar Book 1",
      author: "Author 1",
      price: 150,
      img: "https://placehold.co/100x150",
    },
    {
      title: "Similar Book 2",
      author: "Author 2",
      price: 200,
      img: "https://placehold.co/100x150",
    },
    {
      title: "Similar Book 3",
      author: "Author 3",
      price: 180,
      img: "https://placehold.co/100x150",
    },
  ].map((book, index) => (
    <div key={index} className="flex flex-col items-center">
      <img
        src={book.img}
        alt="book-cover"
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
        <div class="grid grid-cols-1 gap-4 min-[1024px]:grid-cols-2 md:gap-10 md:p-10 md:px-20">
          {/* show product */}
          <div class="grid grid-cols-1">
            <img
              src="https://placehold.co/350x450" //product.img
              alt="book-cover"
              class="max-w-[100%] place-self-center object-cover shadow-lg"
            />
          </div>
          <div class="space-y-2 rounded-[10px] bg-[var(--color-buttonBrown)] p-[32px] py-12 text-[var(--cls-white)] max-sm:pt-[30px]">
            <p class="text-2xl font-bold md:text-3xl">{product.title}</p>
            <p class="text-2xl">{product.author}</p>
            <p class="py-5 text-3xl md:text-5xl">฿{product.price}</p>

            <div class="flex flex-row space-x-8 pb-15 md:items-center md:py-5">
              <p class="text-xl md:text-2xl">Quantity</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
                class="bg-[#939393]"
                onClick={handleRemove}
              >
                <path d="M200-440v-80h560v80H200Z" />
              </svg>
              <span class="place-self-center md:text-2xl">{quantity}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
                class="bg-[#939393]"
                onClick={handleAdd}
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>
            <button
              class="mb-4 rounded-lg bg-[var(--color-buttonBlue)] px-4 py-2 text-lg text-white shadow hover:bg-[#2e648ecc] md:mt-10 md:text-2xl"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* fetching product.description */}
          <div class="space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[32px] text-[var(--cls-white)] md:mb-[50px]">
            <h3 class="text-xl font-bold">Description</h3>
            <p class="mb-5">{product.description}</p>

            {/* fetching product.genre */}
            <h4 class="mb-4 text-lg font-bold">Genre</h4>
            <div className="flex flex-row flex-wrap gap-2">{genreTags}</div>
          </div>

          {/* //same genre */}
          <div class="mb-[50px] flex flex-col gap-3 space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[16px] text-[var(--cls-white)] md:pt-[18px]">
            <h3>Other books you may like:</h3>
            <div class="grid grid-cols-1 place-content-between gap-5 md:flex md:flex-row md:py-5">
              {similarBooks}
            </div>
          </div>
        </div>
      </div>
      {/* Sticky AddToCart Button */}
      <div class="sticky bottom-0 overflow-hidden border-t-1 border-[#eef1f34d] bg-[var(--color-greenBackground)] text-[var(--color-text)]">
        <div className="container__div flex w-full flex-row justify-between px-[16px]">
          <p class="p-2 text-2xl">฿{totalPrice}</p>
          <button
            class="my-1 rounded-lg bg-[var(--color-buttonBlue)] px-4 text-lg shadow hover:bg-[#2e648ecc]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
