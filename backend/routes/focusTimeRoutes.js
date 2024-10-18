const express = require("express");
const {
  addFocusTime,
  getFocusTimesByStudent,
} = require("../controllers/focusTimeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addFocusTime);

router.get("/:studentId", protect, getFocusTimesByStudent);

module.exports = router;
