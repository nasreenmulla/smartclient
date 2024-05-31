
// import React, { useState, useEffect } from 'react';
// import api from '../../api/index';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from 'react-router-dom';
// import { faCloud } from '@fortawesome/free-solid-svg-icons';
// import './Login.css'

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [validUsername, setValidUsername] = useState(false);
//   const [validPassword, setValidPassword] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // Code to handle background image change after 5 seconds
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { username, password });
//       if (response.data.success) {
//         localStorage.setItem('initial', response.data.initial);
//         navigate("/D");
//       }
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//     setValidUsername(e.target.value.trim().length > 0);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setValidPassword(e.target.value.trim().length > 0);
//   };

//   return (
//     <div className='outer'>
//     <div className='body'>
//       <div className="login-header">
//         <FontAwesomeIcon icon={faCloud} style={{ marginRight: '10px', color: 'blue', fontSize: '64px' }} />
//         <div className="login-title">SMART Log In</div>
//       </div>
//       {error && <p>{error}</p>}
//       <div className='login-container'>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <FontAwesomeIcon icon={faUser} className="input-icon" />
//             <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
//             {validUsername && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
//           </div>
//           <div className="input-group">
//             <FontAwesomeIcon icon={faLock} className="input-icon" />
//             <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
//             {validPassword && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
//           </div>
//           <p style={{ fontSize: "17px", color: "#666767" }}>
//           To sign in to the <b>SMART</b> Database application, please use your <br></br>Application username and password.
//             <br></br>
//             For further information, please refer to <b>SMART</b> User's Guide or<br></br> visit "Mantech information Technology Solutions Co." website.<br></br></p>
//             <p style={{ fontSize: "17px", color: "#007ac6" }}> www.mantech-its.com</p>
//           <button type="submit">Login</button>
//         </form>
//       </div>

//     </div>
//     </div>
//   );
// }

// export default Login;
// import React, { useState, useEffect } from 'react';
// import api from '../../api/index';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faLock, faCheck, faCloud } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [validUsername, setValidUsername] = useState(false);
//   const [validPassword, setValidPassword] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // Code to handle background image change after 5 seconds
//     }, 200);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { username, password });
//       if (response.data.success) {
//         localStorage.setItem('initial', response.data.initial);
//         navigate("/D");
//       }
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//     setValidUsername(e.target.value.trim().length > 0);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setValidPassword(e.target.value.trim().length > 0);
//   };

//   return (
//     <div className='outer'>
//       <div className='image-container'>
//         <div className='image1'></div>
//         <div className='image2'></div>
//         <div className='image3'></div>
//         <div className='image4'></div>
//       </div>
//       <div className='body'>
//         <div className="login-header">
//           <FontAwesomeIcon icon={faCloud} style={{ marginRight: '10px', color: 'blue', fontSize: '64px' }} />
//           <div className="login-title">SMART Log In</div>
//         </div>
//         {error && <p>{error}</p>}
//         <div className='login-container'>
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <FontAwesomeIcon icon={faUser} className="input-icon" />
//               <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
//               {validUsername && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
//             </div>
//             <div className="input-group">
//               <FontAwesomeIcon icon={faLock} className="input-icon" />
//               <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
//               {validPassword && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
//             </div>
//             <p style={{ fontSize: "17px", color: "#666767" }}>
//               To sign in to the <b>SMART</b> Database application, please use your <br></br>Application username and password.
//               <br></br>
//               For further information, please refer to <b>SMART</b> User's Guide or<br></br> visit "Mantech information Technology Solutions Co." website.<br></br></p>
//             <p style={{ fontSize: "17px", color: "#007ac6" }}> www.mantech-its.com</p>
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import api from '../../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCheck, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [animationClass, setAnimationClass] = useState(''); // State to handle animation class
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Code to handle background image change after 5 seconds
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAnimationClass('slide-out'); // Add slide-out class on submit
      setTimeout(async () => {
        const response = await api.post('/login', { username, password });
        if (response.data.success) {
          localStorage.setItem('initial', response.data.initial);
          navigate("/D");
        }
      }, 1000); // Match this timeout with the slide-out animation duration
    } catch (err) {
      setError(err.response.data.message);
      setAnimationClass(''); // Remove slide-out class if there's an error
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setValidUsername(e.target.value.trim().length > 0);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidPassword(e.target.value.trim().length > 0);
  };

  return (
    <div className='outer'>
      <div className='image-container'>
        <div className='image1'></div>
        <div className='image2'></div>
        <div className='image3'></div>
        <div className='image4'></div>
      </div>
      <div className={`body ${animationClass}`}>
        <div className="login-header">
          <FontAwesomeIcon icon={faCloud} style={{ marginRight: '10px', color: 'blue', fontSize: '64px' }} />
          <div className="login-title">SMART Log In</div>
        </div>
        {error && <p>{error}</p>}
                <div className='login-container'>
           <form onSubmit={handleSubmit}>
             <div className="input-group">
               <FontAwesomeIcon icon={faUser} className="input-icon" />
               <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username"  required/>
               {validUsername && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
             </div>
             <div className="input-group">
               <FontAwesomeIcon icon={faLock} className="input-icon" />
               <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required />
               {validPassword && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
             </div>
             <p style={{ fontSize: "17px", color: "#666767" }}>
               To sign in to the <b>SMART</b> Database application, please use your <br></br>Application username and password.
               <br></br>
               For further information, please refer to <b>SMART</b> User's Guide or<br></br> visit "Mantech information Technology Solutions Co." website.<br></br></p>
             <p style={{ fontSize: "17px", color: "#007ac6" }}> www.mantech-its.com</p>
             <button type="submit">Login</button>
           </form>
         </div>
      </div>
    </div>
  );
}

export default Login;
