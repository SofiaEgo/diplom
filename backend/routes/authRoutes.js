const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("avatar"), registerUser);

router.post("/login", loginUser);

router.get("/me", getUserProfile);

module.exports = router;
