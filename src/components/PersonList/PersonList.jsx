import PersonCard from "../PersonCard/PersonCard"
import { useOutletContext } from "react-router";

const PersonList = () => {
  const {persons} = useOutletContext();
  return (
   <ul>
    {persons.map(p => (
        <PersonCard
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
        />
      ))}
   </ul>
  )
}

export default PersonList;