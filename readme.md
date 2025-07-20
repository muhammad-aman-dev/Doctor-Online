<h1 align="center">🩺 DrOnline – Online Doctor Consultation Platform</h1>

<p align="center">
  A full-stack medical appointment and doctor-patient communication system built with ❤️ using React, Node.js, MongoDB, and JWT authentication.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-%23000000?style=flat-square" />
</p>

---

## 🌟 Project Overview

DrOnline is a secure and dynamic doctor-patient platform where patients can:
- Register, verify via email, and request appointments
- View doctor profiles and request consultations

Doctors can:
- Register with detailed credentials
- Await admin approval to gain access
- Accept/reject consultation requests

Admins can:
- Manage doctor approvals
- Monitor platform activity

All roles have distinct dashboards for a streamlined experience.

---

## 🚀 Live Demo

🌐 Coming soon: [doctoronlinefrontend.vercel.app](doctoronlinefrontend.vercel.app)

---

## 🔐 Authentication Flow

- Email verification via OTP (NodeMailer)
- JWT-based session management
- Protected routes for patients, doctors, and admins
- Middleware-based role checks (isAdmin, isDoctor, isPatient)

---

## ⚙️ Technologies Used

| Category     | Tech Stack                                         |
|--------------|----------------------------------------------------|
| Frontend     | React.js, React Router DOM, Tailwind CSS, Axios   |
| Backend      | Node.js, Express.js                                |
| Database     | MongoDB, Mongoose                                  |
| Auth & Mail  | JWT, Nodemailer, Email OTP                         |
| Dev Tools    | Postman, Git, GitHub                               |
| Deployment   | Vercel (Frontend), Render/Railway (Backend)        |

---

## 🧠 Key Features

✅ Multi-role authentication (Patient / Doctor / Admin)  
✅ Email OTP verification system  
✅ Admin dashboard for doctor approval/rejection  
✅ Doctors can manage requests from patients  
✅ Patients can browse doctors and request consultations  
✅ JWT-secured APIs and protected routes  
✅ Full form validation with react-hook-form  
✅ Clean UI with responsive design  

---

## 📁 Folder Structure

```bash
Doctor-Online/
├── client/              # Frontend (React)
│   ├── components/      # Reusable UI components
│   ├── pages/           # All routes/pages
│   └── ...
├── server/              # Backend (Node + Express)
│   ├── controllers/     # Logic for routes
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & role-based middleware
│   └── ...
├── .gitignore
├── README.md
