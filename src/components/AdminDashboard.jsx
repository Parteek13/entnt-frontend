import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyManagement from "./CompanyManagement";
import CommunicationMethodManagement from "./CommunicationManagement";
import { Button, Box, Typography, Paper } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        minHeight: "100vh",
        backgroundColor: "#f0f0f5", // Light background color for better contrast
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 1200,
          padding: 5,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logout Button */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 3,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#e53946", // Slightly different red
              "&:hover": { backgroundColor: "#c62828" },
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Dashboard Title */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "600",
            textDecoration: "none",
            marginBottom: 4,
            color: "#3f51b5", // Changed to blue color for contrast
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Admin Dashboard
        </Typography>

        {/* Management Components */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <CompanyManagement />
          <CommunicationMethodManagement />
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
