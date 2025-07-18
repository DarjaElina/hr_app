import { useState } from "react";
import useCreateEmployee from "../../hooks/useCreateEmployee";
import styles from "./AddEmployeeForm.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
  const [createEmployee, { loading }] = useCreateEmployee();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const newEmployee = {
        ...formData,
        salary: parseFloat(formData.salary),
        skills: formData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0),
      };
      await createEmployee(newEmployee);
      toast.success("Employee added successfully!");
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
      setTimeout(() => {
        navigate('/');
      }, 400);
    } catch (err) {
      toast.error("Failed to add employee.", err);
    }
  };

  const renderInput = (name, type = "text", labelText) => (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={type !== "date" ? labelText : undefined}
        value={formData[name]}
        onChange={handleChange}
        className={`${styles.input} ${
          errors[name] ? styles.inputError : styles.inputNormal
        }`}
      />
      {errors[name] && (
        <p className={styles.errorMessage}>{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Employee</h1>

      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
