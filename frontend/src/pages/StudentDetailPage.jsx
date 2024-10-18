import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  LinearProgress,
  Paper,
  Chip,
  CardHeader,
} from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { styled } from "@mui/system";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const getRandomAvatarUrl = () => {
  const gender = Math.random() > 0.5 ? "men" : "women";
  const id = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const StyledCard = styled(Card)({
  background: "#ffffff",
  color: "#333",
  borderRadius: "16px",
  boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
});

const AchievementCard = styled(Card)({
  marginTop: 20,
  borderRadius: "12px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
});

const StyledTabs = styled(Tabs)({
  marginBottom: "20px",
  borderBottom: "2px solid #eee",
});

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const StudentDetailPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Ошибка загрузки студента:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddAchievement = async () => {
    if (!newAchievement.title || !newAchievement.description) return;
    try {
      setLoading(true);
      const updatedAchievements = [
        ...student.achievements,
        { ...newAchievement, date: new Date() },
      ];
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        ...student,
        achievements: updatedAchievements,
      });
      setStudent((prevStudent) => ({
        ...prevStudent,
        achievements: updatedAchievements,
      }));
      setNewAchievement({ title: "", description: "" });
    } catch (error) {
      console.error("Ошибка при добавлении достижения:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!student) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  const avatarUrl = student.avatar || getRandomAvatarUrl();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: "16px", backgroundColor: "#f0f4f7" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  alt={student.name}
                  src={avatarUrl}
                  sx={{ width: 100, height: 100 }}
                  onError={(e) => (e.target.src = getRandomAvatarUrl())}
                />
              </Grid>
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  {student.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {student.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Статус: {student.status}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{
                    mt: 2,
                    width: "100%",
                    height: 8,
                    borderRadius: 5,
                    bgcolor: "#e0e0e0",
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Прогресс курса: 75%
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <StyledTabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Достижения" />
              <Tab label="Курсы" />
              <Tab label="Активность" />
            </StyledTabs>
          </Grid>

          <TabPanel value={tabValue} index={0}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Достижения
                </Typography>
                <Grid container spacing={2}>
                  {student.achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Fade>
                        <AchievementCard>
                          <CardHeader
                            avatar={<EmojiEventsIcon fontSize="large" />}
                            title={
                              <Typography variant="h6">
                                {achievement.title}
                              </Typography>
                            }
                            subheader={
                              <Typography variant="body2" color="textSecondary">
                                {new Date(
                                  achievement.date
                                ).toLocaleDateString()}
                              </Typography>
                            }
                          />
                          <CardContent>
                            <Typography variant="body1">
                              {achievement.description}
                            </Typography>
                          </CardContent>
                        </AchievementCard>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>

                <div style={{ marginTop: "20px" }}>
                  <Typography variant="h6" gutterBottom>
                    Добавить достижение
                  </Typography>
                  <TextField
                    label="Название"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={newAchievement.title}
                    onChange={(e) =>
                      setNewAchievement({
                        ...newAchievement,
                        title: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Описание"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={3}
                    value={newAchievement.description}
                    onChange={(e) =>
                      setNewAchievement({
                        ...newAchievement,
                        description: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddAchievement}
                    disabled={loading}
                  >
                    {loading ? "Добавление..." : "Добавить достижение"}
                  </Button>
                </div>
              </CardContent>
            </StyledCard>
          </TabPanel>
        </Grid>
      </Paper>
    </Container>
  );
};

export default StudentDetailPage;
