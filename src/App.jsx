import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import About from "./pages/About";
import Persons from "./pages/Persons";
import AddEmployee from "./pages/AddEmployee";
import Root from "./pages/Root";


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Persons/>,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'add',
          element: <AddEmployee/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
