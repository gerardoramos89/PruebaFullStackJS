import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getEmployees, createEmployee } from '../services/employeeService';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { Paper, Snackbar, Alert } from '@mui/material';

const EmployeesPage = () => {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Estados para paginación y búsqueda
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  // Estado para indicar que se ha creado un empleado
  const [employeeCreated, setEmployeeCreated] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (token) {
        setLoading(true);
        try {
          const data = await getEmployees(token, page, limit, search);
          setEmployees(data.employees);
          setTotalPages(data.totalPages); // Asumiendo que la respuesta tiene totalPages
        } catch (error) {
          setError('Error fetching employees');
          console.error('Error fetching employees:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [employeeCreated]); // Dependemos del estado employeeCreated para actualizar la lista

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    if (token) {
      setLoading(true);
      try {
        await createEmployee({ name, salary }, token);
        setName('');
        setSalary('');
        setEmployeeCreated(prev => !prev); // Actualiza el estado para activar el useEffect
        setOpenSnackbar(true);
      } catch (error) {
        setError('Error creating employee');
        console.error('Error creating employee:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
        <EmployeeForm
          name={name}
          setName={setName}
          salary={salary}
          setSalary={setSalary}
          onSubmit={handleCreateEmployee}
        />
        <EmployeeList employees={employees} />
      </Paper>

      {error && (
        <Alert severity="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}

      {/* Snackbar para el mensaje de éxito */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Employee added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeesPage;
