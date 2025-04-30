import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import { useState } from "react";
import persons from '../data/persons'

const Root = () => {
  const [personsData, setPersonsData] = useState(persons);

  const addEmployeeHandler = (newPerson) => {
    console.log('new person in app is', newPerson)
    setPersonsData((prev) => [
      ...prev,
      { ...newPerson, id: Date.now(), skills: newPerson.skills.split(",") },
    ]);
  };
  return (
    <>
      <Header />
      <main>
        <Outlet context={{persons: personsData, onAddEmployee: addEmployeeHandler}}/>
      </main>
      <Footer year={2025} />
    </>
  );
};

export default Root;