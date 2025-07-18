import axios from "axios";
import { useState, useCallback } from "react";
import { useEmployeesContext } from "../hooks/useEmployeeContext";
import { BACKEND_URL } from "../../config";

const useUpdateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setEmployees } = useEmployeesContext();

  const updateEmployee = useCallback(async (id, updatedObj) => {
    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.patch(`${BACKEND_URL}/employees/${id}`, updatedObj);

      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, ...data } : emp))
      );

      return data;
    } catch (e) {
      console.error(e);
      setError({ message: "Error updating employee" });
      throw e;
    } finally {
      setLoading(false);
    }
  }, [setEmployees]);

  return [updateEmployee, { loading, error }];
};

export default useUpdateEmployee;
