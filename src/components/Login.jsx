import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/user-dashboard");
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
        bgcolor: "#e1f5fe", // Light blue background
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          padding: 4,
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="600"
          textAlign="center"
          gutterBottom
          sx={{ color: "#00796b" }}
        >
          Login
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <TextField
          label="Email Address"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00796b",
              },
              "&:hover fieldset": {
                borderColor: "#00796b",
              },
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00796b",
              },
              "&:hover fieldset": {
                borderColor: "#00796b",
              },
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 3,
            padding: "14px 0",
            backgroundColor: "#00796b",
            color: "white",
            fontWeight: "600",
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
        >
          Login
        </Button>
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Are you an admin?
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin-login")}
            sx={{
              borderColor: "#d32f2f",
              color: "#d32f2f",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#d32f2f",
                color: "white",
              },
            }}
          >
            Admin Login
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

export default Login;
