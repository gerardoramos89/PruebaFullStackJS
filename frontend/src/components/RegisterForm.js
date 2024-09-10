import React from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Container, Paper } from '@mui/material';

const RegisterForm = ({ onSubmit, credentials, setCredentials }) => (
  <Container component="main" maxWidth="xs">
    <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Role</InputLabel>
          <Select
            value={credentials.role}
            onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            required
            label="Role"
          >
            <MenuItem value="empleado">Empleado</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Register
        </Button>
      </form>
    </Paper>
  </Container>
);

export default RegisterForm;
