import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegurarse de que usas React Router
import { authenticateUser } from '../services/authService'; // Asegúrate de que la ruta sea correcta

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const userData = await authenticateUser(credentials);
      if (userData) {
        // Actualizamos el estado si el login fue exitoso
        setAuthState({ isAuthenticated: true, user: userData });

        // Redirigimos solo si el login es exitoso
        navigate('/employees'); // Aquí rediriges a la página de empleados
      } else {
        throw new Error('No user data returned');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Lanza el error para manejarlo en el componente LoginPage
    }
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
