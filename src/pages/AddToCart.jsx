import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext.jsx";
import axios from "axios";

export default function AddToCart() {
  const [products, setProducts] = useState([]); // รายการ product ทั้งหมดของ title นี้
  const [category, setCategory] = useState([]);
  const [selectedProductVolumeId, setSelectedProductVolumeId] = useState(""); // State สำหรับเก็บ ID volume ที่เลือก
  const [similar, setSimilar] = useState([]);
  const {
    setCart,
    handleAdd,
    handleRemove,
    quantity,
    product,
    totalPrice,
    setProduct,
    setQuantity,
  } = useCart();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSetQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const fetchProductById = async () => {
    try {
      const res = await axios.get(
        `https://katsubook-backend.onrender.com/products/${id}`,
      );
      setProduct(res.data.product);
    } catch (err) {
      console.error("Error fetching product:", err);
      toast.error("Failed to fetch product details.");
    }
  };

  const fetchCategoryById = async (titleId) => {
    try {
      const res = await axios.get(
        `https://katsubook-backend.onrender.com/api/pdc/${titleId}`,
      );
      setCategory(res.data.productCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
      setCategory([]);
    }
  };

  const fetchProductsByTitleId = async (titleId) => {
    try {
      const res = await axios.get(
        `https://katsubook-backend.onrender.com/productss/${titleId}`,
      );
      setProducts(res.data.product);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchSimilarBook = async (titleId) => {
    try {
      const res = await axios.get(
        `https://katsubook-backend.onrender.com/products/get-similar/${titleId}`,
      );
      setSimilar(res.data.similar_books);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [id]);

  useEffect(() => {
    if (product && product.title_id) {
      fetchProductsByTitleId(product.title_id);
      fetchCategoryById(product.title_id);
      fetchSimilarBook(product.title_id);
    }
  }, [product]);

  const handleVolumeChange = (event) => {
    const selectedId = event.target.value;
    setSelectedProductVolumeId(selectedId);

    // Find the selected product volume from the 'products' array
    const selectedVolume = products.find((p) => p._id === selectedId);
    if (selectedVolume) {
      // อัปเดต 'product' state ด้วย volume ที่เลือก
      setProduct(selectedVolume);
    }
  };

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.price || 0) * (item.quantity + quantity), // ใช้ item.price ที่อาจมาจาก volume ที่เลือก
              }
            : item,
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            ...product,
            quantity,
            total: (product.price || 0) * quantity, // ใช้ product.price ของ volume ที่เลือก
          },
        ];
      }

      return updatedCart;
    });
    toast("Added to Cart!");
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

  const genreTags = category?.map((categoryItem) => {
    return (
      <span
        key={categoryItem._id}
        className="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm"
      >
        {categoryItem.category_id?.category_name || "N/A"}
      </span>
    );
  });

  const getRandomBooks = (products, categoryName, excludeId) => {
    if (!products || !categoryName) return [];

    const filteredBooks = products.filter(
      (product) =>
        product.categories?.some((cat) => cat.category_name === categoryName),
      product.categories?.some((cat) => cat.category_name === categoryName),
    );

    return filteredBooks
      .filter((item) => item.product_id !== excludeId)
      .sort(() => Math.random() - 0.5);
  };

  const similarBooks = similar.map((book, index) => (
    <div
      key={book.product_id || index}
      className="flex flex-col text-center min-[1024px]:w-[50%]"
    >
      <Link to={`/add-to-cart/${book.product_id}`}>
        <img
          src={
            book.img ||
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cdd17c167263253.6425cd49aab91.jpg"
          }
          alt={book.title}
          className="mb-2.5 h-28 w-20 place-self-center object-cover shadow-xl md:h-32 md:w-24"
          onClick={() => {
            if (quantity > 1) {
              handleSetQuantity(1);
            }
          }}
        />

        <p className="flex flex-col justify-center pb-5 text-sm md:text-center">
          <span className="text-clip">{book.name}</span>
          <span>Vol. {book.volume}</span>
          <span>{book.author}</span>
          <span>฿{book.price}</span>
        </p>
      </Link>
    </div>
  ));

  return (
    <div className="bg-[var(--color-greenBackground)]">
      <div className="container__div text-[var(--color-text)]">
        <Link to="/" className="flex items-center gap-2 pl-[16px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <span className="py-5 text-base text-[var(--color-text)]">
            Back to Home
          </span>
        </Link>
        <div className="grid grid-cols-1 gap-4 min-[1024px]:grid-cols-2 md:gap-10 md:p-10 md:px-20">
          {/* Product image */}
          <div className="w-[60%] place-self-center">
            <img
              src={
                product.picture ||
                "https://www.geeksandgamers.com/wp-content/uploads/hm_bbpui/282793/yko8lqxg8dvq18y6w7jkxg3746zhr7hi.jpg"
              }
              alt="book-cover"
              className="w-[350px] place-self-center object-cover shadow-lg"
            />
          </div>
          {/* Product info */}
          <div className="space-y-2 rounded-[10px] bg-[var(--color-buttonBrown)] p-[32px] py-12 text-[var(--cls-white)] max-sm:pt-[30px]">
            <p className="text-2xl font-bold md:text-3xl">{product.name_vol}</p>
            <select
              name="volume"
              value={selectedProductVolumeId} // ควบคุมค่าด้วย state
              onChange={handleVolumeChange}
              className="w-full cursor-pointer overflow-y-auto rounded border border-gray-300 bg-white p-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" disabled className="hidden text-gray-500">
                Select Volume
              </option>
              {products.length > 0 &&
                products.map((p) => (
                  <option
                    key={p._id}
                    value={p._id}
                    disabled={p.quantity <= 0}
                    className={`cursor-pointer px-4 py-2 text-black hover:bg-gray-100 ${
                      p.quantity <= 0
                        ? "cursor-not-allowed bg-gray-50 text-red-500"
                        : ""
                    }`}
                  >
                    {p.name_vol} {p.quantity <= 0 && "(Sold Out)"}
                  </option>
                ))}
            </select>
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
                handleSetQuantity(1);
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
            <div
              className="grid grid-cols-1 place-content-between md:flex md:flex-row md:py-5"
              onClick={() => {
                if (quantity > 1) {
                  handleSetQuantity(1);
                }
                setSelectedProductVolumeId("");
              }}
            >
              {similarBooks}
            </div>
          </div>
        </div>
      </div>
      {/* Sticky AddToCart Bar */}
      <div className="sticky bottom-0 overflow-hidden border-t-1 border-[#eef1f34d] bg-[var(--color-greenBackground)] text-[var(--color-text)] min-[1024px]:hidden">
        <div className="container__div flex w-full flex-row justify-between px-[16px]">
          <p className="p-2 text-2xl">฿{quantity * (product.price || 0)}</p>
          <button
            className="my-1 rounded-lg bg-[var(--color-buttonBlue)] px-4 text-lg shadow hover:cursor-pointer hover:bg-[#2e648ecc]"
            onClick={() => {
              handleAddToCart();
              handleSetQuantity(1);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
