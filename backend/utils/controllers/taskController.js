const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const createTask = async (req, res) => {
  const {
    title,
    description,
    createdDate,
    deadline,
    difficulty,
    externalServiceLink,
  } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      createdDate,
      deadline,
      difficulty,
      externalServiceLink,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка при создании задачи", error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { title, description, deadline, difficulty, externalServiceLink } =
    req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.difficulty = difficulty || task.difficulty;
    task.externalServiceLink = externalServiceLink || task.externalServiceLink;

    await task.save();
    res.json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка при обновлении задачи", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    await task.remove();
    res.json({ message: "Задача удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
