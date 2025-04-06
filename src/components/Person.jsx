import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoPaw } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";

const Person = ({ name, title, salary, phone, email, animal }) => {
    return (
      <div className="person-card">
        <h3>{name}</h3>
        <p><strong>{title}</strong></p>
        <p><FaDollarSign /> Salary: €{salary}</p>
        <p><FaPhone/> {phone}</p>
        <p><IoIosMail/> {email}</p>
        <p><IoPaw/> Favorite animal: {animal}</p>
      </div>
    );
  };
  
  export default Person;