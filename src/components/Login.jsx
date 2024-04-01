import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [showpass, setShowPass] = useState(true);
  const [error, setError] = useState("")
  const login = async (data) => {
    setError("");
    console.log(data);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          toast.success('Sign In Successfull!')
          console.log(data);
          navigate("/");
        }
      }
    } catch (error) {
      // setError(error.message);
      toast.error(error.message)
      // console.log(error.message);

    }
  };


  return (
    <div className="flex items-center justify-center w-full p-8 ">
     
      <div
        className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10 shadow-xl`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]"><img className="object-cover rounded-full h-16 w-16 shadow-2xl " src="blog.png"></img></span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="p-2 rounded-lg"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type={showpass && "password"}
              className="p-2 rounded-lg"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />


            <div class="flex items-center ml-[2px] mb-4">
              <input id="default-checkbox"
                value={showpass}
                onChange={() => setShowPass((prev) => !prev)}
                type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
              <label for="default-checkbox" class="ms-2 text-sm font-medium  ">Show password</label>
            </div>

            <Button
              type="submit"
              className="w-full hover:bg-blue-500 duration-500"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
