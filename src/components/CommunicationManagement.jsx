import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });
  const [editId, setEditId] = useState(null);

  const fetchMethods = async () => {
    try {
      const response = await axios.get(
        "https://entnt-backend-d111.onrender.com/api/communications"
      );
      setMethods(response.data);
    } catch (error) {
      console.error("Failed to fetch communication methods", error);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `https://entnt-backend-d111.onrender.com/api/communications/${editId}`,
          form
        );
        setEditId(null);
      } else {
        await axios.post(
          `https://entnt-backend-d111.onrender.com/api/communications`,
          form
        );
      }
      setForm({ name: "", description: "", sequence: "", mandatory: false });
      fetchMethods();
    } catch (error) {
      console.error("Failed to save communication method", error);
    }
  };

  const handleEdit = (method) => {
    setForm(method);
    setEditId(method._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://entnt-backend-d111.onrender.com/api/communications/${id}`
      );
      fetchMethods();
    } catch (error) {
      console.error("Failed to delete communication method", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f0f4f8", borderRadius: "8px" }}>
      <hr
        style={{
          border: "0.5px solid #ddd",
          height: "2px",
          background: "#2196f3",
          margin: "10px 0",
        }}
      />

      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          marginBottom: "30px",
          fontSize: "2rem",
        }}
      >
        Communication Method Management
      </Typography>

      <Paper sx={{ padding: 3, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              fullWidth
              sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Sequence"
              name="sequence"
              value={form.sequence}
              onChange={handleInputChange}
              fullWidth
              sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                name="mandatory"
                checked={form.mandatory}
                onChange={handleInputChange}
                sx={{
                  color: "#3f51b5",
                  "&.Mui-checked": {
                    color: "#2196f3",
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "#333" }}>
                Mandatory
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#2196f3",
                "&:hover": { backgroundColor: "#1976d2" },
              }}
            >
              {editId ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2196f3", color: "#fff" }}>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Mandatory</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {methods.map((method) => (
              <TableRow key={method._id}>
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.description}</TableCell>
                <TableCell>{method.sequence}</TableCell>
                <TableCell>{method.mandatory ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(method)}
                      sx={{
                        backgroundColor: "#4caf50",
                        "&:hover": { backgroundColor: "#388e3c" },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      sx={{
                        backgroundColor: "#f44336",
                        "&:hover": { backgroundColor: "#e53935" },
                      }}
                      onClick={() => handleDelete(method._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <hr
        style={{
          border: "0.5px solid #ddd",
          height: "2px",
          background: "#2196f3",
          margin: "20px 0",
        }}
      />
    </Box>
  );
};

export default CommunicationMethodManagement;
