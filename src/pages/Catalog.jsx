import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const Catalog = () => {
  const { productId } = useParams();
  const ProductDetail = products.find((p) => p.id === productId);

  if (!ProductDetail) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <div className="container__div">Product</div>
    </div>
  );
};

export default Catalog;
