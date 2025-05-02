import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ordersData } from "../data/Orders.js";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userOrders = ordersData
      .filter((o) => o.user_id === id)
      .sort(
        (prev, latest) =>
          new Date(latest.created_at) - new Date(prev.created_at),
      );
    setOrders(userOrders);
  }, [id]);

  if (orders.length === 0)
    return <p className="p-4">No orders found for this user.</p>;

  return (
    <div className="container__div bg-[var(--color-text)] max-sm:rounded-t-2xl md:rounded-2xl">
      <h2 className="py-[16px] pl-[16px] text-2xl font-bold">Your Orders</h2>
      <div className="flex w-[80%] justify-self-center">
        <div className="w-full flex-col">
          {orders.map((order) => {
            return (
              <div
                key={order.order_id}
                className="flex flex-col border border-[var(--color-radio)] p-5"
              >
                <p className="flex justify-between font-semibold">
                  Order No: {order.order_id}
                  <span
                    className="cursor-pointer hover:text-[var(--color-muted-foreground)]"
                    onClick={() =>
                      navigate(`/orders/${order.user_id}/${order.order_id}`)
                    }
                  >
                    View Order Detail
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  Order Date:{" "}
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p>Total: ฿{order.total_price.toFixed(2)}</p>

                {order.items.map((item) => (
                  <div
                    key={item.name}
                    className="mb-[16px] flex w-full flex-col"
                  >
                    <div className="flex flex-row">
                      <img
                        src={
                          item.picture ||
                          "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cdd17c167263253.6425cd49aab91.jpg"
                        }
                        className="max-h-[150px] max-w-[200px] object-contain object-top px-[8px]"
                        alt={item.name}
                      />
                      <div className="flex w-full flex-col gap-1.5 px-[8px]">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p>{item.author}</p>
                        <p>Vol. {item.vol_no}</p>
                        <p>฿{item.price?.toFixed(2) || 0}</p>

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
  );
}
