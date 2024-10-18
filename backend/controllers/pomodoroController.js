const PomodoroSession = require("../models/PomodoroSession");

exports.createSession = async (req, res) => {
  try {
    const { timeSpent, type } = req.body;
    const session = new PomodoroSession({
      student: req.user._id,
      timeSpent,
      type,
    });
    await session.save();
    res.status(201).json({ message: "Pomodoro session recorded", session });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

exports.getSessionsByStudent = async (req, res) => {
  try {
    const sessions = await PomodoroSession.find({
      student: req.params.studentId,
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
