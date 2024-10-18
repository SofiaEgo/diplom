const Solution = require("../models/solution");

const getSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find().populate("student task");
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id).populate(
      "student task"
    );
    if (!solution) {
      return res.status(404).json({ message: "Решение не найдено" });
    }
    res.json(solution);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const createSolution = async (req, res) => {
  const { student, task, solutionLink, reviewStatus, feedback } = req.body;
  try {
    const newSolution = new Solution({
      student,
      task,
      solutionLink,
      reviewStatus,
      feedback,
    });
    await newSolution.save();
    res.status(201).json(newSolution);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка при создании решения", error: error.message });
  }
};

const updateSolution = async (req, res) => {
  const { solutionLink, reviewStatus, feedback } = req.body;
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) {
      return res.status(404).json({ message: "Решение не найдено" });
    }

    solution.solutionLink = solutionLink || solution.solutionLink;
    solution.reviewStatus = reviewStatus || solution.reviewStatus;
    solution.feedback = feedback || solution.feedback;

    await solution.save();
    res.json(solution);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка при обновлении решения", error: error.message });
  }
};

const deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) {
      return res.status(404).json({ message: "Решение не найдено" });
    }

    await solution.remove();
    res.json({ message: "Решение удалено" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

module.exports = {
  getSolutions,
  getSolutionById,
  createSolution,
  updateSolution,
  deleteSolution,
};
