const mongoose = require("mongoose");

const focusTimeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model("FocusTime", focusTimeSchema);
