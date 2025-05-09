/* import { StrictMode } from "react"; */
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { MessageProvider } from "./context/MessageProvider";
import { CartProvider } from "./context/CartContext";
import "./index.css";
createRoot(document.getElementById("root")).render(
  /*  <StrictMode> */
  <CartProvider>
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </CartProvider>,
  /*  </StrictMode> */
);
