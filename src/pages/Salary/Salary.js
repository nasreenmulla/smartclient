




import React, { Component } from 'react'
import { useEffect,useState,useRef } from 'react';
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Salary.css'
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';

    const Attendence=()=>{

        const [salary, setSalary] = useState([]);
  const [formData, setFormData] = useState({
   EMPCODE:'',
   NAMEINENGLISH:'',
   NAMEINARBI:'',
   DESIGNATION:'',
   BRANCH:'',
   BASICSALARY:'',
   INCREMENT:'',
   ACCOMODATION:'',
   TRANSPORTATION:'',
   TICKET:'',
   TOTALSALARY:'',
   WORKDAYS:'',
   CURRENTSALARY:'',
   OVERTIME:'',
   ANNUALLEAVEPAYMENT:'',
   PERFORMANCEALLOWANCE:'',
   OTHERADD:'',
   TOTALWAGES:'',
   LOAN:'',
   LATE:'',
   ABSENT:'',
   OTHERDEDUCTION:'',
   NETSALARY:''


  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchsalary();
  }, []);

  const fetchsalary = async () => {
    try {
      const response = await api.get('/api/salary');
      setSalary(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching Departments:', error);
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
        const newFormData = { ...prevState, [name]: value };

        // Perform calculations based on new form data
        const BASICSALARY = parseFloat(newFormData.BASICSALARY) || 0;
        const INCREMENT = parseFloat(newFormData.INCREMENT) || 0;
        const ACCOMODATION = parseFloat(newFormData.ACCOMODATION) || 0;
        const TRANSPORTATION = parseFloat(newFormData.TRANSPORTATION) || 0;
        const TICKET = parseFloat(newFormData.TICKET) || 0;

        const TOTALSALARY = BASICSALARY + INCREMENT + ACCOMODATION + TRANSPORTATION + TICKET;
        newFormData.TOTALSALARY = TOTALSALARY;

        const CURRENTSALARY = TOTALSALARY;
        newFormData.CURRENTSALARY = CURRENTSALARY;

        const OVERTIME = parseFloat(newFormData.OVERTIME) || 0;
        const ANNUALLEAVEPAYMENT = parseFloat(newFormData.ANNUALLEAVEPAYMENT) || 0;
        const PERFORMANCEALLOWANCE = parseFloat(newFormData.PERFORMANCEALLOWANCE) || 0;
        const OTHERADD = parseFloat(newFormData.OTHERADD) || 0;

        const TOTALWAGES = CURRENTSALARY + OVERTIME + ANNUALLEAVEPAYMENT + PERFORMANCEALLOWANCE + OTHERADD;
        newFormData.TOTALWAGES = TOTALWAGES;

        const LOAN = parseFloat(newFormData.LOAN) || 0;
        const LATE = parseFloat(newFormData.LATE) || 0;
        const ABSENT = parseFloat(newFormData.ABSENT) || 0;
        const OTHERDEDUCTION = parseFloat(newFormData.OTHERDEDUCTION) || 0;

        const TOTALDEDUCTION = LOAN + LATE + ABSENT + OTHERDEDUCTION;
        newFormData.TOTALDEDUCTION = TOTALDEDUCTION;

        const NETSALARY = TOTALWAGES - TOTALDEDUCTION;
        newFormData.NETSALARY = NETSALARY;

        return newFormData;
    });
};


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/salary', formData);
      setFormData({
        EMPCODE:'',
        NAMEINENGLISH:'',
        NAMEINARBI:'',
        DESIGNATION:'',
        BRANCH:'',
        BASICSALARY:'',
        INCREMENT:'',
        ACCOMODATION:'',
        TRANSPORTATION:'',
        TICKET:'',
        TOTALSALARY:'',
        WORKDAYS:'',
        CURRENTSALARY:'',
        OVERTIME:'',
        ANNUALLEAVEPAYMENT:'',
        PERFORMANCEALLOWANCE:'',
        OTHERADD:'',
        TOTALWAGES:'',
        LOAN:'',
        LATE:'',
        ABSENT:'',
        OTHERDEDUCTION:'',
        NETSALARY:''
     

     
      });
      fetchsalary();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Departments:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salary);
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
      fetchsalary();
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
 
        return (
            <div className='EmployerContainer'  >
              <div className='EmployerBox' style={{overflow:'auto'}}>
              <div className='hea'>
    <h2 style={styles}>SALARY</h2>
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
     Salary
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div className='formbody' style={{margin:'70px'}}>
          <div className='ona'>
          <div className="Do" >
            <label >EMPCODE<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="EMPCODE" value={formData.EMPCODE} onChange={handleChange} style={{width:'300px'}} required />
            </div>
            <div className="form-group">
              <label>NAMEINENGLISH <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="NAMEINENGLISH" value={formData.NAMEINENGLISH} onChange={handleChange} required />
            </div>
          </div>
            <div className='onw'>
            <div >
            <label htmlFor="nameInArabic">NAMEINARBI</label>
            <input
                type="text"
               className="form-control"
            
               name="NAMEINARBI"
               value={formData.NAMEINARBI}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic" >DESIGNATION</label>
            <input
                type="text"
               className="form-control"
            
               name="DESIGNATION"
               value={formData.DESIGNATION}
               onChange={handleChange}
               />
            </div>
            </div>
            <div>
  
</div>
           <div className='ona'>
           <div className="form-group">
            <label htmlFor="nameInArabic">BRANCH</label>
            <input
                type="text"
               className="form-control"
            
               name="BRANCH"
               value={formData.BRANCH}
               onChange={handleChange}
               />
            </div>
   
            <div className="form-group">
            <label htmlFor="nameInArabic">BASICSALARY</label>
            <input
                type="text"
               className="form-control"
            
               name="BASICSALARY"
               value={formData.BASICSALARY}
               onChange={handleChange}
               />
            </div>
           </div>
            <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    More Details
  </h2>
           <div className='ona'>
           <div className="form-group">
            <label htmlFor="nameInArabic">INCREMENT</label>
            <input
                type="text"
               className="form-control"
            
               name="INCREMENT"
               value={formData.INCREMENT}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ACCOMODATION</label>
            <input
                type="text"
               className="form-control"
            
               name="ACCOMODATION"
               value={formData.ACCOMODATION}
               onChange={handleChange}
               />
            </div>
           </div>
          <div className='ona'>
          <div className="form-group">
            <label htmlFor="nameInArabic">TRANSPORTATION</label>
            <input
                type="text"
               className="form-control"
            
               name="TRANSPORTATION"
               value={formData.TRANSPORTATION}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">TICKET</label>
            <input
                type="text"
               className="form-control"
            
               name="TICKET"
               value={formData.TICKET}
               onChange={handleChange}
               />
            </div>
          </div>
          <div className='ona'>
          <div className="form-group" >
            <label htmlFor="nameInArabic">TOTALSALARY</label>
            <input
                type="text"
               className="form-control"
            
               name="TOTALSALARY"
               value={formData.TOTALSALARY}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">WORKDAYS</label>
            <input
                type="text"
               className="form-control"
            
               name="WORKDAYS"
               value={formData.WORKDAYS}
               onChange={handleChange}
               />
            </div>
          </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">CURRENTSALARY</label>
            <input
                type="text"
               className="form-control"
            
               name="CURRENTSALARY"
               value={formData.CURRENTSALARY}
               onChange={handleChange}
               style={formData.CURRENTSALARY === '' ? { border: '1px solid #ced4da' } : { border: '2px solid #007bff' }}
               />
            </div>
            <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Other Allowances
  </h2>
           <div className='ona'>
           <div className="form-group">
            <label htmlFor="nameInArabic">OVERTIME</label>
            <input
                type="text"
               className="form-control"
            
               name="OVERTIME"
               value={formData.OVERTIME}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">ANNUALLEAVEPAYMENT</label>
            <input
                type="text"
               className="form-control"
            
               name="ANNUALLEAVEPAYMENT"
               value={formData.ANNUALLEAVEPAYMENT}
               onChange={handleChange}
               />
            </div>
           </div>
          <div className='ona'>
          <div className="form-group">
            <label htmlFor="nameInArabic">PERFORMANCEALLOWANCE</label>
            <input
                type="text"
               className="form-control"
            
               name="PERFORMANCEALLOWANCE"
               value={formData.PERFORMANCEALLOWANCE}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">OTHERADD</label>
            <input
                type="text"
               className="form-control"
            
               name="OTHERADD"
               value={formData.OTHERADD}
               onChange={handleChange}
               />
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
    SUMTOTAL
  </h2>
</div>
           
            <div className="form-group">
            <label htmlFor="nameInArabic">TOTALWAGES</label>
            <input
                type="text"
               className="form-control"
            
               name="TOTALWAGES"
               value={formData.TOTALWAGES}
               onChange={handleChange}
               style={formData.TOTALWAGES === '' ? { border: '1px solid #ced4da' } : { border: '2px solid #007bff' }}
               />
            </div>
            <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Deduction
  </h2>
           <div className='onthird'>
           <div className="form-group">
            <label htmlFor="nameInArabic">LOAN</label>
            <input
                type="text"
               className="form-control"
            
               name="LOAN"
               value={formData.LOAN}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">LATE</label>
            <input
                type="text"
               className="form-control"
            
               name="LATE"
               value={formData.LATE}
               onChange={handleChange}
               />
            </div>
           
            <div className="form-group">
            <label htmlFor="nameInArabic">ABSENT</label>
            <input
                type="text"
               className="form-control"
            
               name="ABSENT"
               value={formData.ABSENT}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">OTHERDEDUCTION</label>
            <input
                type="text"
               className="form-control"
            
               name="OTHERDEDUCTION"
               value={formData.OTHERDEDUCTION}
               onChange={handleChange}
               />
            </div>
            </div>
            
            <div className="form-group">
    <label htmlFor="nameInArabic" style={{ fontWeight: 'bold', color: '#007bff', fontSize: '18px' }}>NETSALARY</label>
    <input
        type="text"
        className="form-control"
        name="NETSALARY"
        value={formData.NETSALARY}
        onChange={handleChange}
        style={{ border: '2px solid #007bff', borderRadius: '5px', padding: '8px', fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    />
</div>

 
          
          
           </div>
            <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Salary
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>



          </form>
          </div>
        )}

        
       <div className='tt'>
       <table className="table">
          <thead>
            <tr>
           <th> EMPCODE</th>
  <th>NAMEINENGLISH</th> 
  <th>NAMEINARBI</th> 
  <th>DESIGNATION</th> 
   <th>BRANCH</th>
  <th>BASICSALARY</th> 
  <th>INCREMENT</th> 
   <th>ACCOMODATION</th>
   <th>TRANSPORTATION</th>
   <th>TICKET</th>
  <th>TOTALSALARY</th> 
  <th> WORKDAYS</th>
  <th>CURRENTSALARY</th> 
   <th>OVERTIME</th>
   <th>ANNUALLEAVEPAYMENT</th>
  <th> PERFORMANCEALLOWANCE</th>
   <th>OTHERADD</th>
  <th>TOTALWAGES</th> 
  <th>LOAN</th> 
   <th>LATE</th>
   <th>ABSENT</th>
   <th>OTHERDEDUCTION</th>
   <th>NETSALARY</th>
            </tr>
          </thead>
          <tbody>
            {salary.map((department) => (
              <tr key={department._id}>
                <td>{department.EMPCODE}</td>
                <td>{department.NAMEINENGLISH}</td>
                <td>{department.NAMEINARBI}</td>
                <td>{department.DESIGNATION}</td>
                <td>{department.BRANCH}</td>
                <td>{department.BASICSALARY}</td>
                <td>{department.INCREMENT}</td>
                <td>{department. ACCOMODATION}</td>
                <td>{department.TRANSPORTATION}</td>
                <td>{department.TICKET}</td>
                <td>{department.TOTALSALARY}</td>
                <td>{department.WORKDAYS}</td>
                <td>{department.CURRENTSALARY}</td>
                <td>{department.OVERTIME}</td>
                <td>{department.ANNUALLEAVEPAYMENT}</td>
                <td>{department.PERFORMANCEALLOWANCE}</td>
                <td>{department.OTHERADD}</td>
                <td>{department.TOTALWAGES}</td>
                <td>{department.LOAN}</td>
                <td>{department.LATE}</td>
                <td>{department.ABSENT}</td>
                <td>{department.OTHERDEDUCTION}</td>
                <td>{department.NETSALARY}</td>
             
               
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

