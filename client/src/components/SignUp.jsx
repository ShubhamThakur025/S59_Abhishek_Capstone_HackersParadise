import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import create from "/create.png";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [respText, setResp] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data);
  };

  useEffect(() => {
    console.log(respText);
  }, [respText]);

  const registerUser = async (data) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SIGNUP_API,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fname: data.fname,
            lname: data.lname,
            mail: data.mail,
            password: data.password,
          }),
        }
      );
      const responseText = await response.json();
      setResp(responseText);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-[#000746] h-full">
        <form
          className="shadow-xl w-[40vw] m-auto mt-0 pt-[10vh] px-5 my-12 py-[10vh] pb-1 rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d48ff9] via-[#9b41f8] to-[#6300ff]">
            Join the Hacker's Community
          </h3>
          <p className="text-center text-slate-500 font-semibold">
            Become a part of our ethical Hacking community!
          </p>
          <div className="flex flex-col mt-5 justify-center items-center">
            <input
              type="text"
              className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
              placeholder="Enter Your First Name"
              {...register("fname", {
                required: "Please enter the name",
                minLength: {
                  value: 3,
                  message: "Name should be of minimum 3 characters.",
                },
                maxLength: {
                  value: 30,
                  message: "Name should be not more than 30 characters long",
                },
              })}
            />

            <input
              type="text"
              className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
              placeholder="Enter Your Last Name"
              {...register("lname", {
                required: "Please enter the last name",
                minLength: {
                  value: 3,
                  message: "Name should be of minimum 3 characters.",
                },
                maxLength: {
                  value: 30,
                  message: "Name should be not more than 30 characters long",
                },
              })}
            />

            <input
              type="email"
              className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
              placeholder="Enter Email"
              {...register("mail", {
                required: "Please enter the mail",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />

            <input
              type="password"
              className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
              placeholder="Set up a password"
              {...register("password", {
                required: "Please enter the password",
                minLength: {
                  value: 10,
                  message: "The password should be at least 10 characters long",
                },
              })}
            />
            <input
              type="password"
              className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
              placeholder="Confirm password"
              {...register("pass", {
                required: "Please re-enter the password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-[4vh] w-[20vw] rounded-[0.6rem] m-4 bg-gradient-to-b from-[#d48ff9] via-[#b25ffb] to-[#6300ff]"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center text-white">OR</p>
        <Link to="/Login">
          <div className="flex justify-center py-[5vh]">
            <div className="w-[20vw] p-[0.2rem] m-4 bg-gradient-to-r from-[#d48ff9] via-[#b25ffb] to-[#6300ff] rounded-md">
              <div className="flex justify-center bg-[#000746]">
                <img src={create} alt="add" className="h-[3rem] p-2 pr-0" />
                <button className="text-white font-bold py-2 pr-4 pl-0 rounded">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
