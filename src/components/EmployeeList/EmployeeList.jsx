import EmployeeCard from "../EmployeeCard/EmployeeCard"
import { useOutletContext } from "react-router";

const EmployeeList = () => {
  const {employees} = useOutletContext();
  return (
   <ul>
    {employees.map(p => (
        <EmployeeCard
          key={p.id}
          name={p.name}
          title={p.title}
          salary={p.salary}
          phone={p.phone}
          email={p.email}
          animal={p.animal}
          startDate={p.startDate}
          location={p.location}
          department={p.department}
          skills={p.skills}
          id={p.id}
        />
      ))}
   </ul>
  )
}

export default EmployeeList;