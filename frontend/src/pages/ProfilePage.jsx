import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Paper,
  LinearProgress,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const getRandomAvatarUrl = () => {
  const gender = Math.random() > 0.5 ? "men" : "women";
  const id = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
};

const getAvatarUrl = (avatarPath) => {
  const baseUrl = "http://localhost:5000";
  return avatarPath ? `${baseUrl}${avatarPath}` : getRandomAvatarUrl();
};

const StyledCard = styled(Card)({
  background: "#ffffff",
  color: "#333",
  borderRadius: "16px",
  boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
});

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        localStorage.removeItem("authToken");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Пользователь не найден
        </Typography>
      </Container>
    );
  }

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
                  alt={user?.name}
                  src={getAvatarUrl(user?.avatar)}
                  sx={{ width: 100, height: 100 }}
                  onError={(e) => (e.target.src = getRandomAvatarUrl())}
                />
              </Grid>
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  {user?.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user?.email}
                </Typography>
                <Chip
                  label={`Роль: ${user?.role}`}
                  color="primary"
                  sx={{ mt: 1 }}
                />
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
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Достижения" />
              <Tab label="Курсы" />
              <Tab label="Активность" />
            </Tabs>
          </Grid>
          <Box hidden={tabValue !== 0}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Достижения
                </Typography>
                <Grid container spacing={2}>
                  {user?.achievements?.map((achievement, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">
                            <EmojiEventsIcon /> {achievement.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(achievement.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body1">
                            {achievement.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </StyledCard>
          </Box>
          <Box hidden={tabValue !== 1}>
            <Typography variant="h5" gutterBottom>
              Курсы
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Здесь будут отображаться курсы пользователя.
            </Typography>
          </Box>
          <Box hidden={tabValue !== 2}>
            <Typography variant="h5" gutterBottom>
              Активность
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Здесь будет отображена активность пользователя.
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
