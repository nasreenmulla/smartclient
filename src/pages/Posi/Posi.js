import React, { Component } from 'react'
import { useEffect,useState,useRef } from 'react';
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';

    const Posi=()=>{

        const [positions, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    positionid: '',
    positionname: '',
    positionnameInArabic: '',
   
   
  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/api/Positions');
      setDepartments(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching Positions:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/Positions', formData);
      setFormData({
        positionid: '',
        positionname: '',
        positionnameInArabic: '',
     
      });
      fetchDepartments();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Positions:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(positions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Positions');
    XLSX.writeFile(workbook, 'position.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/positions/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchDepartments();
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
    <h2 style={styles}>Positions</h2>
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
        <div className='foEmp'>
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
     Position
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div className='formbody' style={{margin:'70px'}}>
           <div className="Dp" >
            <label>Position #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="positionid" value={formData.positionid} onChange={handleChange} style={{width:'300px'}}  required />
            </div>
            <div className="form-group">
              <label>Position Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="positionname" value={formData.positionname} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label htmlFor="nameInArabic">عنوان الوظيفة</label>
            <input
                type="text"
               className="form-control"
            
               name="positionnameInArabic"
               value={formData.positionnameInArabic}
               onChange={handleChange}
               />
            </div>
           </div>
            <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Position
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>

          </form>
          </div>
        )}

        
       <div className='tt'>
       <table className="table">
          <thead>
            <tr>
              <th>Position #</th>
              <th>Position Name</th>
              <th>عنوان الوظيفة</th>
             
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position._id}>
                <td>{position.positionid}</td>
                <td>{position.positionname}</td>
                <td>{position.positionnameInArabic}</td>
               
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
  

export default Posi;