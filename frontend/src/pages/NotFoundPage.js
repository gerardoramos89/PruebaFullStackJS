import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist. Go back to the 
        <Link to="/"> homepage</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;
