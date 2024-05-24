import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import myAxios from "../api/axios";
import BarLoader from "react-spinners/BarLoader";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Button, IconButton } from "@mui/material";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { register,
          handleSubmit,
          formState: { errors },
          reset,  
      } = useForm();
  const theme = useTheme();


  const handleLogin = async (data) => {
    setError(null);
    setLoading(true);
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      const response = await myAxios.post("/login", data)
        console.log(response + "Barev");
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;


      // | ZStex login exneluc hxxum kenenq home ej kam profile |
      // navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError(error.response.data.message);
      } else {
        setError("Please try again later.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function handleShowPassword () {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <section className="min-h-screen">
        <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow dark:border mt-10 sm:max-w-md xl:p-0 overflow-hidden" style={{ backgroundColor: theme.palette.myColor.main }}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Sign in
              </h1>
              <form
                method="POST"
                onSubmit={handleSubmit(handleLogin)}
                className="group space-y-4 md:space-y-3"
              >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium ">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className={`bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    style={{ backgroundColor: theme.palette.myColor.main }}
                    {...register("email", {required: true})} 
                    />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium "
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={`${showPassword ? 'text' : 'password'}`}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      style={{ backgroundColor: theme.palette.myColor.main }}
                      {...register("password", {
                        required: true,
                      })} 
                    />
                    <IconButton onClick={handleShowPassword} sx={{ position: "absolute", top: 0, right: 5, bottom:0, fontSize: 20 }}>
                      {showPassword ? <FaEye/> : <IoEyeOff/> }
                    </IconButton>
                  </div>
                </div>
                {error && (
                  <small className="text-red-400 text-sm m-1 p-2">{error}</small>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`group-invalid:pointer-events-none group-invalid:opacity-50 ${loading && 'pointer-events-none opacity-30'} w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                   Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
            <div className="w-full flex justify-center">
              {loading && <BarLoader color="#2563EB" width={"100%"} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
