import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://entnt-backend-d111.onrender.com/api/register", formData);
      console.log(response);
      // alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("Error registering user: " + (error.response?.data?.error || "An unexpected error occurred."));
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
          Create an Account
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
            marginBottom: 2,
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
            marginBottom: 3,
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
          onClick={handleRegister}
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
          Register
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Already have an account?
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
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
