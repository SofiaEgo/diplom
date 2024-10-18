import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [teacherCode, setTeacherCode] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validationErrors = {};
    if (!name) validationErrors.name = "Имя обязательно.";
    if (!email) validationErrors.email = "Email обязателен.";
    if (!password) {
      validationErrors.password = "Пароль обязателен.";
    } else if (password.length < 6) {
      validationErrors.password =
        "Пароль должен содержать не менее 6 символов.";
    }
    if (role === "teacher" && !teacherCode) {
      validationErrors.teacherCode =
        "Код учителя обязателен для регистрации учителя.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (role === "teacher") {
        formData.append("teacherCode", teacherCode);
      }
      if (avatar) formData.append("avatar", avatar);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("authToken", response.data.token);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
      } else if (error.response && error.response.data.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Ошибка сервера. Попробуйте позже." });
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg max-w-sm w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Создать аккаунт
        </h2>
        {errors.server && (
          <p className="text-red-500 text-sm mb-4">{errors.server}</p>
        )}
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="sr-only">
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Выберите роль
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="student">Ученик</option>
              <option value="teacher">Учитель</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>
          {role === "teacher" && (
            <div>
              <label htmlFor="teacherCode" className="sr-only">
                Код учителя
              </label>
              <input
                id="teacherCode"
                name="teacherCode"
                type="text"
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                placeholder="Введите код учителя"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value)}
              />
              {errors.teacherCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teacherCode}
                </p>
              )}
            </div>
          )}

          <div className="text-center">
            <Avatar
              src={avatarPreview}
              sx={{ width: 80, height: 80, margin: "0 auto" }}
            />
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Уже есть аккаунт? Войти
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? "Загрузка..." : "Регистрация"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
