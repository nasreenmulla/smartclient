// import React, { Component } from 'react'

// export default class Menu extends Component {
//   render() {
//     return (
//       <div>
//   <aside className="main-sidebar sidebar-dark-primary elevation-4">
//     <a href="index3.html" className="brand-link">
//       <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
//       <span className="brand-text font-weight-light">SMART</span>
//     </a>
//     <div className="sidebar">
     
//       <nav className="mt-2">
//         <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
//           <li className="nav-item menu-open">
//             <a href="#" className="nav-link active">
//               <i className="nav-icon fas fa-tachometer-alt" />
//               <p>
//                 HRMS
//                 <i className="right fas fa-angle-left" />
//               </p>
//             </a>
      
//           </li>
        
//           <li className="nav-header">Basic Data</li>
//           <li className="nav-item">
//             <a href="pages/calendar.html" className="nav-link">
//               <i className="nav-icon far fa-calendar-alt" />
//               <p>
//                 Employer
//                 <span className="badge badge-info right">2</span>
//               </p>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="pages/gallery.html" className="nav-link">
//               <i className="nav-icon far fa-image" />
//               <p>
//                 Departments
//               </p>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="pages/kanban.html" className="nav-link">
//               <i className="nav-icon fas fa-columns" />
//               <p>
//                 Positions
//               </p>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               <i className="nav-icon far fa-envelope" />
//               <p>
//                 Locations
//                 <i className="fas fa-angle-left right" />
//               </p>
//             </a>

//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               <i className="nav-icon fas fa-book" />
//               <p>
//                 Nationalities
//                 <i className="fas fa-angle-left right" />
//               </p>
//             </a>

//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               <i className="nav-icon far fa-plus-square" />
//               <p>
//                 vacations
//                 <i className="fas fa-angle-left right" />
//               </p>
//             </a>
           
//               </li>
             
           
            
//               <li className="nav-item">
//             <a href="#" className="nav-link">
//               <i className="nav-icon far fa-plus-square" />
//               <p>
//                 Commitments
//                 <i className="fas fa-angle-left right" />
//               </p>
//             </a>
           
//               </li>
        
//           <li className="nav-header">Employees</li>
      
//           <li className="nav-header">Salaries</li>
         
//           <li className="nav-header">ADMINISTRATION</li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               <i className="nav-icon far fa-circle text-danger" />
//               <p className="text">ThemeStyle</p>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link">
//               <i className="nav-icon far fa-circle text-warning" />
//               <p>ChangePassword</p>
//             </a>
//           </li>
        
//         </ul>
//       </nav>
//     </div>
//   </aside>
// </div>

//     )
//   }
// }
import React, { Component } from 'react';
import image from './images.png'
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBasicData: false,
      showAdministration: false,
      BasicDataBasic:false
    };
  }

  toggleBasicData = () => {
    this.setState(prevState => ({
      showBasicData: !prevState.showBasicData
    }));
  }
  BasicData=()=>{
    this.setState(prevState=>({
        BasicDataBasic:!prevState.BasicDataBasic
      
    }));
  }
  toggleAdministration = () => {
    this.setState(prevState => ({
      showAdministration: !prevState.showAdministration
    }));
  }

  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a href="index3.html" className="brand-link">
            <img src={image} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">SMART</span>
          </a>
          <div className="sidebar">
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item menu-open">
                  <a  className="nav-link active" onClick={this.toggleBasicData}>
                  <i class="fas fa-users"></i>
                    <p>
                          HRMS
                      <i className={`right fas fa-angle-left ${this.state.showBasicData ? 'rotate-icon' : ''}`} />
                    </p>
                  </a>
                  {this.state.showBasicData && (
                    <ul className="nav nav-treeview">
                      
                      
                      <li className="nav-header" >
                      <a  onClick={this.BasicData}>
                       <i className="fas fa-pencil-alt"></i>
                        Basic Data                  



                        
                        <i className={` ${this.state.BasicDataBasic ? 'rotate-icon' : ''}`} />
                       </a>
                        </li>
                        {
                            this.state.BasicDataBasic && (
                                <li>
                                    
                     
                      <li className="nav-item">
                       <Link to='/Employer'>
                       <a className="nav-link">
                        <i className="fas fa-user"></i>

                          Employer
                          
                        </a>
                       </Link>
                      </li>
                      <li className="nav-item">
                       <Link to='/Depart'>
                       <a  className="nav-link">
                        <i className="fas fa-building"></i>

                          Departments
                        </a>
                       </Link>
                      </li>
                      <li className="nav-item">
                     <Link to='/Posi'>
                     <a className="nav-link">
                        <i className="fas fa-user-tie"></i>

                          Positions
                        </a>
                     </Link>
                      </li>
                      <li className="nav-item">
                      <Link to='/Locat'>
                      <a  className="nav-link">
                        <i className="fas fa-map-marker-alt"></i>


                          Location
                        </a>
                      </Link>
                      </li>
                      <li className="nav-item">
                      <Link to='/Natio'>
                      <a  className="nav-link">
                        <i className="fas fa-globe"></i>


                          Nationalities
                        </a>
                      </Link>
                      </li>
                      <li className="nav-item">
                      <Link to='/Vaca'>
                      <a className="nav-link">
                        <i className="fas fa-umbrella-beach"></i>


                          vacations
                        </a>
                      </Link>
                      </li>
                      <li className="nav-item">
                     <Link to='/Commi'>
                     <a className="nav-link">
                        <i class="fas fa-tasks"></i>



                          Commitments
                        </a>
                     </Link>
                      </li>

                      <li className="nav-item">
                     <Link to='/banks'>
                     <a className="nav-link">
                        <i class="fas fa-tasks"></i>



                          Banks
                        </a>
                     </Link>
                      </li>
                                </li>
                                
                                
                            )
                        }
         
         <li className="nav-header">
         <Link to='/Employes'>
          <i className="fas fa-users"></i>

               Employees
               </Link>
            </li>
            <li className="nav-header">
         <Link to='/Attendence'>
          <i className="fas fa-user-check"></i>

               Attendence
               </Link>
            </li>
         
      
          <li className="nav-header">
       <Link to='/Salary'>
       <a>
         <i className="fas fa-money-bill-alt"></i>

              Salaries
         </a>
       </Link>
            </li>
                    </ul>

                  )}
                </li>
                <li className="nav-item menu-open">
                  <a href="#" className="nav-link active" onClick={this.toggleAdministration}>
                    <i className="nav-icon fas fa-cog" />
                    <p>
                      ADMINISTRATION
                      <i className={`right fas fa-angle-left ${this.state.showAdministration ? 'rotate-icon' : ''}`} />
                    </p>
                  </a>
                  {this.state.showAdministration && (
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                        <i className="fas fa-paint-brush"></i>

                          <p className="text">ThemeStyle</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                        <i className="fas fa-key"></i>

                          <p>ChangePassword</p>
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    );
  }
}

