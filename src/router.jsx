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
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ResetPassword from "./pages/ResetPassword";
import { SearchOrder } from "./pages/SearchOrder";
import { AuthProvider } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "error-handling", element: <ErrorHandling /> },
      { path: "search", element: <Search /> },
      { path: "add-to-cart/:id", element: <AddToCart /> },
      { path: "reset-password", element: <ResetPassword /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "purchase", element: <Purchase /> },
          { path: "user/:userId", element: <UserProfile /> },
          { path: "user/:userId/settings", element: <UserSetting /> },
          { path: "orders/:id", element: <Orders /> },
          { path: "orders/:id/:orderId", element: <OrderDetails /> },
          { path: "orders/:id/search-order", element: <SearchOrder /> },
        ],
      },
    ],
  },
]);
export default router;
