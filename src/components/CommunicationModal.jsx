import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CommunicationModal = ({ open, onClose, onSubmit, company }) => {
  const [type, setType] = useState('');
  const [date, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    const communicationData = {
      company,
      type,
      date,
      notes
    };
    onSubmit(communicationData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: '#4caf50', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Log Communication</DialogTitle>
      <DialogContent sx={{ backgroundColor: '#f4f4f4' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: '#2196f3' }}>Communication Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Communication Type"
            sx={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196f3',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196f3',
              }
            }}
          >
            <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
            <MenuItem value="LinkedIn Message">LinkedIn Message</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone Call">Phone Call</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setCommunicationDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
            }
          }}
        />

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
            }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#4caf50', padding: '10px' }}>
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            backgroundColor: '#f44336',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#e53935',
            },
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '5px',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          sx={{
            backgroundColor: '#2196f3',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '5px',
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommunicationModal;
