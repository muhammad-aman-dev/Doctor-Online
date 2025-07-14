import React, { useEffect } from "react";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import Doctor from "../assets/Doctor.webp";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = 'Doctor Online';
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-7 px-10 gap-4 bg-white py-8 rounded-xl shadow-md">
        <div className="flex items-center flex-col gap-3">
          <h1 className="text-2xl text-black font-bold">
            Your Health, One Click Away
          </h1>
          <p className="text-gray-800">
            At DoctorOnline, we believe scheduling healthcare should be as
            simple as it is important. Our platform is designed to help you find
            the right doctor for your needs — whether it’s a general physician,
            specialist, or a diagnostic clinic — and book an appointment in just
            a few clicks. No more long phone calls, confusing websites, or
            walking into clinics only to find no slots available. With
            DoctorOnline, you can browse verified medical professionals, check
            real-time availability, and book visits at your convenience — all
            from the comfort of your home. Whether you're managing a chronic
            condition, planning a routine check-up, or seeking a new
            consultation, DoctorOnline makes access to in-person care faster,
            easier, and more reliable. Register Yourself Now&nbsp;&nbsp;
            <Link to={'/signup'} className="underline text-blue-700">click here</Link>
          </p>
        </div>
        <div className="flex relative">
          <div className="absolute w-full h-[200px] sm:h-[280px] px-6 bg-blue-100 rounded-[200%] "></div>
          <img
            src={Doctor}
            className="w-70 animate-updown relative left-[5%] sm:left-[20%]"
            alt="Doctor Avatar"
          />
          <style>
            {`
              @keyframes updown {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }

              .animate-updown {
                animation: updown 2s ease-in-out infinite;
              }
            `}
          </style>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-7 px-10 gap-4 bg-white py-8 rounded-xl shadow-md">
        <div className="flex items-center flex-col gap-3">
          <h1 className="text-2xl text-black font-bold">
            Why Choose DoctorOnline?
          </h1>
          <ul className="text-gray-800 list-disc">
            <li>✅ Certified Professionals: Verified and experienced doctors in every specialty.</li>
            <li>🕒 24/7 Access: Book appointments at your convenience.</li>
            <li>🔒 Secure & Private: End-to-end encrypted consultations.</li>
          </ul>
        </div>
        <div className="flex items-center flex-col gap-3">
          <h1 className="text-2xl text-black font-bold">How It Works</h1>
          <ul className="text-gray-800 list-disc">
            <li>Register Yourself Or LogIn</li>
            <li>Search For Doctor in your City</li>
            <li>Type Your Message and Request for appointment</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-7 px-10 gap-4 bg-white py-8 rounded-xl shadow-md">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl text-black font-bold mt-8 text-center">
            Register As a Doctor
          </h1>
          <ul className="list-disc text-gray-800">
            <li>Enter Your Details</li>
            <li>Wait for approval</li>
            <li>Check Your Mail Regularly</li>
          </ul>
        </div>
        <div className="links">
          <Link to={'/registerdoctor'}>
            <button className="cursor-pointer hover:scale-105 duration-300 bg-black flex p-5 rounded-4xl text-white mt-[15%] ml-[25%]">
              Register Now
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
