
import './App.css'
import  {BrowserRouter}  from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';
import { NavBar } from './components/navbar';
import "./styles/main.scss"
function App() {

  return (
    <>
     <BrowserRouter>
          <div className='d-flex flex-column  align-items-center vh-100 vw-100'>

     <NavBar></NavBar>
    <AppRoutes />
     </div>

  </BrowserRouter>
    </>
  )
}

export default App
