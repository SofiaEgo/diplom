const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  submissionDate: { type: Date, default: Date.now },
  solutionLink: { type: String, required: true },
  reviewStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  feedback: { type: String },
});

module.exports = mongoose.model("Solution", solutionSchema);
