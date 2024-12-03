import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CommunicationModal from "./CommunicationModal";
import CommunicationCalendar from "./CommunicationCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [over, setOver] = useState([]);
  const [today, setToday] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleCommunicationPerformed = () => {
    const selectedIds = rowSelectionModel.map((id) =>
      id.slice(24, id.length)
    );
    const uniqueCompanies = Array.from(new Set(selectedIds)).map((id) => ({
      name: id,
    }));
    setSelectedCompanyId(uniqueCompanies);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogCommunication = (data) => {
    data.company.forEach((el) => {
      setCommunications((prev) => [
        ...prev,
        {
          company: { name: el.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
  };

  const fetchCommsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://entnt-backend-d111.onrender.com/api/communications-user"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching communications:", error);
    }
  };

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://entnt-backend-d111.onrender.com/api/notifications"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const communicationsData = await fetchCommsFromAPI();
      setCommunications(communicationsData);
      const notifications = await fetchNotificationsFromAPI();
      setOver(notifications.filter((item) => item.type === "overdue"));
      setToday(notifications.filter((item) => item.type === "due today"));
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight="bold">{params.row.company.name}</Typography>
      ),
    },
    {
      field: "lastCommunications",
      headerName: "Last Communication",
      width: 300,
      renderCell: (params) => (
        <Typography>
          {`${params.row.type.name} - ${new Date(
            params.row.date
          ).toLocaleDateString()}`}
        </Typography>
      ),
    },
    {
      field: "nextCommunication",
      headerName: "Next Communication",
      width: 300,
      renderCell: (params) => {
        const nextDate = new Date(params.row.date);
        nextDate.setDate(nextDate.getDate() + 5);
        return (
          <Typography>
            {`${params.row.type.name} - ${nextDate.toLocaleDateString()}`}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" fontWeight="600" color="#1976d2">
          User Dashboard
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Notifications Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight="600" color="#1976d2">
              Overdue Communications
            </Typography>
            <Box mt={2}>
              {over.length > 0 ? (
                over.map((item, idx) => (
                  <Typography key={idx}>
                    {idx + 1}. {item.company.name} - {item.message}
                  </Typography>
                ))
              ) : (
                <Typography>No overdue communications</Typography>
              )}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 2,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" fontWeight="600" color="#1976d2">
              Today's Communications
            </Typography>
            <Box mt={2}>
              {today.length > 0 ? (
                today.map((item, idx) => (
                  <Typography key={idx}>
                    {idx + 1}. {item.company.name} - {item.message}
                  </Typography>
                ))
              ) : (
                <Typography>No communications due today</Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Data Grid Section */}
      <Box mt={6}>
        <Typography variant="h6" fontWeight="600" mb={2} color="#1976d2">
          Communication History
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={communications}
            getRowId={(row) => row._id + row.company.name}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
              setSelected(newRowSelectionModel.length > 0);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={!selected}
          sx={{
            marginTop: 3,
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={handleCommunicationPerformed}
        >
          Log Communication
        </Button>
      </Box>

      {/* Calendar Section */}
      <Box mt={6}>
        <CommunicationCalendar communications={communications} />
      </Box>

      {/* Modal */}
      <CommunicationModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleLogCommunication}
        company={selectedCompanyId}
      />
    </Box>
  );
};

export default UserDashboard;
