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


export default function UserProfile() {
  const { userId } = useParams();
  // const user = users.find(u => u.user_id === Number(userId));

  const [user, setUser] = useState(null); // Store user data
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
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
          city: res.data.city,
          country: res.data.country,
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

  //0.2Handle change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  //0.3 Handle form submission (send updated data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button while submitting

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/auth/user/${userId}`,
        updatedUser,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className ="h-full bg-(--color-greenBackground) text-(--color-text) pb-8 md:px-12 lg:px-72 " >
      {/* 1. Heading - User Profile Setting */}
      <section className ="py-8 px-16 ">
        <h1 className="font-bold text-center">Settings</h1>
      </section>
          
      <div className="container__div py-0 md:flex ">
        {/* 2. User display + logout - User Profile Setting */}
        <div className="flex flex-col text-center items-center md:w-1/2">
          <img
            src="/src/assets/logo_cat.jpg"
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
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="account" className="">
              <TabsList className="grid w-full grid-cols-2  bg-(--color-box) mb-1">
                <TabsTrigger value="account" className ="text-(--color-text)">Profile</TabsTrigger>
                <TabsTrigger value="password" className ="text-(--color-text)">Password</TabsTrigger>
              </TabsList>
              <TabsContent  value="account" >
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
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={updatedUser.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={updatedUser.country}
                        onChange={handleChange}
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
              </TabsContent>
              <TabsContent value="password">
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
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className ="bg-(--color-greenBackground) hover:bg-[#060f0b] cursor-pointer font-bold">Save Password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>


        </div>
      </div>
    </div>
  );
}
