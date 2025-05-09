import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return null;
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get-order-by-userid/${user._id}`,
        );
        setOrders(response.data.orders);
        setOrderDetails(response.data.orderDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user._id]);

  if (orders.length === 0)
    return <p className="py-20 text-center text-white">No orders found</p>;

  return (
    <div className="bg-[var(--color-text)]">
      <div className="container__div pb-2">
        <h2 className="py-[16px] pl-[16px] text-2xl font-bold">Your Orders</h2>
        <div className="flex w-[80%] justify-self-center">
          <div className="w-full flex-col">
            {Array.isArray(orders) &&
              orders.map((order) => {
                return (
                  <div
                    key={order._id}
                    className="flex flex-col border border-[var(--color-radio)] p-5"
                  >
                    <p className="flex flex-col justify-between pb-5 font-semibold min-[1024px]:flex-row">
                      Order No: {order._id}
                      <span
                        className="hover:text-[var(--color-muted-foreground) cursor-pointer text-[var(--color-greenBackground)] hover:text-[var(--color-box)] sm:max-md:hidden"
                        onClick={() =>
                          navigate(`/orders/${order.user_id?._id}/${order._id}`)
                        }
                      >
                        View Order Detail
                      </span>
                    </p>

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
                                className="max-h-[150px] max-w-[200px] px-[8px]"
                                alt={item.product_id.name_vol}
                              />
                              <div className="flex w-full flex-col gap-1.5 px-[8px]">
                                <h3 className="text-lg font-bold">
                                  {item.product_id.title_id?.title_name}
                                </h3>
                                <h3 className="text-lg font-bold">
                                  {item.product_id.name_vol}
                                </h3>
                                <p>{item.product_id.author_id?.author_name}</p>
                                <p>Vol. {item.product_id.volume_no}</p>
                                <p>฿{item.product_id.price?.toFixed(2) || 0}</p>

                                <div className="grid grid-cols-2 place-content-between py-4">
                                  <div className="flex flex-row items-center gap-2">
                                    <p className="place-self-center text-sm">
                                      x {item.quantity}
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
