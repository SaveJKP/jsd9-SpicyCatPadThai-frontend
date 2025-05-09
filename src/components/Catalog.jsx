import { useState, useEffect } from "react";
// import { GetData } from "../utils/API";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Catalog({ id, onClose }) {
  // Added 'open' prop
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [picture, setPicture] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(""); // For controlling the select

  const navigate = useNavigate();

  const fetchTitleById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/titles/${id}`);
      setName(res.data.title_name);
      setDescription(res.data.title_description);
      setPicture(res.data.title_picture);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchProductsById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/productss/${id}`);
      setProducts(res.data.product);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTitleById();
      fetchProductsById();
      setSelectedProductId(""); // Reset selection when id changes
    }
  }, [id]);

  const handleVolumeChange = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);
    navigate(`/add-to-cart/${productId}`);
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
              className="h-[40%] w-[50%] bg-cover"
              src={picture || "https://placehold.co/50x20"}
              alt={name}
            />
            <p className="text-sm">{description}</p>
            <div className="w-full rounded bg-[#333] p-6">
              <p className="text-md mb-2">Volume</p>
              <select
                name="volume"
                value={selectedProductId}
                onChange={handleVolumeChange}
                className="w-full cursor-pointer overflow-y-auto rounded bg-[#444] text-white"
              >
                {products.map((product) => (
                  <option
                    key={product._id}
                    value={product._id}
                    className="cursor-pointer px-4 py-2 text-gray-300 hover:bg-[#555]"
                  >
                    {product.name_vol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
