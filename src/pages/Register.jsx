import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios";

export default function Register() {

  //set input state
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const PostData = async (e) => {
    const payload = {
        name,
        lastName,
        email,
        password,
        dateOfBirth,
        address,
        city,
        country,
        phoneNumber
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', payload)

      console.log(payload);
      setData(...data, response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
     <main >
        <div className="bg-greenBackground w-full h-fit">
          <div className="container__div">
            <section className="flex flex-col md:flex-row justify-start items-center w-full h-full gap-4 py-[15%] md:py-[5%]">
              <section className="flex flex-col justify-center items-center gap-4 w-full text-text">
                <img src="/logo_katsubook.png" alt="Katsu Bookstore"
                className="w-[50%] md:w-[27%] lg:w-[25%] flex"/>
                <h1 className="font-bold">Register</h1>

                {/* Register Form */}
                <form className="flex flex-col justify-center items-center gap-4 w-[95%] md:w-[75%]" onSubmit={PostData}>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="first_name" className="w-1/3">First Name:</label>
                    <input type="text" id="first_name" placeholder="First Name" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={name} onChange={(e) => setName(e.target.value)}/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="last_name" className="w-1/3">Last Name:</label>
                    <input type="text" id="last_name" placeholder="Last Name" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="date_of_birth" className="w-1/3">Birth Date:</label>
                    <input type="date" id="date_of_birth" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                  </div>

                  {/* <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="gender" className="w-1/3">Gender:</label>
                    <ul className="flex flex-row gap-4 w-2/3">
                            <li className="flex flex-row text-center gap-2">
                                <input type="radio" id="gender_male" name="gender"
                                value={gender} onChange={(e) => setGender(e.target.value)}/>
                                <p>M</p>
                            </li>
                            <li className="flex flex-row text-center gap-2">
                                <input type="radio" id="gender_female" name="gender"
                                value={gender} onChange={(e) => setGender(e.target.value)}/>
                                <p>F</p>
                            </li>
                        </ul>
                  </div> */}

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="email" className="w-1/3">Email:</label>
                    <input type="text" id="email" placeholder="Email" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="password" className="w-1/3">Password:</label>
                    <input type="password" id="password" placeholder="Password" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>

                  {/* <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="confirm_password" className="w-1/3">Confirm Password:</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                  </div> */}

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="address" className="w-1/3">Address:</label>
                    <input type="text" id="address" placeholder="Address" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={address} onChange={(e) => setAddress(e.target.value)}/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="phone_number" className="w-1/3">Tel :</label>
                    <input type="tel" id="phone_number" placeholder="Phone Number" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="city" className="w-1/3">City :</label>
                    <input type="text" id="city" placeholder="City" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={city} onChange={(e) => setCity(e.target.value)}/>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full px-12">
                    <label htmlFor="country" className="w-1/3">Country :</label>
                    <input type="text" id="country" placeholder="Country" className="w-2/3 bg-white text-banner px-4 py-2 rounded-2xl" required
                    value={country} onChange={(e) => setCountry(e.target.value)}/>
                  </div>

                  <button type="submit" className=" mt-[5%] w-[50%] bg-buttonBlue font-semibold hover:cursor-pointer rounded-2xl px-1 py-2" onClick={PostData}>
                    Create Account
                  </button>

                </form>
              </section>
            </section>
          </div>
        </div>
      </main>
  )
}