// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Importa tu AuthProvider
import { ThemeProviderComponent } from './contexts/ThemeContext'; // Importa tu ThemeProvider

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <Router>
      <AuthProvider>
        <ThemeProviderComponent>
          <App />
        </ThemeProviderComponent>
      </AuthProvider>
    </Router>
  </QueryClientProvider>
);
