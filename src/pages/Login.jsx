import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5173/auth/login', {
        email,
        password
      })
      setUser(...user, response.user);
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <main >
    <div className="bg-greenBackground w-full h-fit">
      <div className="container__div">
        <section className="flex flex-col lg:flex-row justify-center items-center w-full min-h-screen gap-4">

          {/* Icon Section */}
          <section className="flex flex-col justify-center items-center gap-4 w-full lg:w-1/2 text-text">
            <img src="/src/assets/logo_katsubook.png" alt="Katsu Bookstore"
            className="w-[50%] hidden lg:flex"/>
            <img src="/src/assets/logo_katsubook_no-text.png" alt="Katsu Bookstore"
            className="w-[35%] md:w-[15%] flex lg:hidden"/>
            <p className="hidden lg:flex w-fit">Welcome to bookstore Everything in One place</p>
          </section>
          <section className="flex flex-col justify-center items-center gap-4 w-full lg:w-1/2 text-text">
            <h1 className="flex font-bold">Login</h1>
            <p className="hidden md:flex lg:hidden">Welcome to bookstore Everything in One place</p>

            {/* Sign In Form */}
            <form action={handleLogin} className="flex flex-col justify-center items-center gap-4 w-full">
              <input type="email" placeholder="Email" className="w-[65%] md:w-[35%] lg:w-[50%] bg-white text-banner px-4 py-2 rounded-2xl"
              value={email} onChange={(e) => setEmail(e.target.value)}/>

              <input type="password" placeholder="Password" className="w-[65%] md:w-[35%] lg:w-[50%] bg-white text-banner px-4 py-2 rounded-2xl"
              value={password} onChange={(e) => setPassword(e.target.value)}/>

              <a href="">Forget Your password?</a>
              <div className="flex flex-col justify-center items-center gap-4 w-[65%] md:w-[35%] lg:w-[50%]">
                <Separator />
                <Button className="w-full bg-buttonBrown px-4 py-2 font-semibold hover:cursor-pointer rounded-2xl">Login</Button>
                <p>or</p>

                {/* Register Button */}
                <Link to="/register" className="w-full">
                  <Button className="w-full bg-buttonBlue px-4 py-2 font-semibold hover:cursor-pointer rounded-2xl">
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
  )
}