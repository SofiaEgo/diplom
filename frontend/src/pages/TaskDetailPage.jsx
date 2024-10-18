import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Editor } from "@monaco-editor/react";

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Ошибка загрузки задачи:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmitSolution = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/solutions`, {
        task: id,
        solutionLink: solution,
        reviewStatus: "pending",
      });
      alert("Решение отправлено на проверку!");
    } catch (error) {
      console.error("Ошибка при отправке решения:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: "16px", backgroundColor: "#f0f4f7" }}
      >
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Статус: {task.status}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Описание:
            </Typography>
            <SyntaxHighlighter language="javascript" style={materialDark}>
              {task.description}
            </SyntaxHighlighter>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Введите свое решение:
            </Typography>
            <Editor
              height="400px"
              defaultLanguage="javascript"
              defaultValue="// Начните писать свое решение здесь..."
              theme="vs-dark"
              value={solution}
              onChange={(value) => setSolution(value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleSubmitSolution}
              disabled={submitting}
            >
              {submitting ? "Отправка..." : "Отправить решение"}
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default TaskDetailPage;
