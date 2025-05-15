import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GreenButton from "../components/GreenButton";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://katsubook-backend.onrender.com/api/auth/user/${userId}`,
        );
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-(--color-greenBackground)">
        <p className="text-center text-lg text-(--color-text)">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center bg-(--color-greenBackground)">
        <p className="text-center text-lg text-(--color-text)">
          User not found.
        </p>
      </div>
    );

  return (
    <div className="bg-(--color-greenBackground) text-(--color-text) md:px-12 lg:px-72">
      {/* 1. Heading - User Profile */}
      <section className="px-16 py-8">
        <h1 className="text-center font-bold">My Account</h1>
      </section>

      <div className="container__div py-0 md:flex">
        {/* 2. User display + settings button - User Profile */}
        <div className="flex flex-col items-center text-center md:w-1/2">
          <img
            src="/logo_cat.jpg"
            alt="profile"
            className="my-4 h-32 w-32 rounded-full"
          />
          <p className="mt-2 text-2xl font-bold">
            {user.name} {user.lastName}
          </p>
          <p className="mt-4 hidden text-sm">User ID: {userId}</p>

          <Link to={`/user/${userId}/settings`}>
            <button className="m-4 cursor-pointer text-sm underline hover:scale-105">
              Profile and Password Settings
            </button>
          </Link>
        </div>

        {/* 3.User Info - User Profile */}
        <div className="mt-4 px-16 md:w-1/2 md:px-8 lg:px-16">
          <div className="rounded-lg bg-(--color-box) px-6 py-4 md:px-6">
            <div className="profile-detail-text flex flex-col justify-center">
              <p className="mt-2">
                <span className="font-bold">Name:</span> <br></br> {user.name}{" "}
                {user.lastName}
              </p>
              <p className="mt-2">
                <span className="font-bold">Email:</span>{" "}
              </p>{" "}
              {user.email}
              <p className="mt-2">
                <span className="font-bold">Address:</span>
              </p>{" "}
              {user.address}, {user.city_id.name},{" "}
              {user.city_id.country_id.name}
              <p className="mt-2">
                <span className="font-bold">Phone:</span>{" "}
              </p>{" "}
              {user.phoneNumber}
            </div>

            <Link to="/purchase">
              <GreenButton
                className="mt-4 mb-2 w-full"
                text="My Cart →"
                onclick=""
              />
            </Link>

            <Link to={`/orders/${user?._id}`}>
              <GreenButton
                className="mb-2 w-full"
                text="My Orders →"
                onclick=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
