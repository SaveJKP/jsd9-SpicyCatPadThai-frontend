import { useState, useEffect } from "react";
// import { GetData } from "../utils/API";
import { useNavigate } from "react-router-dom";
import { bannersWithProducts } from "./../data/Catalog";

export default function Catalog({ id, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [picture, setPicture] = useState("");

  const banner = bannersWithProducts.find((banner) => banner.banner_id === id);
  const navigate = useNavigate();

  useEffect(() => {
    setName(banner.name);
    setDescription(banner.description);
    setProducts(banner.products);
    setPicture(banner.picture);
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-10 flex w-[100%] items-start justify-center backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-box justify-center mt-16 flex w-[40%] min-w-[355px] flex-col items-center gap-[24px] rounded-lg p-6 shadow-lg"
          >
            <h1>{name}</h1>
            <img
              className="h-[40%] w-[50%] bg-cover"
              src={picture || "https://placehold.co/50x20"}
              alt={name}
            />
            <p>{description}</p>
            <div className="bg-greenBackground w-full p-6">
              <p>Volume</p>
              <select
                size={5}
                name="volume"
                className="bg-radio w-full cursor-pointer overflow-y-auto"
              >
                {products.map((product) => (
                  <option
                    onClick={() =>
                      navigate(`/add-to-cart/${product.product_id}`)
                    }
                    onMouseEnter={() => {
                      setName(product.name),
                        setDescription(product.description);
                    }}
                    key={product.product_id}
                    value={product.product_id}
                    className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {"Volume " + product.volume} - {product.name}
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
