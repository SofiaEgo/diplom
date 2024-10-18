const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res
          .status(404)
          .json({ message: "Не авторизован, пользователь не найден" });
      }
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res
          .status(401)
          .json({ message: "Не авторизован, срок действия токена истек" });
      } else if (error.name === "JsonWebTokenError") {
        res
          .status(401)
          .json({ message: "Не авторизован, ошибка подписи токена" });
      } else if (error.name === "NotBeforeError") {
        res
          .status(401)
          .json({ message: "Не авторизован, токен еще не действителен" });
      } else {
        res.status(401).json({ message: "Не авторизован, ошибка токена" });
      }
    }
  }
  if (!token) {
    res.status(401).json({ message: "Не авторизован, токен отсутствует" });
  }
};

module.exports = { protect };
