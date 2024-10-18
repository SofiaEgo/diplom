const FocusTime = require("../models/FocusTime");

const addFocusTime = async (req, res) => {
  const { duration } = req.body;

  try {
    const focusTime = new FocusTime({
      student: req.user._id,
      duration,
      date: new Date().setHours(0, 0, 0, 0),
    });

    const savedFocusTime = await focusTime.save();
    res.status(201).json(savedFocusTime);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при добавлении времени фокуса",
        error: error.message,
      });
  }
};

const getFocusTimesByStudent = async (req, res) => {
  try {
    const focusTimes = await FocusTime.find({ student: req.user._id });
    res.json(focusTimes);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении времени фокуса",
        error: error.message,
      });
  }
};

module.exports = { addFocusTime, getFocusTimesByStudent };
