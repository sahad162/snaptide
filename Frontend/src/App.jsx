import './App.css'
import Auth from './Pages/Auth'
import { Route,Routes } from 'react-router-dom'

function App() {
  

  return (

    <Routes>
      <Route path='/' element={<Auth/>}/>
    </Routes>
    
 
  )
}

export default App
