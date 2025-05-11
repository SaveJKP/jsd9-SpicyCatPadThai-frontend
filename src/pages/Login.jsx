import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useAuth } from "../context/userContext";
import axios from "axios";

export default function Login() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
      setUser(response.data);
      setMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
        navigate(0);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <main>
      <div className="bg-greenBackground h-fit w-full">
        <div className="container__div">
          <section className="mt-[10%] mb-[5%] flex h-full w-full flex-col items-center justify-center gap-4 lg:flex-row">
            {/* Icon Section */}
            <section className="text-text flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
              <img
                src="/logo_katsubook.png"
                alt="Katsu Bookstore"
                className="hidden w-[50%] lg:flex"
              />
              <img
                src="/logo_katsubook_no-text.png"
                alt="Katsu Bookstore"
                className="flex w-[35%] md:w-[15%] lg:hidden"
              />
              <p className="hidden w-fit lg:flex">
                Welcome to bookstore Everything in One place
              </p>
            </section>
            <section className="text-text flex w-full flex-col items-center justify-center gap-4 lg:w-1/2">
              <h1 className="flex font-bold">Login</h1>
              <p className="hidden md:flex lg:hidden">
                Welcome to bookstore Everything in One place
              </p>
              {error ? (
                <div className="mb-4 rounded bg-red-100 px-4 py-2 text-center text-red-700">
                  {error}
                </div>
              ) : (
                message && (
                  <div className="mb-4 rounded bg-green-100 px-4 py-2 text-center text-green-700">
                    {message}
                  </div>
                )
              )}

              {/* Sign In Form */}
              <form
                onSubmit={handleLogin}
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="text-banner w-[65%] rounded-2xl bg-white px-4 py-2 md:w-[35%] lg:w-[50%]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="text-banner w-[65%] rounded-2xl bg-white px-4 py-2 md:w-[35%] lg:w-[50%]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/forgot-password">Forget Your password?</Link>
                <div className="flex w-[65%] flex-col items-center justify-center gap-4 md:w-[35%] lg:w-[50%]">
                  <Separator />
                  <Button
                    type="submit"
                    className="bg-buttonBrown w-full rounded-2xl px-4 py-2 font-semibold hover:cursor-pointer"
                  >
                    Login
                  </Button>
                  <p>or</p>

                  {/* Register Button */}
                  <Link to="/register" className="w-full">
                    <Button className="bg-buttonBlue w-full rounded-2xl px-4 py-2 font-semibold hover:cursor-pointer">
                      New Account
                    </Button>
                  </Link>
                </div>
              </form>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
