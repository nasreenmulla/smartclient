
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Menu from './Menu';
import Employer from './pages/Login/Employer/Employer';
import Depart from './pages/Depart/Depart';
import Posi from './pages/Posi/Posi';
import Dashboard from './Dashboard';
import Salary from './pages/Salary/Salary';
import Vaca from './pages/Vaca/Vaca';
import Natio from './pages/Natio/Natio';
import Commi from './pages/Commi/Commi';
import Employes from './pages/Employes/Employes';
import Locat from './pages/Locat/Locat';
import Banks from './pages/Banks/Banks';
import Attendence from './pages/Attendence/Attendence'


import Footer from './Footer';
import { BrowserRouter as Router ,Route, Routes,useLocation} from 'react-router-dom';
// import Allroutes from './Allroutes';


// import Design from './pages/Design/Design'

import Login from './pages/Login/Login'




function App() {
  return (
    <div >
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}
function AppContent() {
  // Custom hook to get the current location
  const location = useLocation();

  // Determine whether to show header, menu, and footer based on the route path
  const showHeaderMenuFooter = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {showHeaderMenuFooter && (
        <>
            <Header /> 
           <Menu />  
           
        </>
      )}
         <Routes> 
              <Route exact path='/' element={<Login/>}></Route>
              <Route exact path="/D" element={<Dashboard/>}></Route> 
              <Route exact path='/Employer' element={ <Employer  isMenuPushExpanded={false}  />}></Route>
              <Route exact path='/Depart' element={<Depart/>}></Route>
              <Route exact path='/Posi' element={<Posi/>}></Route>
              <Route exact path='/Locat' element={<Locat/>}></Route>
              <Route exact path='/Natio' element={<Natio/>}></Route>
              <Route exact path='/Vaca' element={<Vaca/>}></Route>
              <Route exact path='/Commi' element={<Commi/>}></Route>
              <Route exact path='/Employes' element={<Employes/>}></Route>
              <Route exact path='/Salary' element={<Salary/>}></Route>
              <Route exact path='/banks' element={<Banks/>}></Route>
              <Route exact path='/Attendence' element={<Attendence/>}></Route>
             
              
      </Routes>
   
      {showHeaderMenuFooter && <Footer />}
    </>
  );
}

export default App;
