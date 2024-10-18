const mongoose = require("mongoose");

const pomodoroSessionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: { type: Date, default: Date.now },
  timeSpent: { type: Number, required: true },
  type: { type: String, enum: ["work", "break"], required: true },
});

module.exports = mongoose.model("PomodoroSession", pomodoroSessionSchema);
