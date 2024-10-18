import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

const getRandomAvatarUrl = () => {
  const gender = Math.random() > 0.5 ? "men" : "women";
  const id = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const StyledCard = styled(Card)({
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  },
});

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Ошибка загрузки студентов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    navigate("/students/new");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          Список студентов
        </Typography>
        {user?.role === "teacher" && (
          <Tooltip title="Добавить студента">
            <IconButton color="primary" onClick={handleAddStudent}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student._id}>
              <StyledCard onClick={() => navigate(`/students/${student._id}`)}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    alt={student.name}
                    src={student.avatar || getRandomAvatarUrl()}
                    sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                    onError={(e) => (e.target.src = getRandomAvatarUrl())}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {student.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {student.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Статус: {student.status}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default StudentListPage;
