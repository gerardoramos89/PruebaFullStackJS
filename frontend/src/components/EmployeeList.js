import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/employeeService';

const EmployeeList = ({ onEmployeeCreated }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      setError('Failed to fetch employees');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [onEmployeeCreated]); // Dependemos de la función para actualizar la lista

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!employees || employees.length === 0) return <p>No employees found.</p>;

  return (
    <div>
      <h1>Employee List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {employees.map((employee) => (
          <div
            key={employee.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '1rem',
              margin: '0.5rem',
              width: 'calc(33.333% - 1rem)', // Tres columnas con espacio
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>
              <strong>Name:</strong> {employee.name}
            </div>
            <div>
              <strong>Salary:</strong> ${employee.salary.toFixed(2)}
            </div>
            <div>
              <strong>Created At:</strong> {new Date(employee.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
