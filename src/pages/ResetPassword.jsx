import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        toast.error("Passwords do not match.");
        return;
    }
    if (newPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        toast.error("Password must be at least 6 characters long.");
        return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(newPassword)) {
        setError("Password must contain at least one special character.");
        toast.error("Password must contain at least one special character.");
        return;
    }
    if (/\s/.test(newPassword)) {
        setError("Password cannot contain spaces.");
        toast.error("Password cannot contain spaces.");
        return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://katsubook-backend.onrender.com/api/auth/reset-password`,
        {
            email, newPassword
        },
      );
      setMessage(
        "Password has been reset successfully! Redirecting to login...",
      );
      console.log(response)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to reset password. Please check your email or try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="bg-greenBackground flex min-h-screen w-full items-center justify-center py-10 -mt-16 -mb-20">
        <div className="container__div w-full max-w-md">
          <section className="text-text flex flex-col items-center justify-center gap-6 rounded-lg bg-greenBackground p-8 md:p-10">
            <div className="flex w-full justify-center">
              <img
                src="/logo_katsubook.png"
                alt="Katsu Bookstore"
                className="w-[70%]"
              />
            </div>
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="-mt-4 text-center text-sm text-gray-300">
              Please enter your email and new password to reset your account.
            </p>

            {error && (
              <div className="w-full rounded bg-red-100 px-4 py-3 text-center text-red-700">
                {error}
              </div>
            )}
            {message && (
              <div className="w-full rounded bg-green-100 px-4 py-3 text-center text-green-700">
                {message}
              </div>
            )}

            <form
              onSubmit={handleResetPassword}
              className="flex w-full flex-col items-center justify-center gap-5"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="text-banner w-full rounded-lg border bg-white px-4 py-3 focus:border-green-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="text-banner w-full rounded-lg border bg-white px-4 py-3 pr-10 focus:border-green-500 focus:outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="text-banner w-full rounded-lg border bg-white px-4 py-3 pr-10 focus:border-green-500 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:cursor-pointer"
                    >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>

              <Button
                type="submit"
                className="bg-buttonBlue w-full rounded-lg px-4 py-3 font-semibold text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
            <Separator />
            <div className="text-center">
              <Link
                to="/login"
                className="text-md text-white hover:cursor-pointer"
              >
                Back to Login
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}