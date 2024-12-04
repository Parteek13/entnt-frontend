import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    periodicity: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "https://entnt-backend-d111.onrender.com/api/companies"
      );
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleOpenModal = (company = null) => {
    setCurrentCompany(company);
    setFormValues(
      company
        ? {
            name: company.name,
            location: company.location,
            linkedIn: company.linkedIn,
            emails: company.emails.join(", "),
            phoneNumbers: company.phoneNumbers.join(", "),
            comments: company.comments,
            periodicity: company.periodicity,
          }
        : {
            name: "",
            location: "",
            linkedIn: "",
            emails: "",
            phoneNumbers: "",
            comments: "",
            periodicity: "",
          }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return alert("Please fill all required fields");
    const data = {
      ...formValues,
      emails: formValues.emails.split(",").map((email) => email.trim()),
      phoneNumbers: formValues.phoneNumbers.split(",").map((phone) => phone.trim()),
    };

    try {
      if (currentCompany) {
        await axios.put(
          `https://entnt-backend-d111.onrender.com/api/companies/edit/${currentCompany._id}`,
          data
        );
      } else {
        await axios.post(
          `https://entnt-backend-d111.onrender.com/api/companies/add`,
          data
        );
      }
      fetchCompanies();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(
          `https://entnt-backend-d111.onrender.com/api/companies/delete/${id}`
        );
        fetchCompanies();
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "linkedIn", headerName: "LinkedIn Profile", width: 200 },
    { field: "emails", headerName: "Emails", width: 200 },
    { field: "phoneNumbers", headerName: "Phone Numbers", width: 200 },
    { field: "comments", headerName: "Comments", width: 150 },
    { field: "periodicity", headerName: "Periodicity", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenModal(params.row)}
            startIcon={<Edit />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row._id)}
            startIcon={<Delete />}
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Card sx={{ margin: 3, padding: 2, borderRadius: 2, boxShadow: 3 , width:1400}}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Company Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
          onClick={() => handleOpenModal()}
        >
          Add Company
        </Button>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={companies}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </CardContent>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {currentCompany ? "Edit Company" : "Add Company"}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <form>
            {Object.keys(formValues).map((key) => (
              <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formValues[key]}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors[key]}
                helperText={errors[key]}
                select={key === "periodicity"}
              >
                {key === "periodicity" &&
                  ["Weekly", "Bi-Weekly", "Monthly"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </Card>
  );
};

export default CompanyManagement;
