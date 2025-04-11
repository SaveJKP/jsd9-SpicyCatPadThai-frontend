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
      {/* 1. Heading - User Profile */}
      <section className ="py-8 px-16 ">
        <h1 className="font-bold text-center">Settings</h1>
      </section>
          
      <div className="container__div py-0 md:flex ">
        {/* 2. User display + logout - User Profile */}
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

        {/* 3.User Info - User Profile */}
        {/* <div className="bg-(--color-box) px-16 py-8 rounded-lg mt-4 md:w-1/2 md:px-8 lg:px-16">
          <div className=" profile-detail-text flex flex-col justify-center">
            <p className="mt-2"><span className="font-bold w-28">Name:</span> <br></br> {user.first_name} {user.last_name}</p>
            <p className="mt-2"><span className="font-bold w-28">Email:</span> </p> {user.email}
            <p className="mt-2"><span className="font-bold">Address:</span></p> {user.address}, {user.city}, {user.country}
            <p className="mt-2"><span className="font-bold">Phone:</span> </p> {user.phone_number}
            <p className="mt-2"><span className="font-bold">Birth date:</span></p> {user.birthday}
          </div>

          <Link to = "/add-to-cart">
            <GreenButton
            className="w-full mb-2 mt-4"
            text="Your Cart →"
            onclick=""
            />
          </Link>


          <GreenButton
            className="w-full mb-2"
            text="Your Orders →"
            onclick=""
          />

        </div> */}
        {/* test shadcn */}
        <div>
          <Tabs defaultValue="account" className=" px-16 py-8 mt-4 md:w-[400px] md:px-0 md:py-0">
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
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
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
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>


        </div>
      </div>
    </div>
  );
}
