import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BrownButton from "../components/BrownButton";
import GreenButton from "../components/GreenButton";
import users from "../data/users";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropdown from '../components/Dropdown';

export default function UserProfile() {
  const { userId } = useParams();
  // const user = users.find(u => u.user_id === Number(userId));

  const [user, setUser] = useState(null); // Store user data
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    lastName: "",
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

  // 0.1 Fetch user data from API 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/user/${userId}`);
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
  ? `http://localhost:3000/api/auth/country/${updatedUser.countryId}/cities`
  : null;

  //0.2Handle change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  //0.3 Handle form submission (send updated data to backend)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button while submitting

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
        `http://localhost:3000/api/auth/user/${userId}`,
        payload, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User updated:", res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable the button after submitting
    }
  };

 
  //0.4handle password change
  const navigate = useNavigate();
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/auth/user/${userId}/password`,
        {
          currentPassword: updatedUser.currentPassword,
          newPassword: updatedUser.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Password changed successfully!");
      setUpdatedUser((prev) => ({ //copy everything from previous state such as name email to change only password. After copying and changing password,  reset password fields and  and 
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
    return <div>Loading...</div>;
  }

  return (
    <div className ="h-full bg-(--color-greenBackground) text-(--color-text) pb-6 md:px-12 lg:px-72 " >
      {/* 1. Heading - User Profile Setting */}
      <section className ="py-8 px-16 ">
        <h1 className="font-bold text-center">Settings</h1>
      </section>

      <div className="container__div py-0 md:flex ">
        {/* 2. User display + logout - User Profile Setting */}
        <div className="flex flex-col text-center items-center md:w-1/2">
          <img
            src="/logo_cat.jpg"
            alt="profile"
            className ="w-32 h-32 rounded-full my-4"
          />
          <p className ="mt-2 text-2xl font-bold">{user.name} {user.lastName}</p>
          <p className ="hidden text-sm mt-4">User ID: {userId}</p>

          <Link to ={`/user/${userId}`}>
            <button className="m-4 text-sm underline cursor-pointer hover:scale-105">Back to Profile</button>
          </Link>

        </div>

        {/* 3.account and password setting - User Profile Setting*/}

        <div className ="mt-4 px-16 font-noto md:w-1/2 md:px-8 lg:px-16">

            <Tabs defaultValue="account" className="">
              <TabsList className="grid w-full grid-cols-2  bg-(--color-box) mb-1">
                <TabsTrigger value="account" className ="text-(--color-text)">Profile</TabsTrigger>
                <TabsTrigger value="password" className ="text-(--color-text)">Password</TabsTrigger>
              </TabsList>
              {/* 3.1.account setting */}
              <TabsContent  value="account" >
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <CardTitle className ="font-bold">Profile</CardTitle>
                      <CardDescription>
                        Make changes to your profile here. Click save when you're done.
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
                        apiUrl="http://localhost:3000/api/auth/country"
                        value={updatedUser.countryId}
                        onChange={(selectedCountryId) => {
                          setUpdatedUser(prev => ({
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
                            setUpdatedUser(prev => ({ ...prev, cityId: selectedCityId }));
                          }}
                          label="City"
                          name="cityId"
                          disabled={!updatedUser.countryId} // Disable if no country selected
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
                          className="bg-(--color-greenBackground) hover:bg-[#060f0b] cursor-pointer font-bold"
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
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input
                          id="current"
                          type="password"
                          name="currentPassword"
                          value={updatedUser.currentPassword}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input
                          id="new"
                          type="password"
                          name="newPassword"
                          value={updatedUser.newPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                    <Button
                      type="submit"
                      className="bg-(--color-greenBackground) hover:bg-[#060f0b] cursor-pointer font-bold"
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
