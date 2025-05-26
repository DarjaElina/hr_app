import { useState } from "react";
import { FaPhone, FaDollarSign, FaEdit } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdLocationOn, MdWork, MdOutlinePets } from "react-icons/md";
import useUpdateEmployee from "../../hooks/useUpdateEmployee";
import styles from './EmployeeCard.module.css';
import toast from "react-hot-toast";

const EmployeeCard = ({
  name,
  title,
  salary,
  phone,
  email,
  animal,
  startDate,
  location,
  department,
  skills,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    salary,
    location,
    department,
  });
  const [skillsInput, setSkillsInput] = useState(skills.join(", "));
  const [updateEmployee, { loading }] = useUpdateEmployee();

  const calculateWorkingTime = (startDate) => {
    return {
      years: new Date().getFullYear() - new Date(startDate).getFullYear(),
      months:
        Math.max(
          (new Date().getFullYear() - new Date(startDate).getFullYear()) * 12 +
            new Date().getMonth() -
            new Date(startDate).getMonth(),
          0
        )
    };
  };

  const isMilestoneYear =
    calculateWorkingTime(startDate).years !== 0 &&
    calculateWorkingTime(startDate).years % 5 === 0;
  const isProbation = calculateWorkingTime(startDate).months <= 6;

  const parseSkills = (skillsString) =>
    Array.from(new Set(skillsString.split(",").map((s) => s.trim()).filter(Boolean)));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setSkillsInput(value);
    } else {
      setUpdatedEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee(id, {
        ...updatedEmployee,
        skills: parseSkills(skillsInput),
      });
      toast.success("Employee updated successfully");
      setIsEditing(false);
    } catch (e) {
      toast.error("Failed to update employee");
      console.error("Failed to update employee: ", e);
    }
    
  };

  const handleCancel = () => {
    setUpdatedEmployee({ salary, location, department });
    setSkillsInput(skills.join(", "));
    setIsEditing(false);
  };

  const hasChanges = () => {
    const simpleFieldsUnchanged =
      updatedEmployee.salary === salary &&
      updatedEmployee.location === location &&
      updatedEmployee.department === department;
  
    const originalSkillsSet = new Set(skills.map((s) => s.trim()));
    const updatedSkillsSet = new Set(parseSkills(skillsInput));
  
    const skillsUnchanged =
      originalSkillsSet.size === updatedSkillsSet.size &&
      [...originalSkillsSet].every((skill) => updatedSkillsSet.has(skill));
  
    return !(simpleFieldsUnchanged && skillsUnchanged);
  };

  return (
    <div className={styles.card}>

      <div className={styles.profile}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.title}>{title}</p>
        </div>
      </div>

      <div className={styles.details}>
  {isExpanded && !isEditing && <p className={styles.detailsSubtitle}>Employee Details</p>}
  <p className={styles.detailsItem}>
    <FaPhone className="text-blue-500" /> {phone}
  </p>
  <p className={styles.detailsItem}>
    <IoMail className="text-blue-500" /> {email}
  </p>

  {isExpanded && !isEditing && (
    <>
      <p className={styles.detailsItem}>
        <FaDollarSign /> Salary: €{salary}
      </p>
      <p className={styles.detailsItem}>
        <MdLocationOn /> Location: {location}
      </p>
      <p className={styles.detailsItem}>
        <MdWork /> Department: {department}
      </p>
      <p className={styles.detailsItem}>
        <MdOutlinePets /> Favorite animal: {animal}
      </p>
        <strong>Skills:</strong>{' '}
        {skills.length ? (
          <ul className={styles.skillList}>
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : (
          <em>No skills listed</em>
        )}
      {isMilestoneYear && <p style={{ marginTop: '0.75rem' }}>🎉 Schedule recognition meeting.</p>}
      {isProbation && <p style={{ marginTop: '0.75rem' }}>🔔 Schedule probation review.</p>}
    </>
  )}

        {isEditing && (
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Salary:
              <input
                className={styles.input}
                onChange={handleChange}
                type="text"
                name="salary"
                value={updatedEmployee.salary}
                required
              />
            </label>
            <label className={styles.label}>
              Location:
              <input
                className={styles.input}
                onChange={handleChange}
                type="text"
                name="location"
                value={updatedEmployee.location}
                required
              />
            </label>
            <label className={styles.label}>
              Department:
              <input
                className={styles.input}
                onChange={handleChange}
                type="text"
                name="department"
                value={updatedEmployee.department}
                required
              />
            </label>
            <label className={styles.label}>
              Skills:
              <input
                className={styles.input}
                onChange={handleChange}
                type="text"
                name="skills"
                value={skillsInput}
              />
            </label>
            <div className={styles.buttonRow}>
              <button disabled={loading || !hasChanges()} onClick={handleUpdate} className={styles.saveButton}>
                Save
              </button>
              <button onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className={styles.footer}>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className={styles.toggleBtn}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editBtn}
          >
            <FaEdit /> Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
