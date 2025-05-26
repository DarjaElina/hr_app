import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useEmployeesContext } from "../../hooks/useEmployeeContext";
import styles from "./EmployeeList.module.css";

const EmployeeList = () => {
  const { employees } = useEmployeesContext();

  return (
    <div className={styles.container}>
      <ul className={styles.gridList}>
        {employees.map((p) => (
          <li key={p.id}>
            <EmployeeCard
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
          </li>
        ))}
      </ul>
    </div>
  )
};

export default EmployeeList;
