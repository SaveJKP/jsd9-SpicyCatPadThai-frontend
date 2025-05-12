import { useState } from "react";
import axios from "axios";
import Dropdown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // const [gender, setGender] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cityName, setcityName] = useState("");
  const [countryId, setCountryId] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const PostData = async (e) => {
    const payload = {
      name,
      lastName,
      email,
      password,
      dateOfBirth,
      address,
      city_id: cityName,
      country_id: countryId,
      phoneNumber,
    };

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://katsubook-backend.onrender.com/api/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(payload);
      setData(...data, response.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const cityApiUrl = countryId
    ? `https://katsubook-backend.onrender.com/api/auth/country/${countryId}/cities`
    : null;

  return (
    <main>
      <div className="bg-greenBackground h-fit w-full">
        <div className="container__div">
          <section className="flex h-full w-full flex-col items-center justify-start gap-4 py-[15%] md:flex-row md:py-[5%]">
            <section className="text-text flex w-full flex-col items-center justify-center gap-4">
              <img
                src="/logo_katsubook.png"
                alt="Katsu Bookstore"
                className="flex w-[50%] md:w-[27%] lg:w-[25%]"
              />
              <h1 className="font-bold">Register</h1>

              {error && (
                <div className="mb-4 rounded bg-red-100 px-4 py-2 text-center text-red-700">
                  {error}
                </div>
              )}

              {/* Register Form */}
              <form
                className="flex w-[95%] flex-col items-center justify-center gap-4 md:w-[75%]"
                onSubmit={PostData}
              >
                <div className="flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="first_name" className="w-1/3">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                    className="text-banner w-2/3 rounded-2xl bg-white px-4 py-2"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="last_name" className="w-1/3">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    placeholder="Last Name"
                    className="text-banner w-2/3 rounded-2xl bg-white px-4 py-2"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="date_of_birth" className="w-1/3">
                    Birth Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    className="text-banner w-2/3 rounded-2xl bg-white px-4 py-2"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
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

                <div className="flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="email" className="w-1/3">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="text-banner w-2/3 rounded-2xl bg-white px-4 py-2"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="password" className="w-1/3">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative flex w-2/3 items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      className="text-banner w-full rounded-2xl bg-white px-4 py-2 pr-10"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div className="relative flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="confirm_password" className="w-1/3">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative flex w-2/3 items-center">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="text-banner w-full rounded-2xl bg-white px-4 py-2 pr-10"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleShowConfirmPassword}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-600 hover:cursor-pointer"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="address" className="w-1/3">
                    Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    type="text"
                    id="address"
                    placeholder="Address"
                    className="text-banner w-2/3 rounded-2xl bg-white px-4 py-2"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-row items-center justify-between px-12">
                  <label htmlFor="phone_number" className="w-1/3">
                    Tel <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    placeholder="Phone Number"
                    className="text-banner w-2/3 rounded-2xl bg-white px-4 py-2"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="flex w-full flex-col md:flex-row">
                  <div className="mr-12 ml-12 flex-1/2 md:mr-4">
                    <Dropdown
                      apiUrl="https://katsubook-backend.onrender.com/api/auth/country"
                      value={countryId}
                      onChange={(countryId) => setCountryId(countryId)}
                      label="Country"
                      name="country"
                      placeholderText="Select Country"
                      required
                    />
                  </div>
                  <div className="mr-12 ml-12 flex-1/2 md:ml-4">
                    <Dropdown
                      apiUrl={cityApiUrl}
                      value={cityName}
                      onChange={(value) => setcityName(value)}
                      label="City"
                      name="cityName"
                      placeholderText="Select City"
                      required
                    />
                  </div>
                </div>
                <p className="hidden self-start pl-12 text-xs md:block">
                  By clicking Sign Up, you agree to our{" "}
                  <span className="text-blue-400">Terms of Service</span>,{" "}
                  <span className="text-blue-400">Privacy Policy</span>, and{" "}
                  <span className="text-blue-400">Cookie Policy</span>. These
                  policies are designed to ensure a safe, secure, and
                  personalized experience for all our members. We are committed
                  to protecting your personal information and will never share
                  your data with third parties without your consent. Our goal is
                  to provide a welcoming and trustworthy environment where you
                  can discover, enjoy, and explore books that match your
                  interests.
                </p>
                <p className="block self-start pl-12 text-xs md:hidden">
                  By signing up, you agree to our{" "}
                  <span className="text-blue-400">Terms of Service</span>, and{" "}
                  <span className="text-blue-400">Cookie Policy</span>. We’re
                  committed to keeping your experience safe and personalized.
                </p>

                <button
                  type="submit"
                  className="bg-buttonBlue mt-[3%] w-[50%] rounded-2xl px-1 py-2 font-semibold hover:cursor-pointer"
                  onClick={() =>
                    toast("Registration successfully!", {
                      description: `Welcome to KatsuBook Store, ${name}!`,
                    })
                  }
                >
                  Create Account
                </button>
              </form>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
