const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Неверный формат сообщения." });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        timeout: 15000,
      }
    );

    console.log("Полный ответ API:", response.data);

    if (response.data && response.data[0] && response.data[0].generated_text) {
      res.json({ text: response.data[0].generated_text });
    } else {
      res.status(500).json({ error: "Пустой ответ от модели." });
    }
  } catch (error) {
    console.error(
      "Ошибка при взаимодействии с API Hugging Face:",
      error.message
    );
    if (error.response) {
      console.error("Ответ сервера:", error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Ошибка генерации ответа ИИ" });
    }
  }
});

module.exports = router;
