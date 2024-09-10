import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Aplicar la clase del tema al body
    document.body.className = theme + '-theme';
  }, [theme]);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'dark' ? 'Claro' : 'Oscuro'} Tema
      </button>
      <nav>
        <ul>
          <li><Link to="/login">Iniciar sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
