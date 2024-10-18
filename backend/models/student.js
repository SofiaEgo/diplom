const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  joinedDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "completed", "inactive"],
    default: "active",
  },
  achievements: [
    {
      title: { type: String, required: true },
      description: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
