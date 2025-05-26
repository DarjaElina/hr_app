import { useContext } from "react";
import { EmployeesContext } from "../context/EmployeesContext";

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployeesContext must be used within an EmployeesProvider");
  }
  return context;
};
