import { useState, useEffect } from "react";
import axios from "axios";

const useEmployees = () => {
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/employees")
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error getting the data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return {
      employees: employees && employees.length > 0 ? employees : [],
      setEmployees,
      loading,
      error
    };
};

export default useEmployees;