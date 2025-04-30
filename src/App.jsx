import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import About from "./pages/About";
import Persons from "./pages/Persons";
import AddEmployee from "./pages/AddEmployee";
import persons from "./data/persons";
import { useState } from "react";
import Root from "./pages/Root";


const App = () => {
  const [personsData, setPersonsData] = useState(persons);

  const addEmployeeHandler = (newPerson) => {
    console.log('new person in app is', newPerson)
    setPersonsData((prev) => [
      ...prev,
      { ...newPerson },
    ]);
  };

  console.log('persons data in app is', personsData)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Persons persons={personsData} />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'add',
          element: <AddEmployee onAddEmployee={addEmployeeHandler} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
