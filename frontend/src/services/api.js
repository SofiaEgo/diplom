import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

export const getStudents = () => API.get("/students");

export const createPomodoroSession = (sessionData) =>
  API.post("/pomodoro/create", sessionData);
export const getPomodoroSessions = (studentId) =>
  API.get(`/pomodoro/${studentId}`);
