import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import RegisterForm from '../components/RegisterForm';
import SnackbarAlert from '../components/SnackbarAlert'; // Asegúrate de que la ruta sea correcta
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', role: '' }); // Agrega el estado para el rol
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' por defecto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenSnackbar(false); // Cierra el snackbar si está abierto

    try {
      await registerUser(credentials);
      setSnackbarMessage('Register successful!');
      setSnackbarSeverity('success');
      navigate('/employees');
    } catch (error) {
      console.log(error);
      setSnackbarMessage('Error registering user');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true); // Abre el snackbar después de manejar la respuesta
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <RegisterForm onSubmit={handleSubmit} credentials={credentials} setCredentials={setCredentials} />
      </Card>
      <SnackbarAlert 
        open={openSnackbar} 
        onClose={handleCloseSnackbar} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
      />
    </div>
  );
};

export default RegisterPage;
