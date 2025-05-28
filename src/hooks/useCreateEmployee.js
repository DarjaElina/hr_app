import axios from "axios";
import { useState } from "react";
import { useEmployeesContext } from "../hooks/useEmployeeContext";
import { BACKEND_URL } from "../../config";

const useCreateEmployee = () => {
  const { setEmployees } = useEmployeesContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEmployee = async (newEmployee) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/employees`, newEmployee);

      setEmployees(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return [createEmployee, { loading, error }];
};

export default useCreateEmployee;
