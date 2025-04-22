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
import UserSetting from "./pages/UserSetting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "user/:userId", element: <UserProfile /> },
      { path: "user/:userId/settings", element: <UserSetting /> },
      { path: "about", element: <About /> },
      { path: "purchase", element: <Purchase /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "error-handling", element: <ErrorHandling /> },
      { path: "search", element: <Search /> },
      { path: "add-to-cart/:id", element: <AddToCart /> },
    ],
  },
]);

export default router; // export router หลังจากประกาศ
