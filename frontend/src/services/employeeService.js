import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Asegúrate de que esta URL es correcta

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error); // Para debugging
    throw new Error('Failed to fetch employees');
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error); // Para debugging
    throw new Error('Failed to create employee');
  }
};