import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

const Products = () => {
  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-md border p-4 transition hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <button
              onClick={() => handleViewDetails(product.id)}
              className="rounded-md bg-teal-500 px-4 py-2 text-white transition hover:bg-teal-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
