import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BrownButton from "../components/BrownButton";
import GreenButton from "../components/GreenButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

export default function UserProfile() {
  const { userId } = useParams();
  // const user = users.find(u => u.user_id === Number(userId));

  const [user, setUser] = useState(null); // Store user data
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    address: "",
    cityId: "",
    countryId: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true); // For loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // For handling the submit state

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage ] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // 0.1 Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `https://katsubook-backend.onrender.com/api/auth/user/${userId}`,
        );
        setUser(res.data);
        setUpdatedUser({
          name: res.data.name,
          lastName: res.data.lastName,
          email: res.data.email,
          address: res.data.address,
          cityId: res.data.city_id?._id,
          countryId: res.data.city_id?.country_id?._id,
          phoneNumber: res.data.phoneNumber,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserData();
  }, [userId]);

  const cityApiUrl = updatedUser.countryId
    ? `https://katsubook-backend.onrender.com/api/auth/country/${updatedUser.countryId}/cities`
    : null;

  //0.2Handle change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      address: updatedUser.address,
      phoneNumber: updatedUser.phoneNumber,
      city_id: updatedUser.cityId,
    };

    try {
      const res = await axios.patch(
        `https://katsubook-backend.onrender.com/api/auth/user/${userId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //0.4handle password change
  const navigate = useNavigate();
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { newPassword } = updatedUser;

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(newPassword)) {
      setError("Password must contain at least one special character.");
      toast.error("Password must contain at least one special character.");
      setIsSubmitting(false);
      return;
    }
    if (/\s/.test(newPassword)) {
      setError("Password cannot contain spaces.");
      toast.error("Password cannot contain spaces.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.patch(
        `https://katsubook-backend.onrender.com/api/auth/user/${userId}/password`,
        {
          currentPassword: updatedUser.currentPassword,
          newPassword: updatedUser.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      alert("Password changed successfully!");
      setUpdatedUser((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to change password.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="py-20 text-center text-white">Loading...</p>;
  }

  return (
    <div className="h-full bg-(--color-greenBackground) pb-6 text-(--color-text) md:px-12 lg:px-72">
      {/* 1. Heading - User Profile Setting */}
      <section className="px-16 py-8">
        <h1 className="text-center font-bold">Settings</h1>
      </section>

      <div className="container__div py-0 md:flex">
        {/* 2. User display + logout - User Profile Setting */}
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

          <Link to={`/user/${userId}`}>
            <button className="m-4 cursor-pointer text-sm underline hover:scale-105">
              Back to Profile
            </button>
          </Link>
        </div>

        {/* 3.account and password setting - User Profile Setting*/}

        <div className="font-noto mt-4 px-16 md:w-1/2 md:px-8 lg:px-16">
          <Tabs defaultValue="account" className="">
            <TabsList className="mb-1 grid w-full grid-cols-2 bg-(--color-box)">
              <TabsTrigger value="account" className="text-(--color-text)">
                Profile
              </TabsTrigger>
              <TabsTrigger value="password" className="text-(--color-text)">
                Password
              </TabsTrigger>
            </TabsList>
            {/* 3.1.account setting */}
            <TabsContent value="account">
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bold">Profile</CardTitle>
                    <CardDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={updatedUser.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={updatedUser.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Dropdown
                        apiUrl="https://katsubook-backend.onrender.com/api/auth/country"
                        value={updatedUser.countryId}
                        onChange={(selectedCountryId) => {
                          setUpdatedUser((prev) => ({
                            ...prev,
                            countryId: selectedCountryId,
                            cityId: "",
                          }));
                        }}
                        label="Country"
                        name="countryId"
                      />
                    </div>
                    <div className="space-y-1">
                      <Dropdown
                        apiUrl={cityApiUrl}
                        value={updatedUser.cityId}
                        onChange={(selectedCityId) => {
                          setUpdatedUser((prev) => ({
                            ...prev,
                            cityId: selectedCityId,
                          }));
                        }}
                        label="City"
                        name="cityId"
                        disabled={!updatedUser.countryId}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phoneNumber">Phone</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={updatedUser.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="cursor-pointer bg-(--color-greenBackground) font-bold hover:bg-[#060f0b]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* 3.2.password setting */}
            <TabsContent value="password">
              <form onSubmit={handlePasswordChange}>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <div className="relative">
                        <Input
                          id="current"
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={updatedUser.currentPassword}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-600 hover:cursor-pointer"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <div className="relative">
                        <Input
                          id="new"
                          type={showConfirmPassword ? "text" : "password"}
                          name="newPassword"
                          value={updatedUser.newPassword}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={toggleShowConfirmPassword}
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-600 hover:cursor-pointer "
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="cursor-pointer bg-(--color-greenBackground) font-bold hover:bg-[#060f0b]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save Password"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
