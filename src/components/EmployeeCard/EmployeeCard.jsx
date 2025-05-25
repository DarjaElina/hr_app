import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import './employeeCard.css';
import { useState } from "react";
import { useOutletContext } from "react-router";
import useUpdateEmployee from "../../hooks/useUpdateEmployee";


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
  const {setEmployees} = useOutletContext();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEmployee, setUpdatedEmployee] = useState({
      salary,
      location,
      department,
    });
    const [skillsInput, setSkillsInput] = useState(skills.join(', '));
    const [userMessage, setUserMessage] = useState(null);
    const [updateEmployee, {loading, error}] = useUpdateEmployee();

    const calculateWorkingTime = (startDate) => {
      return {
        years: new Date().getFullYear() - new Date(startDate).getFullYear(),
        months:  Math.max(
          (new Date().getFullYear() - new Date(startDate).getFullYear()) * 12 +
          new Date().getMonth() -
          new Date(startDate).getMonth(),
          0
        )
      }
    }
    const isMilestoneYear = calculateWorkingTime(startDate).years !== 0 && calculateWorkingTime(startDate).years % 5 === 0;
    const isProbation = calculateWorkingTime(startDate).months <= 6;
    const parseSkills = (skillsString) =>
      Array.from(new Set(skillsString.split(',').map(s => s.trim()).filter(Boolean)));

   

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'skills') {
        setSkillsInput(value);
      } else {
        setUpdatedEmployee((prev) => ({ ...prev, [name]: value }));
      }
    };


    const handleUpdate = async () => {
      try {
        const data = await updateEmployee(id, {...updatedEmployee, skills: parseSkills(skillsInput)})
        setEmployees((prev) => 
                prev.map((e) => e.id === id ? data : e)
        );
        setUserMessage({
          type: "success",
          message: "Employee updated successfully"
        })
        setTimeout(() => {
          setUserMessage(null)
        }, 4000)
        setIsEditing(false);
      } catch (e) {
        setUserMessage({
          type: "error",
          message: "Failed to update employee"
        })
        setTimeout(() => {
          setUserMessage(null)
        }, 4000)
        console.error("Failed to update employee: ", e);
      }
    }

    const handleCancel = () => {
      setUpdatedEmployee({
        salary,
        location,
        department,
      });
      setSkillsInput(skills.join(', '));
      setIsEditing(false);
    }

    return (
      <div className="person-card">
        {userMessage && <p className={userMessage.type === "error" ? "user-message error" : "user-message"}>{userMessage.message}</p>}
        <h3>{name}</h3>
        <p><strong>{title}</strong></p>
        <p><FaPhone/> {phone}</p>
        <p><IoIosMail/> {email}</p>
        {
          isEditing ?
          <div className="edit-form">
            <label htmlFor="">Salary:</label>
            <input onChange={handleChange} type="text" name="salary" placeholder="Salary" value={updatedEmployee.salary} required/>
            <label htmlFor="">Location:</label>
            <input onChange={handleChange} type="text" name="location" placeholder="Location" value={updatedEmployee.location} required/>
            <label htmlFor="">Department:</label>
            <input onChange={handleChange} type="text" name="department" placeholder="Department" value={updatedEmployee.department} required/>
            <label htmlFor="">Skills:</label>
            <input onChange={handleChange} type="text" name="skills" placeholder="Skills" value={skillsInput}/>
            <div className="edit-btns">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div> :
          
            <>
              <p><FaDollarSign /> <strong>Salary:</strong> €{salary}</p>
              <p><strong>Location:</strong> {location}</p>
              <p><strong>Department:</strong> {department}</p>
              <p><strong>Skills:</strong></p>
                <ul>
                  {skills.length > 0 ? (
                    skills.map(s => <li key={s}><p>{s}</p></li>)
                  ) : (
                    <li><em>No skills listed</em></li>
                  )}
                </ul>
            </>
          
        }
        <p><strong>Favorite animal:</strong> {animal}</p>
       {isMilestoneYear && <p> 🎉 Schedule recognition meeting.</p>}
       {isProbation && <p>  🔔 Schedule probation review.</p>}
       {!isEditing && <button onClick={() => setIsEditing(true)} >Edit</button>}
      </div>
    );
  };
  
  export default EmployeeCard;