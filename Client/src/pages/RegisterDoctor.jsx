import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";

const RegisterDoctor = () => {
  const [type, settype] = useState("password");
  const [error, seterror] = useState("");

  useEffect(() => {
    document.title = 'Doctor Registration';
  }, []);

  function showpass() {
    settype(prev => (prev === "password" ? "text" : "password"));
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let newdata = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      nic: data.nic,
      gender: data.gender,
      dob: data.dob,
      phone: data.phone,
      clinicaddress: data.clinicAddress,
      degree: data.degree,
      city: data.city,
      Experience: data.experience,
      bio: data.bio,
    };
    try {
      let send = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/doctorrequest`,
        newdata
      );
      toast(send.data);
      console.log(send.data);
      reset();
    } catch (err) {
      const error = err.response?.data || "Something went wrong!";
      seterror(error);
      console.log(error);
     toast(err)
    }
  };

  return (
    <div className="flex flex-col items-center mt-[25%] mb-5 sm:mt-[10%] p-3 border-2 border-gray-700 sm:w-3/5 w-[80%] ml-[10%] sm:ml-[20%] rounded-3xl backdrop-blur-3xl bg-white/10 shadow-2xl shadow-gray-700">
      <h1 className="text-2xl text-gray-600 font-bold">Doctor Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          type="email"
          placeholder="Email"
          className="border-gray-600 border-2 mt-4 w-full rounded-2xl p-1 text-gray-600"
          {...register("email", {
            required: "This Field Is required",
          })}
        />
        {errors.email && <div className="text-sm">{errors.email.message}</div>}

        <div className="mt-4">
          <input
            type={type}
            placeholder="Password"
            className="border-gray-600 border-2 w-full rounded-2xl p-1 text-gray-600"
            {...register("password", {
              required: "This Field Is required",
              minLength: { value: 8, message: "Minimum length is 8" },
              maxLength: { value: 16, message: "Max length is 16" },
            })}
          />
          <label className="text-gray-600 font-bold">
            <input type="checkbox" onChange={showpass} /> Show Password
          </label>
          {errors.password && (
            <div className="text-sm">{errors.password.message}</div>
          )}
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="border-gray-600 border-2 mt-4 rounded-2xl p-1 text-gray-600 w-full"
          {...register("fullname", {
            required: "This Field Is Required",
            minLength: { value: 3, message: "Minimum length is 3" },
          })}
        />
        {errors.fullname && (
          <div className="text-sm">{errors.fullname.message}</div>
        )}

        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            placeholder="NIC"
            className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600"
            {...register("nic", {
              required: "This Field Is required",
              minLength: { value: 13, message: "Must be 13 characters" },
              maxLength: { value: 13, message: "Must be 13 characters" },
            })}
          />
          {errors.nic && <div className="text-sm">{errors.nic.message}</div>}

          <div>
            <label htmlFor="gender" className="text-gray-600 font-bold">
              Gender
            </label>
            <select
              id="gender"
              className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600 w-full"
              defaultValue="Male"
              {...register("gender")}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="dob" className="text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600 w-full"
              {...register("dob", { required: "Date of birth is required" })}
            />
            {errors.dob && (
              <div className="text-sm text-red-400">{errors.dob.message}</div>
            )}
          </div>

          <input
            type="text"
            placeholder="Phone"
            className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600"
            {...register("phone", {
              required: "This Field Is required",
              minLength: { value: 11, message: "Must be 11 digits" },
              maxLength: { value: 11, message: "Must be 11 digits" },
            })}
          />
          {errors.phone && <div className="text-sm">{errors.phone.message}</div>}

          <input
            type="text"
            id="clinicAddress"
            placeholder="Clinic Address"
            className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600 w-full"
            {...register("clinicAddress", {
              required: "Clinic address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters",
              },
            })}
          />
          {errors.clinicAddress && (
            <div className="text-sm text-red-400">
              {errors.clinicAddress.message}
            </div>
          )}

          <input
            type="text"
            id="degree"
            placeholder="e.g. MBBS, MD"
            className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600 w-full"
            {...register("degree", {
              required: "Degree is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
          {errors.degree && (
            <div className="text-sm text-red-400">{errors.degree.message}</div>
          )}

          <div>
            <label htmlFor="city" className="text-gray-600 font-bold">
              City
            </label>
            <select
              id="city"
              defaultValue="Multan"
              className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600 w-full"
              {...register("city", { required: "City is required" })}
            >
              <option value="Multan">Multan</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Sargodha">Sargodha</option>
              <option value="Sukkur">Sukkur</option>
              <option value="Abbottabad">Abbottabad</option>
              <option value="Mardan">Mardan</option>
              <option value="Rahim Yar Khan">Rahim Yar Khan</option>
              <option value="Larkana">Larkana</option>
              <option value="Sheikhupura">Sheikhupura</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Okara">Okara</option>
              <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
            </select>
          </div>

          <input
            type="number"
            id="experience"
            placeholder="e.g. 5"
            min={0}
            max={50}
            className="border-gray-600 border-2 rounded-2xl p-1 text-gray-600 w-full"
            {...register("experience", {
              required: "Experience is required",
              min: { value: 0, message: "Cannot be less than 0" },
              max: { value: 50, message: "Cannot be more than 50" },
            })}
          />
          {errors.experience && (
            <div className="text-sm text-red-400">
              {errors.experience.message}
            </div>
          )}

          <textarea
            id="bio"
            placeholder="Write a short professional bio..."
            rows={4}
            className="border-gray-600 border-2 rounded-2xl p-2 text-gray-600 w-full resize-none"
            {...register("bio", {
              required: "Bio is required",
              minLength: { value: 20, message: "Minimum 20 characters" },
              maxLength: { value: 1000, message: "Max 1000 characters" },
            })}
          ></textarea>
          {errors.bio && (
            <div className="text-sm text-red-400">{errors.bio.message}</div>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="border-gray-600 border-2 rounded-b-full hover:text-white hover:bg-gray-600 transition-colors duration-500"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      <div className="text-red-400">{error}</div>
    </div>
  );
};

export default RegisterDoctor;
