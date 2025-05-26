// EmployeesProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("use effect is running")
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("https://hr-app-backend-90il.onrender.com/employees/");
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

