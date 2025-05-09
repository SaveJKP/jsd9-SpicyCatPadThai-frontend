import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ordersData } from "../data/Orders.js";
import { useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const { userId, orderId } = useParams();

  useEffect(() => {
    const userOrderDetail = ordersData.find(
      (o) => String(o.user_id) === userId && String(o.order_id) === orderId,
    );
    setOrders(userOrderDetail);
  }, [userId, orderId]);

  if (!orders) {
    return <div className="p-4 text-white">Loading or order not found...</div>;
  }
  const total = orders.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-[var(--color-text)]">
      <div className="container__div bg-[var(--color-text)]">
        <h2 className="py-[16px] pl-[16px] text-2xl font-bold">
          Order Details
        </h2>
        <div className="flex w-full justify-self-center sm:max-[815px]:flex-col">
          <div className="w-[50%] flex-row sm:max-[815px]:w-full">
            <div className="flex-col border border-[var(--color-radio)]">
              <div
                key={orders.order_id}
                className="mb-6 flex flex-col gap-1 p-[16px]"
              >
                <p className="flex justify-between font-semibold">
                  Order No: {orders.order_id}
                </p>

                <p className="text-sm text-gray-600">
                  Order Date:{" "}
                  {new Date(orders.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="pt-5 font-bold">Items Ordered</p>

                {orders.items.map((item) => (
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

                        <div className="flex flex-row justify-between py-4">
                          <p className="text-base">Qty: {item.quantity}</p>
                          <p className="text-base">
                            Total price: ฿{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[50%] border border-[var(--color-radio)] p-[16px] sm:max-[815px]:w-full">
            <div className="flex flex-row items-end justify-between pt-2 pb-9 text-2xl font-extrabold sm:max-md:my-5 sm:max-md:w-full">
              <p className="font-semibold">Grand total:</p>
              <p>฿{total.toFixed(2)}</p>
            </div>
            <p className="font-bold">Payment Information</p>
            <div className="flex flex-col sm:max-md:flex-col">
              <div className="sm:max-md:w-full">
                <p className="pt-5 font-semibold">Billing Address</p>
                "user Name"
                <p>{orders.shipping_address.street}</p>
                <p>{orders.shipping_address.city}</p>
                <p>{orders.shipping_address.zip}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <button
            className="my-[32px] flex justify-self-center rounded-[10px] bg-[var(--color-buttonBrown)] px-[66px] py-[10px] text-white hover:cursor-pointer"
            onClick={() => {
              navigate(`/orders/${orders.user_id}`);
            }}
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
}
