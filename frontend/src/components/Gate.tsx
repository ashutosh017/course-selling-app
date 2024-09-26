import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const be_url = import.meta.env.VITE_BACKEND_URL;
export default function Gate() {
  const navigate = useNavigate();
  const [something, setSomething] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [as, setAs] = useState("User");
  const [sign, setSign] = useState("In");
  const [redirectTo, setRedirectTo] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const handleBack = () => {
    if (showSignInForm) {
      setShowSignInForm(false);
    } else if (showSignUpForm) {
      setShowSignUpForm(false);
    } else {
      setSomething(!something);
    }
    setMsg("");
  };

  const handleSignIn = async () => {
    setShowSignInForm(true);
    setSign("In");
  };
  const handleSignUp = () => {
    setShowSignUpForm(true);
    setSign("Up");
  };
  const handleClick = () => {
    setSomething(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password.length < 5) {
      setMsg("Password Must Be Atleast 5 Characters Long.");
      return;
    }
    let res, err;
    if (as === "User" && sign === "In") {
      try {
        res = await axios.post(`${be_url}/user/signin`, {
          email: formData.email,
          password: formData.password,
        });
        setMsg("");
        setRedirectTo("/user")
        // navigate("/user");
      } catch (e) {
        err = e;
        setMsg("Invalid Credentials.");
      }
    } else if (as === "User" && sign === "Up") {
      try {
        res = await axios.post(`${be_url}/user/signup`, {
          ...formData,
        });
        res = await axios.post(`${be_url}/user/signin`, {
          ...formData,
        });
        setMsg("");
        // navigate("/user");
        setRedirectTo("/user")
      } catch (e) {
        err = e;
        setMsg("There's An Error While Signing You Up.");
      }
    } else if (as === "Admin" && sign === "In") {
      try {
        res = await axios.post(`${be_url}/admin/signin`, {
          ...formData,
        });
        setMsg("");
        // navigate("/admin");
        setRedirectTo("/admin")
      } catch (e) {
        err = e;
        setMsg("Invalid Credentials.");
      }
    } else if (as === "Admin" && sign === "Up") {
      try {
        res = await axios.post(`${be_url}/admin/signup`, {
          ...formData,
        });
        res = await axios.post(`${be_url}/admin/signin`, {
          ...formData,
        });
        setMsg("");
        // navigate("/admin");
        setRedirectTo("/admin")
      } catch (e) {
        err = e;
        console.log("error: ", e);
        setMsg("There's An Error While Signing You Up.");
      }
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    if(!res){
        return;
     
    }
    localStorage.setItem("token",res.data.token);
    navigate(redirectTo)
    console.log("response: ", res);
  };
  return (
    <>
      <div className=" top-4 m-4 fixed  ">
        {something && (
          <button
            onClick={handleBack}
            className="my-4 text-xl font-bold text-gray-200 hover:text-white"
          >
            {" "}
            {`\< `}Back
          </button>
        )}
      </div>

      {showSignInForm ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Sign {`${sign}`} As {`${as}`}
          </h1>
          <div className="mx-4 text-center flex flex-col items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className=" p-6 rounded shadow-md w-full max-w-sm"
            >
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block  text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : showSignUpForm ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Sign {`${sign}`} As {`${as}`}
          </h1>
          <div className="mx-4 text-center flex flex-col items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className=" p-6 rounded shadow-md w-full max-w-sm"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block  text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block  text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : !something ? (
        <div className="flex flex-col items-center justify-center text-black font-bold mx-4">
          <button
            onClick={() => {
              handleClick();
              (() => {
                setAs("User");
              })();
            }}
            className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
          >
            Join As User
          </button>
          <button
            onClick={() => {
              handleClick();
              (() => {
                setAs("Admin");
              })();
            }}
            className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
          >
            Join As Admin
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-black font-bold mx-4">
          <button
            onClick={() => {
              handleClick();
              handleSignIn();
            }}
            className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 cursor-pointer w-full my-2 text-center"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              handleClick();
              handleSignUp();
            }}
            className="bg-yellow-700 rounded-md py-2 text-xl hover:bg-yellow-600 focus:bg-yellow-600 cursor-pointer w-full my-2 text-center"
          >
            Sign Up
          </button>
        </div>
      )}
      <p className="text-center text-red-700 px-16 50 h-16">{msg}</p>
    </>
  );
}
