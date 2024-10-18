import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const StyledCard = styled(Card)({
  background: "#fff",
  color: "#333",
  borderRadius: "16px",
  boxShadow: "0 3px 15px rgba(0,0,0,0.2)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  cursor: "pointer",
});

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Ошибка загрузки задач:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (id) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: "16px", backgroundColor: "#f0f4f7" }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" gutterBottom>
            Список задач
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/tasks/new")}
          >
            Добавить задачу
          </Button>
        </Grid>

        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={4}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} key={task._id}>
                <StyledCard onClick={() => handleTaskClick(task._id)}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <SyntaxHighlighter
                      language="javascript"
                      style={materialDark}
                    >
                      {task.description.length > 100
                        ? `${task.description.substring(0, 100)}...`
                        : task.description}
                    </SyntaxHighlighter>
                    <Typography variant="body2" color="textSecondary">
                      Статус: {task.status}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default TaskListPage;
