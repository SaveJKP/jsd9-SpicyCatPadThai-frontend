import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://katsubook-backend.onrender.com/api/get-order-by-orderid/${orderId}`,
        );
        setLoading(true);
        setOrder(response.data.order);
        setOrderDetails(response.data.orderDetails);
        setUserDetails(response.data.userDetails);
        setPaymentMethod(response.data.paymentMethod);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return <p className="py-20 text-center text-white">Loading...</p>;
  }

  if (!order || orderDetails.length === 0) {
    return (
      <>
        <p className="py-20 text-center text-white">
          No order details found
          <button
            className="my-[32px] flex justify-self-center rounded-[10px] bg-[var(--color-buttonBrown)] px-[66px] py-[10px] text-white hover:cursor-pointer"
            onClick={() => {
              navigate(`/orders/${order?.user_id}`);
            }}
          >
            Back to My Orders
          </button>
        </p>
      </>
    );
  }

  const total = orderDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-[var(--color-text)]">
      <div className="container__div bg-[var(--color-text)]">
        <Link
          to={`/orders/${order?.user_id}`}
          className="flex items-center gap-2 pl-[16px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <span className="py-5 text-base">Back to My Orders</span>
        </Link>
        <h2 className="py-[16px] pl-[16px] text-2xl font-bold">
          Order Details
        </h2>
        <div className="flex w-full justify-self-center sm:max-[815px]:flex-col">
          <div className="w-[50%] flex-row border border-[var(--color-radio)] sm:max-[815px]:w-full">
            <div className="flex-col">
              <div className="mb-6 flex flex-col gap-1 p-[16px]">
                <h3 className="flex justify-between pb-2 font-semibold">
                  Status:{" "}
                  {order?.order_status?.charAt(0).toUpperCase() +
                    order?.order_status?.slice(1)}
                </h3>
                <h4 className="flex justify-between font-semibold">
                  Order No: {order?._id}
                </h4>

                <p className="text-sm text-gray-600">
                  Order Date:{" "}
                  {new Date(order?.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="py-5 font-bold">Items Ordered</p>

                {orderDetails.map((item) => (
                  <div
                    key={item._id}
                    className="mb-[16px] flex w-full flex-col"
                  >
                    <div className="flex flex-row">
                      <div className="max-h-[100px] max-w-[100px]">
                        <img
                          src={item.product_id?.picture}
                          className="object-contain px-[8px]"
                          alt={item.product_id?.name_vol}
                        />
                      </div>
                      <div className="flex w-full flex-col gap-1.5 px-[8px]">
                        <h3 className="text-lg font-bold">
                          {item.product_id?.name_vol}
                        </h3>

                        <p>{item.product_id?.author_id?.author_name}</p>
                        <p>฿{item.product_id?.price.toFixed(2) || 0}</p>

                        <div className="flex flex-row justify-between py-4">
                          <p className="text-base">Qty: {item.quantity}</p>
                          <p className="text-base">
                            Total price: ฿
                            {item.product_id?.price * item.quantity}
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
              <p>฿{order.total_price.toFixed(2)}</p>
            </div>

            <div className="flex flex-col sm:max-md:flex-col">
              <div className="sm:max-md:w-full">
                <h4 className="pt-5 font-semibold">Shipping Address</h4>
                <p>
                  {userDetails.name?.charAt(0).toUpperCase() +
                    userDetails.name?.slice(1)}{" "}
                  {userDetails.lastName?.charAt(0).toUpperCase() +
                    userDetails.lastName?.slice(1)}
                </p>

                <p>{userDetails.address}</p>
                <p>{userDetails.city_id?.name}</p>
                <p>{userDetails.phoneNumber}</p>
                <h4 className="pt-5 font-semibold">Tracking Number</h4>
                <p>{order.tracking_number}</p>
                <h4 className="pt-5 font-semibold">Payment Method</h4>
                <p>
                  {order.payment_method?.charAt(0).toUpperCase() +
                    order.payment_method?.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <button
            className="my-[32px] flex justify-self-center rounded-[10px] bg-[var(--color-buttonBrown)] px-[66px] py-[10px] text-white hover:cursor-pointer"
            onClick={() => {
              navigate(`/orders/${order?.user_id}`);
            }}
          >
            Back to My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
