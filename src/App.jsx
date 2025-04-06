import Header from './components/Header'
import Footer from './components/Footer'
import Person from './components/Person'
import './App.css'

function App() {

  return (
    <>
    <Header/>
    <Person name="Anna Smith"
      title="Backend developer"
      salary={3000}
      phone="401234567"
      email="anna.smith@example.com" 
      animal="Cat"/>
    <Person name="John Doe"
      title="Frontend developer"
      salary={3000}
      phone="406548724"
      email="john.doe@example.com" 
      animal="Dog"/>
    <Person name="Jane Doe"
      title="Designer"
      salary={3000}
      phone="408763456"
      email="jane.doe@example.com" 
      animal="Cow"/>
    <Person name="Jaakko Kuusinen"
      title="Team Lead"
      salary={8000}
      phone="509852386"
      email="jaakko.kuusinen@example.com" 
      animal="Bear"/>
    <Footer/>
    </>
  )
}

export default App
