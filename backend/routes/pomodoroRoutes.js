const express = require("express");
const {
  createSession,
  getSessionsByStudent,
} = require("../controllers/pomodoroController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createSession);
router.get("/:studentId", protect, getSessionsByStudent);

module.exports = router;
