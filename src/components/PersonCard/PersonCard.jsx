import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import './personCard.css';

const PersonCard = (props) => {
    const { name, title, salary, phone, email, animal, startDate, location, department } = props;
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

    return (
      <div className="person-card">
        <h3>{name}</h3>
        <p><strong>{title}</strong></p>
        <p><FaDollarSign /> Salary: €{salary}</p>
        <p><FaPhone/> {phone}</p>
        <p><IoIosMail/> {email}</p>
        <p>Location: {location}</p>
        <p>Department: {department}</p>
        <p>Favorite animal: {animal}</p>
       {isMilestoneYear && <p> 🎉 Schedule recognition meeting.</p>}
       {isProbation && <p>  🔔 Schedule probation review.</p>}
      </div>
    );
  };
  
  export default PersonCard;