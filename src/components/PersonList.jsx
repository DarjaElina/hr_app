import employees from "../../data/persons"
import PersonCard from "./PersonCard"

const PersonList = () => {
  return (
      employees.map(e => (
        <PersonCard
        key={e.id}
        name={e.name}
        title={e.title}
        salary={e.salary}
        phone={e.phone}
        email={e.email}
        animal={e.animal}
        startDate={e.startDate}
        location={e.location}
        department={e.department}
        skills={e.skills}
        />
      ))
  )
}

export default PersonList;