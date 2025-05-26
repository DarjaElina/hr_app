import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/AboutUs";
import Persons from "./pages/Employes";
import AddEmployee from "./pages/AddEmployee";
import Root from "./pages/Root";

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      children: [
        {
          index: true,
          element: <Persons />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'add',
          element: <AddEmployee />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
