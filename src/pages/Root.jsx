import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
// import { useState, useEffect } from "react";
// import axios from "axios";
import useEmployees from "../hooks/useEmployees";

const Root = () => {
  // const [employees, setEmployees] = useState([]);
  const {employees, setEmployees} = useEmployees();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/employees")
  //     .then((res) => setEmployees(res.data))
  //     .catch((err) => {
  //       console.error("Failed to fetch books", err)
  //     });
  // }, []);
  console.log(employees)
  return (
    <>
      <Header />
      <main>
        <Outlet context={{
            employees,
            setEmployees,
          }}/>
      </main>
      <Footer year={2025} />
    </>
  );
};

export default Root;