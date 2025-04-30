import './App.css'
import Auth from './Pages/Auth';
import Feedpage from './Pages/Feedpage';
import { Route,Routes } from 'react-router-dom'

function App() {
  

  return (

    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/feeds' element={<Feedpage/>}/>
    </Routes>
    
 
  )
}

export default App
