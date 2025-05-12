import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BrownButton from "../components/BrownButton";
import GreenButton from "../components/GreenButton";
import users from "../data/users";

export default function UserProfile() {
  const { userId } = useParams();
  // const user = users.find(u => u.user_id === Number(userId));

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
              {/* <p className="mt-2"><span className="font-bold">Birth date:</span></p> {user.birthday} */}
            </div>

            <Link to="/purchase">
              <GreenButton
                className="mt-4 mb-2 w-full"
                text="My Cart →"
                onclick=""
              />
            </Link>

            {/* <Link to = "/purchase">
                <GreenButton className="mb-2 mt-4">
                  <span className = "flex items-center gap-2">
                    <span className="whitespace-nowrap">My Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20"><g id="cart"><path className="fill-white" d="M29.46 10.14A2.94 2.94 0 0 0 27.1 9H10.22L8.76 6.35A2.67 2.67 0 0 0 6.41 5H3a1 1 0 0 0 0 2h3.41a.68.68 0 0 1 .6.31l1.65 3 .86 9.32a3.84 3.84 0 0 0 4 3.38h10.37a3.92 3.92 0 0 0 3.85-2.78l2.17-7.82a2.58 2.58 0 0 0-.45-2.27zM28 11.86l-2.17 7.83A1.93 1.93 0 0 1 23.89 21H13.48a1.89 1.89 0 0 1-2-1.56L10.73 11H27.1a1 1 0 0 1 .77.35.59.59 0 0 1 .13.51z"/><circle className="fill-white" cx="14" cy="26" r="2"/><circle className="fill-white" cx="24" cy="26" r="2"/></g></svg>
                  </span>
                </GreenButton>
              </Link> */}

            <Link to={`/orders/${user?._id}`}>
              <GreenButton
                className="mb-2 w-full"
                text="My Orders →"
                onclick=""
              />
            </Link>
          </div>
          {/* 4.log out button - User Profile */}
          <div className="flex flex-col items-center">
            <Link to="/login">
              <BrownButton
                className="mt-8 md:hidden"
                text="Log out"
                onclick=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
