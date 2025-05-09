import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const handleAdd = () => setQuantity((prev) => prev + 1);
  const handleRemove = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        quantity,
        setQuantity,
        handleAdd,
        handleRemove,
        product,
        setProduct,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
