import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const Root = () => {
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => setEmployeesData(res.data))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  const addEmployeeHandler = (newEmployee) => {
    setEmployeesData((prev) => [...prev, newEmployee]);
  };
  return (
    <>
      <Header />
      <main>
        <Outlet context={{
            persons: employeesData,
            onAddEmployee: addEmployeeHandler,
          }}/>
      </main>
      <Footer year={2025} />
    </>
  );
};

export default Root;