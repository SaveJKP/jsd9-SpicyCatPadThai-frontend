import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get-order-by-userid/${user._id}`,
        );

        setLoading(true);
        setOrders(response.data.orders);
        setOrderDetails(response.data.orderDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user._id]);

  if (loading) {
    return <p className="py-20 text-center text-white">Loading...</p>;
  }

  if (orders.length === 0) {
    return <p className="py-20 text-center text-white">No orders found</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    navigate(`search-order?query=${encodeURIComponent(searchTerm)}`);
  };
  return (
    <div className="bg-[var(--color-text)]">
      <div className="container__div pb-2">
        <h2 className="py-[16px] pl-[16px] text-2xl font-bold">Your Orders</h2>
        {/* Search Field */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center pl-7">
            <input
              type="text"
              placeholder="You can search by Order No., Book name, Author name, Tracking Number, or Order Status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hover:border-lightgray bg-text relative my-[16px] h-[65%] w-full rounded-lg border-2 border-[var(--color-greenBackground)] p-[12px] text-[var(--color-banner)] transition-all duration-300 focus:border-[2px] focus:border-gray-500"
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="relative right-10"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#d9d9d9"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </button>
          </div>
        </form>
        <div className="flex w-[80%] justify-self-center">
          <div className="w-full flex-col">
            {Array.isArray(orders) &&
              orders
                .sort(
                  (prev, latest) =>
                    new Date(latest.createdOn) - new Date(prev.createdOn),
                )
                .map((order) => {
                  return (
                    <div
                      key={order._id}
                      className="flex flex-col border border-[var(--color-radio)] p-5"
                    >
                      <h3 className="flex flex-col justify-between pb-5 font-semibold min-[1024px]:flex-row sm:max-md:text-base">
                        Order No: {order._id}
                        <span
                          className="hover:text-[var(--color-muted-foreground) cursor-pointer text-[var(--color-greenBackground)] hover:text-[var(--color-box)] sm:max-md:hidden"
                          onClick={() =>
                            navigate(
                              `/orders/${order.user_id?._id}/${order._id}`,
                            )
                          }
                        >
                          View Order Detail
                        </span>
                      </h3>
                      <p className="flex justify-between font-semibold">
                        Tracking Number: {order.tracking_number}
                      </p>
                      <h4 className="flex justify-between py-2 font-semibold">
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

                      {Array.isArray(orderDetails) &&
                        orderDetails
                          .filter((item) => item.order_id?._id === order._id)
                          .map((item) => (
                            <div
                              key={item._id}
                              className="mb-[16px] flex w-full flex-col"
                            >
                              <div className="mt-10 flex flex-row">
                                <img
                                  src={
                                    item.product_id.picture ||
                                    "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cdd17c167263253.6425cd49aab91.jpg"
                                  }
                                  className="max-h-[150px] max-w-[200px] object-contain px-[8px] sm:max-md:w-[40%]"
                                  alt={item.product_id.name_vol}
                                />
                                <div className="flex w-full flex-col gap-1.5 px-[8px]">
                                  <h3 className="text-lg font-bold sm:max-md:text-base">
                                    {item.product_id.title_id?.title_name}
                                  </h3>
                                  <h3 className="text-lg font-bold sm:max-md:text-base">
                                    {item.product_id.name_vol}
                                  </h3>
                                  <p>
                                    {item.product_id.author_id?.author_name}
                                  </p>
                                  <p>Vol. {item.product_id.volume_no}</p>
                                  <p>
                                    ฿{item.product_id.price?.toFixed(2) || 0}
                                  </p>

                                  <div className="grid grid-cols-2 place-content-between py-4">
                                    <div className="flex flex-row items-center gap-2">
                                      <p className="place-self-center text-sm">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      <p
                        className="cursor-pointer font-bold text-[var(--color-greenBackground)] hover:text-[var(--color-box)] min-[1024px]:hidden"
                        onClick={() =>
                          navigate(`/orders/${order.user_id?._id}/${order._id}`)
                        }
                      >
                        View Order Detail
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
        <button
          className="my-[64px] flex justify-self-center rounded-[10px] bg-[var(--color-buttonBrown)] px-[66px] py-[10px] text-white hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
