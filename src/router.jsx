import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ErrorHandling from "./pages/ErrorHandling";
import UserProfile from "./pages/UserProfile";
import Purchase from "./pages/Purchase";
import About from "./pages/About";
import AddToCart from "./pages/AddToCart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "user/:userId", element: <UserProfile /> },
      { path: "about", element: <About /> },
      { path: "purchase", element: <Purchase /> },
      { path: "add-to-cart", element: <AddToCart /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "error-handling", element: <ErrorHandling /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default router; // export router หลังจากประกาศ
