const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger'); 
const { errorHandler } = require('./middleware/errorMiddleware'); 
const studentRoutes = require('./routes/studentRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const solutionRoutes = require('./routes/solutionRoutes');
const chatRoutes = require('./routes/chatRoutes'); 
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use(express.json());
app.use(logger);

app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', taskRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/chat', chatRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
