import { useState, useEffect } from "react";
import { GetData } from "../utils/API";
import { Banner } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Catalog({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setName(Banner.name);
    setDescription(Banner.description);
    setProducts(Banner.products);
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
            className="bg-box justufy-center mt-16 flex w-[40%] min-w-[355px] flex-col items-center gap-[24px] rounded-lg p-6 shadow-lg"
          >
            <h1>{name}</h1>
            <img
              className="h-[40%] w-[50%] bg-cover"
              src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQlO_2ts2YDGtpdafB8JDZzGVfyKlmFCn7paIJmTsKhfbev0I3O-OoMwgHJUDjSTc-KbjZge4_FgB2BUqVblVM"
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
                {products.map((product, index) => (
                  <option
                    onClick={() => navigate(`/products/${product.id}`)}
                    onMouseEnter={() => {
                      setName(product.title),
                        setDescription(product.description);
                    }}
                    key={index}
                    value={product.id}
                    className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {"Volume " + product.volume} - {product.title}
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
