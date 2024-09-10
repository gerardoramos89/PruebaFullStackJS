// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { authState } = useAuth();
  const { toggleTheme } = useTheme();

  return (
    <div style={{ padding: '2rem' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gerardo Ramos Vargas: Prueba Tecnica Full Stack
          </Typography>
          <Button color="inherit" onClick={toggleTheme}>Toggle Theme</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/employees" element={authState.isAuthenticated ? <EmployeesPage /> : <LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
