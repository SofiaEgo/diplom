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
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SolutionDetailPage = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/solutions/${id}`
        );
        setSolution(response.data);
      } catch (error) {
        console.error("Ошибка загрузки решения:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [id]);

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
              Решение студента: {solution.student.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Статус проверки: {solution.reviewStatus}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Ссылка на решение:
            </Typography>
            <SyntaxHighlighter language="javascript" style={materialDark}>
              {solution.solutionLink}
            </SyntaxHighlighter>
            <Typography variant="h6" gutterBottom>
              Отзыв:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {solution.feedback || "Отзыв отсутствует"}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default SolutionDetailPage;
