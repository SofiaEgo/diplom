import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentListPage from "../pages/StudentListPage";
import StudentFormPage from "../pages/StudentFormPage";
import StudentDetailPage from "../pages/StudentDetailPage";
import TaskListPage from "../pages/TaskListPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import TaskFormPage from "../pages/TaskFormPage";
import SolutionListPage from "../pages/SolutionListPage";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/students" element={<StudentListPage />} />
      <Route path="/students/new" element={<StudentFormPage />} />
      <Route path="/students/:id" element={<StudentDetailPage />} />
      <Route path="/students/new/:id" element={<StudentFormPage />} />
      <Route path="/tasks" element={<TaskListPage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} />
      <Route path="/tasks/new" element={<TaskFormPage />} />
      <Route path="/solution" element={<SolutionListPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
