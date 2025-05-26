import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useEmployeesContext } from "../../hooks/useEmployeeContext";
import styles from "./EmployeeList.module.css";
import { ClipLoader } from "react-spinners";

const EmployeeList = () => {
  const { employees, loading, error } = useEmployeesContext();

  if (loading) {
    return (
      <div className={styles.centeredMessage}>
        <ClipLoader color="#162456" loading={loading} size={40} />
        <p style={{ marginTop: "1rem" }}>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centeredMessage}>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

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
