
// import React, { Component } from 'react';
// // import './Header.css';
// import { useNavigate } from 'react-router-dom';

// export default class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userInitial: '', // Initialize userInitial state
//       showLogoutButton: false // Initially hide logout button
//     };
//   }

//   componentDidMount() {
//     // Retrieve user's initial from local storage
//     const initial = localStorage.getItem('initial');
//     if (initial) {
//       this.setState({ userInitial: initial });
//     }
//   }

//   handleUserInitialClick = () => {
//     // Toggle showLogoutButton state upon clicking user initial
//     this.setState(prevState => ({
//       showLogoutButton: !prevState.showLogoutButton
//     }));
//   }

//   handleLogout = () => {
//     // Perform logout actions here
//     // For example, clearing local storage and redirecting to login page
//     localStorage.removeItem('initial');
//     useNavigate("/D")
//     // Redirect to login page or perform any other logout action
//   }

//   render() {
//     return (
//       <div className='header'>
//         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//           {/* Left navbar links */}
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
//             </li>
//             <li className="nav-item d-none d-sm-inline-block">
//               <a href="index3.html" className="nav-link">Home</a>
//             </li>
//             {/* <li className="nav-item d-none d-sm-inline-block">
//               <a href="#" className="nav-link">Contact</a>
//             </li> */}
//           </ul>
//           {/* SEARCH FORM */}

//           {/* Right navbar links */}
//           <ul className="navbar-nav ml-auto">
//             {/* Notifications Dropdown Menu */}
//             <li className="nav-item">
//               <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
//                 <i className="fas fa-mobile-alt"></i> Mobile
//               </a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
//                 <i className="fas fa-question-circle"></i> SMART Help
//               </a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" onClick={this.handleUserInitialClick}>
//                 <i className="fas fa-user-circle"></i> {this.state.userInitial}
//               </a>
//             </li>
//           </ul>

//           {/* Logout Button */}
//           {this.state.showLogoutButton &&
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <button className="btn btn-link nav-link" onClick={this.handleLogout}>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           }
//         </nav>
//       </div>
//     )
//   }
// }
import React, { useState, useEffect } from 'react';
// import './Header.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Employer from './pages/Login/Employer/Employer';
// import EmployerContainer from './EmployerContainer';

function Header() {
  const [userInitial, setUserInitial] = useState('');
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const navigate = useNavigate();
  const [isMenuPushExpanded, setIsMenuPushExpanded] = useState(false);

  const handleMenuPushToggle = () => {
    setIsMenuPushExpanded(!isMenuPushExpanded);
  };
  useEffect(() => {
    const initial = localStorage.getItem('initial');
    if (initial) {
      setUserInitial(initial);
    }
  }, []);

  const handleUserInitialClick = () => {
    setShowLogoutButton(!showLogoutButton);
  };

  const handleLogout = () => {
    localStorage.removeItem('initial');
    navigate("/");
  };
  const location = useLocation();

  // Determine whether to show header, menu, and footer based on the route path
  const show = location.pathname == '/Employer'  ;

  return (
    <div className={`header ${isMenuPushExpanded ? 'menu-push-expanded' : ''}`}>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
          {/* <a className="nav-link" data-widget="pushmenu" href="#"> */}
          <a className="nav-link" data-widget="pushmenu" onClick={handleMenuPushToggle}><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">Home</a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
              <i className="fas fa-mobile-alt"></i> Mobile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
              <i className="fas fa-question-circle"></i> SMART Help
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={handleUserInitialClick}>
              <i className="fas fa-user-circle"></i> {userInitial}
            </a>
          </li>
        </ul>

        {showLogoutButton &&
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </li>
          </ul>
        }
      </nav>
      
      {/* {
        show && (
          <Employer isMenuPushExpanded={isMenuPushExpanded} />
        )
      } */}
    </div>
  );
}

export default Header;
