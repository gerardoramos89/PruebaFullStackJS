import React from 'react';
import { Card, Container, Paper, TextField, Button, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Loading from './Loading'; // Asegúrate de importar tu componente de carga

const LoginForm = ({ onSubmit, credentials, setCredentials, loading }) => {

  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(e); // Pasa el evento a la función `onSubmit`
  };

  if (loading) {
    return <Loading />; // Muestra el componente de carga si `loading` es verdadero
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </Paper>
      </Card>
    </Container>
  );
};

export default LoginForm;
