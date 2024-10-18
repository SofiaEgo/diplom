const mongoose = require("mongoose");
const Student = require("../models/student");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Некорректный формат ID" });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Студент не найден" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const createStudent = async (req, res) => {
  const { name, email, avatar, achievements } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Имя и Email обязательны" });
  }

  try {
    const newStudent = new Student({ name, email, avatar, achievements });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка при создании студента", error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Некорректный формат ID" });
  }

  const { name, email, avatar, status, achievements } = req.body;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Студент не найден" });
    }

    student.name = name || student.name;
    student.email = email || student.email;
    student.avatar = avatar || student.avatar;
    student.status = status || student.status;
    student.achievements = achievements || student.achievements;

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при обновлении студента",
      error: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Некорректный формат ID" });
  }

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Студент не найден" });
    }

    await student.remove();
    res.json({ message: "Студент удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
