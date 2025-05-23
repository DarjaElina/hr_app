import { useState } from "react";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router";
import './AddEmployeeForm.css';
import axios from "axios";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    salary: "",
    phone: "",
    email: "",
    animal: "",
    startDate: "",
    location: "",
    department: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { onAddEmployee } = useOutletContext();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.salary || isNaN(formData.salary)) newErrors.salary = "Valid salary is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email format is invalid.";
    }
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.department.trim()) newErrors.department = "Department is required.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const newEmployee = { ...formData, price: parseFloat(formData.salary) };
    axios
      .post("http://localhost:3001/employees", newEmployee)
      .then((res) => {
        onAddEmployee(res.data);
        navigate("/");
        setFormData({
          name: "",
          title: "",
          salary: "",
          phone: "",
          email: "",
          animal: "",
          startDate: "",
          location: "",
          department: "",
          skills: "",
        });
      })
      .catch((err) => {
        console.error("Failed to add book:", err);
      });
  };

  const renderInput = (name, type = "text", placeholder) => (
    <div className="form-group">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={errors[name] ? "input-error" : ""}
      />
      {errors[name] && <div className="error-message">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        {renderInput("name", "text", "Name")}
        {renderInput("title", "text", "Title")}
        {renderInput("salary", "number", "Salary")}
        {renderInput("phone", "tel", "Phone")}
        {renderInput("email", "email", "Email")}
        {renderInput("animal", "text", "Animal")}
        {renderInput("startDate", "date", "Start Date")}
        {renderInput("location", "text", "Location")}
        {renderInput("department", "text", "Department")}
        {renderInput("skills", "text", "Skills")}
        <button type="submit" className="submit-button">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
