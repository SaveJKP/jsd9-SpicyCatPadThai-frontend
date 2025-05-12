import { useState, useEffect, use } from "react";
import axios from "axios";
import { useAuth } from "../context/userContext";
import { useLocation, useNavigate } from "react-router-dom";

export function SearchOrder() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("query") || "";

  const getOrderResults = async () => {
    try {
      console.log("User context:", user);
      const response = await axios.get(
        `https://katsubook-backend.onrender.com/api/search-order?query=${query}`,
        { withCredentials: true },
      );

      console.log("Response data:", response.data);

      if (Array.isArray(response.data.searchResults)) {
        setSearchResults(response.data.searchResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getOrderResults();
  }, [query]);

  return (
    <div className="bg-[var(--color-text)]">
      <div className="container__div">
        <h2 className="py-[16px] pl-[16px] text-2xl font-bold">Your Orders</h2>
        <h3 className="py-[16px] pl-[16px] font-bold">Search Results</h3>
        <div className="min-h-screen w-full p-4">
          {error && <p className="mt-2 text-red-500">{error}</p>}

          <div className="flex w-[80%] justify-self-center">
            <div className="w-full flex-col">
              {loading ? (
                <p className="text-white">Loading...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col border border-[var(--color-radio)] p-5"
                  >
                    <p className="flex flex-col justify-between pb-5 font-semibold min-[1024px]:flex-row">
                      Order No: {order.order_id}
                      <span
                        className="cursor-pointer text-[var(--color-greenBackground)] hover:text-[var(--color-box)] sm:max-md:hidden"
                        onClick={() => {
                          navigate(
                            `/orders/${order.user_id}/${order.order_id}`,
                          );
                          handleScrollToTop();
                        }}
                      >
                        View Order Detail
                      </span>
                    </p>
                    <p className="flex justify-between font-semibold">
                      Tracking Number: {order.tracking_number}
                    </p>
                    <h4 className="flex justify-between pb-2 font-semibold">
                      Status:{" "}
                      {order?.order_status?.charAt(0).toUpperCase() +
                        order?.order_status?.slice(1)}
                    </h4>

                    <p className="text-sm text-gray-600">
                      Order Date:{" "}
                      {new Date(order.createdOn).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p>Total: ฿{order.total_price.toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="mt-4 text-gray-500">No results found</p>
              )}
            </div>
          </div>
          <div className="flex justify-center py-10">
            <button
              className="my-[32px] flex justify-self-center rounded-[10px] bg-[var(--color-buttonBrown)] px-[66px] py-[10px] text-white hover:cursor-pointer"
              onClick={() => {
                navigate(`/orders/${user.user_id}`);
              }}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
