const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const handleClickAddTasks = () => {
  this.setState((prevState) => ({
    tasks: [...prevState.tasks, prevState.value],
    value: "",
  }));
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB подключен");
  } catch (error) {
    console.error(`Ошибка подключения: ${error.message}`);
    process.exit(1);
  }
};

mongoose.set("debug", true);

module.exports = connectDB;
