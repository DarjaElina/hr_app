import axios from "axios";
import { useState } from "react";

const useUpdateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateEmployee = async (id, updatedObj) => {
    try {
      setLoading(true);
      const {data} = await axios.patch(`http://localhost:3001/employees/${id}`, updatedObj)
      console.log("data in hook is", data)
      return data;
    } catch (e) {
      console.error(e);
      setError({message: "Error creating employee"})
    } finally {
      setLoading(false);
    }
    return null;
  }
  return [updateEmployee, {loading, error}]
}

export default useUpdateEmployee;