
import React, { Component } from 'react'
import { useEffect,useState ,useRef} from 'react';
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';
    const Natio=()=>{

        const [nationalities, setNationalities] = useState([]);
  const [formData, setFormData] = useState({
    NATION_CODE: '',
    NAME_E: '',
    NAME_A: '',
   
   
  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchNationalities();
  }, []);

  const fetchNationalities = async () => {
    try {
      const response = await api.get('/api/Nationalities');
      setNationalities(response.data);
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
      await api.post('/api/Nationalities', formData);
      setFormData({
        NATION_CODE: '',
        NAME_E: '',
        NAME_A: '',
     
      });
      fetchNationalities();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Departments:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(nationalities);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Nationality');
    XLSX.writeFile(workbook, 'nationality.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/nationalities/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchNationalities();
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
              <div className='EmployerBox' style={{overflowY:'auto'}}>
              <div className='hea' >
    <h2 style={styles}>Nationalities</h2>
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
     Nationality
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div  className='formbody' style={{margin:'70px'}}>
           <div className="Dp" >
            <label>Nationalities #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="NATION_CODE" value={formData.NATION_CODE} onChange={handleChange} style={{width:'300px'}} required />
            </div>
            <div className="form-group">
              <label>Nationality Name #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="NAME_E" value={formData.NAME_E} onChange={handleChange}  required/>
            </div>
            <div className="form-group">
            <label >اسم الموقع</label>
            <input
                type="text"
               className="form-control"
            
               name="NAME_A"
               value={formData.NAME_A}
               onChange={handleChange}
               />
            </div>
           </div>
           <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Nationality
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>
          </form>
        </div>
        )}

        
       <div className='tt' >
       <table className="table"   >
          <thead>
            <tr>
              <th>Nationality #</th>
              <th>Nationality Name</th>
              <th>اسم الموقع</th>
             
            </tr>
          </thead>
          <tbody>
            {nationalities.map((nationalitie) => (
              <tr key={nationalitie._id}>
                <td>{nationalitie.NATION_CODE}</td>
                <td>{nationalitie.NAME_E}</td>
                <td>{nationalitie.NAME_A}</td>
               
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

export default Natio;