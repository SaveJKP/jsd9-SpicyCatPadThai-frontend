import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Login() {
  return (
  <main >
    <div className="bg-greenBackground w-full h-fit">
      <div className="container__div">
        <section className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen gap-4">
          <section className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 text-text">
            <img src="/src/assets/logo_katsubook.png" alt="Katsu Bookstore"
            className="w-[50%] hidden md:flex"/>
            <img src="/src/assets/logo_katsubook_no-text.png" alt=""
            className="w-[35%] flex md:hidden"/>
            <p className="hidden md:flex w-fit">Welcome to bookstore Everything in One place</p>
          </section>
          <section className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 text-text">
            <h1 className="font-bold">Login</h1>
            <p className="hidden md:flex">Welcome to bookstore Everything in One place</p>
            <form action="" className="flex flex-col justify-center items-center gap-4 w-full">
              <input type="email" placeholder="Email"
              className="w-[50%] bg-white text-banner px-4 py-2 rounded-2xl"/>
              <input type="password" placeholder="Password"
              className="w-[50%] bg-white text-banner px-4 py-2 rounded-2xl"/>
              <a href="">Forget Your password?</a>
              <div className="flex flex-col justify-center items-center gap-4 w-[50%]">
                <Separator />
                <Button className="w-full bg-buttonBrown px-4 py-2 font-semibold hover:cursor-pointer rounded-2xl">Login</Button>
                <p>or</p>
                <Button className="w-full bg-buttonBlue px-4 py-2 font-semibold hover:cursor-pointer rounded-2xl">New Account</Button>
              </div>
            </form>
          </section>
        </section>
      </div>
    </div>
  </main>
  )
}