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

const SolutionListPage = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/solutions");
        setSolutions(response.data);
      } catch (error) {
        console.error("Ошибка загрузки решений:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const handleSolutionClick = (id) => {
    navigate(`/solutions/${id}`);
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
            Список решений
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/solutions/new")}
          >
            Добавить решение
          </Button>
        </Grid>

        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={4}>
            {solutions.map((solution) => (
              <Grid item xs={12} sm={6} key={solution._id}>
                <StyledCard onClick={() => handleSolutionClick(solution._id)}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Решение студента: {solution.student.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Статус проверки: {solution.reviewStatus}
                    </Typography>
                    <SyntaxHighlighter
                      language="javascript"
                      style={materialDark}
                    >
                      {solution.solutionLink.length > 100
                        ? `${solution.solutionLink.substring(0, 100)}...`
                        : solution.solutionLink}
                    </SyntaxHighlighter>
                    <Typography variant="body2" color="textSecondary">
                      {solution.feedback
                        ? `Отзыв: ${solution.feedback}`
                        : "Отзыв отсутствует"}
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

export default SolutionListPage;
