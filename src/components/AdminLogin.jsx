import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://entnt-backend-d111.onrender.com/api/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error logging in: " + (error.response?.data?.error || "An error occurred"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#e0f7fa", // Soft background color
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          padding: 4,
          borderRadius: 3,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          sx={{ color: "#00796b", marginBottom: 3 }}
        >
          Admin Login
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ marginBottom: 3 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#00796b",
            color: "white",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "12px 0",
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
        >
          Login
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Are you a user?
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#00796b",
              color: "#00796b",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#00796b",
                color: "white",
              },
            }}
          >
            User Login
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="body2" sx={{ color: "#616161" }}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#00796b",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Register now
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
