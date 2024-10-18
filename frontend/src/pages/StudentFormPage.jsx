import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentFormPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    status: "active",
    achievements: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/students/${id}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Ошибка загрузки студента:", error);
        }
      };
      fetchStudent();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/students/${id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/students", formData);
      }
      navigate("/students");
    } catch (error) {
      console.error("Ошибка при сохранении студента:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-12">
        {id ? "Редактировать студента" : "Создать студента"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-white">Имя:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Аватар (URL):</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
            className="w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Статус:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 rounded"
          >
            <option value="active">Активен</option>
            <option value="completed">Завершил курс</option>
            <option value="inactive">Неактивен</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 rounded text-white"
        >
          {id ? "Обновить" : "Создать"}
        </button>
      </form>
    </div>
  );
};

export default StudentFormPage;
