import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import ResumeBuilder from "../pages/ResumeBuilder";
import Preview from "../pages/Preview";
import AtsAnalyzer from "../pages/AtsAnalyzer";
import Templates from "../pages/Templates";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="ats-analyzer" element={<AtsAnalyzer />} />
          <Route path="templates" element={<Templates />} />
        </Route>
        <Route path="/view/:resumeId" element={<Preview />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
