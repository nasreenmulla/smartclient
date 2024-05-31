



import React, { Component } from 'react'
import { useEffect,useState,useRef } from 'react';
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Attendence.css'

import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';

    const Attendence=()=>{
      const [searchColumn, setSearchColumn] = useState('All Columns');
      const [showDropdown, setShowDropdown] = useState(false);
      const [searchInitiated, setSearchInitiated] = useState(false);
      const [filteredEmployees, setFilteredEmployees] = useState([]);


      
        const [attendence, setAttendence] = useState([]);
  const [formData, setFormData] = useState({
    FirstName:'',
              LastName:'',
              ID:'',
              Department:'',
              Date:'',
              Weekday:'',
              Timetable:'',
              WorkStartDate:'',
              WorkStartTime:'',
              WorkEndDate:'',
              WorkEndTime:'',
              ClockInDate:'',
              ClockInTime:'',
              ClockInsource:'',
              ClockOutDate:'',
              ClockOutTime:'',
              ClockOutsource:'',
              AttendenceStatus:'',
              WorkedHours:'',
              AbsentDuration:'',
              LateDuration:'',
              EarlyLeaveDuration:'',
              BreakDuration:'',
              LeaveDuration:'',
              OvertimeDuration:'',
              WorkdayOvertimeDuration:'',
              WeekendOvertimeDuration:''
   
   
  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchattendence();
  }, []);

  const fetchattendence = async () => {
    try {
      const response = await api.get('/api/attendence');
      setAttendence(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching Departments:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/attendence', formData);
      setFormData({
        FirstName:'',
        LastName:'',
        ID:'',
        Department:'',
        Date:'',
        Weekday:'',
        Timetable:'',
        WorkStartDate:'',
        WorkStartTime:'',
        WorkEndDate:'',
        WorkEndTime:'',
        ClockInDate:'',
        ClockInTime:'',
        ClockInsource:'',
        ClockOutDate:'',
        ClockOutTime:'',
        ClockOutsource:'',
        AttendenceStatus:'',
        WorkedHours:'',
        AbsentDuration:'',
        LateDuration:'',
        EarlyLeaveDuration:'',
        BreakDuration:'',
        LeaveDuration:'',
        OvertimeDuration:'',
        WorkdayOvertimeDuration:'',
        WeekendOvertimeDuration:''

     
      });
      fetchattendence();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Departments:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendence);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Departments');
    XLSX.writeFile(workbook, 'departments.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/attendence/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchattendence();
      console.log('Locations imported successfully');
    } catch (error) {
      console.error('Error importing locations:', error);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  const styles = {
    color: '#FFFFFF', // White text color
    backgroundColor: '#2196F3', // Blue background color
    fontFamily: 'Arial, sans-serif', // Font family
    fontWeight: 'bold', // Bold text
    borderBottom: '4px solid #1565C0', // Darker blue bottom border
    padding: '15px', // Padding
    textAlign: 'center', // Center align text
    borderRadius: '5px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    margin: '20px 0' // Margin for spacing
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const [dep,setDep]=useState([]);
  const [selecteddep,setSelecteddep]=useState([]);
  const fetchde = async () => {
    try {
      const response = await api.get('/api/departments');
      setDep(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching payees:', error);
    }
  };
  useEffect(() => {
    fetchde();
  }, []);
  const handledepchange=(event)=>{
    setSelecteddep(event.target.value)
  };
        return (
            <div className='EmployerContainer'  >
              <div className='EmployerBox' style={{overflow:'auto'}}>
              <div className='hea'>
    <h2 style={styles}>Attendence</h2>
        <div className='head' style={dd}>
          
          <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'close' : 'Add' }</button>
          <button onClick={exportToExcel} className="btn btn-primary mb-3">
              Export 
            </button>
            <button onClick={handleImportClick} className="btn btn-primary mb-3">
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={importFromExcel}
              accept=".xlsx, .xls"
            />
        </div>
    </div>
        {showForm && (
         <div className='foEmp' style={{overflowY:'auto'}}>
           <form onSubmit={handleSubmit} >
                          <h1 style={{ 
              textAlign:'left',
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
     Attendence
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div className='formbody' style={{margin:'70px'}}>
          <div className='ona'>
          <div className="Do" >
            <label >FirstName<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="FirstName" value={formData.FirstName} onChange={handleChange} style={{width:'300px'}} required />
            </div>
            <div className="form-group">
              <label>LastName <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="LastName" value={formData.LastName} onChange={handleChange} required />
            </div>
          </div>
            <div className='onw'>
            <div >
            <label htmlFor="nameInArabic">ID</label>
            <input
                type="text"
               className="form-control"
            
               name="ID"
               value={formData.ID}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic" >Department</label>
            <select  style={{width:'220px',height:'35px'}} value={formData.Department} name='Department' onChange={handleChange}>
                  <option value="">Select department</option>
                  {dep.map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.departmentname}
                    </option>
                  ))}
                </select>
            </div>
            </div>
            <div>
  <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Work Details
  </h2>
</div>
            <div className="form-group">
            <label htmlFor="nameInArabic">Date</label>
            <input
                type="Date"
               className="form-control"
            
               name="Date"
               value={formData.Date}
               onChange={handleChange}
               />
            </div>
   
            <div className="form-group">
            <label htmlFor="nameInArabic">Weekday</label>
            <input
                type="text"
               className="form-control"
            
               name="Weekday"
               value={formData.Weekday}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">Timetable</label>
            <input
                type="text"
               className="form-control"
            
               name="Timetable"
               value={formData.Timetable}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WorkStartDate</label>
            <input
                type="Date"
               className="form-control"
            
               name="WorkStartDate"
               value={formData.WorkStartDate}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WorkStartTime</label>
            <input
                type="text"
               className="form-control"
            
               name="WorkStartTime"
               value={formData.WorkStartTime}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WorkEndDate</label>
            <input
                type="Date"
               className="form-control"
            
               name="WorkEndDate"
               value={formData.WorkEndDate}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WorkEndTime</label>
            <input
                type="text"
               className="form-control"
            
               name="WorkEndTime"
               value={formData.WorkEndTime}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">Clock-In-Date</label>
            <input
                type="Date"
               className="form-control"
            
               name="ClockInDate"
               value={formData.ClockInDate}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ClockInTime</label>
            <input
                type="text"
               className="form-control"
            
               name="ClockInTime"
               value={formData.ClockInTime}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ClockInsource</label>
            <input
                type="text"
               className="form-control"
            
               name="ClockInsource"
               value={formData.ClockInsource}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ClockOutDate</label>
            <input
                type="Date"
               className="form-control"
            
               name="ClockOutDate"
               value={formData.ClockOutDate}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ClockOutTime</label>
            <input
                type="text"
               className="form-control"
            
               name="ClockOutTime"
               value={formData.ClockOutTime}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ClockOutsource</label>
            <input
                type="text"
               className="form-control"
            
               name="ClockOutsource"
               value={formData.ClockOutsource}
               onChange={handleChange}
               />
            </div>
            <div>
  <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Status
  </h2>
</div>
           
            <div className="form-group">
            <label htmlFor="nameInArabic">AttendenceStatus</label>
            <input
                type="text"
               className="form-control"
            
               name="AttendenceStatus"
               value={formData.AttendenceStatus}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WorkedHours</label>
            <input
                type="text"
               className="form-control"
            
               name="WorkedHours"
               value={formData.WorkedHours}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">AbsentDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="AbsentDuration"
               value={formData.AbsentDuration}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">LateDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="LateDuration"
               value={formData.LateDuration}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">EarlyLeaveDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="EarlyLeaveDuration"
               value={formData.EarlyLeaveDuration}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">BreakDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="BreakDuration"
               value={formData.BreakDuration}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">LeaveDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="LeaveDuration"
               value={formData.LeaveDuration}
               onChange={handleChange}
               />
            </div>
            <div>
  <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Overtime
  </h2>
</div>
            <div className="form-group">
            <label htmlFor="nameInArabic">OvertimeDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="OvertimeDuration"
               value={formData.OvertimeDuration}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WorkdayOvertimeDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="WorkdayOvertimeDuration"
               value={formData.WorkdayOvertimeDuration}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WeekendOvertimeDuration</label>
            <input
                type="text"
               className="form-control"
            
               name="WeekendOvertimeDuration"
               value={formData.WeekendOvertimeDuration}
               onChange={handleChange}
               />
            </div>
           </div>
            <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Attendence
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>



          </form>
          </div>
        )}

        
       <div className='tt'>
       <table className="table">
          <thead>
            <tr>
           <th> FirstName</th>
            <th>  LastName</th>
             <th> ID</th>
             <th> Department</th>
             <th> Date</th>
             <th> Weekday</th>
             <th> Timetable</th>
             <th> WorkStartDat</th>
             <th> WorkStartTime</th>
             <th> WorkEndDate</th>
             <th> WorkEndTime</th>
             <th> ClockInDate</th>
             <th> ClockInTime</th>
             <th> ClockInsource</th>
              <th>ClockOutDate</th>
             <th> ClockOutTime</th>
             <th> ClockOutsource</th>
             <th> AttendenceStatus</th>
            <th>  WorkedHours</th>
             <th> AbsentDuration</th>
             <th> LateDuration</th>
             <th> EarlyLeaveDuration</th>
             <th> BreakDuration</th>
             <th> LeaveDuration</th>
             <th> OvertimeDuration</th>
             <th>WorkdayOvertimeDuration</th> 
             <th> WeekendOvertimeDuration</th>
             
            </tr>
          </thead>
          <tbody>
            {attendence.map((department) => (
              <tr key={department._id}>
                <td>{department.FirstName}</td>
                <td>{department.LastName}</td>
                <td>{department.ID}</td>
                <td>{department.Department}</td>
                <td>{department.Date}</td>
                <td>{department.Weekday}</td>
                <td>{department.Timetable}</td>
                <td>{department. WorkStartDat}</td>
                <td>{department.WorkStartTime}</td>
                <td>{department.WorkEndDate}</td>
                <td>{department.WorkEndTime}</td>
                <td>{department.ClockInTime}</td>
                <td>{department.ClockInsource}</td>
                <td>{department.ClockOutDate}</td>
                <td>{department.ClockOutTime}</td>
                <td>{department.ClockOutsource}</td>
                <td>{department.AttendenceStatus}</td>
                <td>{department.WorkedHours}</td>
                <td>{department.AbsentDuration}</td>
                <td>{department.LateDuration}</td>
                <td>{department.EarlyLeaveDuration}</td>
                <td>{department.BreakDuration}</td>
                <td>{department.LeaveDuration}</td>
                <td>{department.OvertimeDuration}</td>
                <td>{department.WorkdayOvertimeDuration}</td>
                <td>{department.WeekendOvertimeDuration}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
       </div>
              </div>
            
            </div>
          )
    }
  
  const dd={
    marginLeft:'700px'
  }
  

export default Attendence;