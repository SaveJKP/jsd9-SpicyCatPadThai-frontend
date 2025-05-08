import { useState, useEffect } from "react";
// import { GetData } from "../utils/API";
import { useNavigate } from "react-router-dom";
import { bannersWithProducts } from "./../data/Catalog";
import axios from "axios";

export default function Catalog({ id, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [picture, setPicture] = useState("");

  const banner = bannersWithProducts.find((banner) => banner.banner_id === id);
  const navigate = useNavigate();

  const fetchTitleById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/titles/6814725661fa18a1c47ce5a9`,
      );
      console.log(res.data);
      setName(res.data.title_name);
      setDescription(res.data.title_description);
      setPicture(banner.title_picture);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchProductsById = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/productss/6814725661fa18a1c47ce5a9",
      );
      setProducts(res.data.product); // แปลง values เป็น array
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTitleById();
    fetchProductsById();
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-10 pt-24 flex w-[100%] items-start justify-center backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#222] mt-16 flex w-[40%] min-w-[355px] flex-col items-center justify-center gap-[24px] rounded-lg p-6 shadow-lg text-white" // Darker box and white text
          >
            <h1 className="text-lg font-bold">{name}</h1> {/* Make the title stand out */}
            <img
              className="h-[40%] w-[50%] bg-cover"
              src={picture || "https://placehold.co/50x20"}
              alt={name}
            />
            <p className="text-sm">{description}</p> {/* Slightly smaller description */}
            <div className="bg-[#333] w-full p-6 rounded"> {/* Slightly lighter background for the volume selector */}
              <p className="text-md mb-2">Volume</p> {/* Add some margin below the volume title */}
              <select
                size={5}
                name="volume"
                className="bg-[#444] text-white w-full cursor-pointer overflow-y-auto rounded" // Darker select and white text
              >
                {products.map((product) => (
                  <option
                    onClick={() =>
                      navigate(`/add-to-cart/${product._id}`)
                    }
                    onMouseEnter={() => {
                      setName(product.name_vol),
                        setDescription(product.description);
                    }}
                    key={product._id}
                    value={product._id}
                    className="cursor-pointer px-4 py-2 text-gray-300 hover:bg-[#555]" // Slightly lighter text and hover effect
                  >
                     {product.name_vol}
                    {/* Split character ... */}
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