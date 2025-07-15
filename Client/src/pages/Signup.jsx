import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup";
  }, []);

  const Navigate = useNavigate();
  const [type, settype] = useState("password");
  const [error, seterror] = useState("");
  const [otp, setotp] = useState("");
  const [otpbtn, setotpbtn] = useState("block");
  const [verifybtn, setverifybtn] = useState("hidden");
  const [verified, setverified] = useState(false);
  const [verifytxt, setverifytxt] = useState("Verify");
  const [enteredotp, setenteredotp] = useState("");
  const [otpbtntxt, setotpbtntxt] = useState("Verify Email");
  const email = useRef();

  function showpass() {
    settype((prev) => (prev === "password" ? "text" : "password"));
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let newdata = {
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      nic: data.nic,
      email: data.email,
      password: data.password,
      role: "patient",
    };
    try {
      let send = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/signup`,
        newdata
      );
      console.log(send.data);
      reset();
      Navigate("/login");
    } catch (err) {
      const error = err.response?.data || "Something went wrong!";
      seterror(error);
      console.log(error);
    }
  };

  const handleOTP = async () => {
    const mail = watch("email")?.trim();
    console.log(mail);
    if (!mail) {
      toast("Please enter mail first");
      return;
    }
    try {
      setotpbtntxt("Wait...");
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/sendotp`,
        { email: mail , type: 'Sign Up'}
      );
      setotp(res.data);
      toast(`OTP sent to your mail. If you did'nt see check spam box also.`);
      setotpbtn("hidden");
      setverifybtn("block");
      setotpbtntxt("Verify Email");
    } catch (err) {
      console.log(err.response.data);
      toast(err.response.data+' Retry Please!');
    }
  };

  const checkOTP = () => {
    console.log(enteredotp);
    if (enteredotp == otp) {
      setverified(true);
      setverifytxt("Verified");
      toast("Verified!");
    } else {
      toast("Wrong OTP Entered");
    }
  };

  return (
    <div className="flex flex-col items-center mt-[10%] p-3 border-2 border-gray-400 sm:w-3/5 w-[80%] ml-[10%] sm:ml-[20%] rounded-3xl backdrop-blur-3xl bg-white/80 shadow-2xl shadow-gray-700">
      <h1 className="text-2xl text-gray-800 font-bold">Sign UP</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="names flex-col flex sm:flex-row mt-4 gap-3">
          <div>
            <input
              type="text"
              placeholder="first name"
              className="border-gray-400 border-2 rounded-2xl p-1 text-gray-800 w-full"
              {...register("firstname", {
                required: { value: true, message: "This Field Is Required" },
                minLength: {
                  value: 3,
                  message: "Minimum Length For Username Is 3",
                },
              })}
            />
            {errors.firstname && (
              <div className="text-sm text-red-500">
                {errors.firstname.message}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="last name"
            className="border-gray-400 border-2 rounded-2xl p-1 text-gray-800"
            {...register("lastname")}
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="phone"
            className="border-gray-400 border-2 rounded-2xl p-1 text-gray-800"
            {...register("phone", {
              required: { value: true, message: "This Field Is required" },
              minLength: {
                value: 5,
                message: "Minimum length for phone is 11",
              },
              maxLength: { value: 11, message: "Max Length for Phone is 11" },
            })}
          />
          {errors.phone && (
            <div className="text-sm text-red-500">{errors.phone.message}</div>
          )}

          <input
            type="text"
            placeholder="Nic"
            className="border-gray-400 border-2 rounded-2xl p-1 text-gray-800"
            {...register("nic", {
              required: { value: true, message: "This Field Is required" },
              minLength: { value: 13, message: "Minimum length for Nic is 13" },
              maxLength: { value: 13, message: "Max Length for Nic is 13" },
            })}
          />
          {errors.nic && (
            <div className="text-sm text-red-500">{errors.nic.message}</div>
          )}

          <input
            type="email"
            placeholder="email"
            ref={email}
            className="border-gray-400 border-2 rounded-2xl p-1 text-gray-800"
            {...register("email", {
              required: { value: true, message: "This Field Is required" },
            })}
          />
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email.message}</div>
          )}
          <div
            className={`mt-3 border-gray-500 border-2 text-gray-800 px-4 py-1 rounded-full cursor-pointer hover:bg-gray-700 hover:text-white transition-colors duration-500 ${otpbtn}`}
            onClick={handleOTP}
          >
            {otpbtntxt}
          </div>
          <div className={`flex justify-between ${verifybtn}`}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredotp}
              onChange={(e) => setenteredotp(e.target.value)}
              className="border-2 border-gray-400 rounded-2xl p-1"
            />
            <div className="flex items-center gap-1">
              <div
                className="mt-3 border-gray-500 border-2 text-gray-800 px-4 py-1 rounded-full cursor-pointer hover:bg-gray-700 hover:text-white transition-colors text-sm duration-500"
                onClick={checkOTP}
              >
                {verifytxt}
              </div>
            </div>
          </div>
          {verifybtn === "block" && (
            <div className="flex">
            <p
              className="text-blue-600 underline cursor-pointer"
              onClick={handleOTP}
            >
              Resend?
            </p>
            <div></div>
            </div>
          )}
          <div>
            <input
              type={type}
              placeholder="Password"
              className="border-gray-400 border-2 w-full rounded-2xl p-1 text-gray-800"
              {...register("password", {
                required: { value: true, message: "This Field Is required" },
                minLength: {
                  value: 8,
                  message: "Minimum length for Password is 8",
                },
                maxLength: {
                  value: 16,
                  message: "Max Length for Password is 16",
                },
              })}
            />
            <div className="mt-1 text-gray-700 text-sm">
              <input
                type="checkbox"
                id="showpass"
                onChange={showpass}
                className="mr-1"
              />
              <label htmlFor="showpass">Show Password</label>
            </div>
            {errors.password && (
              <div className="text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>

          <button
            disabled={isSubmitting || !verified}
            type="submit"
            className="mt-3 border-gray-500 border-2 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-500"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      <div className="text-red-500 mt-2">{error}</div>
    </div>
  );
};

export default Signup;
