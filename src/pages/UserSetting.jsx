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



export default function UserProfile() {
  const { userId } = useParams();
  const user = users.find(u => u.user_id === Number(userId));

  


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
          <p className ="">User ID: {userId}</p>
  
          <Link to ={`/user/${userId}`}>
            <button className="m-4 text-sm underline cursor-pointer">Back to Profile</button>
          </Link>
    
          <Link to = "/login">
            <BrownButton
              className=""
              text="Log out"
              onclick=""
            />
          </Link>
        </div>

        {/* 3.account and password setting - User Profile Setting*/}

        <div className ="mt-4 px-16 md:w-1/2 md:px-8 lg:px-16">
          <Tabs defaultValue="account" className="">
            <TabsList className="grid w-full grid-cols-2  bg-(--color-box) mb-1">
              <TabsTrigger value="account" className ="text-(--color-text)">Account</TabsTrigger>
              <TabsTrigger value="password" className ="text-(--color-text)">Password</TabsTrigger>
            </TabsList>
            <TabsContent  value="account" >
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={`${user.first_name} ${user.last_name}`} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue= {user.email} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={`${user.address}, ${user.city}, ${user.country}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Phone</Label>
                    <Input id="email" defaultValue= {user.phone_number} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className ="bg-(--color-greenBackground) hover:bg-[#060f0b] cursor-pointer">Save changes</Button>
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
                  <Button className ="bg-(--color-greenBackground) hover:bg-[#060f0b] cursor-pointer">Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>


        </div>
      </div>
    </div>
  );
}
