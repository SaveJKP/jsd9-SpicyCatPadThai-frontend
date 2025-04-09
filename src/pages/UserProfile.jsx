import { Link, useParams } from "react-router-dom";
import BrownButton from "../components/BrownButton";
import GreenButton from "../components/GreenButton";
import users from "../data/users";

export default function UserProfile() {
  const { userId } = useParams();
  const user = users.find(u => u.user_id === Number(userId));

  


  return (
    <div className ="h-full bg-(--color-greenBackground) text-(--color-text) pb-8 md:px-12 lg:px-72 " >
      {/* 1. Heading - User Profile */}
      <section className ="py-8 px-16 ">
        <h1 className="font-bold text-center">My Account</h1>
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
          <Link to ={`/user/${userId}/settings`}>
            <button className="m-4 text-sm underline cursor-pointer">Change Password and Profile Details</button>
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
        <div className="bg-(--color-box) px-16 py-8 rounded-lg mt-4 md:w-1/2 md:px-8 lg:px-16">
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



        </div>
      </div>
    </div>
  );
}
