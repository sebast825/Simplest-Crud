
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import  {BrowserRouter}  from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';
import { NavBar } from './components/navbar';

function App() {

  return (
    <>
     <BrowserRouter>
          <div className=''>

     <NavBar></NavBar>
    <AppRoutes />
     </div>

  </BrowserRouter>
    </>
  )
}

export default App
