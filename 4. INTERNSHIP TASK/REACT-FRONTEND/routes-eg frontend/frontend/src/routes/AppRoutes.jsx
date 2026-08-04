import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Testonomials from "../pages/Testonomials";
import ErrorPage from "../pages/ErrorPage";
import Unauthorized from "../pages/Unauthorized";
import Protected from "../components/Protected";
import Admin from "../pages/Admin";

const AppRoutes = () => {
   const role = localStorage.getItem("role");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/testonomials" element={<Testonomials />} />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<Protected user={role} allowedroles={["Admin", "Cashier"]} />}>

        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
