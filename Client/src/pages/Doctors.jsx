import React, { useState, useEffect } from 'react';
import Navbar from '../componenets/Navbar';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setdoctors] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [filter, setfilter] = useState('');

  const getDoctors = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/auth/getDoctors`);
      setdoctors(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlefilter = (e) => {
    setfilter(e.target.value);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  if (Loading) {
    return (
      <>
        <Navbar />
        <div className="text-white text-xl mt-3 text-center">Loading....</div>
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="h-3 bg-gradient-to-b from-white to-[#0F172A]" />
    <div className="min-h-screen font-sans text-gray-100 bg-[#0F172A] pt-6">
      <div className="mt-4 flex justify-center">
        <select
          name="filter"
          defaultValue=""
          onChange={handlefilter}
          className="p-2 rounded-md border-1 bg-white text-black font-semibold"
        >
          <option value="" >Filter by City</option>
          {[
            "Multan", "Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta", "Faisalabad", "Rawalpindi",
            "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Sukkur", "Abbottabad",
            "Mardan", "Rahim Yar Khan", "Larkana", "Sheikhupura", "Mirpur", "Okara", "Dera Ghazi Khan"
          ].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="doctors flex flex-col items-center gap-4 mt-9 px-4 pb-10">
        {doctors
          .filter(doc => filter === '' || doc.city === filter)
          .map(doctor => (
            <div
              key={doctor._id}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] text-white w-full md:w-[80%] p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row gap-6"
            >
              <div className="flex flex-col items-center md:w-[150px]">
                <img
                  src={doctor.dpURL}
                  alt="Doctor DP"
                  className="w-[100px] h-[100px] object-cover rounded-full border-2 border-white"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between font-semibold">
                  <p>Name: {doctor.fullname}</p>
                  <p>Degree: {doctor.degree}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>Experience: {doctor.Experience} Years</p>
                  <p>City: {doctor.city}</p>
                </div>
                <div className="mt-2">
                  <h5 className="font-bold">Clinic Address</h5>
                  <p className="bg-slate-800 rounded-lg p-3 mt-1 text-sm text-gray-200">{doctor.clinicaddress}</p>
                </div>
                <div className="mt-2">
                  <h5 className="font-bold">Bio</h5>
                  <p className="bg-slate-800 rounded-lg p-3 max-h-[100px] overflow-y-auto">{doctor.bio}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Doctors;
