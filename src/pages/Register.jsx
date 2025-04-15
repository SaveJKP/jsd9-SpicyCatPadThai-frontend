import { Button } from "@/components/ui/button"

export default function Register() {
  return (
     <main >
        <div className="bg-greenBackground w-full h-fit">
          <div className="container__div">
            <section className="flex flex-col md:flex-row justify-start items-center w-full min-h-screen gap-4 py-[15%]">
              {/* Logo section */}
              <section className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 text-text">
                <img src="/src/assets/logo_katsubook.png" alt="Katsu Bookstore"
                className="w-[50%] flex md:hidden"/>
              </section>

              {/* Register Form */}
              <section className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 text-text">
                <h1 className="font-bold">Register</h1>
                <form action="" className="flex flex-col justify-center items-center gap-4 w-[95%]">
                  {/* text */}
                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="first_name" className="w-1/3">First Name:</label>
                    <input type="text" id="first_name" placeholder="First Name" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="last_name" className="w-1/3">Last Name:</label>
                    <input type="text" id="last_name" placeholder="Last Name" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="date_of_birth" className="w-1/3">Birth Date:</label>
                    <input type="date" id="date_of_birth" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="gender" className="w-1/3">Gender:</label>
                    <ul class="flex flex-row gap-4 w-2/3">
                            <li class="flex flex-row text-center gap-2">
                                <input type="radio" id="gender_male" name="gender"/>
                                <p>M</p>
                            </li>
                            <li class="flex flex-row text-center gap-2">
                                <input type="radio" id="gender_female" name="gender"/>
                                <p>F</p>
                            </li>
                        </ul>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="email" className="w-1/3">Email:</label>
                    <input type="text" id="email" placeholder="Email" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="password" className="w-1/3">Password:</label>
                    <input type="password" id="password" placeholder="Password" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="confirm_password" className="w-1/3">Confirm Password:</label>
                    <input type="password" id="password" placeholder="Confirm Password" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="address" className="w-1/3">Address:</label>
                    <input type="text" id="address" placeholder="Address" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="phone_number" className="w-1/3">Tel :</label>
                    <input type="tel" id="phone_number" placeholder="Phone Number" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="city" className="w-1/3">City :</label>
                    <input type="text" id="city" placeholder="City" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="country" className="w-1/3">Country :</label>
                    <input type="text" id="country" placeholder="country" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required/>
                  </div>

                  <Button className=" mt-[5%] w-[50%] bg-buttonBlue font-semibold hover:cursor-pointer rounded-2xl">Create Account</Button>

                </form>
              </section>
            </section>
          </div>
        </div>
      </main>
  )
}