import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, token } = useSelector((state) => state.auth);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(userLogin({ email, password }));
      if (userLogin.fulfilled.match(resultAction)) {
        setError("");
        navigate("/profile");
      } else {
        setError(resultAction.payload || "Ошибка при входе.");
      }
    } catch (err) {
      setError(err.message || "Ошибка при входе. Попробуйте снова.");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg max-w-sm w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Вход в аккаунт
        </h2>
        {error && (
          <p className="text-red-500 text-center">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
        <form className="space-y-4" onSubmit={handleLogin}>
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
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/register"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Нет аккаунта? Регистрация
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
