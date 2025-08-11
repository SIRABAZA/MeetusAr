import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";

export default function MainLayout() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
