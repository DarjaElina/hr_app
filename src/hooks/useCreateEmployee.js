import axios from "axios";
import { useState } from "react";

const useCreateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const createEmployee = async (newEmployee) => {
    try {
      setLoading(true);
      const {data} = await axios.post("http://localhost:3001/employees", newEmployee)
      return data;
    } catch (e) {
      console.error(e);
      setError({message: "Error creating employee"})
    } finally {
      setLoading(false);
    }
    return null;
  }
  return [createEmployee, {loading, error}]
}

export default useCreateEmployee;