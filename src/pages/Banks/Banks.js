import React, { useState, useEffect,useRef } from 'react';
import api from '../../api';
import './Bank.css'
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';
const Banks = ({ isMenuPushExpanded }) => {
  const [searchColumn, setSearchColumn] = useState('All Columns');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchClick = () => {
    setSearchInitiated(true);
    const filtered = employes.filter((employe) => {
         if (searchColumn === 'All Columns') {
      return Object.values(employe).some((value) =>
        value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      );
    } else {
      return employe[searchColumn] ? employe[searchColumn].toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
    }
    });
    setFilteredEmployees(filtered);
  };

  const handleResetClick = () => {
    setSearchInitiated(false);
    setSearchTerm('');
    setSearchColumn('All Columns');
    setFilteredEmployees([]);
  };
  const [banks, setBanks] = useState([]);
  const [formData, setFormData] = useState({
    BANK_CODE: '',
    NAME_E: '',
    NAME_A: '',
    BANK_SEQ: '',
    BANK_REF_SEQ:'',
    BANK_CODE_PARENT:'',
    SHORT_NAME:'',
    STR_CODE:''
  });
  const [showForm, setShowForm] = useState(false);
//   const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await api.get('/api/banks');
      setBanks(response.data);
      console.log(banks)
    } catch (error) {
      console.error('Error fetching commitments:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/banks', formData);
      setFormData({
        BANK_CODE: '',
        NAME_E: '',
        NAME_A: '',
        BANK_SEQ:'',
        BANK_REF_SEQ:'',
        BANK_CODE:'',
        BANK_CODE_PARENT:'',

        SHORT_NAME:'',
        STR_CODE:''

     
      });
      fetchBanks();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Departments:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(banks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Banks');
    XLSX.writeFile(workbook, 'bank.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/banks/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchBanks();
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
    <div className={`EmployerContainer ${isMenuPushExpanded ? 'menu-push-expanded' : ''}`}>
      <div className='EmployerBox' style={{ overflowY: 'auto' }}>
        <div className='hea'>
          <h2 style={styles}>Banks</h2>
          <div className='head' style={dd}>
            <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'Close' : 'Add'}</button>
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
          <div style={{overflowY:'auto'}} className='foEmp'>

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
     Bank
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div  className='formbody' style={{margin:'70px'}}>
           <div className="Dp">
              <label>BANK_CODE<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="BANK_CODE" value={formData.BANK_CODE} onChange={handleChange}  style={{width:'300px'}} required/>
            </div>
            <div className='twf'>
            <div className="form-group">
              <label>NAME_E<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="NAME_E" value={formData.NAME_E} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>اسم الالتزام</label>
              <input type="text" className="form-control" name="NAME_A" value={formData.NAME_A} onChange={handleChange} />
            </div>
            </div>
           <div className='tws'>
           <div className="form-group">
              <label>BANK_SEQ<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="BANK_SEQ" value={formData.BANK_SEQ} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>BANK_REF_SEQ</label>
              <input type="text" className="form-control" name="BANK_REF_SEQ" value={formData.BANK_REF_SEQ} onChange={handleChange}/>
            </div>
           </div>
            <div className='twt'>
            <div className="form-group">
              <label>BANK_CODE_PARENT</label>
              <input type="text" className="form-control" name="BANK_CODE_PARENT" value={formData.BANK_CODE_PARENT} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>SHORT_NAME</label>
              <input type="text" className="form-control" name="SHORT_NAME" value={formData.SHORT_NAME} onChange={handleChange}/>
            </div>
            
            <div className="form-group">
              <label>STR_CODE</label>
              <input type="text" className="form-control" name="STR_CODE" value={formData.STR_CODE} onChange={handleChange}/>
            </div>
            </div>
           </div>
           <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Bank
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>
          </form>
            </div>
        )}
        <div className='tt'>
          <table className="table">
            <thead>
              <tr>
                <th>BANK_CODE</th>
                <th>NAME_E</th>
                <th>اسم الالتزام</th>
                <th>BANK_SEQ</th>
                <th>BANK_REF_SEQ</th>
                <th>BANK_CODE_PARENT</th>
                <th>SHORT_NAME</th>
                <th>STR_CODE</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank) => (
                <tr key={bank._id}>
                  <td>{bank.BANK_CODE}</td>
                  <td>{bank.NAME_E}</td>
                  <td>{bank.NAME_A}</td>
                  <td>{bank.BANK_SEQ}</td>
                  <td>{bank.BANK_REF_SEQ}</td>
                  <td>{bank.BANK_CODE_PARENT}</td>
                  <td>{bank.SHORT_NAME}</td>
                  <td>{bank.STR_CODE}</td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Banks;
const dd={
    marginLeft:'700px'
  }
