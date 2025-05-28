import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/employees/`);
        setEmployees(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees, loading, error }}>
      {children}
    </EmployeesContext.Provider>
  );
};

