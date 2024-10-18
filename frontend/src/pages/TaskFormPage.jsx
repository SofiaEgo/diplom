import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
} from "@mui/material";

const TaskFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTask = {
        title,
        description,
        status,
      };

      await axios.post("http://localhost:5000/api/tasks", newTask);
      setLoading(false);
      navigate("/tasks");
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: "16px", backgroundColor: "#f9f9f9" }}
      >
        <Typography variant="h4" gutterBottom>
          Добавить задачу
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Название задачи"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Описание"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Статус"
                variant="outlined"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Сохранение..." : "Создать задачу"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskFormPage;
