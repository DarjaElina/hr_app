import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { EmployeesProvider } from "./context/EmployeesContext.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <EmployeesProvider>
      <App />
    </EmployeesProvider>
);
