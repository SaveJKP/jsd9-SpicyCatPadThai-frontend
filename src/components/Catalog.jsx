import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isNewRelease } from "./NewReleaseTrigger.jsx";

export default function Catalog({ id, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [picture, setPicture] = useState("");

  const navigate = useNavigate();

  const fetchTitleById = async () => {
    try {
      const res = await axios.get(
        `https://katsubook-backend.onrender.com/api/titles/${id}`,
      );
      setName(res.data.title_name);
      setDescription(res.data.title_description);
      setPicture(res.data.title_picture);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchProductsByTitleId = async () => {
    try {
      const res = await axios.get(
        `https://katsubook-backend.onrender.com/productss/${id}`,
      );
      setProducts(res.data.product);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTitleById();
      fetchProductsByTitleId();
    }
  }, [id]);

  const handleVolumeChange = (event) => {
    const productId = event.target.value;
    // Ensure a valid product is selected before navigating
    if (productId) {
      navigate(`/add-to-cart/${productId}`);
    }
  };
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-10 flex w-[100%] items-start justify-center pt-24 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-16 flex w-[40%] min-w-[355px] flex-col items-center justify-center gap-[24px] rounded-lg bg-[#222] p-6 text-white shadow-lg" // Darker box and white text
          >
            <h1 className="text-lg font-bold">{name}</h1>{" "}
            {/* Make the title stand out */}
            <img
              className="h-48 w-32 rounded-md object-cover"
              src={picture || "https://placehold.co/50x20"}
              alt={name}
            />
            <p className="text-sm">{description}</p>
            <div className="w-full rounded bg-[#333] p-6">
              <p className="text-md mb-2">Volume</p>
              <select
                name="volume"
                defaultValue="" // Set a default value for the placeholder
                onChange={handleVolumeChange}
                className="w-full cursor-pointer overflow-y-auto rounded bg-[#444] text-white"
              >
                <option value="" disabled className="hidden">
                  Select Volume
                </option>
                {products.length > 0 &&
                  products.map((product) => {
                    const isNew = isNewRelease(product.releasedDate);
                    return product.quantity > 0 ? (
                      <option
                        key={product._id}
                        value={product._id}
                        className="cursor-pointer px-4 py-2 text-gray-300 hover:bg-[#555]"
                      >
                        {product.name_vol} {isNew && "(New)"}
                      </option>
                    ) : (
                      <option
                        key={product._id}
                        disabled
                        className="cursor-not-allowed px-4 py-2 text-red-500"
                      >
                        {product.name_vol} {isNew && "(New)"} (Sold Out)
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
