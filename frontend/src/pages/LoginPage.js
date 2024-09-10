import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import SnackbarAlert from '../components/SnackbarAlert'; // Asegúrate de definir este componente

const LoginPage = () => {
  const { login } = useAuth(); // Obtenemos la función login del contexto
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Llamamos a la función login del contexto con las credenciales
      await login(credentials);
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please check your credentials and try again.');
      setOpenErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
    setError(null);
  };

  return (
    <div>
      <LoginForm 
        onSubmit={handleSubmit} 
        credentials={credentials} 
        setCredentials={setCredentials} 
        loading={loading} 
      />
      <SnackbarAlert
        open={openErrorSnackbar}
        handleClose={handleCloseErrorSnackbar}
        message={error}
        type="error"
      />
    </div>
  );
};

export default LoginPage;
