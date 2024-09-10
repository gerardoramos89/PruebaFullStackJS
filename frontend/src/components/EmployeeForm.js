import React from 'react';
import { TextField, Button, Snackbar, Alert, Box } from '@mui/material';
import { createEmployee } from '../services/employeeService'; // Asegúrate de definir esta función en tu servicio

const EmployeeForm = () => {
  const [employee, setEmployee] = React.useState({ name: '', salary: '' });
  const [loading, setLoading] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createEmployee(employee); // Asume que esta función maneja la creación del empleado
      setSnackbarMessage('Employee created successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error creating employee:', error);
      setSnackbarMessage('Error creating employee. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        margin: 'auto',
        padding: 2,
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={employee.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        size="small"
      />
      <TextField
        label="Salary"
        name="salary"
        type="number"
        value={employee.salary}
        onChange={handleChange}
        fullWidth
        margin="normal"
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Adding...' : 'Add Employee'}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeForm;
