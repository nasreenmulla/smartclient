
import React, { Component } from 'react'
import { useEffect,useState,useRef } from 'react';
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';

    const Vaca=()=>{

        const [vacations, setVacations] = useState([]);
  const [formData, setFormData] = useState({
    vacationid: '',
    vacationtype: '',
    vacationtypeA: '',
   
   
  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchVacations();
  }, []);

  const fetchVacations = async () => {
    try {
      const response = await api.get('/api/vacations');
      setVacations(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching Locationss:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/vacations', formData);
      setFormData({
        vacationid: '',
        vacationtype: '',
        vacationtypeA: '',
     
      });
      fetchVacations();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Departments:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(vacations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vacations');
    XLSX.writeFile(workbook, 'vacations.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/vacations/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchVacations();
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
            <div className='EmployerContainer' >
              <div className='EmployerBox'>
              <div className='hea'>
    <h2 style={styles}>Vocations</h2>
        <div className='head' style={dd}>
         
          <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'close' : 'Add'}</button>
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
            <form onSubmit={handleSubmit}  >
            <h1 style={{ 
              textAlign:'left',
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
     Vacation
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div className='formbody' style={{margin:'70px'}}>
           <div className="Dp" >
            <label>Vocations #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="vacationid" value={formData.vacationid} onChange={handleChange} style={{width:'300px'}} required />
            </div>
            <div className="form-group">
              <label>Vacation type <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="vacationtype" value={formData.vacationtype} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label >نوع الإجازة</label>
            <input
                type="text"
               className="form-control"
            
               name="vacationtypeA"
               value={formData.vacationtypeA}
               onChange={handleChange}
               />
            </div>
           </div>
           <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Vacation
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>
            
          </form>
            </div>
        )}

        
       <div className='tt'>
       <table className="table">
          <thead>
            <tr>
              <th>Vacation #</th>
              <th>Vacation type</th>
              <th>نوع الإجازة</th>
             
            </tr>
          </thead>
          <tbody>
            {vacations.map((vacation) => (
              <tr key={vacation._id}>
                <td>{vacation.vacationid}</td>
                <td>{vacation.vacationtype}</td>
                <td>{vacation.vacationtypeA}</td>
               
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
  

export default Vaca;