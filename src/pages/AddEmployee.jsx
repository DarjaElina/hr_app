import AddEmployeeForm from "../components/AddEmployeeForm/AddEmployeeForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AddEmployee = ({onAddEmployee}) => {
  return (
    <>
    <Header/>
    <AddEmployeeForm onAddEmployee={onAddEmployee}/>
    <Footer/>
    </>
  )
}

export default AddEmployee;